// src/redux/slices/apiSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Function to configure Axios with Authorization header
const axiosInstance = (token) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
  
    return axios.create({
      // eslint-disable-next-line no-undef
      baseURL: "https://jsonplaceholder.typicode.com/",  
    //   baseURL: process.env.VITE_API_BASE_URL,  
      headers,
    });
  };
  

// GET request with token
export const fetchData = createAsyncThunk('api/fetchData', async ({ url }, { getState }) => {
  const { auth } = getState();
  console.log(url,axiosInstance);
  const response = await axiosInstance(auth.token).get(url);
  console.log(response);
  return response.data;
});

// POST request with token
export const postData = createAsyncThunk('api/postData', async ({ url, newData }, { getState }) => {
  const { auth } = getState();
  const response = await axiosInstance(auth.token).post(url, newData);
  return response.data;
});

// PUT request with token
export const updateData = createAsyncThunk('api/updateData', async ({ url, updatedData }, { getState }) => {
  const { auth } = getState();
  const response = await axiosInstance(auth.token).put(url, updatedData);
  return response.data;
});

// DELETE request with token
export const deleteData = createAsyncThunk('api/deleteData', async ({ url }, { getState }) => {
  const { auth } = getState();
  await axiosInstance(auth.token).delete(url);
  return url;
});

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // GET
    builder.addCase(fetchData.pending, (state) => {
      console.log('pending');
      state.status = 'loading';
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      console.log('ws');

      state.status = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    // POST
    builder.addCase(postData.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });

    // PUT
    builder.addCase(updateData.fulfilled, (state, action) => {
      const index = state.data.findIndex(item => item.id === action.payload.id);
      state.data[index] = action.payload;
    });

    // DELETE
    builder.addCase(deleteData.fulfilled, (state, action) => {
      state.data = state.data.filter(item => item.url !== action.payload);
    });
  },
});

export default apiSlice.reducer;