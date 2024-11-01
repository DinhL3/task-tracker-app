// External libraries
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Container,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Alert,
  CircularProgress,
  Box,
  Autocomplete,
  TextField,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

// Internal modules
import { centerContainerStyles } from '../styles';
import { RootState, AppDispatch } from '../app/store';
import { fetchTasks } from '../features/tasks/tasksSlice';
import { fetchTags } from '../features/tags/tagsSlice';

export default function Root() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );
  const { tags } = useSelector((state: RootState) => state.tags);

  // State to hold selected tags
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchTags());
  }, [dispatch]);

  // Filter tasks based on selected tags
  const filteredTasks = selectedTags.length
    ? tasks.filter((task) =>
        selectedTags.every((tagId) => task.tags.split(',').includes(tagId))
      )
    : tasks;

  // If there is an error, show only the error and nothing else
  if (error) {
    return (
      <Container maxWidth="sm" sx={centerContainerStyles}>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  // If loading, show the spinner
  if (loading) {
    return (
      <Container maxWidth="sm" sx={centerContainerStyles}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  // Once loaded, if no tasks are available, show a message
  return (
    <Container maxWidth="sm" sx={centerContainerStyles}>
      <Typography variant="h3" gutterBottom>
        Your Tasks
      </Typography>
      <Button
        id="add-new-task-button"
        variant="contained"
        startIcon={<AddIcon />}
        color="primary"
        component={Link}
        to={`/tasks/new`}
      >
        Add new task
      </Button>

      {/* Tag Filter */}
      <Autocomplete
        multiple
        id="tags-outlined"
        options={tags}
        getOptionLabel={(tag) => tag.name}
        onChange={(event, value) =>
          setSelectedTags(value.map((tag) => String(tag.id)))
        }
        filterSelectedOptions
        renderInput={(params) => (
          <TextField {...params} label="Filter by tags" placeholder="Tag" />
        )}
        sx={{ mt: 2, width: 1 }}
      />

      {/* Task List */}
      {filteredTasks.length > 0 ? (
        <List aria-label="tasklist" sx={{ width: '100%', mt: 2 }}>
          {filteredTasks.map((task) => (
            <React.Fragment key={task.id}>
              <ListItemButton component={Link} to={`/tasks/${task.id}`}>
                <ListItemText primary={task.name} />
              </ListItemButton>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Typography sx={{ mt: 2 }}>No tasks available.</Typography>
      )}
    </Container>
  );
}
