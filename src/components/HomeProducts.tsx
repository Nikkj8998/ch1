import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Settings2, Truck, SlidersHorizontal, Shuffle, Database, Wind } from "lucide-react";

const categories = [
  {
    icon: Settings2,
    label: "Grinding Equipment",
    items: [
      "Bag Emptying Machine",
      "Air Classifying Mill (ACM)",
      "Air Swept Mill",
      "Chopper Mill",
      "Pulveriser Mill",
      "Crusher",
    ],
  },
  {
    icon: Truck,
    label: "Conveying Equipment",
    items: [
      "Belt Conveyor",
      "Bucket Elevator",
      "Chain Conveyor",
      "Screw Conveyor",
      "Pneumatic Conveying",
    ],
  },
  {
    icon: SlidersHorizontal,
    label: "Screening & Classification",
    items: [
      "Vibrating Screens",
      "Graders",
      "Cyclone Separators",
      "Destoner",
    ],
  },
  {
    icon: Shuffle,
    label: "Mixing & Blending",
    items: [
      "Ribbon Blenders",
      "Roasters",
    ],
  },
  {
    icon: Database,
    label: "Storage",
    items: [
      "Silos",
    ],
  },
  {
    icon: Wind,
    label: "Dedusting",
    items: [
      "Bag Filters",
      "Centrifugal Fans",
    ],
  },
];

const HomeProducts = () => (
  <section className="py-24 px-6 bg-background">
    <div className="max-w-7xl mx-auto">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-primary text-sm font-semibold uppercase tracking-widest">Our Products</span>
        <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-foreground">
          Equipment Catalogue
        </h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
          Industrial-grade grinding, conveying, screening, blending, storage, and dedusting equipment.
        </p>
      </motion.div>

      <div className="space-y-12">
        {categories.map((category, ci) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.08 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">{category.label}</h3>
                <div className="flex-1 h-px bg-border ml-2" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {category.items.map((item, ii) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: ci * 0.06 + ii * 0.05, duration: 0.4 }}
                    className="group rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/40 transition-all duration-300 px-4 py-4 cursor-pointer"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary mb-3 transition-colors" />
                    <p className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="text-center mt-14"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-primary-foreground font-display font-bold rounded-md text-base hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
        >
          View All Products
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default HomeProducts;
