// src/types/global.d.ts
declare global {
  interface Window {
    Jupiter: {
      [x: string]: any;
      init: (props: any) => void;
      syncProps: (props: any) => void;
    };
  }
}

export {};
