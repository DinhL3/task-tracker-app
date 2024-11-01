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

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [reorderedTasks, setReorderedTasks] = useState(tasks);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchTags());
  }, [dispatch]);

  useEffect(() => {
    setReorderedTasks(tasks); // Update reorderedTasks whenever tasks are fetched or updated
  }, [tasks]);

  const filteredTasks = selectedTags.length
    ? reorderedTasks.filter((task) =>
        selectedTags.every((tagId) => task.tags.split(',').includes(tagId))
      )
    : reorderedTasks;

  const handleDragStart = (event: React.DragEvent, index: number) => {
    event.dataTransfer.setData('taskIndex', index.toString());
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent, index: number) => {
    const draggedIndex = Number(event.dataTransfer.getData('taskIndex'));
    if (draggedIndex === index) return;

    const updatedTasks = [...reorderedTasks];
    const [draggedTask] = updatedTasks.splice(draggedIndex, 1); // Remove dragged task
    updatedTasks.splice(index, 0, draggedTask); // Insert dragged task at new index
    setReorderedTasks(updatedTasks);
  };

  // Display error or loading states
  if (error) {
    return (
      <Container maxWidth="sm" sx={centerContainerStyles}>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="sm" sx={centerContainerStyles}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

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

      <Typography
        variant="caption"
        gutterBottom
        color="secondary"
        sx={{ mt: 2 }}
      >
        You can drag and drop the tasks to reorder (before filtering)
      </Typography>

      {filteredTasks.length > 0 ? (
        <List aria-label="tasklist" sx={{ width: '100%', mt: 2 }}>
          {filteredTasks.map((task, index) => (
            <React.Fragment key={task.id}>
              <ListItemButton
                component={Link}
                to={`/tasks/${task.id}`}
                draggable
                onDragStart={(event) => handleDragStart(event, index)}
                onDragOver={handleDragOver}
                onDrop={(event) => handleDrop(event, index)}
              >
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
