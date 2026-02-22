/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_CURRENT_LOCATION: string
    readonly VITE_CURRENT_TIMEZONE: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
