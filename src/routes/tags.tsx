// External libraries
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

// Internal modules
import { RootState, AppDispatch } from '../app/store';
import {
  fetchTags,
  addTag,
  updateTag,
  deleteTag,
} from '../features/tags/tagsSlice';
import { centerContainerStyles } from '../styles';

export default function Tags() {
  const dispatch = useDispatch<AppDispatch>();
  const { tags, loading, error } = useSelector(
    (state: RootState) => state.tags
  );

  const [newTag, setNewTag] = useState<string>('');
  const [editTagId, setEditTagId] = useState<number | null>(null);
  const [editTagName, setEditTagName] = useState<string>('');

  useEffect(() => {
    dispatch(fetchTags()); // Fetch tags when the component loads
  }, [dispatch]);

  return (
    <Container maxWidth="xs" sx={centerContainerStyles}>
      {/* Loading Spinner */}
      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {/* Tags List */}
      {!loading && !error && (
        <>
          <Typography variant="h3" gutterBottom>
            Tags
          </Typography>
          <List sx={{ width: '100%' }}>
            {tags.map((tag) => (
              <React.Fragment key={tag.id}>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={tag.name} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </>
      )}
    </Container>
  );
}
