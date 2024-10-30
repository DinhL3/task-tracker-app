import { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Typography,
  Button,
  Stack,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Add as AddIcon, Save as SaveIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { addTask } from '../features/tasks/tasksSlice';
import { fetchTags, addTag } from '../features/tags/tagsSlice';
import { centerContainerStyles } from '../styles';

export default function NewTask() {
  const dispatch = useDispatch<AppDispatch>();
  const { tags, loading, error } = useSelector(
    (state: RootState) => state.tags
  );

  const [taskName, setTaskName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [taskTags, setTaskTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>('');
  const [newTagError, setNewTagError] = useState<string>('');
  const [saving, setSaving] = useState<boolean>(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInput = e.target.value;
    setTaskName(nameInput);
    setNameError(nameInput.trim() === '' ? 'Name is required' : '');
  };

  const handleNewTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTagInput = e.target.value;
    const validTagRegex = /^[a-zA-Z\s]+$/;
    if (newTagInput.length > 16) {
      setNewTagError('Tag cannot be longer than 16 characters');
    } else if (validTagRegex.test(newTagInput) || newTagInput === '') {
      setNewTag(newTagInput);
      setNewTagError('');
    } else {
      setNewTagError('Tags can only contain letters');
    }
  };

  const handleAddTagClick = () => {
    if (!taskTags.includes(newTag.trim())) {
      setTaskTags([...taskTags, newTag.trim()]);
      setNewTag('');
      setNewTagError('');
    } else {
      setNewTagError('Tag already exists');
    }
  };

  const handleEnterKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAddTagClick();
  };

  const handleDeleteTagClick = (tagToDelete: string) => {
    setTaskTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  const handleSaveClick = async () => {
    setSaving(true);

    // Step 1: Identify which tags are new and which already exist
    const existingTagNames = tags.map((tag) => tag.name);
    const existingTagIds = tags.reduce((acc, tag) => {
      if (taskTags.includes(tag.name)) acc[tag.name] = tag.id;
      return acc;
    }, {} as Record<string, number>);

    // Step 2: Separate new tags from existing ones
    const newTags = taskTags.filter((tag) => !existingTagNames.includes(tag));

    // Step 3: Create new tags in the backend and retrieve their IDs
    const newTagIds: Record<string, number> = {};
    for (const tag of newTags) {
      try {
        const response = await dispatch(addTag(tag)).unwrap();
        newTagIds[tag] = response.id;
      } catch (error) {
        console.error('Error creating tag:', error);
        setSaving(false);
        return;
      }
    }

    // Step 4: Combine existing and new tag IDs
    const allTagIds = taskTags.map(
      (tag) => existingTagIds[tag] || newTagIds[tag]
    );
    const tagIdsString = allTagIds.join(',');

    // Step 5: Create the new task with the taskName and tag IDs
    try {
      await dispatch(addTask({ name: taskName, tags: tagIdsString }));
      setTaskName('');
      setTaskTags([]);
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    dispatch(fetchTags()); // Fetch tags from backend
  }, [dispatch]);

  return (
    <Container maxWidth="sm" sx={centerContainerStyles}>
      <Typography variant="h4" gutterBottom>
        Create a New Task
      </Typography>
      <form>
        <TextField
          id="task-name-input"
          label="Task name"
          variant="standard"
          value={taskName}
          onChange={handleNameChange}
          error={!!nameError}
          helperText={nameError}
          sx={{ mb: 2 }}
        />
        <Typography id="tags" sx={{ mt: 3 }}>
          Tags:
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
          {taskTags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => handleDeleteTagClick(tag)}
              sx={{ minHeight: 32, lineHeight: '24px' }}
            />
          ))}
        </Stack>
        <Stack
          direction="row"
          alignItems="flex-start"
          spacing={1}
          sx={{ mt: 2 }}
        >
          <TextField
            id="new-tag-input"
            label="Add new tag"
            variant="filled"
            value={newTag}
            onChange={handleNewTagChange}
            error={!!newTagError}
            helperText={newTagError}
            onKeyDown={handleEnterKeyDown}
          />
          <Button
            id="add-new-tag-button"
            variant="outlined"
            startIcon={<AddIcon />}
            color="primary"
            size="small"
            onClick={handleAddTagClick}
            disabled={!!newTagError || newTag.trim() === ''}
          >
            Add
          </Button>
        </Stack>
        {error && <Alert severity="error">{error}</Alert>}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          sx={{ mt: 4 }}
        >
          <Button
            id="save-button"
            type="button"
            variant="contained"
            startIcon={<SaveIcon />}
            color="success"
            onClick={handleSaveClick}
            disabled={!!nameError || taskName.trim() === '' || saving}
          >
            {saving ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
