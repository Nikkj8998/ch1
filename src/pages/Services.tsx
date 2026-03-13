import { motion } from "framer-motion";
import { Wrench, Settings, RefreshCw, GraduationCap, TrendingUp, ShieldCheck, FlaskConical } from "lucide-react";
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

const SV_CX = 200, SV_CY = 200;
const R_ORBIT = 128;

const serviceNodes = [
  { label: "Spares",   sub: "Spare Parts",   angle: -90,  slx: 0,   sly: -34, anchor: "middle" },
  { label: "Maintain", sub: "Maintenance",   angle: -30,  slx: 30,  sly: -18, anchor: "start"  },
  { label: "Repair",   sub: "Refurbish",     angle:  30,  slx: 30,  sly:  18, anchor: "start"  },
  { label: "Train",    sub: "Training",      angle:  90,  slx: 0,   sly:  34, anchor: "middle" },
  { label: "Upgrade",  sub: "Optimise",      angle: 150,  slx: -30, sly:  18, anchor: "end"    },
  { label: "Warranty", sub: "Extended",      angle: -150, slx: -30, sly: -18, anchor: "end"    },
];

function nodePos(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: SV_CX + R_ORBIT * Math.cos(rad), y: SV_CY + R_ORBIT * Math.sin(rad) };
}

const ServicesVisual = () => (
  <div className="relative w-full flex items-center justify-center">
    <div className="absolute w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
    <svg viewBox="0 0 400 400" className="w-full max-w-md h-auto">
      <defs>
        <filter id="svc-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Outer slowly-rotating decorative ring */}
      <motion.circle
        cx={SV_CX} cy={SV_CY} r={168}
        fill="none" stroke="hsl(42,100%,55%)" strokeWidth="0.6" opacity="0.18"
        strokeDasharray="6 14"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: `${SV_CX}px ${SV_CY}px` }}
      />
      {/* Mid ring counter-rotate */}
      <motion.circle
        cx={SV_CX} cy={SV_CY} r={148}
        fill="none" stroke="hsl(42,100%,55%)" strokeWidth="0.4" opacity="0.1"
        strokeDasharray="3 20"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: `${SV_CX}px ${SV_CY}px` }}
      />

      {/* Connection spokes: center → each node */}
      {serviceNodes.map((node, i) => {
        const { x, y } = nodePos(node.angle);
        return (
          <line key={`spoke-${i}`}
            x1={SV_CX} y1={SV_CY} x2={x} y2={y}
            stroke="hsl(42,100%,55%)" strokeWidth="0.8" opacity="0.2"
          />
        );
      })}

      {/* Animated particle dots traveling along spokes */}
      {serviceNodes.map((node, i) => {
        const { x, y } = nodePos(node.angle);
        return (
          <motion.circle
            key={`dot-${i}`}
            r="3.5" fill="hsl(42,100%,65%)" opacity="0.9" filter="url(#svc-glow)"
            initial={{ cx: SV_CX, cy: SV_CY }}
            animate={{ cx: [SV_CX, x, SV_CX], cy: [SV_CY, y, SV_CY] }}
            transition={{ duration: 2.4, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      })}

      {/* Central hub */}
      <motion.circle
        cx={SV_CX} cy={SV_CY} r={36}
        fill="hsl(220,30%,7%)" stroke="hsl(42,100%,55%)" strokeWidth="1.5"
        animate={{ scale: [1, 1.04, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: `${SV_CX}px ${SV_CY}px` }}
      />
      {/* Hub pulse ring */}
      <motion.circle
        cx={SV_CX} cy={SV_CY} r={36}
        fill="none" stroke="hsl(42,100%,55%)" strokeWidth="1"
        animate={{ scale: [1, 1.56, 1.94], opacity: [0.6, 0.2, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
        style={{ transformOrigin: `${SV_CX}px ${SV_CY}px` }}
      />
      <text x={SV_CX} y={SV_CY - 4} textAnchor="middle" dominantBaseline="middle"
        fill="hsl(42,100%,55%)" fontSize="9" fontFamily="Rajdhani,sans-serif" fontWeight="700">
        AFTER
      </text>
      <text x={SV_CX} y={SV_CY + 7} textAnchor="middle" dominantBaseline="middle"
        fill="hsl(42,100%,55%)" fontSize="9" fontFamily="Rajdhani,sans-serif" fontWeight="700">
        MARKET
      </text>

      {/* Service nodes */}
      {serviceNodes.map((node, i) => {
        const { x, y } = nodePos(node.angle);
        return (
          <motion.g
            key={`node-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.18, duration: 0.5 }}
          >
            {/* Sonar pulse */}
            <motion.circle
              cx={x} cy={y} r={22}
              fill="none" stroke="hsl(42,100%,55%)" strokeWidth="1"
              animate={{ scale: [1, 1.64, 2.18], opacity: [0.5, 0.15, 0] }}
              transition={{ duration: 2.8, delay: i * 0.7, repeat: Infinity, ease: "easeOut" }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            />
            {/* Node body */}
            <motion.circle
              cx={x} cy={y} r={22}
              fill="hsl(220,30%,7%)" stroke="hsl(42,100%,55%)" strokeWidth="1.3"
              animate={{ scale: [1, 1.068, 1] }}
              transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            />
            {/* First letter glyph */}
            <text x={x} y={y - 3} textAnchor="middle" dominantBaseline="middle"
              fill="hsl(42,100%,60%)" fontSize="13" fontFamily="Rajdhani,sans-serif" fontWeight="700">
              {node.label[0]}
            </text>
            {/* Rest of label */}
            <text x={x} y={y + 8} textAnchor="middle" dominantBaseline="middle"
              fill="hsl(42,100%,45%)" fontSize="7" fontFamily="Rajdhani,sans-serif" fontWeight="600">
              {node.label.slice(1)}
            </text>
            {/* Sub-label outside node */}
            <text
              x={x + node.slx} y={y + node.sly}
              textAnchor={node.anchor as "middle" | "start" | "end"}
              fill="hsl(42,100%,55%)" fontSize="7.5" fontFamily="Rajdhani,sans-serif" fontWeight="600" opacity="0.7"
            >
              {node.sub}
            </text>
          </motion.g>
        );
      })}

      {/* Orbiting dot on outer ring */}
      <motion.circle
        r="4" cx={SV_CX + 168} cy={SV_CY}
        fill="hsl(42,100%,65%)" filter="url(#svc-glow)"
        animate={{
          cx: [SV_CX + 168, SV_CX, SV_CX - 168, SV_CX, SV_CX + 168],
          cy: [SV_CY, SV_CY + 168, SV_CY, SV_CY - 168, SV_CY],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  </div>
);

const services = [
  {
    icon: Wrench,
    title: "Spare Parts",
    description: "We supply genuine, high-quality spare parts to keep your equipment running at peak performance.",
  },
  {
    icon: Settings,
    title: "Maintenance Packages",
    description: "Our tailored maintenance packages help maximise uptime and extend the life of your equipment.",
  },
  {
    icon: RefreshCw,
    title: "Refurbishments & Repairs",
    description: "We offer expert refurbishment and repair services to restore equipment performance and reliability.",
  },
  {
    icon: GraduationCap,
    title: "Training Packages",
    description: "We provide customised training packages to equip your teams with the skills to operate and maintain systems effectively.",
  },
  {
    icon: TrendingUp,
    title: "Optimisation Upgrades",
    description: "Our optimisation upgrades improve equipment efficiency, productivity and process performance.",
  },
  {
    icon: ShieldCheck,
    title: "Extended Warranties",
    description: "We offer extended warranties for added peace of mind and long-term equipment protection.",
  },
  {
    icon: FlaskConical,
    title: "Containment Testing",
    description: "We carry out specialist containment testing to ensure safety, compliance, and operator protection.",
  },
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-[62vh] flex items-start bg-gradient-hero overflow-hidden pt-[72px]">
          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {heroParticles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute w-1 h-1 rounded-full bg-primary/40"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                animate={{ y: [0, -28, 0], opacity: [0.2, 0.7, 0.2], scale: [1, 1.5, 1] }}
                transition={{ duration: 4 + Math.random() * 3, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(hsl(42 100% 55%) 1px,transparent 1px),linear-gradient(90deg,hsl(42 100% 55%) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-12">
            {/* Left: content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
                className="mb-4"
              >
                <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-primary text-xs font-medium bg-primary/5 uppercase tracking-widest">
                  Aftermarket Services
                </span>
              </motion.div>

              <motion.h1
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5"
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }}
              >
                <span className="text-foreground">Complete Support,</span>
                <br />
                <span className="text-primary text-glow-amber">Maximum Uptime</span>
              </motion.h1>

              <motion.p
                className="text-base text-muted-foreground max-w-lg mb-8 font-body leading-relaxed"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}
              >
                Complete aftermarket support to keep your operations running at peak performance throughout the equipment lifecycle — from spare parts to training and beyond.
              </motion.p>

              {/* Service quick-stats */}
              <motion.div
                className="grid grid-cols-2 gap-3"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.7 }}
              >
                {[
                  { icon: Wrench,       label: "Spare Parts",  count: "Genuine OEM" },
                  { icon: Settings,     label: "Maintenance",  count: "Tailored plans" },
                  { icon: RefreshCw,    label: "Repair & Refurb", count: "Expert team" },
                  { icon: TrendingUp,   label: "Upgrades",     count: "Performance+" },
                ].map(({ icon: Icon, label, count }) => (
                  <div key={label} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-primary/15 bg-primary/5 hover:border-primary/35 hover:bg-primary/10 transition-all duration-300">
                    <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-display font-bold text-foreground leading-none">{label}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{count}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: services hub animation */}
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.9 }}
            >
              <ServicesVisual />
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-6 bg-gradient-dark">
          <div className="max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {services.slice(0, 4).map((service, i) => {
                const Icon = service.icon;
                return (
                  <motion.div key={service.title}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="group p-6 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-500 flex flex-col">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{service.description}</p>
                    <button onClick={() => navigate("/contact")}
                      className="mt-4 text-primary text-sm font-semibold hover:underline self-start">
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
                  <motion.div key={service.title}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: (i + 4) * 0.1 }}
                    className="group p-6 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-500 flex flex-col">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{service.description}</p>
                    <button onClick={() => navigate("/contact")}
                      className="mt-4 text-primary text-sm font-semibold hover:underline self-start">
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
