// External libraries
import React, { useEffect } from 'react';
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
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

// Internal modules
import { centerContainerStyles } from '../styles';
import { RootState, AppDispatch } from '../app/store';
import { fetchTasks } from '../features/tasks/tasksSlice';

export default function Root() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );

  useEffect(() => {
    dispatch(fetchTasks()); // Fetch tasks when the component loads
  }, [dispatch]);

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

      {/* Task List */}
      {tasks.length > 0 ? (
        <List aria-label="tasklist" sx={{ width: '100%', mt: 2 }}>
          {tasks.map((task) => (
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
