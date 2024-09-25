import { useState } from 'react';
import { Container, Typography } from '@mui/material';
import TaskList from '../components/Tasks/TaskList';
import TaskModal from '../components/Tasks/TaskModal';
import DeleteConfirmModal from '../components/Tasks/DeleteConfirmModal';
import { Task } from '../models/task.model';

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

  const handleOpenModal = (task: Task) => {
    setSelectedTask(task);
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

  // Save the updated task after editing
  const handleSaveTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    handleCloseModal();
  };

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 2 }}>
        <Typography variant="h3" gutterBottom>
          Your Tasks
        </Typography>
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
