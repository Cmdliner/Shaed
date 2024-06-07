// Example: src/env.d.ts

interface ImportMetaEnv {
    readonly VITE_API_SERVER_URI: string;
    readonly VITE_AUTH_SERVER_URI: string
    readonly VITE_CHAT_SERVER_URI: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  