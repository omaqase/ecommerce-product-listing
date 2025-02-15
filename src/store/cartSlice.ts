import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Cart, Book } from "@/types";

const initialState: Cart = {
	items: [],
	totalQuantity: 0,
	totalPrice: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<Book>) => {
			const item = action.payload;
			const existingItem = state.items.find((i) => i.id === item.id);

			if (existingItem) {
				existingItem.quantity += 1;
			} else {
				state.items.push({ ...item, quantity: 1 });
			}

			state.totalQuantity += 1;
			state.totalPrice += item.price;
		},
		removeItem: (state, action: PayloadAction<number>) => {
			const itemId = action.payload;
			const existingItem = state.items.find((i) => i.id === itemId);

			if (existingItem && existingItem.quantity > 0) {
				existingItem.quantity -= 1;
				state.totalQuantity -= 1;
				state.totalPrice -= existingItem.price;

				if (existingItem.quantity === 0) {
					state.items = state.items.filter((i) => i.id !== itemId);
				}
			}
		},
		clearCart: (state) => {
			state.items = [];
			state.totalQuantity = 0;
			state.totalPrice = 0;
		},
	},
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
