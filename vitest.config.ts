import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
    test: {
        globals: true,
        environment: 'nuxt',
        include: ['tests/*.{test,spec}.{js,ts}'], // Nur Testdateien mit diesen Endungen
        exclude: [
            '**/e2e/**',
        ]
    }
})