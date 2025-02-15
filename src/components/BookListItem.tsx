"use client";
import { formatCurrency } from "@/lib/utils";
import type { Book } from "@/types/book";
import Link from "next/link";
import { useState } from "react";
import { Modal } from "./Modal";

type BookListItemProps = {
	book: Book;
	onAddToCart: (book: Book) => void;
};

export const BookListItem = ({ book, onAddToCart }: BookListItemProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleAddToCart = () => {
		setIsModalOpen(true);
		onAddToCart(book);
		setTimeout(() => setIsModalOpen(false), 1000);
	};

	return (
		<>
			<div
				key={book.id}
				className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
			>
				<div className="relative aspect-[3/4] overflow-hidden">
					<img
						src={book.image}
						alt={book.title}
						className="object-cover group-hover:scale-105 transition-transform duration-300"
					/>
				</div>
				<div className="p-6">
					<div className="flex items-center justify-between mb-2">
						<Link
							href={`/books/${book.id}`}
							className="text-sm text-blue-600 font-medium"
						>
							{book.author}
						</Link>
						<span className="flex items-center text-yellow-500">
							★ {book.rating}
						</span>
					</div>
					<h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
						{book.title}
					</h2>
					<p className="text-gray-600 text-sm line-clamp-3 mb-4 min-h-[4.5rem]">
						{book.description}
					</p>
					<div className="flex items-center justify-between">
						<span className="text-2xl font-bold text-gray-900">
							{book.price.toLocaleString()} {formatCurrency(book.currency)}
						</span>
						<button
							type="button"
							onClick={handleAddToCart}
							className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
						>
							В корзину
						</button>
					</div>
				</div>
			</div>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Книга добавлена в корзину!"
				message={`"${book.title}" успешно добавлена в вашу корзину.`}
			/>
		</>
	);
};
