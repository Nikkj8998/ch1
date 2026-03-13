import { useState } from "react";
import { motion } from "framer-motion";
import { Wrench, Factory, Truck, Wind, RefreshCw, Headphones, Leaf, Shield, Users, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CallCTA from "@/components/CallCTA";

const whatWeDo = [
  { icon: Wrench, title: "Spares & Components", desc: "Critical wear parts and OEM-grade spares" },
  { icon: Factory, title: "Turnkey Systems", desc: "Complete grinding and powder processing plants" },
  { icon: Truck, title: "Material Handling", desc: "Bulk material handling solutions" },
  { icon: Wind, title: "Environmental Systems", desc: "Air pollution control and dust management" },
  { icon: RefreshCw, title: "Upgrades & Retrofits", desc: "Retrofit, revamp, and plant upgrade solutions" },
  { icon: Headphones, title: "Engineering Support", desc: "Technical consultation and process optimisation" },
];

const csrPillars = [
  {
    icon: Shield,
    num: "01",
    title: "Responsible Manufacturing",
    subtitle: "Quality starts with integrity",
    points: [
      "Certified materials and controlled manufacturing processes",
      "Safe, compliant working environments throughout supply chain",
      "Ethical sourcing of raw materials from accountable suppliers",
      "Full transparency with customers on product specifications",
      "Products designed to meet industrial safety and quality standards",
    ],
    quote: "Trust is built through consistency.",
    green: false,
  },
  {
    icon: Leaf,
    num: "02",
    title: "Environmental Sustainability",
    subtitle: "Engineer for longevity, not replacement",
    points: [
      "High-efficiency grinding and classification systems",
      "Long-life, wear-resistant spare parts for harsh conditions",
      "Energy-optimised equipment reducing costs and carbon footprint",
      "Air pollution control and dust collection systems",
      "Retrofit solutions extending plant life",
    ],
    quote: "The most sustainable machine is the one that runs longer, consumes less, and produces minimal waste.",
    green: true,
  },
  {
    icon: Users,
    num: "03",
    title: "Community Commitment",
    subtitle: "Growing together",
    points: [
      "Supporting skill development in engineering and manufacturing",
      "Partnering with local vendors to strengthen supply chains",
      "Promoting safe industrial practices across client sites",
      "Hands-on technical guidance for efficient plant operation",
    ],
    quote: "Progress is meaningful only when it benefits industry, society, and the environment together.",
    green: false,
  },
];

const GREEN = "hsl(142 70% 50%)";
const GREEN_DIM = "hsl(142 70% 35%)";

const CSRCard = ({ pillar, index }: { pillar: typeof csrPillars[0]; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = pillar.icon;
  const isGreen = pillar.green;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onClick={() => setExpanded(!expanded)}
      style={isGreen ? {
        borderColor: expanded ? GREEN : GREEN_DIM,
        boxShadow: expanded ? `0 0 18px 2px hsl(142 70% 40% / 0.35)` : `0 0 8px 1px hsl(142 70% 40% / 0.18)`,
      } : {}}
      className={`cursor-pointer rounded-xl border transition-all duration-500 ${
        isGreen
          ? "bg-card/50 hover:bg-card"
          : expanded
            ? "border-primary/50 bg-card border-glow-amber"
            : "border-border hover:border-primary/30 bg-card/50 hover:bg-card"
      }`}
    >
      <div className="p-6">
        <div className="flex items-start gap-4 mb-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border transition-colors duration-300 ${
              isGreen ? "" : "bg-primary/10 border-primary/20"
            }`}
            style={isGreen ? { backgroundColor: "hsl(142 70% 50% / 0.12)", borderColor: "hsl(142 70% 50% / 0.35)" } : {}}
          >
            <Icon className="w-5 h-5" style={{ color: isGreen ? GREEN : "hsl(var(--primary))" }} />
          </div>
          <div className="flex-1">
            <span className="font-display font-bold text-sm" style={isGreen ? { color: GREEN } : { color: "hsl(var(--primary))" }}>{pillar.num}</span>
            <h4 className="font-display text-lg font-bold text-foreground">{pillar.title}</h4>
            <p className="text-sm text-muted-foreground italic">{pillar.subtitle}</p>
          </div>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }}>
            <ChevronDown className="w-4 h-4" style={isGreen ? { color: GREEN } : { color: "hsl(var(--primary))" }} />
          </motion.div>
        </div>

        <motion.div
          initial={false}
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <ul className="space-y-2 mb-4 pt-3 border-t border-border">
            {pillar.points.map((p) => (
              <li key={p} className="text-sm text-muted-foreground flex items-start gap-2">
                <div className="w-1 h-1 rounded-full mt-2 shrink-0" style={isGreen ? { backgroundColor: GREEN } : { backgroundColor: "hsl(var(--primary))" }} />
                {p}
              </li>
            ))}
          </ul>
          <p className="text-sm italic" style={isGreen ? { color: `hsl(142 70% 50% / 0.85)` } : { color: "hsl(var(--primary) / 0.8)" }}>"{pillar.quote}"</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const HeroVisualBg = () => {
  const rings = [120, 200, 280];
  const nodes = [
    { angle: 0, ring: 1, label: "Mill" },
    { angle: 60, ring: 0, label: "Mix" },
    { angle: 120, ring: 2, label: "Filter" },
    { angle: 180, ring: 1, label: "Classify" },
    { angle: 240, ring: 0, label: "Convey" },
    { angle: 300, ring: 2, label: "Control" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-20">
      <svg viewBox="0 0 600 600" className="w-[80vmin] h-[80vmin]">
        {rings.map((r, i) => (
          <motion.polygon
            key={i}
            points={Array.from({ length: 6 }, (_, j) => {
              const angle = (Math.PI / 3) * j - Math.PI / 6;
              return `${300 + r * Math.cos(angle)},${300 + r * Math.sin(angle)}`;
            }).join(" ")}
            fill="none"
            stroke="hsl(42 100% 55%)"
            strokeWidth={1 - i * 0.2}
            opacity={0.5 - i * 0.1}
            animate={{ rotate: [0, i % 2 === 0 ? 360 : -360] }}
            transition={{ duration: 40 + i * 15, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "300px 300px" }}
          />
        ))}
        {nodes.map((node, i) => {
          const r = rings[node.ring];
          const baseAngle = (node.angle * Math.PI) / 180 - Math.PI / 6;
          const cx = 300 + r * Math.cos(baseAngle);
          const cy = 300 + r * Math.sin(baseAngle);
          return (
            <motion.g key={i}>
              <motion.circle cx={cx} cy={cy} r={22}
                fill="hsl(220 30% 8%)" stroke="hsl(42 100% 55%)" strokeWidth={1}
                animate={{ r: [22, 25, 22] }}
                transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }} />
              <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle"
                fill="hsl(42 100% 55%)" fontSize="11" fontFamily="Rajdhani, sans-serif" fontWeight="600">
                {node.label}
              </text>
            </motion.g>
          );
        })}
        <motion.polygon
          points={Array.from({ length: 6 }, (_, j) => {
            const angle = (Math.PI / 3) * j - Math.PI / 6;
            return `${300 + 40 * Math.cos(angle)},${300 + 40 * Math.sin(angle)}`;
          }).join(" ")}
          fill="hsl(42 100% 55% / 0.1)" stroke="hsl(42 100% 55%)" strokeWidth={1.5}
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "300px 300px" }} />
        <text x={300} y={300} textAnchor="middle" dominantBaseline="middle"
          fill="hsl(42 100% 55%)" fontSize="14" fontFamily="Rajdhani, sans-serif" fontWeight="700">
          CarbonHive
        </text>
        {nodes.map((node, i) => {
          const r = rings[node.ring];
          const baseAngle = (node.angle * Math.PI) / 180 - Math.PI / 6;
          const cx = 300 + r * Math.cos(baseAngle);
          const cy = 300 + r * Math.sin(baseAngle);
          return (
            <motion.line key={`line-${i}`} x1={300} y1={300} x2={cx} y2={cy}
              stroke="hsl(42 100% 55%)" strokeWidth={0.5}
              animate={{ opacity: [0, 0.3, 0.1] }}
              transition={{ delay: i * 0.2, duration: 2, repeat: Infinity }} />
          );
        })}
      </svg>
    </div>
  );
};

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center px-6 bg-gradient-hero relative overflow-hidden">
          {/* Background image — object-contain so the full figure is always visible */}
          <div className="absolute inset-0 z-0 flex items-center justify-end pointer-events-none">
            <img
              src="/images/about-hero.png"
              alt=""
              className="h-full w-full object-contain object-right opacity-70 select-none"
              draggable={false}
            />
          </div>
          {/* Gradient — dark on left for text readability, fully transparent on right so engineers show clearly */}
          <div className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, hsl(220 30% 5% / 1) 0%, hsl(220 30% 5% / 0.95) 20%, hsl(220 30% 5% / 0.6) 45%, hsl(220 30% 5% / 0.15) 65%, transparent 80%)",
            }}
          />
          <HeroVisualBg />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.span className="text-primary text-sm font-semibold uppercase tracking-widest"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              Who We Are
            </motion.span>
            <motion.h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-3 text-foreground"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              Engineering That <span className="text-primary text-glow-amber">Performs</span>.
              <br />Solutions That <span className="text-primary text-glow-amber">Last</span>.
            </motion.h1>
            <motion.p className="text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              CarbonHive is an industrial engineering company built around one core belief: well-engineered equipment, made to last, is the most powerful investment any industry can make.
            </motion.p>
          </div>
        </section>

        {/* About Text */}
        <section className="py-16 px-6 bg-gradient-dark">
          <div className="max-w-4xl mx-auto">
            <motion.div className="space-y-5 text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p>
                We specialise in grinding systems, powder processing solutions, bulk material handling, air pollution control, and precision spare parts for industrial applications. Serving sectors including spice processing, food manufacturing, chemicals, minerals, and bulk powder handling, we deliver both OEM components and complete plant solutions.
              </p>
              <p>
                What sets CarbonHive apart is not just what we build, it is how we think. Every product, system, and spare part is engineered with a focus on extended service life, reduced downtime, and total cost of ownership. We don't just supply equipment. <span className="text-primary font-semibold">We solve process problems.</span>
              </p>
              <blockquote className="border-l-2 border-primary pl-4 py-2 italic text-primary/80">
                "Sustainable engineering is not about reducing impact alone. It is about designing systems that perform longer, consume less, and create lasting value for those who rely on them."
              </blockquote>
            </motion.div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-16 px-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">What We Do</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">
                Complete Lifecycle Support
              </h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {whatWeDo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="group p-6 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 px-6 bg-gradient-dark">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <motion.div className="p-8 rounded-xl border border-border bg-card/50"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className="font-display text-2xl font-bold text-primary mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be a globally trusted engineering brand, delivering sustainable, high-performance grinding and material processing solutions that create long-term value for industry, people, and the environment.
              </p>
            </motion.div>
            <motion.div className="p-8 rounded-xl border border-primary/20 bg-primary/5"
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className="font-display text-2xl font-bold text-primary mb-4">Our Mission</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />Deliver reliable OEM and aftermarket solutions that perform when it matters most</li>
                <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />Extend equipment life and maximise operational efficiency</li>
                <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />Reduce waste, energy consumption, and unplanned downtime</li>
                <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />Promote sustainable and responsible industrial technology</li>
                <li className="flex gap-2"><div className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />Build enduring partnerships with customers and communities</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* CSR */}
        <section className="py-16 px-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">Corporate Social Responsibility</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-foreground">
                Engineering for a Better Future
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                CSR is not a policy document. It is an engineering principle.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-5">
              {csrPillars.map((pillar, i) => (
                <CSRCard key={pillar.num} pillar={pillar} index={i} />
              ))}
            </div>
            <motion.p className="text-center mt-10 font-display text-lg font-bold text-foreground"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              Engineering for Performance. Designed for Sustainability. <span className="text-primary">Built for Industry.</span>
            </motion.p>
          </div>
        </section>
      </main>
      <CallCTA />
      <Footer />
    </div>
  );
};

export default About;
