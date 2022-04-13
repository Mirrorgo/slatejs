import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  base: "/slatejs/",
  plugins: [
    react({
      babel: {
        plugins: [
          [
            "babel-plugin-styled-components",
            {
              displayName: true,
              fileName: false,
            },
          ],
        ],
      },
    }),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
    VitePWA({
      manifest: {
        name: slatejs,
        short_name: slatejs,
        icons: [
          {
            src: "./src/favicon.svg",
            sizes: "192x192",
            type: "image/svg",
          },
          {
            src: "./src/favicon.svg",
            sizes: "512x512",
            type: "image/svg",
          },
        ],
      },
    }),
  ],
});
