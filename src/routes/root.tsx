import { useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import TaskList from '../components/Tasks/TaskList';
import TaskModal from '../components/Tasks/TaskModal';
import DeleteConfirmModal from '../components/Tasks/DeleteConfirmModal';
import { Task } from '../models/task.model';
import { Add as AddIcon } from '@mui/icons-material';
import { centerContainerStyles } from '../styles';

export default function Root() {
  const presetTasks: Task[] = [
    {
      id: 1,
      name: 'Feed the cat',
      tags: ['chores', 'pets'],
      lastModifiedDate: '2024-09-16T12:00:00.000Z',
    },
    {
      id: 2,
      name: 'Buy groceries',
      tags: ['chores', 'food'],
      lastModifiedDate: '2024-08-01T06:00:00.000Z',
    },
    {
      id: 3,
      name: 'Do homework',
      tags: ['school', 'study'],
      lastModifiedDate: '2023-10-03T08:00:00.000Z',
    },
  ];

  const [tasks, setTasks] = useState<Task[]>(presetTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  const handleOpenModal = (task: Task | null) => {
    if (task) {
      setSelectedTask(task); // Edit existing task
    } else {
      setSelectedTask({
        id: tasks.length + 1, // Generate a new ID for new task
        name: '',
        tags: [],
        lastModifiedDate: new Date().toISOString(),
      }); // Create a new task template for adding
    }
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  const handleDeleteClick = () => {
    setOpenDeleteConfirm(true);
  };

  const handleDeleteTask = () => {
    if (selectedTask) {
      setTasks(tasks.filter((task) => task.id !== selectedTask.id));
      handleCloseModal();
      setOpenDeleteConfirm(false);
    }
  };

  // Logic to save the edits of existing task, or add a new task
  const handleSaveTask = (updatedTask: Task) => {
    setTasks((prevTasks) => {
      const taskExists = prevTasks.some((task) => task.id === updatedTask.id);

      if (taskExists) {
        // Update the existing task
        return prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
      } else {
        // Add a new task
        return [...prevTasks, updatedTask];
      }
    });
  };

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
          onClick={() => handleOpenModal(null)}
        >
          Add new task
        </Button>
        <TaskList tasks={tasks} onTaskClick={handleOpenModal} />
        <TaskModal
          selectedTask={selectedTask}
          onClose={handleCloseModal}
          onDeleteClick={handleDeleteClick}
          onSaveClick={handleSaveTask}
        />
        <DeleteConfirmModal
          open={openDeleteConfirm}
          onClose={() => setOpenDeleteConfirm(false)}
          onConfirmDelete={handleDeleteTask}
        />
      </Container>
    </>
  );
}
