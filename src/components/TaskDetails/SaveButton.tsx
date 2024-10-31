import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';

interface SaveButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
}

export default function SaveButton({
  onClick,
  loading,
  disabled,
}: SaveButtonProps) {
  return (
    <Button
      variant="contained"
      startIcon={<SaveIcon />}
      color="success"
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? <CircularProgress size={24} /> : 'Save'}
    </Button>
  );
}
