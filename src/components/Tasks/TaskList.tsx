import { List, ListItemButton, ListItemText, Divider } from '@mui/material';
import { Task } from '../../models/task.model';

interface TaskListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export default function TaskList({ tasks, onTaskClick }: TaskListProps) {
  return (
    <List aria-label="tasklist" sx={{ width: '100%' }}>
      {tasks.map((task) => (
        <div key={task.id}>
          <ListItemButton onClick={() => onTaskClick(task)}>
            <ListItemText primary={task.name} />
          </ListItemButton>
          <Divider />
        </div>
      ))}
    </List>
  );
}
