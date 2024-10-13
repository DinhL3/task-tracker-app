import { Container, Typography } from '@mui/material';
import ReduxCounter from '../components/ReduxDummy/ReduxCounter';

export default function Tags() {
  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Typography variant="h3" gutterBottom>
        Tags
      </Typography>
      <ReduxCounter />
    </Container>
  );
}
