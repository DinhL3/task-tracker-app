import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import {
  fetchTags,
  addTag,
  updateTag,
  deleteTag,
} from '../features/tags/tagsSlice';

import {
  Box,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { centerContainerStyles } from '../styles';

export default function Tags() {
  const dispatch = useDispatch<AppDispatch>();
  const { tags, loading, error } = useSelector(
    (state: RootState) => state.tags
  );

  const [newTag, setNewTag] = useState<string>('');
  const [editTagId, setEditTagId] = useState<string | null>(null);
  const [editTagName, setEditTagName] = useState<string>('');

  useEffect(() => {
    dispatch(fetchTags()); // Fetch tags when the component loads
  }, [dispatch]);

  return (
    <Container maxWidth="xs" sx={centerContainerStyles}>
      <Typography variant="h3" gutterBottom>
        Tags
      </Typography>
      <List sx={{ width: '100%' }}>
        {tags.map((tag) => (
          <>
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
          </>
        ))}
      </List>
    </Container>
  );
}
