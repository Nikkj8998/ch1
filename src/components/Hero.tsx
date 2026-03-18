import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Particle = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-primary/40"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
    transition={{
      duration: 4 + Math.random() * 3,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 3,
}));

// ─── Product image registry ───────────────────────────────────────
const PRODUCTS = [
  { id: "acm", label: "ACM Mill", tag: "Milling", img: "/images/3DAnimation/ACM_Mill.jfif" },
  { id: "pulv", label: "Pulveriser Mill", tag: "Milling", img: "/images/3DAnimation/Pulveriser_Mill.jfif" },
  { id: "blender", label: "Blender", tag: "Mixing", img: "/images/3DAnimation/Blenders.jfif" },
  { id: "bagfilter", label: "Bag Filter", tag: "Emission Ctrl", img: "/images/3DAnimation/Bag_Filter.jfif" },
  { id: "fan", label: "Centrifugal Fan", tag: "Air Handling", img: "/images/3DAnimation/Centrifugal_Fan.jfif" },
  { id: "grader", label: "Grader", tag: "Classifying", img: "/images/3DAnimation/Grader.jfif" },
  { id: "belt", label: "Belt Conveyor", tag: "Conveying", img: "/images/3DAnimation/Belt_Converyor.jfif" },
  { id: "screw", label: "Screw Conveyor", tag: "Conveying", img: "/images/3DAnimation/Screw_Converyor.jfif" },
];

const INTERVAL = 3400;

// ─── Main 3D Showcase ─────────────────────────────────────────────
const Product3DShowcase = () => {
  const [idx, setIdx] = useState(0);

  const advance = useCallback(() => setIdx((i) => (i + 1) % PRODUCTS.length), []);

  useEffect(() => {
    const id = setInterval(advance, INTERVAL);
    return () => clearInterval(id);
  }, [advance]);

  const { label, tag, img } = PRODUCTS[idx];

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full select-none">

      {/* Outer ring glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-72 h-72 rounded-full border border-primary/10 animate-ping-slow" style={{ animationDuration: "4s" }} />
      </div>

      {/* Label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`label-${idx}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="mb-4 flex flex-col items-center gap-1.5 z-10"
        >
          <span className="px-3 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-widest border border-primary/40 text-primary bg-primary/10 font-display">
            {tag}
          </span>
          <p className="text-primary font-display font-bold text-xl tracking-wide" style={{ textShadow: "0 0 18px rgba(200,146,26,0.55)" }}>
            {label}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* 3D image card */}
      <div className="relative w-full max-w-[320px] sm:max-w-[380px] z-10">
        {/* Decorative corner brackets */}
        <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-primary/60 rounded-tl z-20" />
        <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-primary/60 rounded-tr z-20" />
        <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-primary/60 rounded-bl z-20" />
        <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-primary/60 rounded-br z-20" />

        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.88, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.92, rotateY: 12 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            style={{ perspective: "800px", transformStyle: "preserve-3d" }}
          >
            {/* Floating bob + 3D tilt */}
            <motion.div
              animate={{ y: [0, -10, 0], rotateX: [2, -2, 2], rotateY: [-4, 4, -4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Image container */}
              <div
                className="relative overflow-hidden rounded-xl"
                style={{
                  background: "linear-gradient(135deg, rgba(10,18,28,0.95) 0%, rgba(20,30,45,0.9) 100%)",
                  boxShadow: "0 0 0 1px rgba(200,146,26,0.18), 0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(200,146,26,0.12)",
                }}
              >
                {/* Scan line effect */}
                <motion.div
                  className="absolute inset-x-0 h-[2px] z-20 pointer-events-none"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(200,146,26,0.35), transparent)" }}
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                />

                {/* Top glare */}
                <div className="absolute inset-x-0 top-0 h-20 z-10 pointer-events-none"
                  style={{ background: "linear-gradient(to bottom, rgba(200,146,26,0.06), transparent)" }} />

                {/* Product image */}
                <img
                  src={img}
                  alt={label}
                  className="w-full object-cover"
                  style={{ aspectRatio: "4/3", display: "block", filter: "brightness(0.92) contrast(1.05) saturate(1.1)" }}
                  draggable={false}
                />

                {/* Bottom reflection bar */}
                <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(200,146,26,0.08), transparent)" }} />
              </div>

              {/* Floor reflection */}
              <div
                className="w-full mt-0.5 overflow-hidden rounded-b-xl opacity-20 pointer-events-none"
                style={{ height: "40px", transform: "scaleY(-1)" }}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full object-cover object-top"
                  style={{ height: "80px", filter: "blur(2px) brightness(0.5) saturate(0.6)" }}
                  draggable={false}
                />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom ambient glow */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-6 rounded-full blur-xl pointer-events-none"
          style={{ background: "rgba(200,146,26,0.22)" }} />
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 mt-5 z-10">
        {PRODUCTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="transition-all duration-300"
          >
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: i === idx ? "20px" : "6px",
                height: "6px",
                background: i === idx ? "#C8921A" : "rgba(200,146,26,0.3)",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────
const Hero = () => {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-start overflow-hidden pt-[100px]"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home-bg.jpeg')" }}
      />
      {/* Executive dark overlay: deep navy-black gradient for professionalism */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#060d14]/95 via-[#060d14]/80 to-[#060d14]/50" />
      {/* Bottom fade to blend into the rest of the page */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <Particle key={p.id} x={p.x} y={p.y} delay={p.delay} />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start py-10 md:py-12">
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
            <span className="text-primary text-glow-amber">
              Powering Throughput
            </span>
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-muted-foreground max-w-lg mb-8 font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Milling, mixing, and emission control solutions engineered for
            maximum efficiency. From lab trials to turnkey installations.
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

        {/* Right: 3D Product Showcase — visible on all screen sizes */}
        <motion.div
          className="flex items-center justify-center w-full"
          style={{ minHeight: "clamp(260px, 45vw, 440px)" }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Product3DShowcase />
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
