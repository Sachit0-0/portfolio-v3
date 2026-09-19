
"use client";
import { Lenis as ReactLenis } from 'lenis/react';
import { FC, useRef } from 'react';

type LenisScrollProviderProps = {
  children: React.ReactNode;
};

const LenisScrollProvider: FC<LenisScrollProviderProps> = ({ children }) => {
  const lenisRef = useRef(null);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.1,
        duration: 1.4,
        smoothWheel: true,
        autoResize: true,
        gestureOrientation: "vertical",
        overscroll: false,
        allowNestedScroll: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default LenisScrollProvider;