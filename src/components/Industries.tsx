import { motion } from "framer-motion";
import { Zap, Building2, Mountain, Microscope, Flame, UtensilsCrossed, FlaskConical, Layers, Hammer, Droplets, Sprout, Wheat } from "lucide-react";

const industries = [
  {
    icon: Zap,
    name: "Energy & Utilities",
    useCases: "Milling and bulk handling solutions for fly ash, coal, biomass, and solid fuels used across power generation and utility plants.",
  },
  {
    icon: Building2,
    name: "Construction Materials",
    useCases: "High-throughput grinding and classification systems for cement, gypsum, lime, and construction aggregates.",
  },
  {
    icon: Mountain,
    name: "Mining & Mineral Processing",
    useCases: "Wear-resistant size reduction and conveying for calcium carbonate, talc, silica, feldspar, and a wide range of mineral ores.",
  },
  {
    icon: Microscope,
    name: "Life Sciences & Pharma",
    useCases: "cGMP-compliant milling and contained powder handling for APIs, excipients, and nutraceutical ingredients.",
  },
  {
    icon: Flame,
    name: "Flavour & Fine Ingredients — Spice",
    useCases: "Chopper mills and pulverisers for chillies, turmeric, coriander, cumin, pepper, and mixed spice blends — a core application sector.",
  },
  {
    icon: UtensilsCrossed,
    name: "Food & Beverage",
    useCases: "Size reduction and blending for sugar, cocoa, coffee, starches, dairy powders, and a broad range of food processing applications.",
  },
  {
    icon: FlaskConical,
    name: "Specialty Chemicals",
    useCases: "Precision milling and dust-controlled handling for specialty chemical powders, catalysts, and performance additives.",
  },
  {
    icon: Layers,
    name: "Coatings & Polymers",
    useCases: "Fine grinding and classification of pigments, resins, polymer powders, and coating intermediates to exacting particle specifications.",
  },
  {
    icon: Hammer,
    name: "Metallurgy & Steel",
    useCases: "Robust systems for ferro-alloys, metal powders, slag processing, and refractory materials in demanding metallurgical environments.",
  },
  {
    icon: Droplets,
    name: "Petrochemicals",
    useCases: "Conveying, screening, and emission control systems for petrochemical feedstocks, carbon black, and polymer granules.",
  },
  {
    icon: Sprout,
    name: "Agrochemicals",
    useCases: "Contained milling and blending for pesticide powders, herbicide granules, and technical-grade agrochemical formulations.",
  },
  {
    icon: Wheat,
    name: "Agricultural Inputs",
    useCases: "Processing and handling solutions for fertilisers, micronutrients, soil conditioners, and crop protection powder inputs.",
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
              className="group relative p-6 rounded-xl border border-border bg-card/40 hover:border-green-500/50 hover:bg-card transition-all duration-400 cursor-default"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
              whileHover={{ y: -4, transition: { duration: 0.22 } }}
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-green-500/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="relative">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4 group-hover:bg-green-500/20 group-hover:border-green-500/50 transition-all duration-300">
                  <Icon className="w-6 h-6 text-green-400 group-hover:text-green-300 transition-colors duration-300" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-green-100 transition-colors duration-300">{ind.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-400 max-h-0 group-hover:max-h-40 overflow-hidden">
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
