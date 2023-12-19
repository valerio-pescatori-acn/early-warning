/* eslint-disable @typescript-eslint/no-explicit-any */
export const useDebounceCallback = (delay: number, fn: (...args: any[]) => void) => {
	let timeoutId: number | null = null;
	return (...args: unknown[]) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => fn(...args), delay);
	};
};
