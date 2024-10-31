import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Stack,
  Alert,
  Box,
  Modal,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { RootState, AppDispatch } from '../app/store';
import {
  updateTask,
  fetchTaskById,
  deleteTask,
} from '../features/tasks/tasksSlice';
import { fetchTags, addTag } from '../features/tags/tagsSlice';

import TaskNameInput from '../components/TaskDetails/TaskNameInput';
import TagInput from '../components/TaskDetails/TagInput';
import SaveButton from '../components/TaskDetails/SaveButton';
import { centerContainerStyles, modalBoxStyle } from '../styles';

export default function EditTask() {
  const dispatch = useDispatch<AppDispatch>();
  const { taskId } = useParams<{ taskId: string }>();

  const {
    task,
    loading: taskLoading,
    error: taskError,
  } = useSelector((state: RootState) => state.tasks);
  const { tags, error: tagsError } = useSelector(
    (state: RootState) => state.tags
  );

  const [taskName, setTaskName] = useState('');
  const [nameError, setNameError] = useState('');
  const [taskTags, setTaskTags] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [redirectToDetails, setRedirectToDetails] = useState(false);
  const [redirectToRoot, setRedirectToRoot] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInput = e.target.value;
    setTaskName(nameInput);
    setNameError(nameInput.trim() === '' ? 'Name is required' : '');
  };

  const handleSaveClick = async () => {
    setSaving(true);
    const tagIdsString = await handleTagIds(taskTags);
    try {
      await dispatch(
        updateTask({ id: Number(taskId), name: taskName, tags: tagIdsString })
      );
      setRedirectToDetails(true);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await dispatch(deleteTask(Number(taskId)));
      setRedirectToRoot(true);
    } catch (error) {
      console.error('Failed to delete task:', error);
    } finally {
      handleClose();
    }
  };

  const handleTagIds = async (taskTags: string[]): Promise<string> => {
    const existingTagNames = tags.map((tag) => tag.name);
    const existingTagIds = tags.reduce((acc, tag) => {
      if (taskTags.includes(tag.name)) acc[tag.name] = tag.id;
      return acc;
    }, {} as Record<string, number>);

    const newTagIds: Record<string, number> = {};
    for (const tag of taskTags.filter(
      (tag) => !existingTagNames.includes(tag)
    )) {
      const response = await dispatch(addTag(tag)).unwrap();
      newTagIds[tag] = response.id;
    }
    return taskTags
      .map((tag) => existingTagIds[tag] || newTagIds[tag])
      .join(',');
  };

  useEffect(() => {
    if (taskId) {
      dispatch(fetchTaskById(Number(taskId)));
    }
    dispatch(fetchTags());
  }, [dispatch, taskId]);

  useEffect(() => {
    if (task) {
      setTaskName(task.name);
      const taskTagIds = task.tags.split(',').map((tag) => tag.trim());
      const tagNames = taskTagIds
        .map((id) => tags.find((tag) => tag.id === Number(id))?.name || '')
        .filter((name) => name);
      setTaskTags(tagNames);
    }
  }, [task, tags]);

  if (redirectToRoot) {
    return <Navigate to="/" replace />;
  }

  if (redirectToDetails) {
    return <Navigate to={`/tasks/${taskId}`} replace />;
  }

  return (
    <Container maxWidth="sm" sx={centerContainerStyles}>
      <Typography variant="h4" gutterBottom>
        Edit Task
      </Typography>
      <Box sx={{ width: '100%' }}>
        <TaskNameInput
          value={taskName}
          error={nameError}
          onChange={handleNameChange}
        />
        <Typography id="tags" sx={{ mt: 3 }}>
          Tags:
        </Typography>
        <TagInput
          tags={taskTags}
          existingTags={tags.map((tag) => tag.name)}
          onAddTag={(tag) => setTaskTags((prev) => [...prev, tag])}
          onDeleteTag={(tag) =>
            setTaskTags((prev) => prev.filter((t) => t !== tag))
          }
          error={tagsError || ''}
        />
        {(taskError || tagsError) && (
          <Alert severity="error">{taskError || tagsError}</Alert>
        )}
        <Stack direction="row" justifyContent="space-between" sx={{ mt: 4 }}>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={handleOpen}
          >
            Delete
          </Button>
          <SaveButton
            onClick={handleSaveClick}
            loading={saving || taskLoading}
            disabled={
              !!nameError || taskName.trim() === '' || saving || taskLoading
            }
          />
        </Stack>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="delete-modal-title"
          aria-describedby="delete-modal-description"
        >
          <Box sx={modalBoxStyle}>
            <Typography id="delete-modal-title" variant="h6" component="h2">
              Delete this task?
            </Typography>
            <Stack
              direction="row"
              spacing={3}
              justifyContent="center"
              sx={{ mt: 4 }}
            >
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteClick}
              >
                Delete
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
            </Stack>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
}
