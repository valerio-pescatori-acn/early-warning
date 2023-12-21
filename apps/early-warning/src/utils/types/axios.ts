export type ODataResponse<T> = {
	/** available only if `$inlinecount=allpages` is passed as a query parameter */
	__count?: number;
	results: T[];
};
