import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: { host: true, port: 5173 },
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
});
