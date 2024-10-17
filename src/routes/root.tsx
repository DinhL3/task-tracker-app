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
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

// Internal modules
import { centerContainerStyles } from '../styles';
import { RootState, AppDispatch } from '../app/store';
import {
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
} from '../features/tasks/tasksSlice';

export default function Root() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );

  useEffect(() => {
    dispatch(fetchTasks()); // Fetch tasks when the component loads
  }, [dispatch]);

  return (
    <>
      <Container maxWidth="sm" sx={centerContainerStyles}>
        <Typography variant="h3" gutterBottom>
          Your Tasks
        </Typography>
        <Button
          id="add-new-task-button"
          variant="contained"
          startIcon={<AddIcon />}
          color="primary"
        >
          Add new task
        </Button>
        <List aria-label="tasklist" sx={{ width: '100%' }}>
          {tasks.map((task) => (
            <React.Fragment key={task.id}>
              <ListItemButton component={Link} to={`/tasks/${task.id}`}>
                <ListItemText primary={task.name} />
              </ListItemButton>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Container>
    </>
  );
}
