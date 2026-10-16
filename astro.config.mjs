import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://game8.vn',
  integrations: [tailwind()],
  output: 'static',
});
