"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export default function MotionEnhancements() {
  const path = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const reset = () => {
      observer?.disconnect();
      document.querySelectorAll<HTMLElement>(".motion-reveal").forEach((el) => {
        el.classList.remove("motion-reveal");
        el.removeAttribute("data-visible");
        el.style.removeProperty("--reveal-delay");
      });
    };
    const start = () => {
      reset();
      if (preference.matches || !("IntersectionObserver" in window)) return;
      const elements = document.querySelectorAll<HTMLElement>(
        ".category-tile,.product-card,.steps article,.rating-panel,.visit-map,.owner-steps article,.fitting-promise article,.garage-panel",
      );
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target as HTMLElement;
            el.dataset.visible = "true";
            observer?.unobserve(el);
            timers.push(
              setTimeout(() => {
                el.classList.remove("motion-reveal");
                el.style.removeProperty("--reveal-delay");
              }, 800),
            );
          }
        },
        { threshold: 0.08, rootMargin: "0px 0px -20px 0px" },
      );
      elements.forEach((el, i) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 20) return;
        el.classList.add("motion-reveal");
        el.dataset.visible = "false";
        el.style.setProperty("--reveal-delay", `${(i % 4) * 45}ms`);
        observer?.observe(el);
      });
    };
    start();
    preference.addEventListener("change", start);
    return () => {
      reset();
      timers.forEach(clearTimeout);
      preference.removeEventListener("change", start);
    };
  }, [path]);
  return null;
}
