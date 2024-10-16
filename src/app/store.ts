import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import tagsReducer from '../features/tags/tagsSlice';
import tasksReducer from '../features/tasks/tasksSlice';

// Define the store using TypeScript
const store = configureStore({
  reducer: {
    counter: counterReducer,
    tags: tagsReducer,
    tasks: tasksReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
