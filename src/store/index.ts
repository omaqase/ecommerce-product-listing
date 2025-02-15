import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import booksReducer from "./booksSlice";

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		books: booksReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
