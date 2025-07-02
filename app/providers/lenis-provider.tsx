
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
   lerp: 0.07, 
    duration: 1.2, 
    smoothWheel: true,
    autoResize: true, 
    gestureOrientation: "vertical",
    overscroll: true,
    allowNestedScroll: true, 
    wheelMultiplier: 1, 
    touchMultiplier: 1.2, 
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default LenisScrollProvider;