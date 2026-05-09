import { useEffect, useRef } from "react";
import anime from "animejs";

type RevealOptions = anime.AnimeParams & {
  threshold?: number;
  once?: boolean;
};

export function useRevealAnimation(
  selector: string,
  options: RevealOptions = {}
) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const {
      threshold = 0.18,
      once = true,
      ...animeOptions
    } = options;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          anime.remove(entry.target);

          anime({
            targets: entry.target,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 900,
            easing: "easeOutExpo",
            ...animeOptions,
          });

          if (once) observerRef.current?.unobserve(entry.target);
        });
      },
      { threshold }
    );

    elements.forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [selector]);
}