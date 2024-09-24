import { Box, Typography, Modal, Stack, Button } from '@mui/material';

interface DeleteConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
}

const modalBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '80%', sm: 300 },
  bgcolor: 'background.paper',
  p: 4,
};

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
