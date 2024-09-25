import { Box, Typography, Modal, Stack, Button } from '@mui/material';
import { modalBoxStyle } from '../../styles';

interface DeleteConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
}


export default function DeleteConfirmModal({
  open,
  onClose,
  onConfirmDelete,
}: DeleteConfirmModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalBoxStyle}>
        <Typography id="delete-confirm-title" variant="h6" component="h2">
          Are you sure you want to delete this task?
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          sx={{ mt: 2 }}
        >
          <Button variant="contained" color="error" onClick={onConfirmDelete}>
            Yes
          </Button>
          <Button variant="outlined" onClick={onClose}>
            No
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
