import { createSlice } from "@reduxjs/toolkit";

let stock = createSlice({
  name: "stock",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    increase(state, action) {
      let num = state.findIndex((x) => {
        return x.id == action.payload;
      });
      state[num].count++;
    },
    order(state, action) {
      let num = -1;
      num = state.findIndex((x) => {
        return x.id == action.payload.id;
      });

      if (num == -1) {
        state.push({
          id: action.payload.id,
          name: action.payload.title,
          count: 1,
        });
      } else {
        state[num].count++;
      }
    },
    remove(state, action) {
      let num = state.findIndex((x) => {
        return x.id == action.payload;
      });
      state.splice(num, 1);
    },
  },
});

export let { increase, order, remove } = stock.actions;

export default stock;
