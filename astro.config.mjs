// @ts-check
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  experimental: {
    fonts: [
      {
        provider: fontProviders.fontsource(),
        name: "Roboto Mono",
        cssVariable: "--font-roboto-mono",
      },
    ],
  },
});
