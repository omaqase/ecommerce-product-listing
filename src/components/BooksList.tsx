"use client";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { fetchBooks } from "@/store/booksSlice";
import { addItem } from "@/store/cartSlice";
import { BookListItem } from "./BookListItem";
import { useDebouncedSearch } from "@/hooks/useDeboundSearch";
import { usePagination } from "@/hooks/usePagination";
import { useSort } from "@/hooks/useSort";
import type { Book } from "@/types/book";
import { useEffect } from "react";

const DEBOUNCE_DELAY = 800;

const ITEMS_PER_PAGE = 9;

export const BooksList = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { items, isLoading, error, totalPages } = useSelector(
		(state: RootState) => state.books,
	);

	const { searchTerm, debouncedSearch, setSearchTerm } = useDebouncedSearch(
		"",
		DEBOUNCE_DELAY,
	);
	const { page, nextPage, prevPage } = usePagination(
		1,
		totalPages || 1,
	);
	const { sort, handleSortChange } = useSort("rating_desc");

	useEffect(() => {
		dispatch(
			fetchBooks({
				page,
				limit: ITEMS_PER_PAGE,
				search: debouncedSearch,
				sort,
			}),
		);
	}, [dispatch, page, sort, debouncedSearch]);

	const handleAddToCart = (book: Book) => {
		dispatch(addItem(book));
	};

	if (isLoading)
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500" />
			</div>
		);

	if (error)
		return (
			<div className="min-h-screen flex items-center justify-center text-red-500">
				Ошибка: {error}
			</div>
		);

	if (!items)
		return (
			<div className="min-h-screen flex items-center justify-center">
				Нет данных
			</div>
		);

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
			<form
				onSubmit={(e) => e.preventDefault()}
				className="mb-8 flex flex-col sm:flex-row gap-4 items-center"
			>
				<input
					type="text"
					placeholder="Поиск книг..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<select
					value={sort}
					onChange={handleSortChange}
					className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="rating_desc">По рейтингу</option>
					<option value="price_asc">Сначала дешевые</option>
					<option value="price_desc">Сначала дорогие</option>
				</select>
			</form>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{items.map((book) => (
					<BookListItem
						key={book.id}
						book={book}
						onAddToCart={handleAddToCart}
					/>
				))}
			</div>
			<div className="flex justify-center items-center gap-6 mt-12">
				<button
					type="button"
					onClick={prevPage}
					disabled={page === 1}
					className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 
                             hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed 
                             transition-all duration-200 flex items-center gap-2 cursor-pointer"
				>
					← Назад
				</button>
				<span className="text-lg font-medium text-gray-700">
					{page} из {totalPages}
				</span>
				<button
					type="button"
					onClick={nextPage}
					disabled={page === totalPages}
					className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 
                             hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed 
                             transition-all duration-200 flex items-center gap-2 cursor-pointer"
				>
					Вперед →
				</button>
			</div>
		</div>
	);
};
