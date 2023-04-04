import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

// reset Password

export const resetPasswordAction = createAsyncThunk(
  "password/reset-password",
  async (password, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.put(
        `/api/reset-password?token=${password?.token}`,
        {
          password: password?.password,
        },
        config
      );

      console.log(data);

      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

const usersSlices = createSlice({
  name: "users",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(resetPasswordAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(resetPasswordAction.fulfilled, (state, action) => {
      state.loading = false;
      state.resetPassword = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(resetPasswordAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});


export default usersSlices.reducer;