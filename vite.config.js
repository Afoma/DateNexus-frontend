/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "DATENEXUS",
        short_name: "DATENEXUS",
        description:
          "The Quickest, Simplest, And Safest Way To Access The Blockchain.",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "100x100",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env": {
      NEXT_PUBLIC_GITHUB_CALLBACK_URL: JSON.stringify(
        process.env.NEXT_PUBLIC_GITHUB_CALLBACK_URL
      ),
      NEXT_PUBLIC_TWITTER_CALLBACK_URL: JSON.stringify(
        process.env.NEXT_PUBLIC_TWITTER_CALLBACK_URL
      ),
      NEXT_PUBLIC_LINKEDIN_CALLBACK_URL: JSON.stringify(
        process.env.NEXT_PUBLIC_LINKEDIN_CALLBACK_URL
      ),
    },
  },
});
