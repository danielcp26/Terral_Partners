"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "motion/react";
import type { Locale } from "@/lib/config";

/** Self-hosted decorative film; no third-party player or tracking. */
export default function CoastalFilm({ locale }: { locale: Locale }) {
  const video = useRef<HTMLVideoElement>(null);
  const wantsPlayback = useRef(true);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = true;
    wantsPlayback.current = !reduced.matches && !connection?.saveData;
    const sync = () => {
      if (
        wantsPlayback.current &&
        !reduced.matches &&
        inView &&
        !document.hidden
      ) {
        if (!element.getAttribute("src"))
          element.src = "/videos/terral-coast.mp4";
        void element.play().catch(() => {
          /* Poster and manual play remain available. */
        });
      } else element.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0.05 },
    );
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      element.pause();
    };
  }, []);

  const toggle = () => {
    const element = video.current;
    if (!element) return;
    wantsPlayback.current = !playing;
    if (playing) element.pause();
    else {
      if (!element.getAttribute("src"))
        element.src = "/videos/terral-coast.mp4";
      void element.play().catch(() => {
        wantsPlayback.current = false;
      });
    }
  };

  return (
    <>
      <video
        ref={video}
        className={`coastal-film ${ready && !failed && !reduce ? "is-ready" : ""}`}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        onLoadedData={() => setReady(true)}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setFailed(true);
          setPlaying(false);
        }}
      />
      {!reduce && !failed && (
        <button
          type="button"
          className="film-control"
          onClick={toggle}
          aria-label={
            locale === "es"
              ? playing
                ? "Pausar animación"
                : "Reproducir animación"
              : playing
                ? "Pause animation"
                : "Play animation"
          }
        >
          {playing ? (
            <Pause size={15} aria-hidden="true" />
          ) : (
            <Play size={15} aria-hidden="true" />
          )}
          <span>
            {locale === "es"
              ? playing
                ? "Pausar"
                : "Reproducir"
              : playing
                ? "Pause"
                : "Play"}
          </span>
        </button>
      )}
    </>
  );
}
