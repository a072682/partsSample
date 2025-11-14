import { configureStore } from "@reduxjs/toolkit";
import dataReducer from './slice/dataSlice';


export const store = configureStore({
    reducer: { // 必要加入 reducer
        data: dataReducer,// todo 是todoSlice.reducer的名稱而todoReducer名稱需要相同
      }
});
export default configureStore;

