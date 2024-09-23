import { useState } from 'react';

import {
  Container,
  Button,
  Typography,
  ListItemButton,
  ListItemText,
  List,
  Divider,
  Modal,
  Box,
  Stack,
  Chip,
} from '@mui/material';

import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

import { Task } from '../models/task.model';

const modalBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 400 },
  bgcolor: 'background.paper',
  p: 4,
};

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
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); // Track selected task
  const [openDeleteConfirmChildModal, setOpenDeleteConfirmChildModal] = useState(false);

  const handleOpenModal = (task: Task) => {
    setSelectedTask(task); // Set the clicked task as the selected task
  };

  const handleCloseModal = () => {
    setSelectedTask(null); // Close modal by setting selected task to null
  };

  const handleDeleteTask = () => {
    if (selectedTask) {
      setTasks(tasks.filter((task) => task.id !== selectedTask.id));
      handleCloseModal();
      setOpenDeleteConfirmChildModal(false);
    }
  };

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 2 }}>
        <Typography variant="h3" gutterBottom>
          Your Tasks
        </Typography>
        <List aria-label="tasklist">
          {tasks.map((task) => (
            <>
              <ListItemButton
                key={task.id}
                onClick={() => handleOpenModal(task)}
              >
                <ListItemText primary={task.name} />
              </ListItemButton>
              {/* Clicking on a task open a modal to edit the task */}
              <Modal
                open={Boolean(selectedTask)}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={modalBoxStyle}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    {selectedTask?.name}
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Tags:
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {selectedTask?.tags.map((tag) => (
                      <Chip label={tag} />
                    ))}
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                    sx={{ mt: 2 }}
                  >
                    <Button variant="contained" startIcon={<EditIcon />} color="info">
                      Edit
                    </Button>
                    <Button variant="outlined" endIcon={<DeleteIcon />} color="error" onClick={() => setOpenDeleteConfirmChildModal(true)}>
                      Delete
                    </Button>
                  </Stack>
                </Box>
              </Modal>

              {/* Delete confirmation modal */}
              <Modal
                open={openDeleteConfirmChildModal}
                onClose={() => setOpenDeleteConfirmChildModal(false)} // Close only delete confirm modal
                aria-labelledby="delete-confirm-title"
                aria-describedby="delete-confirm-description"
              >
                <Box sx={modalBoxStyle}>
                  <Typography
                    id="delete-confirm-title"
                    variant="h6"
                    component="h5"
                  >
                    Are you sure you want to delete this task?
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="flex-end"
                    sx={{ mt: 2 }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleDeleteTask} // Delete the task and close all modals
                    >
                      Yes
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setOpenDeleteConfirmChildModal(false)} // Close delete confirm modal
                    >
                      No
                    </Button>
                  </Stack>
                </Box>
              </Modal>
              <Divider />
            </>
          ))}
        </List>
      </Container>
    </>
  );
}
