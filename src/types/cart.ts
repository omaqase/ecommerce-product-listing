import type { Book } from "./book";

type CartItem = Book & {
	quantity: number;
};

type Cart = {
	items: CartItem[];
	totalQuantity: number;
	totalPrice: number;
};

export type { CartItem, Cart };
