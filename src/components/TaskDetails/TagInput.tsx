import React, { useState } from 'react';
import { Stack, TextField, Chip, Autocomplete, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface TagInputProps {
  tags: string[];
  existingTags: string[];
  onAddTag: (tag: string) => void;
  onDeleteTag: (tag: string) => void;
  error: string;
}

export default function TagInput({
  tags,
  existingTags,
  onAddTag,
  onDeleteTag,
  error,
}: TagInputProps) {
  const [newTag, setNewTag] = useState('');

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onDelete={() => onDeleteTag(tag)}
            sx={{ minHeight: 32, lineHeight: '24px' }}
          />
        ))}
      </Stack>
      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
        <Autocomplete
          sx={{ width: 1 }}
          freeSolo
          options={existingTags
            .filter((name) => !tags.includes(name))
            .sort((a, b) => a.localeCompare(b))}
          inputValue={newTag}
          onInputChange={(event, newInputValue) => {
            setNewTag(newInputValue);
          }}
          onChange={(event, newValue) => {
            if (newValue && !tags.includes(newValue)) {
              onAddTag(newValue);
              setNewTag('');
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Type tag or choose"
              variant="filled"
              error={!!error}
              helperText={error}
            />
          )}
        />
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          color="primary"
          onClick={() => {
            if (newTag.trim() && !tags.includes(newTag.trim())) {
              onAddTag(newTag.trim());
              setNewTag('');
            }
          }}
          disabled={!newTag.trim()}
        >
          Add
        </Button>
      </Stack>
    </>
  );
}
