import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {};
export const logIn = createAsyncThunk(
    "logIn",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post("//user/logIn", data, {
                withCredentials: true,
            });
            localStorage.setItem("cookie", res.data.token.accessToken);
            const COOKIE = localStorage.getItem("cookie");
            console.log(COOKIE);
        } catch (error: any) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: {},
});

export const userSliceActions = userSlice.actions;
export default userSlice.reducer;
