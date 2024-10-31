import { Stack, Button } from '@mui/material';
import {
  Save as SaveIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

interface ActionButtonsProps {
  onSave: () => void;
  onDelete: () => void;
  onCancel: () => void;
  isSaveDisabled: boolean;
}

export default function ActionButtons({
  onSave,
  onDelete,
  onCancel,
  isSaveDisabled,
}: ActionButtonsProps) {
  return (
    <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
      <Button
        id="save-button"
        variant="contained"
        startIcon={<SaveIcon />}
        color="success"
        size="small"
        onClick={onSave}
        disabled={isSaveDisabled}
      >
        Save
      </Button>
      <Button
        id="delete-button"
        variant="outlined"
        size="small"
        startIcon={<DeleteIcon />}
        color="error"
        onClick={onDelete}
      >
        Delete
      </Button>
      <Button
        id="cancel-button"
        variant="outlined"
        size="small"
        startIcon={<CloseIcon />}
        onClick={onCancel}
      >
        Cancel
      </Button>
    </Stack>
  );
}
