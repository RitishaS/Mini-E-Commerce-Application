import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Keeps file resolution inside the restricted Windows workspace sandbox.
  resolve: { preserveSymlinks: true },
});
