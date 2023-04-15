import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../../ApiCalls/userApis";

const initialState = {
  user: {status:'idle',data:[]},
  darkMode:false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser:(state => state = initialState),
    setUser: (state, {payload}) => {
      state.user = payload;
    },
    setDarkMode: (state, {payload}) => {
      state.darkMode = payload;
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchUser.pending, (state) => {
      state.user.status = "loading";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user.status = "finished";
      
      state.user.data = action.payload;
      let mypayloadData = action.payload;
      state.darkMode = mypayloadData.user.darkMode
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.user.status = "error";
      state.user.data = [];
    });
  }
})

export const {
    clearUser,
    setUser,
    setDarkMode
} = userSlice.actions;

export const getLoggedInUser = (state) => state.user.user;

export const getDarkMode = (state) => state.user.darkMode;



export default userSlice.reducer;
