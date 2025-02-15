function formatCurrency(currency: string): string {
	if (currency === "KZT") {
		return "₸";
	}
	return currency;
}

export { formatCurrency };
