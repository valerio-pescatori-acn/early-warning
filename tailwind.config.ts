import type { Config } from "tailwindcss";
import lineClamp from "@tailwindcss/line-clamp";
const withOpacity = (variableName: string): string => `rgba(var(${variableName}), <alpha-value>)`;

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	plugins: [lineClamp],
	theme: {
		extend: {
			colors: {
				"base-black": withOpacity("--base-black"),
				"base-white": withOpacity("--base-white"),
				primary: withOpacity("--primary"),
				"primary-1": withOpacity("--primary-1"),
				"primary-2": withOpacity("--primary-2"),
				"primary-3": withOpacity("--primary-3"),
				"primary-5": withOpacity("--primary-5"),
				"primary-6": withOpacity("--primary-6"),
				"primary-7": withOpacity("--primary-7"),
				"blue-light": withOpacity("--blue-light"),
				"blue-lighter": withOpacity("--blue-lighter"),
				"blue-dark": withOpacity("--blue-dark"),
				"red-bar": withOpacity("--red-bar"),
				"yellow-bar": withOpacity("--yellow-bar"),
				"green-bar": withOpacity("--green-bar"),
				"slate-44": withOpacity("--slate-44"),
				error: withOpacity("--error"),
				alert: withOpacity("--alert"),
				warning: withOpacity("--warning"),
				success: withOpacity("--success"),
			},
			gridTemplateColumns: {
				measurments: "minmax(0, 2fr) minmax(0, 1fr) minmax(0, 2fr) minmax(0, 1fr)",
			},
			boxShadow: {
				tile: "0px 2px 8px 0px rgba(0, 0, 0, 0.10), 0px 0px 0px 1px rgba(0, 0, 0, 0.10);",
			},
			maxWidth: {
				"7xl": "1496px",
			},
			spacing: {
				30: "120px",
				132: "528px",
			},
			fontSize: {
				xs: ["12px", "28px"],
				sm: ["14px", "24px"],
				lg: ["24px", "36px"],
				"4xl": ["40px", "54px"],
			},
			fontFamily: {
				sans: ['"72"', "sans-serif"],
			},
			screens: {
				xs: "320px",
				sm: "640px",
				md: "768px",
				lg: "1150px",
				xl: "1280px",
				"2xl": "1536px",
			},
		},
		plugins: [],
	},
} satisfies Config;
