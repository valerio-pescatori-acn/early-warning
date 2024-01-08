import type { Config } from "tailwindcss";
import baseConfig from "@ew/tailwind-config";

const config: Pick<Config, "content" | "presets"> = {
	content: ["./components/*.tsx"],
	presets: [baseConfig],
};

export default config;
