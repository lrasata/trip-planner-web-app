/// <reference types="vite/client" />

declare module 'virtual:pwa-register' {
    import type { RegisterSWOptions, RegisterSWReturn } from 'vite-plugin-pwa'

    export function registerSW(
        options?: RegisterSWOptions
    ): RegisterSWReturn
}
