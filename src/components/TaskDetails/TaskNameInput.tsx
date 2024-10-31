import React from 'react';
import { TextField } from '@mui/material';

interface TaskNameInputProps {
  value: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TaskNameInput({
  value,
  error,
  onChange,
}: TaskNameInputProps) {
  return (
    <TextField
      id="task-name-input"
      label="Task name"
      variant="standard"
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error}
      sx={{ mb: 2, width: '100%' }}
    />
  );
}
