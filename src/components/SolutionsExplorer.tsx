import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Cog, Wind, Package } from "lucide-react";

const solutions = [
  {
    icon: Cog,
    title: "Size Reduction",
    subtitle: "Milling & Grinding",
    description: "High-efficiency milling systems for ultra-fine grinding. Pin mills, hammer mills, air classifying mills, and jet mills for precise particle size control.",
    specs: ["Particle size: 1–500 microns", "Capacity: 10 kg/hr to 10 TPH", "GMP & ATEX compliant options"],
  },
  {
    icon: Package,
    title: "Powder Handling",
    subtitle: "Mixing & Conveying",
    description: "Complete powder handling solutions from mixing to conveying. Ribbon blenders, conical mixers, pneumatic conveying systems, and sifters for seamless material flow.",
    specs: ["Batch: 50L to 10,000L", "Continuous processing", "Dust-free operation"],
  },
  {
    icon: Wind,
    title: "Emission Control",
    subtitle: "Air Pollution Systems",
    description: "Advanced air pollution control equipment including bag filters, cyclone separators, scrubbers, and dust collection systems to meet environmental compliance.",
    specs: ["99.9% collection efficiency", "Custom CFD design", "Turnkey installations"],
  },
];

const SolutionCard = ({ solution, index }: { solution: typeof solutions[0]; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = solution.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onClick={() => setExpanded(!expanded)}
      className={`relative group cursor-pointer rounded-xl border transition-all duration-500 overflow-hidden ${
        expanded
          ? "border-primary/50 bg-card border-glow-amber"
          : "border-border hover:border-primary/30 bg-card/50 hover:bg-card"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative p-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold text-foreground">{solution.title}</h3>
            <p className="text-primary/80 text-sm font-medium">{solution.subtitle}</p>
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
              <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Key Specs</h4>
              <ul className="space-y-1">
                {solution.specs.map((spec) => (
                  <li key={spec} className="text-sm text-muted-foreground flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium">
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
