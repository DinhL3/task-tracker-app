import { Container, Typography } from '@mui/material';
import { centerContainerStyles } from '../styles';

export default function TaskDetails() {
  <Container maxWidth="sm" sx={centerContainerStyles}>
    <Typography variant="h3" gutterBottom>
      Your Tasks
    </Typography>
  </Container>;
}
