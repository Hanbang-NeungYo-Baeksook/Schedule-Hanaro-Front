interface ImportMetaEnv {
  readonly VITE_API_URL: string; // 사용할 환경 변수 명시
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
