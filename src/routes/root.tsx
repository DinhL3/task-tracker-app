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
} from '@mui/material';
import { Task } from '../models/task.model';

function Root() {
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

  const handleOpenModal = (task: Task) => {
    setSelectedTask(task); // Set the clicked task as the selected task
  };

  const handleCloseModal = () => {
    setSelectedTask(null); // Close modal by setting selected task to null
  };

  const modalBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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
              <ListItemButton key={task.id} onClick={() => handleOpenModal(task)}>
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
                    Tags: {selectedTask?.tags.join(', ')}
                  </Typography>
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

export default Root;
