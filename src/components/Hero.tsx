import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

const Particle = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-primary/40"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
    transition={{ duration: 4 + Math.random() * 3, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 3,
}));

const slides = [
  { src: "/images/products/acm.png",              label: "ACM Mill",            tag: "Milling" },
  { src: "/images/products/pulveriser.png",        label: "Pulveriser",          tag: "Milling" },
  { src: "/images/products/gyro-sifter.png",       label: "Gyro Sifter",         tag: "Classifying" },
  { src: "/images/products/ribbon-blender.png",    label: "Ribbon Blender",      tag: "Mixing" },
  { src: "/images/products/chopper-mill.png",      label: "Chopper Mill",        tag: "Milling" },
  { src: "/images/products/vibrating-screen.png",  label: "Vibrating Screen",    tag: "Screening" },
  { src: "/images/products/crusher.png",           label: "Crusher",             tag: "Size Reduction" },
  { src: "/images/products/roaster.png",           label: "Roaster",             tag: "Thermal" },
  { src: "/images/spares/acm-hammers.png",         label: "ACM Hammers",         tag: "Spares" },
  { src: "/images/spares/vibro-sifter.png",        label: "Vibro Sifter",        tag: "Spares" },
  { src: "/images/spares/bag-filter.png",          label: "Bag Filter",          tag: "Spares" },
  { src: "/images/spares/crusher-blades.png",      label: "Crusher Blades",      tag: "Spares" },
];

const VISIBLE = 5; // number of cards visible at once (center + 2 each side)
const AUTO_INTERVAL = 3200;

function getCardStyle(offset: number): React.CSSProperties {
  const absOffset = Math.abs(offset);
  if (absOffset > 2) return { display: "none" };

  const rotateY   = offset * 38;
  const translateX = offset * 54;
  const translateZ = absOffset === 0 ? 0 : absOffset === 1 ? -90 : -180;
  const scale     = absOffset === 0 ? 1 : absOffset === 1 ? 0.72 : 0.52;
  const opacity   = absOffset === 0 ? 1 : absOffset === 1 ? 0.55 : 0.28;
  const zIndex    = VISIBLE - absOffset;

  return {
    position: "absolute",
    transform: `perspective(900px) rotateY(${rotateY}deg) translateX(${translateX}%) translateZ(${translateZ}px) scale(${scale})`,
    opacity,
    zIndex,
    transition: "all 0.65s cubic-bezier(0.4,0,0.2,1)",
    pointerEvents: absOffset === 0 ? "auto" : "none",
  };
}

const ProductSlider3D = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((a) => (a + 1) % slides.length), []);
  const prev = useCallback(() => setActive((a) => (a - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [next, paused]);

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full h-full select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Glow beneath active card */}
      <div className="absolute inset-x-0 bottom-16 h-24 pointer-events-none">
        <div className="mx-auto w-48 h-full rounded-full bg-primary/20 blur-2xl" />
      </div>

      {/* Card stage */}
      <div className="relative w-full h-64 flex items-center justify-center">
        {slides.map((slide, i) => {
          const offset = ((i - active + slides.length) % slides.length);
          const normalised = offset > slides.length / 2 ? offset - slides.length : offset;
          const style = getCardStyle(normalised);
          if (style.display === "none") return null;

          return (
            <div key={i} style={style} className="w-44 h-56 shrink-0">
              {/* Card */}
              <div
                className="relative w-full h-full rounded-2xl overflow-hidden"
                style={{
                  background: "linear-gradient(160deg, hsl(220 30% 6%) 0%, hsl(220 25% 10%) 100%)",
                  boxShadow:
                    normalised === 0
                      ? "0 0 0 1.5px hsl(42 100% 55%), 0 0 28px hsl(42 100% 55% / 0.4), 0 20px 50px hsl(220 30% 4% / 0.8)"
                      : "0 0 0 1px hsl(42 100% 55% / 0.3), 0 10px 30px hsl(220 30% 4% / 0.6)",
                }}
              >
                {/* Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-widest border border-primary/40 text-primary bg-primary/10 font-display">
                    {slide.tag}
                  </span>
                </div>

                {/* Product image — object-contain on dark bg */}
                <div className="absolute inset-0 flex items-center justify-center p-4 pt-10 pb-10">
                  <img
                    src={slide.src}
                    alt={slide.label}
                    className="w-full h-full object-contain drop-shadow-[0_0_12px_hsl(42_100%_55%/0.25)]"
                    draggable={false}
                  />
                </div>

                {/* Bottom gradient + label */}
                <div
                  className="absolute bottom-0 inset-x-0 h-14 flex flex-col justify-end px-3 pb-3"
                  style={{ background: "linear-gradient(to top, hsl(220 30% 5% / 0.95) 60%, transparent)" }}
                >
                  <p className="text-primary font-display font-bold text-sm leading-tight truncate">{slide.label}</p>
                </div>

                {/* Scan-line shimmer on active */}
                {normalised === 0 && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 0%, hsl(42 100% 55% / 0.04) 50%, transparent 100%)",
                      backgroundSize: "100% 200%",
                    }}
                    animate={{ backgroundPosition: ["0% 0%", "0% 100%", "0% 0%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots nav */}
      <div className="mt-8 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-full transition-all duration-300 ${
              i === active
                ? "w-5 h-1.5 bg-primary shadow-[0_0_6px_hsl(42_100%_55%/0.8)]"
                : "w-1.5 h-1.5 bg-muted-foreground/30 hover:bg-primary/50"
            }`}
          />
        ))}
      </div>

      {/* Arrow controls */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full border border-primary/30 bg-background/30 backdrop-blur text-primary hover:bg-primary/20 hover:border-primary/60 transition-all"
        aria-label="Previous"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full border border-primary/30 bg-background/30 backdrop-blur text-primary hover:bg-primary/20 hover:border-primary/60 transition-all"
        aria-label="Next"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </div>
  );
};

const Hero = () => {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden">
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <Particle key={p.id} x={p.x} y={p.y} delay={p.delay} />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-32 pb-20 lg:pt-40">
        {/* Left: Content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-5"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-primary text-xs font-medium bg-primary/5">
              Process Solution Architects
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="text-foreground">Engineering Precision,</span>
            <br />
            <span className="text-primary text-glow-amber">Powering Throughput</span>
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-muted-foreground max-w-lg mb-8 font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Milling, mixing, and emission control solutions engineered for maximum efficiency. From lab trials to
            turnkey installations.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <button
              onClick={() => scrollTo("#solutions")}
              className="px-7 py-3 bg-primary text-primary-foreground font-display font-bold rounded-md text-base hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              Explore Solutions
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="px-7 py-3 border border-primary/40 text-primary font-display font-bold rounded-md text-base hover:bg-primary/10 hover:border-primary/60 transition-all duration-300"
            >
              Book a Consulting Call!
            </button>
          </motion.div>
        </div>

        {/* Right: 3D Product Slider */}
        <motion.div
          className="hidden lg:flex items-center justify-center h-80"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <ProductSlider3D />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
