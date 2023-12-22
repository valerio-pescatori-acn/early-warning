import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "/bandiregis/",
	server: {
		proxy: {
			"/sap": {
				changeOrigin: true,
				target: "http://10.38.127.95:8000",
			},
		},
	},
});
