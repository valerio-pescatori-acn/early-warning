import type { Config } from "tailwindcss";
import baseConfig from "@ew/tailwind-config";

const config: Pick<Config, "content" | "presets" | "safelist"> = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@ew/ui/components/**/*.{js,ts,jsx,tsx}"],
	presets: [baseConfig],
};

export default config;
