import { motion } from "framer-motion";
import { Pill, Wheat, Beaker, Mountain } from "lucide-react";

const industries = [
  {
    icon: Pill,
    name: "Pharmaceuticals",
    useCases: "API micronization, excipient processing, GMP-compliant milling and containment systems.",
  },
  {
    icon: Wheat,
    name: "Food & Spices",
    useCases: "Cryogenic spice grinding, sugar milling, powder blending with hygiene-grade finishes.",
  },
  {
    icon: Beaker,
    name: "Chemicals",
    useCases: "Pigment grinding, agrochemical processing, ATEX-rated milling and dust collection.",
  },
  {
    icon: Mountain,
    name: "Minerals",
    useCases: "calcium carbonate, talc, and mineral ore processing with high throughput and wear-resistant designs.",
  },
];

const Industries = () => (
  <section id="industries" className="py-24 px-6 bg-gradient-dark">
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-primary text-sm font-semibold uppercase tracking-widest">Industries</span>
        <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-foreground">
          Sectors We Serve
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {industries.map((ind, i) => {
          const Icon = ind.icon;
          return (
            <motion.div
              key={ind.name}
              className="group relative p-6 rounded-xl border border-border bg-card/40 hover:border-primary/40 hover:bg-card transition-all duration-500 cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">{ind.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-h-0 group-hover:max-h-40 overflow-hidden">
                  {ind.useCases}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Industries;
