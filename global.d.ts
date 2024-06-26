// global.d.ts
declare global {
  interface Window {
    myCustomProperty?: string;
    myCustomMethod?: () => void;
  }
}

// If this file is a module (i.e., it has imports/exports), make sure to include the following:
export {};
