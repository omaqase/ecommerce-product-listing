import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Book } from "@/types/book";
import type { BooksResponse } from "@/services/types";
import { booksService } from "@/services/books";

interface BooksState {
	items: Book[];
	total: number;
	totalPages: number;
	currentPage: number;
	isLoading: boolean;
	error: string | null;
}

const initialState: BooksState = {
	items: [],
	total: 0,
	totalPages: 0,
	currentPage: 1,
	isLoading: false,
	error: null,
};

export const fetchBooks = createAsyncThunk<
	BooksResponse,
	| {
			page?: number;
			limit?: number;
			search?: string;
			sort?: "price_asc" | "price_desc" | "rating_desc";
	  }
	| undefined
>("books/fetchBooks", async (params) => {
	return await booksService.getBooks(params || {});
});

const booksSlice = createSlice({
	name: "books",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBooks.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchBooks.fulfilled, (state, action) => {
				state.isLoading = false;
				state.items = action.payload.data;
				state.total = action.payload.total;
				state.totalPages = action.payload.totalPages;
				state.currentPage = action.payload.page;
			})
			.addCase(fetchBooks.rejected, (state, action) => {
				state.isLoading = false;
				state.error =
					action.error.message || "Произошла ошибка при загрузке книг";
			});
	},
});

export default booksSlice.reducer;
