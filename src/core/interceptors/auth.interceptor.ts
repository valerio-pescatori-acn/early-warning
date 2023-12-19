/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const httpClient = axios.create({
	auth: {
		username: import.meta.env.VITE_AUTH_USER,
		password: import.meta.env.VITE_AUTH_PASSWORD,
	},
	params: {
		$format: "json",
	},
});

httpClient.interceptors.request.use((request) => {
	request.url = import.meta.env.VITE_API_URL + request.url;
	return request;
});

httpClient.interceptors.response.use((response) => response.data.d);
