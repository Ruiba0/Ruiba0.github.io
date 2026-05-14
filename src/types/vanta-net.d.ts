declare module "vanta/dist/vanta.net.min" {
  type ThreeModule = typeof import("three");

  export interface VantaNetOptions {
    el: HTMLElement | null;
    THREE?: ThreeModule;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    backgroundAlpha?: number;
    backgroundColor?: number;
    color?: number;
    points?: number;
    maxDistance?: number;
    spacing?: number;
    mouseCoeffX?: number;
    mouseCoeffY?: number;
    showDots?: boolean;
  }

  export interface VantaNetInstance {
    destroy(): void;
    resize?(): void;
    setOptions?(options: Partial<VantaNetOptions>): void;
  }

  const NET: (options: VantaNetOptions) => VantaNetInstance;

  export default NET;
}
