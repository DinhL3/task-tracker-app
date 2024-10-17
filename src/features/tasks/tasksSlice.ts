import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Task } from '../../models';

interface TaskState {
  tasks: Task[];
  task: Task | null;
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  task: null,
  loading: false,
  error: null,
};

// Async thunk to fetch all tasks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://127.0.0.1:3010/tasks');
      return response.data as Task[]; // Response is an array of tasks
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch tasks');
    }
  }
);

// Async thunk to fetch a task by ID
export const fetchTaskById = createAsyncThunk(
  'tasks/fetchTaskById',
  async (taskId: number, thunkAPI) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3010/tasks/${taskId}`);
      const taskArray = response.data as Task[]; // Response is an array containing one task
      if (taskArray.length > 0) {
        return taskArray[0]; // Return the first task in the array
      } else {
        return thunkAPI.rejectWithValue('Task not found');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch task');
    }
  }
);

// Async thunk to add a new task
export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (newTask: { name: string; tags: string }, thunkAPI) => {
    try {
      const response = await axios.post('http://127.0.0.1:3010/tasks', newTask);
      const taskId = response.data.id; // Backend response includes the task ID
      const addedTaskResponse = await axios.get(
        `http://127.0.0.1:3010/tasks/${taskId}`
      );
      return addedTaskResponse.data as Task; // Fetch and return the added task
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to add task');
    }
  }
);

// Async thunk to update a task
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (
    { id, name, tags }: { id: number; name: string; tags: string },
    thunkAPI
  ) => {
    try {
      await axios.put(`http://127.0.0.1:3010/tasks/${id}`, { name, tags });
      const updatedTaskResponse = await axios.get(
        `http://127.0.0.1:3010/tasks/${id}`
      );
      return updatedTaskResponse.data as Task; // Return the updated task after fetching it
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to update task');
    }
  }
);

// Async thunk to delete a task
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: number, thunkAPI) => {
    try {
      await axios.delete(`http://127.0.0.1:3010/tasks/${taskId}`);
      return taskId; // Return the ID of the deleted task
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to delete task');
    }
  }
);

// Tasks slice
export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload; // Set fetched tasks
      })
      .addCase(fetchTasks.rejected, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle fetch task by ID
      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTaskById.fulfilled,
        (state, action: PayloadAction<Task>) => {
          state.loading = false;
          const index = state.tasks.findIndex(
            (task) => task.id === action.payload.id
          );
          if (index === -1) {
            state.tasks.push(action.payload); // Add task if not already in state
          } else {
            state.tasks[index] = action.payload; // Update the task
          }
          state.task = action.payload;
        }
      )
      .addCase(
        fetchTaskById.rejected,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // Handle add task
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        state.tasks.push(action.payload); // Add the new task to state
      })
      .addCase(addTask.rejected, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle update task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload; // Update the task
        }
      })
      .addCase(updateTask.rejected, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle delete task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload); // Remove the deleted task from state
      })
      .addCase(deleteTask.rejected, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer
export default tasksSlice.reducer;
