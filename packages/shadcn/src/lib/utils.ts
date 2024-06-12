import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ForwardedRef, MutableRefObject } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mr<ElementType extends HTMLElement>(
  ...refs: (MutableRefObject<ElementType> | ForwardedRef<ElementType>)[]
) {
  return (node: ElementType | null) => {
    for (const ref of refs) {
      if (ref) {
        if (typeof ref === "function") {
          ref(node);
        } else {
          ref.current = node;
        }
      }
    }
  };
}
