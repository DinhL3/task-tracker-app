import { TextField, Button, Stack } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface TagInputProps {
  newTag: string;
  newTagError: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  onEnterKey: (e: React.KeyboardEvent) => void;
}

export default function TagInput({
  newTag,
  newTagError,
  onChange,
  onAdd,
  onEnterKey,
}: TagInputProps) {
  return (
    <Stack direction="row" alignItems="flex-start" spacing={1} sx={{ mt: 2 }}>
      <TextField
        id="new-tag-input"
        label="Add new tag"
        variant="filled"
        value={newTag}
        onChange={onChange}
        error={!!newTagError}
        helperText={newTagError}
        onKeyDown={onEnterKey}
      />
      <Button
        id="add-new-tag-button"
        variant="outlined"
        startIcon={<AddIcon />}
        color="primary"
        size="small"
        onClick={onAdd}
        disabled={!!newTagError || newTag.trim() === ''}
      >
        Add
      </Button>
    </Stack>
  );
}
