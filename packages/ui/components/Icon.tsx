import React, { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & {
	className?: string;
	/** the name of the color from the tailwind theme */
	color?: string;
};

const highRisk: React.FC<IconProps> = ({ className = "inline", color = "red-bar", ...props }: IconProps) => (
	<svg
		{...props}
		className={className}
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M10.5858 5.41421C11.3668 4.63316 12.6332 4.63317 13.4142 5.41421L18.5858 10.5858C19.3668 11.3668 19.3668 12.6332 18.5858 13.4142L13.4142 18.5858C12.6332 19.3668 11.3668 19.3668 10.5858 18.5858L5.41421 13.4142C4.63316 12.6332 4.63317 11.3668 5.41421 10.5858L10.5858 5.41421Z"
			fill={`rgb(var(--${color}))`}
			stroke="white"
		/>
	</svg>
);

const mediumRisk: React.FC<IconProps> = ({ className = "inline", color = "yellow-bar", ...props }: IconProps) => (
	<svg
		{...props}
		className={className}
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M19.3018 17.0118L13.664 7.09132C12.8934 5.73538 10.9363 5.744 10.1777 7.10668L4.65497 17.0272C3.91284 18.3603 4.87669 20 6.40243 20H17.563C19.0965 20 20.0595 18.3451 19.3018 17.0118Z"
			fill={`rgb(var(--${color}))`}
			stroke="white"
		/>
	</svg>
);

const noRisk: React.FC<IconProps> = ({ className = "inline", color = "green-bar", ...props }: IconProps) => (
	<svg
		{...props}
		className={className}
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect x="4" y="4" width="16" height="16" rx="8" fill={`rgb(var(--${color}))`} stroke="white" />
	</svg>
);

const listItems: React.FC<IconProps> = ({ className = "inline", color = "primary-2", ...props }: IconProps) => (
	<svg
		{...props}
		className={className}
		width="40"
		height="40"
		viewBox="0 0 40 40"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M10.2573 12.7558C10.4523 12.5607 10.726 12.4659 11 12.4985C11.2739 12.4659 11.5476 12.5607 11.7427 12.7558C11.9377 12.9509 12.0325 13.2246 12 13.4985C12.0325 13.7724 11.9377 14.0461 11.7427 14.2412C11.5476 14.4362 11.2739 14.5311 11 14.4985C10.726 14.5311 10.4523 14.4362 10.2573 14.2412C10.0622 14.0461 9.96738 13.7724 9.99996 13.4985C9.96738 13.2246 10.0622 12.9509 10.2573 12.7558ZM11.7427 20.7412C11.9377 20.5461 12.0325 20.2724 12 19.9985C12.0325 19.7246 11.9377 19.4509 11.7427 19.2558C11.5476 19.0607 11.2739 18.9659 11 18.9985C10.4477 18.9985 9.99996 19.4462 9.99996 19.9985C9.99996 20.5508 10.4477 20.9985 11 20.9985C11.2739 21.0311 11.5476 20.9362 11.7427 20.7412ZM11 25.4985C10.4477 25.4985 9.99996 25.9462 9.99996 26.4985C9.99996 27.0508 10.4477 27.4985 11 27.4985C11.5522 27.4985 12 27.0508 12 26.4985C12 25.9462 11.5522 25.4985 11 25.4985ZM14 13.9985V12.9985H30V13.9985H14ZM14 20.4985H30V19.4985H14V20.4985ZM30 26.9985H14V25.9985H30V26.9985Z"
			fill={`rgb(var(--${color}))`}
		/>
		<circle cx="20" cy="20" r="19.5" stroke={`rgb(var(--${color}))`} />
	</svg>
);

const arrowUp: React.FC<IconProps> = ({ className = "inline", color = "primary-2", ...props }: IconProps) => (
	<svg
		{...props}
		className={className}
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
	>
		<path
			d="M18.5999 10.1L11.9999 3.5L5.3999 10.1L6.0999 10.8L11.4999 5.5V21H12.4999V5.5L17.8999 10.8L18.5999 10.1Z"
			fill={`rgb(var(--${color}))`}
		/>
	</svg>
);

const arrowDown: React.FC<IconProps> = ({ className = "inline", color = "primary-2", ...props }: IconProps) => (
	<svg
		{...props}
		className={className}
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
	>
		<path
			d="M17.8999 13.2L12.4999 18.5V3H11.4999V18.5L6.0999 13.2L5.3999 13.9L11.9999 20.4L18.5999 13.9L17.8999 13.2Z"
			fill={`rgb(var(--${color}))`}
		/>
	</svg>
);

const chevronRight: React.FC<IconProps> = ({ className = "inline", color = "primary-2", ...props }: IconProps) => (
	<svg
		{...props}
		className={className}
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
	>
		<path
			d="M9.60005 17.5984L8.80005 16.8984L13.7 11.9984L8.80005 7.09844L9.60005 6.39844L15.2 11.9984L9.60005 17.5984Z"
			fill={`rgb(var(--${color}))`}
		/>
	</svg>
);

const tooltip: React.FC<IconProps> = ({ className = "inline", color = "primary-2", ...props }: IconProps) => (
	<svg className={className} {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M2 12C2 6.47715 6.47715 2 12 2C14.6522 2 17.1957 3.05357 19.0711 4.92893C20.9464 6.8043 22 9.34784 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM11.3 6H12.8V8H11.3V6ZM12.8 9H11.3V18H12.8V9Z"
			fill={`rgb(var(--${color}))`}
		/>
	</svg>
);

const data: React.FC<IconProps> = ({ className = "inline", color = "primary-2", ...props }: IconProps) => (
	<svg
		{...props}
		className={className}
		xmlns="http://www.w3.org/2000/svg"
		width="17"
		height="16"
		viewBox="0 0 17 16"
		fill="none"
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M14.5 14V13.3333H3.16667V2H2.5V14H14.5ZM9.16667 7.82667L7.5 6.16L5.06667 8.57333L4.6 8.09333L7.5 5.22L9.16667 6.88667L12.72 3.33333H10.1667V2.66667H13.8333V6.33333H13.1667V3.82667L9.16667 7.82667Z"
			fill={`rgb(var(--${color}))`}
		/>
	</svg>
);

const dropDown: React.FC<IconProps> = ({ className = "inline", color = "primary-2", ...props }: IconProps) => (
	<svg {...props} className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
		<path
			d="M9.20009 12H14.8001C15.2002 12.0056 15.5584 12.2492 15.7107 12.6192C15.8631 12.9891 15.7802 13.4143 15.5001 13.7L12.0001 17.3L8.50009 13.7C8.21997 13.4143 8.13712 12.9891 8.28946 12.6192C8.4418 12.2492 8.80002 12.0056 9.20009 12Z"
			fill={`rgb(var(--${color}))`}
		/>
	</svg>
);

const user: React.FC<IconProps> = ({ className = "inline", color = "primary-2", ...props }: IconProps) => (
	<svg {...props} className={className} width="24" height="24" viewBox="0 0 24 24" fill="none">
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M18.3262 21C16.5368 22.2601 14.3548 23 12 23C9.64518 23 7.46319 22.2601 5.67384 21H5.7C5.7 17.5206 8.52061 14.7 12 14.7C15.4794 14.7 18.3 17.5206 18.3 21H18.3262ZM19.1703 20.3421C18.8381 16.674 15.7547 13.8 12 13.8C8.24534 13.8 5.16194 16.674 4.82966 20.3421C2.48485 18.3248 1 15.3358 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 15.3358 21.5152 18.3248 19.1703 20.3421ZM24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM15.6 9.3C15.6 11.2882 13.9882 12.9 12 12.9C10.0118 12.9 8.4 11.2882 8.4 9.3V6.6C8.4 4.61177 10.0118 3 12 3C13.9882 3 15.6 4.61177 15.6 6.6V9.3ZM12 3.9C10.5088 3.9 9.3 5.10883 9.3 6.6V9.3C9.3 10.7912 10.5088 12 12 12C13.4912 12 14.7 10.7912 14.7 9.3V6.6C14.7 5.10883 13.4912 3.9 12 3.9Z"
			fill={`rgb(var(--${color}))`}
		/>
	</svg>
);

const euro: React.FC<IconProps> = ({ className = "inline", color = "base-white", ...props }: IconProps) => (
	<svg {...props} className={className} width="42" height="42" viewBox="0 0 42 42">
		<path
			d="M20.75 0.25C9.29009 0.25 0 9.54009 0 21C0 32.4599 9.29009 41.75 20.75 41.75C32.2099 41.75 41.5 32.4599 41.5 21C41.5 9.54009 32.2099 0.25 20.75 0.25ZM1.5 21C1.5 10.3685 10.1185 1.75 20.75 1.75C31.3815 1.75 40 10.3685 40 21C40 31.6315 31.3815 40.25 20.75 40.25C10.1185 40.25 1.5 31.6315 1.5 21ZM11.2568 18.1145V19.7465H13.2728C13.2515 20.1305 13.2408 20.6958 13.2408 21.4425C13.2408 22.1678 13.2515 22.6905 13.2728 23.0105H11.2568V24.6425H13.3688C13.6035 27.2452 14.2862 29.1758 15.4168 30.4345C16.5475 31.6932 18.3822 32.3225 20.9208 32.3225C22.5422 32.3225 24.4408 32.1092 26.6168 31.6825L26.5208 30.0185C24.5582 30.4025 22.6702 30.5945 20.8568 30.5945C19.0435 30.5945 17.7102 30.1252 16.8568 29.1865C16.0035 28.2265 15.4808 26.7118 15.2888 24.6425H24.8888V23.0105H15.2248C15.2035 22.6905 15.1928 22.1678 15.1928 21.4425C15.1928 20.6958 15.2035 20.1305 15.2248 19.7465H24.8888V18.1145H15.3208C15.5342 16.1092 16.0568 14.6372 16.8888 13.6985C17.7422 12.7385 19.0648 12.2585 20.8568 12.2585C22.6702 12.2585 24.5582 12.4505 26.5208 12.8345L26.6168 11.2025C24.5688 10.7758 22.6702 10.5625 20.9208 10.5625C18.3822 10.5625 16.5475 11.1812 15.4168 12.4185C14.2862 13.6558 13.6035 15.5545 13.3688 18.1145H11.2568Z"
			fill={`rgb(var(--${color}))`}
		/>
	</svg>
);

const burger: React.FC<IconProps> = ({ className = "inline", color = "primary-1", ...props }: IconProps) => (
	<svg {...props} className={className} width="24" height="24" viewBox="0 0 24 24">
		<path d="M22 5V6H2V5H22ZM2 12.5H22V11.5H2V12.5ZM22 19H2V18H22V19Z" fill={`rgb(var(--${color}))`} />
	</svg>
);

const flag: React.FC<IconProps> = ({ className = "inline", color = "primary-1", ...props }: IconProps) => (
	<svg {...props} className={className} width="40" height="40" viewBox="0 0 40 40">
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M39 20C39 30.4934 30.4934 39 20 39C9.50659 39 1 30.4934 1 20C1 9.50659 9.50659 1 20 1C30.4934 1 39 9.50659 39 20ZM40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20ZM25.1 16L28.43 11H13V10H12V30H13V21H28.43L25.1 16ZM13 12H26.57L23.9 16L26.57 20H13V12Z"
			fill={`rgb(var(--${color}))`}
		/>
	</svg>
);

const close: React.FC<IconProps> = ({ className = "inline", color = "primary-1", ...props }: IconProps) => (
	<svg {...props} className={className} width="24" height="24" viewBox="0 0 24 24">
		<path
			d="M12.7 12.0016L19.4 18.6016L18.6 19.4016L12 12.7016L5.39998 19.4016L4.59998 18.6016L11.3 12.0016L4.59998 5.40156L5.39998 4.60156L12 11.3016L18.6 4.60156L19.4 5.40156L12.7 12.0016Z"
			fill={`rgb(var(--${color}))`}
		/>
	</svg>
);

const addCircle: React.FC<IconProps> = ({ className = "inline", color = "primary-2", ...props }: IconProps) => (
	<svg
		{...props}
		className={className}
		xmlns="http://www.w3.org/2000/svg"
		width="25"
		height="24"
		viewBox="0 0 25 24"
		fill="none"
	>
		<path
			d="M11.8333 18H13.1667V12.6667H18.5V11.3333H13.1667V6H11.8333V11.3333H6.5V12.6667H11.8333V18ZM12.5 24C10.8333 24 9.27244 23.6836 7.81733 23.0507C6.36133 22.4169 5.09467 21.5609 4.01733 20.4827C2.93911 19.4053 2.08311 18.1387 1.44933 16.6827C0.816444 15.2276 0.5 13.6667 0.5 12C0.5 10.3333 0.816444 8.772 1.44933 7.316C2.08311 5.86089 2.93911 4.59422 4.01733 3.516C5.09467 2.43867 6.36133 1.58311 7.81733 0.949333C9.27244 0.316444 10.8333 0 12.5 0C14.1667 0 15.728 0.316444 17.184 0.949333C18.6391 1.58311 19.9058 2.43867 20.984 3.516C22.0613 4.59422 22.9169 5.86089 23.5507 7.316C24.1836 8.772 24.5 10.3333 24.5 12C24.5 13.6667 24.1836 15.2276 23.5507 16.6827C22.9169 18.1387 22.0613 19.4053 20.984 20.4827C19.9058 21.5609 18.6391 22.4169 17.184 23.0507C15.728 23.6836 14.1667 24 12.5 24ZM12.5 22.6667C15.4778 22.6667 18 21.6333 20.0667 19.5667C22.1333 17.5 23.1667 14.9778 23.1667 12C23.1667 9.02222 22.1333 6.5 20.0667 4.43333C18 2.36667 15.4778 1.33333 12.5 1.33333C9.52222 1.33333 7 2.36667 4.93333 4.43333C2.86667 6.5 1.83333 9.02222 1.83333 12C1.83333 14.9778 2.86667 17.5 4.93333 19.5667C7 21.6333 9.52222 22.6667 12.5 22.6667Z"
			fill={`rgb(var(--${color}))`}
		/>
	</svg>
);

export const Icon = {
	highRisk,
	mediumRisk,
	noRisk,
	listItems,
	arrowUp,
	arrowDown,
	chevronRight,
	tooltip,
	data,
	dropDown,
	user,
	euro,
	burger,
	flag,
	close,
	addCircle,
};
