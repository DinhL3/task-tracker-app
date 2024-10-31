import { useState, useEffect } from 'react';
import { Container, Typography, Stack, Alert, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RootState, AppDispatch } from '../app/store';
import { addTask } from '../features/tasks/tasksSlice';
import { fetchTags, addTag } from '../features/tags/tagsSlice';

import TaskNameInput from '../components/TaskDetails/TaskNameInput';
import TagInput from '../components/TaskDetails/TagInput';
import SaveButton from '../components/TaskDetails/SaveButton';
import { centerContainerStyles } from '../styles';

export default function NewTask() {
  const dispatch = useDispatch<AppDispatch>();
  const { tags, error } = useSelector((state: RootState) => state.tags);
  const [taskName, setTaskName] = useState('');
  const [nameError, setNameError] = useState('');
  const [taskTags, setTaskTags] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInput = e.target.value;
    setTaskName(nameInput);
    setNameError(nameInput.trim() === '' ? 'Name is required' : '');
  };

  const handleSaveClick = async () => {
    setSaving(true);
    const tagIdsString = await handleTagIds(taskTags);
    try {
      await dispatch(addTask({ name: taskName, tags: tagIdsString }));
      setRedirect(true);
    } finally {
      setSaving(false);
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
    dispatch(fetchTags());
  }, [dispatch]);

  if (redirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container maxWidth="sm" sx={centerContainerStyles}>
      <Typography variant="h4" gutterBottom>
        Create a New Task
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
          error={''} // Adjust error handling as needed
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Stack direction="row" justifyContent="center" sx={{ mt: 4 }}>
          <SaveButton
            onClick={handleSaveClick}
            loading={saving}
            disabled={!!nameError || taskName.trim() === '' || saving}
          />
        </Stack>
      </Box>
    </Container>
  );
}
