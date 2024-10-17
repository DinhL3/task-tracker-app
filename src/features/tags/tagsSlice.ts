import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Tag } from '../../models';

interface TagsState {
  tags: Tag[];
  loading: boolean;
  error: string | null;
}

// Define an error type for rejected actions
interface ErrorPayload {
  error: string;
}

// Initial state for the tags feature
const initialState: TagsState = {
  tags: [],
  loading: false,
  error: null,
};

// Async thunk to fetch all tags
export const fetchTags = createAsyncThunk<
  Tag[],
  void,
  { rejectValue: ErrorPayload }
>('tags/fetchTags', async (_, thunkAPI) => {
  try {
    const response = await axios.get('http://127.0.0.1:3010/tags');
    return response.data; // Assuming the response contains an array of tags
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue({
        error: error.response.data.error || 'Failed to fetch tags',
      });
    }
    return thunkAPI.rejectWithValue({ error: 'Failed to fetch tags' });
  }
});

// Async thunk to add a new tag
export const addTag = createAsyncThunk<
  Tag,
  string,
  { rejectValue: ErrorPayload }
>('tags/addTag', async (tagName, thunkAPI) => {
  try {
    const response = await axios.post('http://127.0.0.1:3010/tags', {
      name: tagName, // Backend expects 'name' in POST body
    });
    return response.data; // The backend returns the newly created tag with id
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue({
        error: error.response.data.error || 'Failed to add tag',
      });
    }
    return thunkAPI.rejectWithValue({ error: 'Failed to add tag' });
  }
});

// Async thunk to update a tag
export const updateTag = createAsyncThunk<
  Tag,
  { id: number; name: string },
  { rejectValue: ErrorPayload }
>('tags/updateTag', async ({ id, name }, thunkAPI) => {
  try {
    const response = await axios.put(`http://127.0.0.1:3010/tags/${id}`, {
      name, // Backend expects 'name' to be updated
    });
    return response.data; // Backend responds with the updated tag
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue({
        error: error.response.data.error || 'Failed to update tag',
      });
    }
    return thunkAPI.rejectWithValue({ error: 'Failed to update tag' });
  }
});

// Async thunk to delete a tag
export const deleteTag = createAsyncThunk<
  { id: number },
  number,
  { rejectValue: ErrorPayload }
>('tags/deleteTag', async (id, thunkAPI) => {
  try {
    await axios.delete(`http://127.0.0.1:3010/tags/${id}`);
    return { id }; // Return the ID of the deleted tag
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue({
        error: error.response.data.error || 'Failed to delete tag',
      });
    }
    return thunkAPI.rejectWithValue({ error: 'Failed to delete tag' });
  }
});

// Tags slice
export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetch tags
      .addCase(fetchTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action: PayloadAction<Tag[]>) => {
        state.loading = false;
        state.tags = action.payload; // Set the fetched tags in the state
      })
      .addCase(
        fetchTags.rejected,
        (state, action: PayloadAction<ErrorPayload | undefined>) => {
          state.loading = false;
          state.error = action.payload?.error || null;
        }
      )

      // Handle add tag
      .addCase(addTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTag.fulfilled, (state, action: PayloadAction<Tag>) => {
        state.loading = false;
        state.tags.push(action.payload); // Add the new tag to the state
      })
      .addCase(
        addTag.rejected,
        (state, action: PayloadAction<ErrorPayload | undefined>) => {
          state.loading = false;
          state.error = action.payload?.error || null;
        }
      )

      // Handle update tag
      .addCase(updateTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTag.fulfilled, (state, action: PayloadAction<Tag>) => {
        state.loading = false;
        const index = state.tags.findIndex(
          (tag) => tag.id === action.payload.id
        );
        if (index !== -1) {
          state.tags[index] = action.payload; // Update the tag in the state
        }
      })
      .addCase(
        updateTag.rejected,
        (state, action: PayloadAction<ErrorPayload | undefined>) => {
          state.loading = false;
          state.error = action.payload?.error || null;
        }
      )

      // Handle delete tag
      .addCase(deleteTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteTag.fulfilled,
        (state, action: PayloadAction<{ id: number }>) => {
          state.loading = false;
          state.tags = state.tags.filter((tag) => tag.id !== action.payload.id); // Remove the deleted tag from state
        }
      )
      .addCase(
        deleteTag.rejected,
        (state, action: PayloadAction<ErrorPayload | undefined>) => {
          state.loading = false;
          state.error = action.payload?.error || null;
        }
      );
  },
});

// Export the reducer
export default tagsSlice.reducer;
