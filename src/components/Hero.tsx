import { motion } from "framer-motion";

const Particle = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-primary/40"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{
      y: [0, -30, 0],
      opacity: [0.2, 0.8, 0.2],
      scale: [1, 1.5, 1],
    }}
    transition={{ duration: 4 + Math.random() * 3, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 3,
}));

// Animated right-side visual: rotating hex rings + orbiting nodes
const HeroVisual = () => {
  const rings = [80, 120, 160];
  const nodes = [
    { angle: 0, ring: 1, label: "Mill" },
    { angle: 60, ring: 0, label: "Mix" },
    { angle: 120, ring: 2, label: "Filter" },
    { angle: 180, ring: 1, label: "Classify" },
    { angle: 240, ring: 0, label: "Convey" },
    { angle: 300, ring: 2, label: "Control" },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Glow backdrop */}
      <div className="absolute w-80 h-80 rounded-full bg-primary/5 blur-3xl" />

      <svg viewBox="0 0 400 400" className="w-full max-w-md h-auto">
        {/* Rotating hex rings */}
        {rings.map((r, i) => (
          <motion.polygon
            key={i}
            points={Array.from({ length: 6 }, (_, j) => {
              const angle = (Math.PI / 3) * j - Math.PI / 6;
              return `${200 + r * Math.cos(angle)},${200 + r * Math.sin(angle)}`;
            }).join(" ")}
            fill="none"
            stroke="hsl(42 100% 55%)"
            strokeWidth={1 - i * 0.2}
            opacity={0.4 - i * 0.1}
            animate={{ rotate: [0, i % 2 === 0 ? 360 : -360] }}
            transition={{ duration: 30 + i * 10, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "200px 200px" }}
          />
        ))}

        {/* Orbiting nodes */}
        {nodes.map((node, i) => {
          const r = rings[node.ring];
          const baseAngle = (node.angle * Math.PI) / 180 - Math.PI / 6;
          const cx = 200 + r * Math.cos(baseAngle);
          const cy = 200 + r * Math.sin(baseAngle);
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
            >
              <motion.circle
                cx={cx}
                cy={cy}
                r={18}
                fill="hsl(220 30% 8%)"
                stroke="hsl(42 100% 55%)"
                strokeWidth={1.2}
                animate={{ r: [18, 20, 18] }}
                transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <text
                x={cx}
                y={cy + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="hsl(42 100% 55%)"
                fontSize="9"
                fontFamily="Rajdhani, sans-serif"
                fontWeight="600"
              >
                {node.label}
              </text>
            </motion.g>
          );
        })}

        {/* Center hex */}
        <motion.polygon
          points={Array.from({ length: 6 }, (_, j) => {
            const angle = (Math.PI / 3) * j - Math.PI / 6;
            return `${200 + 30 * Math.cos(angle)},${200 + 30 * Math.sin(angle)}`;
          }).join(" ")}
          fill="hsl(42 100% 55% / 0.1)"
          stroke="hsl(42 100% 55%)"
          strokeWidth={1.5}
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "200px 200px" }}
        />
        <text
          x={200}
          y={200}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="hsl(42 100% 55%)"
          fontSize="11"
          fontFamily="Rajdhani, sans-serif"
          fontWeight="700"
        >
          CarbonHive
        </text>

        {/* Connecting lines (pulse effect) */}
        {nodes.map((node, i) => {
          const r = rings[node.ring];
          const baseAngle = (node.angle * Math.PI) / 180 - Math.PI / 6;
          const cx = 200 + r * Math.cos(baseAngle);
          const cy = 200 + r * Math.sin(baseAngle);
          return (
            <motion.line
              key={`line-${i}`}
              x1={200}
              y1={200}
              x2={cx}
              y2={cy}
              stroke="hsl(42 100% 55%)"
              strokeWidth={0.5}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0.1] }}
              transition={{ delay: 1.5 + i * 0.1, duration: 2, repeat: Infinity }}
            />
          );
        })}
      </svg>
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

        {/* Right: Animated Visual */}
        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <HeroVisual />
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