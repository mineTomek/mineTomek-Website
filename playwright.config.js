import { defineConfig } from '@playwright/test';

export default defineConfig({
    webServer: {
        command: 'npm run start',
        url: 'http://127.0.0.1:3000',
        timeout: 120 * 1000,
        reuseExistingServer: !process.env.CI,
    },
    use: {
        baseURL: 'http://localhost:3000/',
    },
});