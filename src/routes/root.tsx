import { Container, Button, Typography } from '@mui/material';

function Root() {
  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h1" gutterBottom>
          Hello World
        </Typography>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Container>
    </>
  );
}

export default Root;
