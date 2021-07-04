// process.d.ts
// This makes sure that TS knows about .env variables
declare const process: {
  env: {
    BACKEND_URL: string;
    BACKEND_PORT: string;
    FALLBACK_STREAM: string;
  };
};
