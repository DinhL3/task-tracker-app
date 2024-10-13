import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import { Task } from '../../models/task.model';
import { modalBoxStyle } from '../../styles';

import TagList from './TagList';
import TagInput from './TagInput';
import ActionButtons from './ActionButtons';

interface TaskModalProps {
  selectedTask: Task | null;
  onClose: () => void;
  onDeleteClick: () => void;
  onSaveClick: (task: Task) => void;
}

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

  // Store original task details for reverting on cancel
  const [originalTaskName, setOriginalTaskName] = useState<string>('');
  const [originalTags, setOriginalTags] = useState<string[]>([]);

  const [newTag, setNewTag] = useState<string>('');
  const [newTagError, setNewTagError] = useState<string>('');



  const handleEditClick = () => {
    // Save current state as original state when entering edit mode
    setOriginalTaskName(taskName);
    setOriginalTags(tags);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedTask = {
      ...selectedTask,
      name: taskName.trim(),
      tags,
    } as Task;
    onSaveClick(updatedTask); // Pass updated task to parent component
    setIsEditing(false); // Switch back to view mode without closing the modal
  };

  const handleCancelClick = () => {
    // Revert to original values when canceling
    setTaskName(originalTaskName);
    setTags(originalTags);
    setNewTag(''); // Reset new tag input
    setNewTagError(''); // Clear new tag error
    setIsEditing(false);
  };

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

  const handleDeleteTagClick = (tagToDelete: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  const handleAddTagClick = () => {
    if (!tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
      setNewTagError('');
    } else {
      setNewTagError('Tag already exists');
    }
  };

  const handleEnterKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAddTagClick();
  };

  // Reset form when selected task changes or modal is closed
  useEffect(() => {
    if (selectedTask) {
      setTaskName(selectedTask.name);
      setTags(selectedTask.tags);

      // Automatically go into edit mode if the task is new (name is empty),
      // Pretty simple solution, a more sophisticated one would be entering different mode depending on the button clicked in root
      if (selectedTask.name === '') {
        setIsEditing(true);
      } else {
        setIsEditing(false);
      }

      setNewTag(''); // Reset new tag input when modal is opened or closed
      setNewTagError(''); // Clear new tag error
    }
  }, [selectedTask]);

  return (
    <Modal open={Boolean(selectedTask)} onClose={onClose}>
      <Box sx={modalBoxStyle}>
        {/* View mode */}
        {!isEditing && (
          <>
            <Typography id="task-name" variant="h6">
              {taskName}
            </Typography>
            <Typography id="tags" sx={{ mt: 2 }}>
              Tags:
            </Typography>
            <TagList tags={tags} />
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              sx={{ mt: 2 }}
            >
              <Button
                variant="contained"
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
            <TagList tags={tags} onDelete={handleDeleteTagClick} />
            <TagInput
              newTag={newTag}
              newTagError={newTagError}
              onChange={handleNewTagChange}
              onAdd={handleAddTagClick}
              onEnterKey={handleEnterKeyDown}
            />
            <ActionButtons
              onSave={handleSaveClick}
              onDelete={onDeleteClick}
              onCancel={handleCancelClick}
              isSaveDisabled={!!nameError || taskName.trim() === ''}
            />
          </>
        )}
      </Box>
    </Modal>
  );
}
