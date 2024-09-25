import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Modal,
  Stack,
  Button,
  Chip,
  TextField,
} from '@mui/material';
import { Task } from '../../models/task.model';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  Add as AddIcon,
} from '@mui/icons-material';

interface TaskModalProps {
  selectedTask: Task | null;
  onClose: () => void;
  onDeleteClick: () => void;
  onSaveClick: (task: Task) => void;
}

const modalBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 400 },
  bgcolor: 'background.paper',
  p: 4,
};

export default function TaskModal({
  selectedTask,
  onClose,
  onDeleteClick,
  onSaveClick,
}: TaskModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(selectedTask?.name || '');
  const [nameError, setNameError] = useState<string>('');
  const [tags, setTags] = useState<string[]>(selectedTask?.tags || []);
  const [newTag, setNewTag] = useState<string>('');
  const [newTagError, setNewTagError] = useState<string>('');

  // This is neccessary to reset the form when the selected task changes (e.g. when closing modal during edit mode)
  useEffect(() => {
    if (selectedTask) {
      setTaskName(selectedTask.name);
      setTags(selectedTask.tags);
      setIsEditing(false); // Reset to view mode when task changes
    }
  }, [selectedTask]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // CLicking save button will save the new details of the task, and switch back to "View mode".
    const updatedTask = {
      ...selectedTask,
      name: taskName.trim(),
      tags: tags,
    } as Task;
    onSaveClick(updatedTask);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInput = e.target.value;
    setTaskName(nameInput);

    if (nameInput.trim() === '') {
      setNameError('Name is required');
    } else {
      setNameError('');
    }
  };

  const handleNewTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTagInput = e.target.value;
    const validTagRegex = /^[a-zA-Z\s]+$/;

    if (newTagInput === '' || validTagRegex.test(newTagInput)) {
      setNewTag(newTagInput);
      setNewTagError('');
    } else {
      setNewTagError('Tags can only contain letters');
    }
  };

  const handleDeleteTagClick = (tagToDelete: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  const handleAddTagClick = () => {
    if (tags.includes(newTag.trim())) {
      setNewTagError('Tag already exists');
      return;
    }

    setTags((prevTags) => [...prevTags, newTag.trim()]); // Add the new tag to the tags array
    setNewTag(''); // Clear the input field after adding the tag
    setNewTagError(''); // Clear any previous error
  };

  const handleEnterKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTagClick();
    }
  };

  /* When modal is open, user can see the task details in "View mode".
Clicking on the edit button with switch to "Edit mode",
where each detail changes to an input field. */

  return (
    <Modal open={Boolean(selectedTask)} onClose={onClose}>
      <Box sx={modalBoxStyle}>
        {/* View mode */}
        {!isEditing && (
          <>
            <Typography id="task-name" variant="h6" component="h2">
              {selectedTask?.name}
            </Typography>
            <Typography id="tags" sx={{ mt: 2 }}>
              Tags:
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', rowGap: 1 }}>
              {selectedTask?.tags.map((tag) => (
                <Chip key={tag} label={tag} />
              ))}
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              sx={{ mt: 2 }}
            >
              <Button
                id="edit-button"
                variant="contained"
                startIcon={<EditIcon />}
                color="info"
                onClick={handleEditClick}
              >
                Edit
              </Button>
            </Stack>
          </>
        )}

        {/* Edit mode */}
        {isEditing && (
          <>
            <TextField
              id="task-name-input"
              label="Task name"
              variant="standard"
              value={taskName}
              onChange={handleNameChange}
              error={!!nameError}
              helperText={nameError}
            />
            <Typography id="tags" sx={{ mt: 3 }}>
              Tags:
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', rowGap: 1 }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleDeleteTagClick(tag)}
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
            {/* Bottom row buttons */}
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              sx={{ mt: 4 }}
            >
              <Button
                id="save-button"
                variant="contained"
                startIcon={<SaveIcon />}
                color="success"
                size="small"
                onClick={handleSaveClick}
                disabled={!!nameError || taskName.trim() === ''}
              >
                Save
              </Button>
              <Button
                id="delete-button"
                variant="outlined"
                size="small"
                startIcon={<DeleteIcon />}
                color="error"
                onClick={onDeleteClick}
              >
                Delete
              </Button>
              <Button
                id="cancel-button"
                variant="outlined"
                size="small"
                startIcon={<CloseIcon />}
                onClick={handleCancelClick}
              >
                Cancel
              </Button>
            </Stack>
          </>
        )}
      </Box>
    </Modal>
  );
}
