import { resolve } from "url";
import { defineConfig } from "vitest/config";
import dotenv from "dotenv";

export default defineConfig({
  test: {
    setupFiles: ["dotenv/config"],
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve("<rootDir>", "./src") }],
  },
});
