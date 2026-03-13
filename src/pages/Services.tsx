import { motion } from "framer-motion";
import {
  Wrench,
  Settings,
  RefreshCw,
  GraduationCap,
  TrendingUp,
  ShieldCheck,
  FlaskConical,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CallCTA from "@/components/CallCTA";

// ─── Services Hero Animation ──────────────────────────────────────
const heroParticles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 4,
}));

// Gear A (large, CW): cx=150 cy=205 r=68  period=22s
// Gear B (medium, CCW): cx=261 cy=141 r=44  period=14.2s — meshes with A
// Gear C (small, CCW): cx=249 cy=262 r=30  period=9.7s  — meshes with A
// Tooth pitch ~14.9px so all gears share the same dasharray

const TOOTH_DASH = "14.9 14.9";
const FONT = "Rajdhani,sans-serif";
const AMBER = "hsl(42,100%,55%)";
const AMBER_LO = "hsl(42,100%,40%)";
const BG = "hsl(220,30%,7%)";

type GearDef = {
  cx: number;
  cy: number;
  r: number;
  label: string;
  sub: string;
  period: number;
  ccw?: boolean;
};

const GEARS: GearDef[] = [
  {
    cx: 150,
    cy: 205,
    r: 68,
    label: "MAINTAIN",
    sub: "Service Hub",
    period: 22,
  },
  {
    cx: 261,
    cy: 141,
    r: 44,
    label: "REPAIR",
    sub: "& Refurb",
    period: 14.2,
    ccw: true,
  },
  {
    cx: 249,
    cy: 262,
    r: 30,
    label: "UPGRADE",
    sub: "& Train",
    period: 9.7,
    ccw: true,
  },
];

function Gear({ cx, cy, r, label, sub, period, ccw = false }: GearDef) {
  const toothR = r + 8;
  const innerR = r - 6;
  const hubR = r * 0.22;
  const spokeAngles = [0, 60, 120, 180, 240, 300];
  return (
    <g>
      {/* Rotating part: teeth + body + spokes */}
      <motion.g
        animate={{ rotate: ccw ? [0, -360] : [0, 360] }}
        transition={{ duration: period, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        {/* Teeth ring */}
        <circle
          cx={cx}
          cy={cy}
          r={toothR}
          fill="none"
          stroke={AMBER}
          strokeWidth="14"
          strokeDasharray={TOOTH_DASH}
          opacity="0.7"
        />
        {/* Body */}
        <circle
          cx={cx}
          cy={cy}
          r={innerR}
          fill={BG}
          stroke={AMBER}
          strokeWidth="1.4"
          opacity="0.92"
        />
        {/* Spokes */}
        {spokeAngles.map((a) => {
          const rad = (a * Math.PI) / 180;
          return (
            <line
              key={a}
              x1={cx + hubR * Math.cos(rad)}
              y1={cy + hubR * Math.sin(rad)}
              x2={cx + innerR * 0.82 * Math.cos(rad)}
              y2={cy + innerR * 0.82 * Math.sin(rad)}
              stroke={AMBER}
              strokeWidth="1.2"
              opacity="0.3"
            />
          );
        })}
        {/* Hub cap */}
        <circle cx={cx} cy={cy} r={hubR} fill={AMBER} opacity="0.25" />
      </motion.g>

      {/* Static label (never rotates) */}
      <text
        x={cx}
        y={cy - 5}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={AMBER}
        fontSize={r * 0.195}
        fontFamily={FONT}
        fontWeight="700"
        style={{ pointerEvents: "none" }}
      >
        {label}
      </text>
      <text
        x={cx}
        y={cy + r * 0.18}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={AMBER_LO}
        fontSize={r * 0.13}
        fontFamily={FONT}
        fontWeight="600"
        style={{ pointerEvents: "none" }}
      >
        {sub}
      </text>
    </g>
  );
}

// Mesh-point spark particles
const MESH_PTS = [
  { x: 209, y: 171 }, // A–B contact
  { x: 202, y: 241 }, // A–C contact
];

const ServicesVisual = () => (
  <div className="relative w-full flex items-center justify-center">
    <div className="absolute w-64 h-64 rounded-full bg-primary/6 blur-3xl pointer-events-none" />
    <svg viewBox="0 0 400 400" className="w-full max-w-[420px] h-auto">
      <defs>
        <filter id="gear-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="mesh-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={AMBER} stopOpacity="0.35" />
          <stop offset="100%" stopColor={AMBER} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Mesh-point glow patches */}
      {MESH_PTS.map((pt, i) => (
        <motion.circle
          key={i}
          cx={pt.x}
          cy={pt.y}
          r={18}
          fill="url(#mesh-glow)"
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.15, 0.9] }}
          transition={{
            duration: 1.8,
            delay: i * 0.9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: `${pt.x}px ${pt.y}px` }}
        />
      ))}

      {/* Spark dots at mesh points */}
      {MESH_PTS.map((pt, pi) =>
        [0, 1, 2].map((si) => (
          <motion.circle
            key={`spark-${pi}-${si}`}
            r="2"
            fill={AMBER}
            filter="url(#gear-glow)"
            initial={{ cx: pt.x, cy: pt.y, opacity: 0.9, scale: 1 }}
            animate={{
              cx: [pt.x, pt.x + (si - 1) * 12, pt.x + (si - 1) * 20],
              cy: [pt.y, pt.y - 10 - si * 4, pt.y - 22 - si * 6],
              opacity: [0.9, 0.5, 0],
              scale: [1, 0.7, 0],
            }}
            transition={{
              duration: 0.9,
              delay: pi * 0.6 + si * 0.3,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        )),
      )}

      {/* The three gears */}
      {GEARS.map((g) => (
        <Gear key={g.label} {...g} />
      ))}

      {/* Corner service badges */}
      {[
        { x: 340, y: 80, text: "Spare Parts" },
        { x: 340, y: 330, text: "Warranty" },
        { x: 48, y: 80, text: "Containment" },
        { x: 48, y: 330, text: "Training" },
      ].map(({ x, y, text }) => (
        <motion.g
          key={text}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <rect
            x={x - 32}
            y={y - 9}
            width="64"
            height="18"
            rx="4"
            fill={BG}
            stroke={AMBER}
            strokeWidth="0.7"
            opacity="0.5"
          />
          <text
            x={x}
            y={y + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={AMBER}
            fontSize="7.5"
            fontFamily={FONT}
            fontWeight="600"
            opacity="0.75"
          >
            {text}
          </text>
        </motion.g>
      ))}
    </svg>
  </div>
);

const services = [
  {
    icon: Wrench,
    image: "/services/spare-parts.png",
    title: "Spare Parts",
    description:
      "We supply genuine, high-quality spare parts to keep your equipment running at peak performance.",
  },
  {
    icon: Settings,
    image: "/services/maintenance.png",
    title: "Maintenance Packages",
    description:
      "Our tailored maintenance packages help maximise uptime and extend the life of your equipment.",
  },
  {
    icon: RefreshCw,
    image: "/services/refurbishment.png",
    title: "Refurbishments & Repairs",
    description:
      "We offer expert refurbishment and repair services to restore equipment performance and reliability.",
  },
  {
    icon: GraduationCap,
    image: "/services/training.png",
    title: "Training Packages",
    description:
      "We provide customised training packages to equip your teams with the skills to operate and maintain systems effectively.",
  },
  {
    icon: TrendingUp,
    image: "/services/optimisation.png",
    title: "Optimisation Upgrades",
    description:
      "Our optimisation upgrades improve equipment efficiency, productivity and process performance.",
  },
  {
    icon: ShieldCheck,
    image: "/services/warranty.png",
    title: "Extended Warranties",
    description:
      "We offer extended warranties for added peace of mind and long-term equipment protection.",
  },
  {
    icon: FlaskConical,
    image: "/services/containment.png",
    title: "Containment Testing",
    description:
      "We carry out specialist containment testing to ensure safety, compliance, and operator protection.",
  },
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative h-screen flex flex-col bg-gradient-hero overflow-hidden">
          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {heroParticles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute w-1 h-1 rounded-full bg-primary/40"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                animate={{
                  y: [0, -28, 0],
                  opacity: [0.2, 0.7, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(hsl(42 100% 55%) 1px,transparent 1px),linear-gradient(90deg,hsl(42 100% 55%) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Navbar spacer */}
          <div className="h-[72px] flex-shrink-0" />

          {/* Content fills remaining height below navbar */}
          <div className="relative z-10 flex-1 flex">
            <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch py-8">
              {/* Left: content — text and stat cards centred together */}
              <div className="flex flex-col justify-center gap-10">
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    className="mb-5"
                  >
                    <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-primary text-xs font-medium bg-primary/5 uppercase tracking-widest">
                      Aftermarket Services
                    </span>
                  </motion.div>

                  <motion.h1
                    className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.8 }}
                  >
                    <span className="text-foreground">Complete Support,</span>
                    <br />
                    <span className="text-primary text-glow-amber">
                      Maximum Uptime
                    </span>
                  </motion.h1>

                  <motion.p
                    className="text-base text-muted-foreground max-w-lg font-body leading-relaxed"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                  >
                    Complete aftermarket support to keep your operations running at
                    peak performance throughout the equipment lifecycle — from spare
                    parts to training and beyond.
                  </motion.p>
                </div>

                {/* Service quick-stats pinned to bottom */}
                <motion.div
                  className="grid grid-cols-2 gap-3"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.7 }}
                >
                  {[
                    { icon: Wrench, label: "Spare Parts", count: "Genuine OEM" },
                    { icon: Settings, label: "Maintenance", count: "Tailored plans" },
                    { icon: RefreshCw, label: "Repair & Refurb", count: "Expert team" },
                    { icon: TrendingUp, label: "Upgrades", count: "Performance+" },
                  ].map(({ icon: Icon, label, count }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 px-4 py-4 rounded-xl border border-primary/15 bg-primary/5 hover:border-primary/35 hover:bg-primary/10 transition-all duration-300"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-display font-bold text-foreground leading-none">
                          {label}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          {count}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right: services hub animation */}
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.9 }}
              >
                <ServicesVisual />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-6 bg-gradient-dark">
          <div className="max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {services.slice(0, 4).map((service, i) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group p-6 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-500 flex flex-col"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {service.description}
                    </p>
                    <button
                      onClick={() => navigate("/contact")}
                      className="mt-4 text-primary text-sm font-semibold hover:underline self-start"
                    >
                      Discover More →
                    </button>
                  </motion.div>
                );
              })}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
              {services.slice(4).map((service, i) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i + 4) * 0.1 }}
                    className="group p-6 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-500 flex flex-col"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {service.description}
                    </p>
                    <button
                      onClick={() => navigate("/contact")}
                      className="mt-4 text-primary text-sm font-semibold hover:underline self-start"
                    >
                      Discover More →
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services Overview Image */}
        <section className="py-16 px-6 bg-background">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden border border-border"
            >
              <img
                src="/images/services-reference.png"
                alt="CarbonHive Aftermarket Services Overview"
                className="w-full h-auto"
                loading="lazy"
              />
            </motion.div>
          </div>
        </section>
      </main>
      <CallCTA />
      <Footer />
    </div>
  );
};

export default Services;
