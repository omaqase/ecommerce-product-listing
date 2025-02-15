export const API_V1_BASE_URL =
	"https://ecommerce-product-listing-api.onrender.com/api/v1";

export const ENDPOINTS = {
	BOOKS: "/books",
	BOOKS_ID: (id: number) => `/books/${id}`,
} as const;
