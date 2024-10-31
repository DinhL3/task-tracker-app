import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Chip,
  Container,
  Stack,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

import { RootState, AppDispatch } from '../app/store';
import { fetchTaskById } from '../features/tasks/tasksSlice';
import { fetchTags } from '../features/tags/tagsSlice';
import { centerContainerStyles } from '../styles';

export default function TaskDetails() {
  const { taskId } = useParams<{ taskId: string }>();
  const [taskTags, setTaskTags] = useState<string[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  const {
    task,
    loading: taskLoading,
    error: taskError,
  } = useSelector((state: RootState) => state.tasks);
  const {
    tags,
    loading: tagsLoading,
    error: tagsError,
  } = useSelector((state: RootState) => state.tags);

  // Fetch the task by ID and tags on component load
  useEffect(() => {
    if (taskId) {
      dispatch(fetchTaskById(Number(taskId)));
      dispatch(fetchTags());
    }
  }, [dispatch, taskId]);

  // Convert tag IDs to tag names
  useEffect(() => {
    if (task && tags.length > 0) {
      const tagIds = task.tags.split(',').map(Number); // Convert tag IDs to numbers
      const tagNames = tags
        .filter((tag) => tagIds.includes(tag.id)) // Filter tags that match the task's tag IDs
        .map((tag) => tag.name);
      setTaskTags(tagNames);
    }
  }, [task, tags]);

  return (
    <Container maxWidth="sm" sx={centerContainerStyles}>
      {/* Loading Spinner */}
      {(taskLoading || tagsLoading) && (
        <Stack alignItems="center" sx={{ mt: 4 }}>
          <CircularProgress />
        </Stack>
      )}

      {/* Error Handling */}
      {(taskError || tagsError) && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {taskError || tagsError}
        </Alert>
      )}

      {/* Task Details */}
      {task && (
        <>
          <Typography variant="h4">{task.name}</Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ flexWrap: 'wrap', rowGap: 1, mt: 2, alignItems: 'center' }}
          >
            <Typography variant="body1" sx={{ mr: 1 }}>
              Tags:
            </Typography>
            {taskTags.map((tagName, index) => (
              <Chip
                key={index}
                label={tagName}
                sx={{ minHeight: 32, lineHeight: '24px' }}
              />
            ))}
          </Stack>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            color="primary"
            sx={{ mt: 2 }}
            component={Link}
            to={`/tasks/${taskId}/edit`}
          >
            Edit task
          </Button>
        </>
      )}
    </Container>
  );
}
