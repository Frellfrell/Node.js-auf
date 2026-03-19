import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/todos";

// Async actions
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  const res = await axios.post(API_URL, todo);
  return res.data;
});

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, todo }) => {
    const res = await axios.put(`${API_URL}/${id}`, todo);
    return res.data;
  },
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// Slice
const notesSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (_, action) => action.payload)
      .addCase(addTodo.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.findIndex((n) => n.id === action.payload._id);
        if (index !== -1) state[index] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) =>
        state.filter((n) => n._id !== action.payload),
      );
  },
});

export const store = configureStore({
  reducer: {
    notes: notesSlice.reducer,
  },
});
