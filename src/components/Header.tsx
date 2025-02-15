"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import Link from "next/link";

export const Header = () => {
	const { totalQuantity, totalPrice } = useSelector(
		(state: RootState) => state.cart,
	);

	return (
		<header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
				<Link href="/" className="text-xl font-bold text-gray-900">
					Книжный магазин
				</Link>
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2">
						<span className="text-gray-600">Товаров: {totalQuantity}</span>
						<span className="text-gray-900 font-bold">
							{totalPrice.toLocaleString()} KZT
						</span>
					</div>
					<Link
						href="/cart"
						className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
					>
						Корзина
					</Link>
				</div>
			</div>
		</header>
	);
};
