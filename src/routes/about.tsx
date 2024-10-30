import { Container, Typography } from '@mui/material';

export default function About() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h3" sx={{ mt: 2, textAlign: 'center' }} gutterBottom>
        About this app
      </Typography>

      <Typography variant="h5" gutterBottom>
        Author
      </Typography>
      <Typography variant="body1" gutterBottom>
        This app was made by Dinh Le.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Instructions
      </Typography>
      <Typography variant="body1" gutterBottom>
        Use the navigation bar to navigate between pages.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Content Licensing
      </Typography>
      <Typography variant="body1" gutterBottom>
        The icons are a part of Material Icons library.
      </Typography>

      <Typography variant="h5" gutterBottom>
        AI Tool Usage
      </Typography>
      <Typography variant="body1" gutterBottom>
        ChatGPT and Copilot were used to assist with code suggestions for simple
        tasks (e.g. boilerplate code), and general problem-solving. However, all
        final decisions and code implementations were done by me, using official
        documentations.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Estimated Working Hours
      </Typography>
      <Typography variant="body1" gutterBottom>
        Approximately XX hours were spent working on this programming
        assignment.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Most Difficult Feature
      </Typography>
      <Typography variant="body1">
        The most difficult feature is the task editing form, because forms are
        always difficult with their multiple status toggle, error handling, and
        then HTTP requests on top afterward. The tag input that allows users to
        choose from existing tags was pretty tricky to do.
      </Typography>
    </Container>
  );
}
