import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

// ─── Isometric engine ─────────────────────────────────────────────
const S = 13, CX = 150, CY = 210;
const TOP   = "#C8921A";
const FRONT = "#7A5412";
const SIDE  = "#3D2A08";
const GLOW  = "#FFB830";
const SW    = "0.7";

function px(x: number, z: number, y: number) {
  return `${(CX + (x - z) * 0.866 * S).toFixed(1)},${(CY + (x + z) * 0.5 * S - y * S).toFixed(1)}`;
}

type BoxProps = {
  ox: number; oz: number; oy: number;
  W: number;  D: number;  H: number;
  tc?: string; fc?: string; sc?: string;
};

function Box({ ox, oz, oy, W, D, H, tc = TOP, fc = FRONT, sc = SIDE }: BoxProps) {
  const side  = [px(ox+W,oz,oy),   px(ox+W,oz+D,oy), px(ox+W,oz+D,oy+H), px(ox+W,oz,oy+H)].join(" ");
  const front = [px(ox,oz,oy),     px(ox+W,oz,oy),   px(ox+W,oz,oy+H),   px(ox,oz,oy+H)  ].join(" ");
  const top   = [px(ox,oz,oy+H),   px(ox+W,oz,oy+H), px(ox+W,oz+D,oy+H), px(ox,oz+D,oy+H)].join(" ");
  return (
    <>
      <polygon points={side}  fill={sc} stroke={GLOW} strokeWidth={SW} />
      <polygon points={front} fill={fc} stroke={GLOW} strokeWidth={SW} />
      <polygon points={top}   fill={tc} stroke={GLOW} strokeWidth={SW} />
    </>
  );
}

// ─── Product Shapes ───────────────────────────────────────────────

const AcmMill = () => (
  <g>
    {/* Base plate */}
    <Box ox={-2} oz={-2} oy={-0.5} W={4} D={4} H={0.5} />
    {/* Main body */}
    <Box ox={-1.4} oz={-1.4} oy={0} W={2.8} D={2.8} H={5.2} />
    {/* Top cap wider */}
    <Box ox={-1.7} oz={-1.7} oy={5.2} W={3.4} D={3.4} H={0.6} />
    {/* Side inlet box */}
    <Box ox={1.4} oz={-0.6} oy={1.8} W={2} D={1.2} H={1.3} />
    {/* Inlet pipe neck */}
    <Box ox={1.4} oz={-0.3} oy={2.1} W={0.5} D={0.6} H={0.6} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Bottom outlet */}
    <Box ox={-0.6} oz={1.4} oy={0} W={1.2} D={1} H={1} />
  </g>
);

const Pulveriser = () => (
  <g>
    {/* Base */}
    <Box ox={-1.6} oz={-1.6} oy={-0.4} W={3.2} D={3.2} H={0.4} />
    {/* Body */}
    <Box ox={-1.2} oz={-1.2} oy={0} W={2.4} D={2.4} H={4.2} />
    {/* Collar */}
    <Box ox={-1.5} oz={-1.5} oy={4.2} W={3} D={3} H={0.4} />
    {/* Feed chute vertical */}
    <Box ox={-0.7} oz={-0.7} oy={4.6} W={1.4} D={1.4} H={2} />
    {/* Hopper top */}
    <Box ox={-1.2} oz={-1.2} oy={6.6} W={2.4} D={2.4} H={0.4} />
    {/* Side outlet */}
    <Box ox={1.2} oz={-0.5} oy={0.5} W={1.5} D={1} H={1} />
  </g>
);

const RibbonBlender = () => (
  <g>
    {/* Legs */}
    <Box ox={-3.7} oz={-1.1} oy={-1} W={0.4} D={0.4} H={1} />
    <Box ox={3.3}  oz={-1.1} oy={-1} W={0.4} D={0.4} H={1} />
    <Box ox={-3.7} oz={0.7}  oy={-1} W={0.4} D={0.4} H={1} />
    <Box ox={3.3}  oz={0.7}  oy={-1} W={0.4} D={0.4} H={1} />
    {/* Trough body */}
    <Box ox={-4} oz={-1.2} oy={0} W={8} D={2.4} H={1.6} />
    {/* Lid */}
    <Box ox={-4} oz={-1.2} oy={1.6} W={8} D={2.4} H={0.3} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Drive motor */}
    <Box ox={3.2} oz={-1} oy={1.9} W={1.8} D={2} H={1.8} tc="#C8921A" fc="#5A3A0A" sc="#2A1A04" />
    {/* Motor shaft */}
    <Box ox={3.6} oz={0.1} oy={2.4} W={0.5} D={0.3} H={0.3} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
  </g>
);

const GyroSifter = () => (
  <g>
    {/* Eccentric motor bottom */}
    <Box ox={-0.7} oz={-0.7} oy={-1.5} W={1.4} D={1.4} H={1.5} tc="#7A5412" fc="#3D2A08" sc="#1A1004" />
    {/* Layer 1 - widest */}
    <Box ox={-2.4} oz={-2.4} oy={0}   W={4.8} D={4.8} H={1}   />
    {/* Layer 2 */}
    <Box ox={-2.1} oz={-2.1} oy={1.2} W={4.2} D={4.2} H={0.9} />
    {/* Layer 3 */}
    <Box ox={-1.8} oz={-1.8} oy={2.3} W={3.6} D={3.6} H={0.9} />
    {/* Layer 4 - top */}
    <Box ox={-1.5} oz={-1.5} oy={3.4} W={3}   D={3}   H={0.8} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Inlet on top */}
    <Box ox={-0.6} oz={-0.6} oy={4.2} W={1.2} D={1.2} H={0.8} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
  </g>
);

const Crusher = () => (
  <g>
    {/* Base */}
    <Box ox={-2.2} oz={-1.7} oy={-0.4} W={4.4} D={3.4} H={0.4} />
    {/* Body */}
    <Box ox={-2}   oz={-1.5} oy={0}    W={4}   D={3}   H={3}   />
    {/* Hopper lower */}
    <Box ox={-2.5} oz={-2}   oy={3}    W={5}   D={4}   H={1}   />
    {/* Hopper upper */}
    <Box ox={-2.2} oz={-1.7} oy={4}    W={4.4} D={3.4} H={1.2} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Feed plate */}
    <Box ox={-1.8} oz={-1.3} oy={5.2}  W={3.6} D={2.6} H={0.3} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Side outlet */}
    <Box ox={-2}   oz={1.5}  oy={0.5}  W={1.5} D={1.2} H={1} />
  </g>
);

const Roaster = () => (
  <g>
    {/* Left support */}
    <Box ox={-4.5} oz={-0.5} oy={-1.5} W={1}   D={1} H={2.5} />
    {/* Right support */}
    <Box ox={3.5}  oz={-0.5} oy={-1.5} W={1}   D={1} H={2.5} />
    {/* Drum barrel */}
    <Box ox={-3.5} oz={-1.3} oy={0.5}  W={7}   D={2.6} H={2.6} />
    {/* Left end ring */}
    <Box ox={-3.7} oz={-1.3} oy={0.3}  W={0.2} D={2.6} H={3} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Right end ring */}
    <Box ox={3.5}  oz={-1.3} oy={0.3}  W={0.2} D={2.6} H={3} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Riding ring left */}
    <Box ox={-2.8} oz={-1.5} oy={0.2}  W={0.4} D={3}   H={3.1} tc="#C8921A" fc="#3D2A08" sc="#1A1004" />
    {/* Riding ring right */}
    <Box ox={2.4}  oz={-1.5} oy={0.2}  W={0.4} D={3}   H={3.1} tc="#C8921A" fc="#3D2A08" sc="#1A1004" />
    {/* Drive gear box */}
    <Box ox={3.5}  oz={-1}   oy={0.5}  W={1.5} D={2}   H={2.5} tc="#C8921A" fc="#5A3A0A" sc="#2A1A04" />
  </g>
);

const BagFilter = () => (
  <g>
    {/* Main housing */}
    <Box ox={-2}   oz={-1.5} oy={0}   W={4}   D={3}   H={7} />
    {/* Header box top */}
    <Box ox={-2.3} oz={-1.8} oy={7}   W={4.6} D={3.6} H={1.3} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Exhaust outlet top */}
    <Box ox={-0.8} oz={-0.8} oy={8.3} W={1.6} D={1.6} H={1}   tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Side inlet */}
    <Box ox={2}    oz={-0.5} oy={2.5} W={1.8} D={1}   H={1.2} />
    {/* Hopper bottom */}
    <Box ox={-1.5} oz={-1}   oy={-1.5} W={3}  D={2}   H={1.5} tc="#7A5412" fc="#3D2A08" sc="#1A1004" />
    {/* Discharge outlet */}
    <Box ox={-0.5} oz={1}    oy={-2}   W={1}  D={0.8} H={0.5} />
    {/* Support legs */}
    <Box ox={-1.8} oz={-1.3} oy={-3}   W={0.4} D={0.4} H={1.5} />
    <Box ox={1.4}  oz={-1.3} oy={-3}   W={0.4} D={0.4} H={1.5} />
    <Box ox={-1.8} oz={0.9}  oy={-3}   W={0.4} D={0.4} H={1.5} />
    <Box ox={1.4}  oz={0.9}  oy={-3}   W={0.4} D={0.4} H={1.5} />
  </g>
);

const VibScreen = () => (
  <g>
    {/* Front legs (taller) */}
    <Box ox={-3.2} oz={-1.3} oy={-2.5} W={0.4} D={0.4} H={2.5} />
    <Box ox={2.8}  oz={-1.3} oy={-2.5} W={0.4} D={0.4} H={2.5} />
    {/* Back legs (shorter, angled look) */}
    <Box ox={-3.2} oz={0.9}  oy={-1.5} W={0.4} D={0.4} H={2.5} />
    <Box ox={2.8}  oz={0.9}  oy={-1.5} W={0.4} D={0.4} H={2.5} />
    {/* Spring pads */}
    <Box ox={-3.2} oz={-1.3} oy={0}    W={0.4} D={0.4} H={0.3} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    <Box ox={2.8}  oz={-1.3} oy={0}    W={0.4} D={0.4} H={0.3} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    <Box ox={-3.2} oz={0.9}  oy={1}    W={0.4} D={0.4} H={0.3} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    <Box ox={2.8}  oz={0.9}  oy={1}    W={0.4} D={0.4} H={0.3} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Screen body (slightly angled via height offset) */}
    <Box ox={-3.5} oz={-1.5} oy={0.3}  W={7}   D={3}   H={1}   />
    {/* Second deck */}
    <Box ox={-3.3} oz={-1.3} oy={1.5}  W={6.6} D={2.6} H={0.5} tc="#FFB830" fc="#C8921A" sc="#7A5412" />
    {/* Feed inlet left */}
    <Box ox={-3.5} oz={-1.5} oy={1.3}  W={1.5} D={1}   H={1.2} />
    {/* Discharge right */}
    <Box ox={2.8}  oz={-0.5} oy={0}    W={1.5} D={1}   H={0.5} />
    {/* Vibrator motor */}
    <Box ox={-0.8} oz={1.5}  oy={1.3}  W={1.6} D={0.8} H={0.8} tc="#C8921A" fc="#5A3A0A" sc="#2A1A04" />
  </g>
);

// ─── Shape registry ───────────────────────────────────────────────
const SHAPES = [
  { id: "acm",      label: "ACM Mill",         tag: "Milling",       Component: AcmMill      },
  { id: "pulv",     label: "Pulveriser",        tag: "Milling",       Component: Pulveriser   },
  { id: "ribbon",   label: "Ribbon Blender",    tag: "Mixing",        Component: RibbonBlender},
  { id: "gyro",     label: "Gyro Sifter",       tag: "Classifying",   Component: GyroSifter   },
  { id: "crusher",  label: "Crusher",           tag: "Size Reduction",Component: Crusher      },
  { id: "roaster",  label: "Rotary Roaster",    tag: "Thermal",       Component: Roaster      },
  { id: "bagfilter",label: "Bag Filter",        tag: "Emission Ctrl", Component: BagFilter    },
  { id: "vibscreen",label: "Vibrating Screen",  tag: "Screening",     Component: VibScreen    },
];

const INTERVAL = 3400;

// ─── Main 3D Showcase ─────────────────────────────────────────────
const Product3DShowcase = () => {
  const [idx, setIdx] = useState(0);

  const advance = useCallback(() => setIdx(i => (i + 1) % SHAPES.length), []);

  useEffect(() => {
    const id = setInterval(advance, INTERVAL);
    return () => clearInterval(id);
  }, [advance]);

  const { label, tag, Component } = SHAPES[idx];

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full">
      {/* Ambient glow */}
      <div className="absolute inset-x-0 bottom-12 h-28 pointer-events-none">
        <div className="mx-auto w-64 h-full rounded-full bg-primary/15 blur-3xl" />
      </div>

      {/* SVG stage */}
      <div className="relative w-full max-w-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.88, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -10 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Floating bob */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 300 310" className="w-full h-auto">
                {/* Grid floor dots */}
                {Array.from({ length: 5 }, (_, r) =>
                  Array.from({ length: 5 }, (_, c) => {
                    const gx = CX + (c - 2 - (r - 2)) * 0.866 * S * 1.5;
                    const gy = CY + (c - 2 + (r - 2)) * 0.5 * S * 1.5 + 20;
                    return <circle key={`${r}-${c}`} cx={gx} cy={gy} r="1.2" fill={GLOW} opacity="0.18" />;
                  })
                )}
                {/* Shadow ellipse on floor */}
                <ellipse cx="150" cy="215" rx="55" ry="14" fill="hsl(42,100%,55%)" opacity="0.08" />
                {/* The shape */}
                <Component />
                {/* Subtle scan line */}
                <motion.rect
                  x="0" y="0" width="300" height="4"
                  fill="hsl(42,100%,55%)"
                  opacity="0.04"
                  animate={{ y: [50, 270, 50] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </svg>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`label-${idx}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
          className="mt-2 flex flex-col items-center gap-1"
        >
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-widest border border-primary/40 text-primary bg-primary/10 font-display">
            {tag}
          </span>
          <p className="text-primary font-display font-bold text-lg text-glow-amber">{label}</p>
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="mt-4 flex items-center gap-1.5">
        {SHAPES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`rounded-full transition-all duration-300 ${
              i === idx
                ? "w-5 h-1.5 bg-primary shadow-[0_0_6px_hsl(42_100%_55%/0.8)]"
                : "w-1.5 h-1.5 bg-muted-foreground/25 hover:bg-primary/50"
            }`}
          />
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
    <section id="hero" className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden">
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

        {/* Right: 3D Product Showcase */}
        <motion.div
          className="hidden lg:flex items-center justify-center"
          style={{ minHeight: "420px" }}
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
