import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import mdx from "fumadocs-mdx/vite";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  optimizeDeps: {
    exclude: ["unenv", "@cloudflare/unenv-preset"],
  },
  ssr: {
    resolve: {
      conditions: ["worker", "import", "module", "default"],
    },
  },
  plugins: [
    mdx(await import("./source.config")),
    tailwindcss(),
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    cloudflare({
      inspectorPort: false,
      viteEnvironment: { name: "ssr" },
    }),
    tanstackStart({
      prerender: {
        enabled: true,
        filter: ({ path }) => !/\.pdf(?:[?#]|$)/i.test(path),
      },
    }),
    react(),
  ],
});
