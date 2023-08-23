import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { comlink } from "vite-plugin-comlink";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), comlink(), tsconfigPaths()],
  server: {
    port: 3000,
    fs: {
      strict: false,
    },
  },
  worker: {
    plugins: [comlink()],
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
    },

    exclude: ["@latticexyz/network", "@latticexyz/noise"],
    include: [
      "proxy-deep",
      "ethers/lib/utils",
      "bn.js",
      "js-sha3",
      "hash.js",
      "bech32",
      "long",
      "protobufjs/minimal",
      "debug",
      "is-observable",
      "nice-grpc-web",
      "@improbable-eng/grpc-web",
    ],
  },
});
