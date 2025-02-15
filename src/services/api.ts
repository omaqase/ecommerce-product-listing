import { API_V1_BASE_URL } from "./consts";

class ApiError extends Error {
	constructor(
		public status: number,
		message: string,
	) {
		super(message);
		this.name = "ApiError";
	}
}

export async function fetchApi<T>(
	endpoint: string,
	options: RequestInit = {},
): Promise<T> {
	const response = await fetch(`${API_V1_BASE_URL}${endpoint}`, {
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
		...options,
	});

	if (!response.ok) {
		throw new ApiError(
			response.status,
			`API error: ${response.status} ${response.statusText}`,
		);
	}

	return response.json();
}
