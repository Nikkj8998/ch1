import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Wind, Layers, Settings2, Shuffle, Zap, Wrench } from "lucide-react";

const solutions = [
  {
    icon: Wind,
    title: "Air Pollution",
    subtitle: "Emission Control Systems",
    description: "Comprehensive air pollution control solutions including pulse-jet bag filters, cyclone separators, wet scrubbers, and ESP units engineered for maximum dust collection efficiency and full regulatory compliance.",
    specs: ["99.9% dust collection efficiency", "Pulse-jet & reverse-air bag filters", "Compliant with environmental norms"],
    green: false,
  },
  {
    icon: Layers,
    title: "Bulk Solid Solutions",
    subtitle: "Material Handling Systems",
    description: "End-to-end bulk solid handling systems designed for reliable, dust-free transfer of powders and granules — belt & screw conveyors, bucket elevators, silos, and complete storage solutions.",
    specs: ["Capacities from 1 TPH to 500 TPH", "Dust-free enclosed designs", "Custom flow & layout engineering"],
    green: true,
  },
  {
    icon: Settings2,
    title: "Grinding Solutions",
    subtitle: "Size Reduction Technology",
    description: "Advanced milling and grinding systems for fine and ultra-fine particle size reduction — ACM mills, pulverisers, hammer mills, and integrated air classifiers engineered for precision and throughput.",
    specs: ["d50 from 5 µm to 500 µm", "Air classifying & pin mills", "Process guarantees & lab trials"],
    green: false,
  },
  {
    icon: Shuffle,
    title: "Mixing Solutions",
    subtitle: "Blending & Homogenisation",
    description: "High-performance mixing and blending equipment for powders, granules, and pastes. Ribbon blenders, paddle mixers, plough mixers, and continuous systems tailored to your product specifications.",
    specs: ["Batch & continuous processing", "CV < 5% blend uniformity", "Jacketed & pressure-vessel designs"],
    green: true,
  },
  {
    icon: Zap,
    title: "Pneumatic Solutions",
    subtitle: "Pneumatic Conveying Systems",
    description: "Dilute and dense-phase pneumatic conveying systems for gentle, efficient transport of bulk solids across any distance. Fully engineered from source to destination with complete dust containment.",
    specs: ["Dilute & dense-phase systems", "Conveying distances up to 1000 m", "Pressure & vacuum designs"],
    green: false,
  },
  {
    icon: Wrench,
    title: "Services",
    subtitle: "AMC, Spares & Support",
    description: "Comprehensive after-sales support including annual maintenance contracts, OEM spare parts supply, plant audits, retrofits, and on-site troubleshooting to maximise plant uptime and equipment life.",
    specs: ["Annual maintenance contracts (AMC)", "OEM & cross-reference spares", "On-site commissioning & support"],
    green: true,
  },
];

const SolutionCard = ({ solution, index }: { solution: typeof solutions[0]; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = solution.icon;
  const isGreen = solution.green;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onClick={() => setExpanded(!expanded)}
      className={`relative group cursor-pointer rounded-xl border transition-all duration-500 overflow-hidden ${
        isGreen
          ? expanded
            ? "border-green-500/70 bg-card"
            : "border-green-500/40 bg-card/50 hover:border-green-500/70 hover:bg-card"
          : expanded
          ? "border-primary/50 bg-card border-glow-amber"
          : "border-border hover:border-primary/30 bg-card/50 hover:bg-card"
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${isGreen ? "from-green-500/5" : "from-primary/5"} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative p-8">
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-lg ${isGreen ? "bg-green-500/10 border-green-500/20 group-hover:bg-green-500/15" : "bg-primary/10 border-primary/20 group-hover:bg-primary/15"} border flex items-center justify-center shrink-0 transition-colors`}>
            <Icon className={`w-6 h-6 ${isGreen ? "text-green-400" : "text-primary"}`} />
          </div>
          <div>
            <h3 className={`font-display text-2xl font-bold ${isGreen ? "text-green-400" : "text-foreground"}`}>{solution.title}</h3>
            <p className={`${isGreen ? "text-green-400/80" : "text-primary/80"} text-sm font-medium`}>{solution.subtitle}</p>
          </div>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{solution.description}</p>

        <motion.div
          initial={false}
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-border">
            <div>
              <h4 className={`text-xs font-semibold uppercase tracking-wider ${isGreen ? "text-green-400" : "text-primary"} mb-2`}>Key Specs</h4>
              <ul className="space-y-1">
                {solution.specs.map((spec) => (
                  <li key={spec} className="text-sm text-muted-foreground flex items-center gap-2">
                    <div className={`w-1 h-1 rounded-full ${isGreen ? "bg-green-400" : "bg-primary"}`} />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <div className={`mt-4 flex items-center gap-2 ${isGreen ? "text-green-400" : "text-primary"} text-sm font-medium`}>
          <span>{expanded ? "Click to collapse" : "Click to explore"}</span>
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            ↓
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

const SolutionsExplorer = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="solutions" className="py-24 px-6 bg-gradient-dark relative">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Our Solutions</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-foreground">
            What We Offer
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Click each solution to discover capabilities and technical specifications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {solutions.map((solution, i) => (
            <SolutionCard key={solution.title} solution={solution} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsExplorer;
