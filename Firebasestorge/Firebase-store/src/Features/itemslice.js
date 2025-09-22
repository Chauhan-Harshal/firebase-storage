
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createItem, fetchItems, updateItem, deleteItem } from "./itemsAPI";

// CREATE
export const createItemAsync = createAsyncThunk("items/createItem", async (itemData) => {
  return await createItem(itemData);
});

// READ
export const fetchItemsAsync = createAsyncThunk("items/fetchItems", async () => {
  return await fetchItems();
});

// UPDATE
export const updateItemAsync = createAsyncThunk("items/updateItem", async (updateObj) => {
  return await updateItem(updateObj);
});

// DELETE
export const deleteItemAsync = createAsyncThunk("items/deleteItem", async (id) => {
  return await deleteItem(id);
});

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchItemsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItemsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItemsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // CREATE
      .addCase(createItemAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // UPDATE
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default itemsSlice.reducer;
