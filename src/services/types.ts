import type { Book } from "@/types/book";

type BooksResponse = {
	data: Book[];
	total: number;
	page: number;
	totalPages: number;
	limit: number;
};

export type { BooksResponse };
