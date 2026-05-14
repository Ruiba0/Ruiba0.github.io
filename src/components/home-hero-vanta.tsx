"use client";

import { useEffect, useRef } from "react";
import { THEME_CHANGE_EVENT } from "@/lib/theme";

type VantaEffect = {
  destroy: () => void;
  resize?: () => void;
};

type ThreeModule = typeof import("three");
type ThreeCompatModule = ThreeModule & {
  PlaneBufferGeometry?: typeof import("three").PlaneGeometry;
  VertexColors?: boolean;
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function prefersMobileLayout() {
  return window.matchMedia("(max-width: 767px)").matches;
}

function getActiveTheme() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function createThreeCompat(THREE: ThreeModule): ThreeCompatModule {
  return {
    ...THREE,
    // vanta.birds still references legacy three.js exports at import/runtime.
    PlaneBufferGeometry: THREE.PlaneGeometry,
    VertexColors: true,
  };
}

export function HomeHeroVanta() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const effectRef = useRef<VantaEffect | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileMedia = window.matchMedia("(max-width: 767px)");
    let initToken = 0;

    const destroyEffect = () => {
      initToken += 1;
      effectRef.current?.destroy();
      effectRef.current = null;
    };

    const initEffect = async () => {
      const token = ++initToken;

      if (
        !containerRef.current ||
        effectRef.current ||
        prefersReducedMotion()
      ) {
        return;
      }

      const isDark = getActiveTheme() === "dark";
      const isCompactViewport = prefersMobileLayout();

      try {
        const THREE = await import("three");
        const threeCompat = createThreeCompat(THREE);

        (window as Window & { THREE?: ThreeCompatModule }).THREE = threeCompat;

        const { default: BIRDS } = await import("vanta/dist/vanta.birds.min");

        if (!containerRef.current || token !== initToken) {
          return;
        }

        effectRef.current = BIRDS({
          el: containerRef.current,
          THREE: threeCompat,
          mouseControls: true,
          touchControls: false,
          gyroControls: false,
          minHeight: 240,
          minWidth: 320,
          scale: 1,
          scaleMobile: 1,
          backgroundAlpha: 0,
          backgroundColor: isDark ? 0x000000 : 0xffffff,
          color1: isDark ? 0xffffff : 0x000000,
          color2: isDark ? 0xffffff : 0x000000,
          colorMode: "varianceGradient",
          birdSize: isCompactViewport ? 1.15 : 1.45,
          wingSpan: isCompactViewport ? 18 : 22,
          speedLimit: isCompactViewport ? 2.8 : 3.3,
          separation: isCompactViewport ? 22 : 24,
          alignment: isCompactViewport ? 24 : 28,
          cohesion: isCompactViewport ? 22 : 24,
          quantity: isCompactViewport ? 2 : 3,
        });
      } catch (error) {
        destroyEffect();
        console.error("Failed to initialize Vanta BIRDS effect.", error);
      }
    };

    const handleResize = () => {
      effectRef.current?.resize?.();
    };

    const handleMediaChange = () => {
      destroyEffect();
      void initEffect();
    };

    void initEffect();

    window.addEventListener("resize", handleResize);
    reducedMotionMedia.addEventListener("change", handleMediaChange);
    mobileMedia.addEventListener("change", handleMediaChange);
    window.addEventListener(THEME_CHANGE_EVENT, handleMediaChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      reducedMotionMedia.removeEventListener("change", handleMediaChange);
      mobileMedia.removeEventListener("change", handleMediaChange);
      window.removeEventListener(THEME_CHANGE_EVENT, handleMediaChange);
      destroyEffect();
    };
  }, []);

  return <div ref={containerRef} aria-hidden className="hero-vanta" />;
}
