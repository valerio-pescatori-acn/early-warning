export const loaderVariants = {
	start: { y: 0 },
	initial: { y: 1500 },
};

export const widgetVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

export const tableVariants = {
	hidden: { opacity: 0, y: 70 },
	visible: (custom: number) => ({ opacity: 1, y: 0, transition: { delay: 0.2 * custom, y: { duration: 0.5 } } }),
	// visible: (custom: number) => ({ opacity: 1, y: 0, transition: { delay: 0.2 * custom } }), // spring
};
