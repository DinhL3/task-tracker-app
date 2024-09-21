import { useState } from 'react';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import './App.css';
import ResponsiveAppBar from './components/NavBar/ResponsiveAppBar';

function App() {
  return (
    <>
      <ResponsiveAppBar />
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

export default App;
