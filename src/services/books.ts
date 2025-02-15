import { ENDPOINTS } from "./consts";
import { fetchApi } from "./api";
import type { BooksResponse } from "./types";

type GetBooksParams = {
	page?: number;
	limit?: number;
	search?: string;
	sort?: "price_asc" | "price_desc" | "rating_desc";
};

export const booksService = {
	getBooks: async (params: GetBooksParams = {}): Promise<BooksResponse> => {
		const searchParams = new URLSearchParams();

		if (params.page) searchParams.append("page", params.page.toString());
		if (params.limit) searchParams.append("limit", params.limit.toString());
		if (params.search) searchParams.append("search", params.search);
		if (params.sort) searchParams.append("sort", params.sort);

		const queryString = searchParams.toString();
		const endpoint = `${ENDPOINTS.BOOKS}${queryString ? `?${queryString}` : ""}`;

		return fetchApi<BooksResponse>(endpoint);
	},
};
