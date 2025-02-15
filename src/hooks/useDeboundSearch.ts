import { useState, useEffect, useRef } from "react";

export const useDebouncedSearch = (initialValue: string, delay: number) => {
	const [searchTerm, setSearchTerm] = useState(initialValue);
	const [debouncedSearch, setDebouncedSearch] = useState(initialValue);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = setTimeout(() => {
			setDebouncedSearch(searchTerm);
		}, delay);

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [searchTerm, delay]);

	return {
		searchTerm,
		debouncedSearch,
		setSearchTerm,
	};
};
