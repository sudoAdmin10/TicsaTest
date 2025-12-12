import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { PostModel, PostState, FormPostModel } from './types';
import * as api from '../services/api';

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
  selectedPost: null,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const res = await api.getPost();
    return res;
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData: FormPostModel) => {
    const res = await api.createPost(postData);
    return res;
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, data }: { id: number; data: FormPostModel }) => {
    const res = await api.updatePost(id, data);
    return res;
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id: number) => {
    await api.deletePost(id);
    return id;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<PostModel | null>) => {
      state.selectedPost = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar publicaciones';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(p => p.id !== action.payload);
      });
  },
});

export const { setSelectedPost, clearError } = postsSlice.actions;
export default postsSlice.reducer;