import { useState } from "react";

type SortOption = "price_asc" | "price_desc" | "rating_desc";

export const useSort = (initialSort: SortOption) => {
	const [sort, setSort] = useState<SortOption>(initialSort);

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSort(e.target.value as SortOption);
	};

	return {
		sort,
		handleSortChange,
	};
};
