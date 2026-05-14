declare module "vanta/dist/vanta.birds.min" {
  type ThreeModule = typeof import("three");

  export interface VantaBirdsOptions {
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
    color1?: number;
    color2?: number;
    colorMode?: string;
    birdSize?: number;
    wingSpan?: number;
    speedLimit?: number;
    separation?: number;
    alignment?: number;
    cohesion?: number;
    quantity?: number;
  }

  export interface VantaBirdsInstance {
    destroy(): void;
    resize?(): void;
    setOptions?(options: Partial<VantaBirdsOptions>): void;
  }

  const BIRDS: (options: VantaBirdsOptions) => VantaBirdsInstance;

  export default BIRDS;
}
