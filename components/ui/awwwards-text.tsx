"use client";

import React from "react";

interface AwwwardsTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

export function AwwwardsText({ text, className = "", as: Component = "span" }: AwwwardsTextProps) {
  return (
    <Component className={`group relative inline-flex items-center cursor-pointer py-1 ${className}`}>
      <span className="inline-flex overflow-hidden py-1">
        {text.split("").map((char, index) => (
          <span key={index} className="relative inline-block overflow-hidden py-1 px-[0.5px]">
            <span
              className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[120%]"
              style={{ transitionDelay: `${index * 18}ms` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
            <span
              className="absolute left-0 top-1 inline-block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-[120%] group-hover:translate-y-0 text-primary font-semibold"
              style={{ transitionDelay: `${index * 18}ms` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        ))}
      </span>
      {/* Sleek magnetic underline */}
      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] origin-left" />
    </Component>
  );
}
