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
  const [newTag, setNewTag] = useState('');

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
      tags,
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

  /* When modal is open, user can see the task details in "View mode".
Clicking on the edit button with switch to "Edit mode",
where each detail changes to an input field. */

  return (
    <Modal open={Boolean(selectedTask)} onClose={onClose}>
      <Box sx={modalBoxStyle}>
        {/* View mode */}
        {!isEditing && (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {selectedTask?.name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Tags:
            </Typography>
            <Stack direction="row" spacing={1}>
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
              id="task-name"
              label="Task name"
              variant="standard"
              value={taskName}
              onChange={handleNameChange}
              error={!!nameError}
              helperText={nameError}
            />
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              sx={{ mt: 2 }}
            >
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                color="success"
                onClick={handleSaveClick}
                disabled={!!nameError || taskName.trim() === ''}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                color="error"
                onClick={onDeleteClick}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
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
