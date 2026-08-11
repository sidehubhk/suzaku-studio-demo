export {};

declare global {
  interface Window {
    __suzakuLenis?: {
      scrollTo: (target: number, options?: { immediate?: boolean }) => void;
    };
  }
}
