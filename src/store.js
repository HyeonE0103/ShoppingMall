import { configureStore} from "@reduxjs/toolkit";
import stock from "./store/stockSlice";
import user from "./store/userSlice";


export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
  },
});
