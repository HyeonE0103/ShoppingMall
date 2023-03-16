import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "Lee", age: 25 },
  reducers: {
    changeName(state) {
      state.name = "park";
    },
    increase(state, a) {
      state.age = state.age + a.payload;
    },
  },
});

export let { changeName, increase } = user.actions;

export default user;
