import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Settings2, Truck, SlidersHorizontal, Shuffle, Database, Wind } from "lucide-react";

const categories = [
  {
    icon: Settings2,
    label: "Grinding Equipment",
    items: ["Bag Emptying Machine", "Air Classifying Mill (ACM)", "Air Swept Mill", "Chopper Mill", "Pulveriser Mill", "Crusher"],
  },
  {
    icon: Truck,
    label: "Conveying Equipment",
    items: ["Belt Conveyor", "Bucket Elevator", "Chain Conveyor", "Screw Conveyor", "Pneumatic Conveying"],
  },
  {
    icon: SlidersHorizontal,
    label: "Screening & Classification",
    items: ["Vibrating Screens", "Graders", "Cyclone Separators", "Destoner"],
  },
  {
    icon: Shuffle,
    label: "Mixing & Blending",
    items: ["Ribbon Blenders", "Roasters"],
  },
  {
    icon: Database,
    label: "Storage",
    items: ["Silos"],
  },
  {
    icon: Wind,
    label: "Dedusting",
    items: ["Bag Filters", "Centrifugal Fans"],
  },
];

const HomeProducts = () => (
  <section className="py-28 px-6 bg-background relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-950/20 via-transparent to-transparent pointer-events-none" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,_rgba(255,255,255,0.02)_1px,_transparent_1px),linear-gradient(to_bottom,_rgba(255,255,255,0.02)_1px,_transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

    <div className="max-w-7xl mx-auto relative">
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="h-px w-8 bg-primary" />
          <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">Our Products</span>
          <div className="h-px w-8 bg-primary" />
        </div>
        <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground tracking-tight">
          Equipment Catalogue
        </h2>
        <p className="text-muted-foreground mt-5 max-w-lg mx-auto text-base leading-relaxed">
          Precision-engineered industrial equipment across six product families — built for performance, reliability, and long-term value.
        </p>
      </motion.div>

      <div className="space-y-6">
        {categories.map((category, ci) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: ci * 0.07 }}
              className="group relative rounded-2xl border border-border bg-card/40 hover:bg-card/70 hover:border-green-500/30 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500/0 via-green-500/60 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex flex-col md:flex-row md:items-center gap-6 p-6 md:p-8">
                <div className="flex items-center gap-5 md:w-64 shrink-0">
                  <span className="font-display text-4xl font-black text-border group-hover:text-green-500/30 transition-colors duration-500 select-none w-10 text-right shrink-0">
                    {String(ci + 1).padStart(2, "0")}
                  </span>
                  <div className="w-px h-10 bg-border shrink-0" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500/8 border border-green-500/20 group-hover:bg-green-500/15 group-hover:border-green-500/40 flex items-center justify-center shrink-0 transition-all duration-300">
                      <Icon className="w-5 h-5 text-green-400/70 group-hover:text-green-400 transition-colors duration-300" />
                    </div>
                    <h3 className="font-display text-base font-bold text-foreground leading-tight">{category.label}</h3>
                  </div>
                </div>

                <div className="md:w-px md:self-stretch w-full h-px bg-border shrink-0" />

                <div className="flex flex-wrap gap-2.5 flex-1">
                  {category.items.map((item, ii) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: ci * 0.05 + ii * 0.04, duration: 0.35 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background/60 hover:border-green-500/50 hover:bg-green-500/5 hover:text-green-400 text-muted-foreground text-sm font-medium transition-all duration-250 cursor-default group/tag"
                    >
                      <span className="w-1 h-1 rounded-full bg-green-500/40 group-hover/tag:bg-green-400 transition-colors shrink-0" />
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-between mt-14 pt-10 border-t border-border"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="text-muted-foreground text-sm mb-6 sm:mb-0">
          <span className="text-foreground font-semibold">{categories.reduce((a, c) => a + c.items.length, 0)} products</span> across{" "}
          <span className="text-foreground font-semibold">{categories.length} categories</span> — engineered for industrial precision.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-primary text-primary-foreground font-display font-bold rounded-lg text-sm hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 tracking-wide"
        >
          Explore Full Catalogue
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default HomeProducts;
