import { useState } from "react";

export const usePagination = (initialPage: number, totalPages: number) => {
	const [page, setPage] = useState(initialPage);

	const nextPage = () => {
		if (page < totalPages) {
			setPage((prev) => prev + 1);
		}
	};

	const prevPage = () => {
		if (page > 1) {
			setPage((prev) => prev - 1);
		}
	};

	return {
		page,
		setPage,
		nextPage,
		prevPage,
	};
};
