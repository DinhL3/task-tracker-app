import { Box, Typography, Modal, Stack, Button, Chip } from '@mui/material';
import { Task } from '../../models/task.model';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

interface TaskModalProps {
  selectedTask: Task | null;
  onClose: () => void;
  onDeleteClick: () => void;
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
}: TaskModalProps) {
  return (
    <Modal open={Boolean(selectedTask)} onClose={onClose}>
      <Box sx={modalBoxStyle}>
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
        <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ mt: 2 }}>
          <Button variant="contained" startIcon={<EditIcon />} color="info">
            Edit
          </Button>
          <Button variant="outlined" endIcon={<DeleteIcon />} color="error" onClick={onDeleteClick}>
            Delete
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
