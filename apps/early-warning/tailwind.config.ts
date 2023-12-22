import type { Config } from "tailwindcss";
import baseConfig from "@ew/tailwind-config";

const config: Pick<Config, "content" | "presets"> = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	presets: [baseConfig],
};

export default config;
