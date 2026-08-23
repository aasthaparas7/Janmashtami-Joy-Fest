import { Link } from "@tanstack/react-router";
import { CalendarDays, Clock, Volume2, VolumeX, Music } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/Countdown";
import { FloatingFeather, Petals } from "@/components/Decor";
import { EVENT } from "@/lib/event";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import krishnaImage from "@/assets/Hero_Image_Lord_Krishna_and_Radha_Ji.jpg";
import bgImage from "@/assets/home_page_background.png";
import bannerImage from "@/assets/New_poster.png";
import audioFile from "@/assets/audio/mahamantra_audio.mp3";

function Chip({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="glass-chip inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-left text-[13px] leading-snug text-foreground/85">
      <span className="text-saffron">{icon}</span>
      {children}
    </span>
  );
}

export function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [showMusicHint, setShowMusicHint] = useState(false);

  const isAllowedRef = useRef(true);
  const isPlayingRef = useRef(false);
  const needsGestureRef = useRef(false);
  const isHeroVisibleRef = useRef(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const fadeOutInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeInInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const updatePlayingState = (playing: boolean) => {
    isPlayingRef.current = playing;
    setIsPlaying(playing);
  };

  const fadeAudio = useCallback((audio: HTMLAudioElement, type: "in" | "out") => {
    if (fadeOutInterval.current) clearInterval(fadeOutInterval.current);
    if (fadeInInterval.current) clearInterval(fadeInInterval.current);

    if (type === "out") {
      let vol = audio.volume;
      fadeOutInterval.current = setInterval(() => {
        if (vol > 0.05) {
          vol -= 0.05;
          audio.volume = vol;
        } else {
          clearInterval(fadeOutInterval.current!);
          audio.pause();
          audio.volume = 1; // Reset volume for next time
        }
      }, 50);
    } else {
      audio.volume = 0;
      audio
        .play()
        .then(() => {
          // Play succeeded — update state only now (not optimistically)
          needsGestureRef.current = false;
          setShowMusicHint(false);
          updatePlayingState(true);
          let vol = 0;
          fadeInInterval.current = setInterval(() => {
            if (vol < 0.95) {
              vol += 0.05;
              audio.volume = vol;
            } else {
              clearInterval(fadeInInterval.current!);
              audio.volume = 1;
            }
          }, 50);
        })
        .catch((err) => {
          console.log("Autoplay blocked:", err);
          // Don't poison isAllowedRef — the user hasn't opted out,
          // the browser just needs a gesture first.
          needsGestureRef.current = true;
          setShowMusicHint(true);
        });
    }
  }, []);

  // IntersectionObserver — manages hero visibility and auto-play/pause
  useEffect(() => {
    const section = sectionRef.current;
    const audio = audioRef.current;
    if (!section || !audio) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        isHeroVisibleRef.current = entry.isIntersecting;

        if (entry.isIntersecting) {
          // Only auto-start if user hasn't disabled, audio isn't playing,
          // and we're not waiting for a gesture (which would fail again).
          if (isAllowedRef.current && !isPlayingRef.current && !needsGestureRef.current) {
            fadeAudio(audio, "in");
          }
        } else {
          if (isPlayingRef.current) {
            updatePlayingState(false); // Immediate so re-entry doesn't double-fade
            fadeAudio(audio, "out");
          }
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
    };
  }, [fadeAudio]);

  // One-shot gesture listener — unlocks audio after browser blocks autoplay.
  // Listens for click, touchstart, keydown, and scroll (fallback for some browsers).
  useEffect(() => {
    if (!showMusicHint) return;

    const audio = audioRef.current;
    if (!audio) return;

    const handleGesture = () => {
      if (!needsGestureRef.current) return;

      // Only auto-start if hero is still visible and user hasn't disabled
      if (isHeroVisibleRef.current && isAllowedRef.current) {
        fadeAudio(audio, "in");
        // fadeAudio will set needsGestureRef=false & showMusicHint=false on success.
        // On failure (e.g. scroll on a browser that doesn't count it as gesture),
        // they remain true so the listeners stay active for the next interaction.
      } else {
        // Hero not visible or user disabled — dismiss the hint quietly
        needsGestureRef.current = false;
        setShowMusicHint(false);
      }
    };

    const gestureEvents = ["click", "touchstart", "keydown", "scroll"];
    gestureEvents.forEach((e) => document.addEventListener(e, handleGesture, { passive: true }));

    return () => {
      gestureEvents.forEach((e) => document.removeEventListener(e, handleGesture));
    };
  }, [showMusicHint, fadeAudio]);

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      if (fadeOutInterval.current) clearInterval(fadeOutInterval.current);
      if (fadeInInterval.current) clearInterval(fadeInInterval.current);
    };
  }, []);

  useEffect(() => {
    setPortalTarget(document.getElementById("audio-toggle-portal"));
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlayingRef.current) {
      isAllowedRef.current = true;
      needsGestureRef.current = false;
      setShowMusicHint(false);
      // State will update in fadeAudio's .then() on success
      fadeAudio(audio, "in");
    } else {
      isAllowedRef.current = false;
      updatePlayingState(false);
      fadeAudio(audio, "out");
    }
  };

  const audioControls = (
    <div className="relative flex items-center">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full hover:bg-secondary/40"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause Background Music" : "Play Background Music"}
      >
        {isPlaying ? (
          <Volume2 className="h-5 w-5 text-saffron" />
        ) : (
          <VolumeX className="h-5 w-5 text-foreground/75" />
        )}
      </Button>
      {showMusicHint && (
        <div className="music-hint-pill" role="status" aria-live="polite">
          <Music className="h-3.5 w-3.5 flex-shrink-0" />
          <span>Tap for Mantra Chanting</span>
        </div>
      )}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative overflow-hidden pt-24 pb-16 sm:pt-28 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <audio ref={audioRef} src={audioFile} loop />
      {portalTarget && createPortal(audioControls, portalTarget)}
      <div className="absolute inset-0 bg-background/20" />
      <div aria-hidden className="mandala-bg absolute inset-0 opacity-20" />
      <Petals />
      <FloatingFeather className="top-1/2 -right-6 hidden w-28 -rotate-12 lg:block" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--gold)_45%,transparent),transparent_70%)]"
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-12 px-4 text-center">
        {/* Text lockup */}
        <div className="animate-rise z-10 mx-auto max-w-3xl">
          <h1 className="font-display mt-5 text-5xl leading-[1.05] text-primary sm:text-7xl lg:text-[5.5rem] drop-shadow-md">
            <span className="relative inline-block">
              <FloatingFeather className="absolute -top-10 -left-6 w-16 -rotate-[15deg] sm:-top-14 sm:-left-10 sm:w-24" />
              Sri
            </span>{" "}
            Krishna
            <span className="text-gold-shimmer mt-2 block">Janmashtami</span>
            <span className="font-serif-deco text-peacock mt-3 block text-2xl tracking-[0.45em] sm:text-3xl">
              2026
            </span>
          </h1>
          <p className="font-serif-deco mt-4 text-lg text-saffron sm:text-xl leading-relaxed">
            Celebrate the Divine Birth of Lord Krishna
            <a
              href="https://maps.app.goo.gl/Zj1beceWcLodTGdM8"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3 text-2xl sm:text-4xl text-primary font-bold drop-shadow-sm transition-colors hover:text-primary/80"
            >
              @ {EVENT.venueName}
            </a>
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            A joyful day of devotion, culture, competitions, dance, music, food, games and family
            celebrations.
          </p>
        </div>

        {/* Deity medallion */}
        <div className="animate-rise relative z-10 w-full max-w-md">
          <div
            aria-hidden
            className="animate-halo absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_40%,color-mix(in_oklab,var(--gold)_60%,transparent),transparent_65%)] blur-2xl"
          />
          <div
            aria-hidden
            className="animate-slow-spin absolute -inset-4 -z-10 rounded-full border border-dashed border-gold/40"
          />
          <div className="arch-frame overflow-hidden bg-card p-2 shadow-gold">
            <img
              src={krishnaImage}
              alt="Sri Sri Radha Krishna deities adorned with flower garlands"
              width={1024}
              height={1280}
              className="h-auto w-full rounded-[999px_999px_1.4rem_1.4rem] object-cover [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] -webkit-[mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]"
            />
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-2.5 text-center font-serif-deco text-sm font-bold tracking-wide text-white shadow-[0_8px_30px_rgb(245,158,11/0.5)] border border-white/20">
            🪈 Vrindavan comes to Bengaluru 🦚
          </div>
        </div>

        {/* Details & Action */}
        <div className="animate-rise z-10 mx-auto w-full max-w-2xl mt-4">
          <div className="flex flex-wrap justify-center gap-2">
            <Chip icon={<CalendarDays className="size-4" />}>{EVENT.dateLabel}</Chip>
            <Chip icon={<Clock className="size-4" />}>{EVENT.timeLabel}</Chip>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {EVENT.freeBadges.map((b) => (
              <span
                key={b}
                className="rounded-full border border-gold/60 bg-gold/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-primary uppercase"
              >
                {b}
              </span>
            ))}
            <span className="rounded-full border border-saffron/60 bg-saffron/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-saffron uppercase">
              {EVENT.cashPrizes}
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center relative">
            <Button asChild variant="gold" size="xl" className="hover-scale">
              <Link to="/register">Register for Competitions</Link>
            </Button>
            <Button asChild variant="outlineGold" size="xl">
              <a href="#schedule">View Event Schedule</a>
            </Button>
          </div>

          <div className="mt-12 mx-auto max-w-4xl w-full">
            <figure className="lift-card gold-frame overflow-hidden rounded-3xl bg-card p-3">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="group relative cursor-zoom-in overflow-hidden rounded-2xl">
                    <img
                      src={bannerImage}
                      alt="Sri Krishna Janmashtami 2026 Banner"
                      loading="lazy"
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl border-0 bg-transparent p-0 shadow-none [&>button]:text-white [&>button]:bg-black/50 [&>button]:hover:bg-black/70 [&>button]:rounded-full outline-none">
                  <TransformWrapper
                    centerOnInit={true}
                    minScale={0.5}
                    maxScale={4}
                    wheel={{ step: 0.1 }}
                  >
                    <TransformComponent wrapperClass="!w-full !h-[90vh] !flex !justify-center !items-center cursor-grab active:cursor-grabbing">
                      <img
                        src={bannerImage}
                        alt="Sri Krishna Janmashtami 2026 Banner"
                        className="max-h-[90vh] w-auto rounded-lg object-contain pointer-events-auto"
                      />
                    </TransformComponent>
                  </TransformWrapper>
                </DialogContent>
              </Dialog>
            </figure>
          </div>

          <div className="mt-12 flex flex-col items-center">
            <p className="mb-3 text-[11px] tracking-[0.3em] text-muted-foreground uppercase">
              Celebration begins in
            </p>
            <Countdown />
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-14 max-w-2xl px-4 text-center">
        <div className="ornate-rule mx-auto w-56" />
        <p className="mt-4 text-xs text-muted-foreground font-bold">Founder: {EVENT.founder}</p>
      </div>
    </section>
  );
}
