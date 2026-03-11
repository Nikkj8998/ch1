import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Cog, ArrowRight, Zap, Filter, Blend } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Product {
  name: string;
  description: string;
  image?: string;
  specs?: string[];
}

interface Category {
  title: string;
  icon: React.ElementType;
  products: Product[];
}

const categories: Category[] = [
  {
    title: "Grinding Equipment",
    icon: Cog,
    products: [
      {
        name: "Bag Emptying Machine",
        image: "/images/products/bag-emptying-machine.jpg",
        description: "Automatic Bag Slitting Machine purpose-built to process single and multi-layer bags with speed and precision. Integrates heavy-duty cutter, rotating trommel screen, belt conveyor, dust containment, empty bag compactor, and powder discharge screw conveyor.",
        specs: ["Dust-proof environment", "MOC: MS, SS304/SS316", "Size: 4.5m × 1.75m × 3.5m", "Human safety interlock"],
      },
      {
        name: "Air Classifying Mill (ACM)",
        image: "/images/products/acm.png",
        description: "High-performance impact grinding mill with integrated dynamic classifier for precise particle size control. Rotor disc with impact hammers handles primary size reduction while built-in classifier wheel continuously recirculates oversize particles.",
        specs: ["Models: 5ACM to 120ACM", "Power: 5–120 HP", "Fineness: 3–3000 MESH", "Cast & fabricated casing"],
      },
      {
        name: "Air Swept Mill",
        image: "/images/products/air-swept-mill.png",
        description: "Specifically designed for size reduction of soft to medium-hard, fibrous, and slightly moist materials. Air sweep assists in product discharge and cooling, ideal for heat-sensitive or sticky materials.",
        specs: ["Models: ASM-15 to ASM-40", "Power: 20–75 HP", "Fineness: 40–80mm"],
      },
      {
        name: "Chopper Mills",
        image: "/images/products/chopper-mill.png",
        description: "Engineered for controlled pre-cutting and size reduction of fibrous, leafy, or irregular materials to 10–20mm or finer. Operates at lower rotor speeds to minimize heat — preserving essential oils and natural aroma.",
        specs: ["Models: CHM 8 to CHM 32", "Ideal for chillies, herbs, dried vegetables", "Minimal fines generation"],
      },
      {
        name: "Pulveriser Mills",
        image: "/images/products/pulveriser.png",
        description: "Versatile impact mill for irregularly shaped, coarse, and granular materials from soft to medium-hard. Widely used across food, pharma, and chemical industries.",
        specs: ["Power: 1–180 HP", "Fineness: 20–200 MESH", "Models: Bantam to Double 4", "Sugar, spices, chemicals, pharma"],
      },
      {
        name: "Crushers",
        image: "/images/products/crusher.png",
        description: "Built for demanding size-reduction applications, processing brittle to medium-hard materials. Available in rigid hammer (P version) and swinging hammer (D version) configurations.",
        specs: ["Capacity: 1.5–15 ton/hr", "Power: 11–90 kW", "Feed size up to 150mm", "Double roll type available"],
      },
      {
        name: "Roasters",
        image: "/images/products/roaster.png",
        description: "Industrial thermal processing machines for spice, food, and agro-processing. Efficiently reduces moisture, enhances flavour profiles, and improves shelf life by inhibiting microbial activity.",
        specs: ["Capacity: 22–5000 litres", "Temp: up to 250°C", "MOC: SS/MS", "240V/440V options"],
      },
    ],
  },
  {
    title: "Conveying Equipment",
    icon: ArrowRight,
    products: [
      {
        name: "Belt Conveyors",
        image: "/images/products/belt-conveyor.jpg",
        description: "Built for continuous, high-volume bulk material transfer across processing lines. Heavy-duty frames and premium belting deliver consistent, reliable performance.",
        specs: ["Width: 500–2000mm", "Capacity: 5–800 TPH"],
      },
      {
        name: "Bucket Elevators",
        image: "/images/products/bucket-elevator.png",
        description: "Engineered for vertical material handling with dependable, high-efficiency transport. Available in belt type, single-leg chain, twin-leg chain, and Z-type configurations.",
        specs: ["Capacity: up to 100 TPH", "Models: COBE-150 to COBE-600", "Multiple configurations"],
      },
      {
        name: "Chain Conveyors",
        image: "/images/products/chain-conveyor.png",
        description: "Designed for reliable movement of heavy, abrasive, or high-temperature bulk materials where belt conveyors are not suitable.",
        specs: ["Width: 500–2000mm", "Capacity: up to 80 TPH", "Max incline: 30°", "Models: DC-200 to DC-600"],
      },
      {
        name: "Screw Conveyors",
        image: "/images/products/screw-conveyor.png",
        description: "Effective and controlled movement of powders, granules, and bulk solids in horizontal, vertical, and inclined orientations. Available in U-type open and O-type closed configurations.",
        specs: ["Width: 100–600mm", "Capacity: up to 15 TPH", "Types: Horizontal, Vertical, Inclined, Reversible"],
      },
      {
        name: "Pneumatic Conveying",
        image: "/images/products/pneumatic-conveying.png",
        description: "Complete pneumatic conveying systems for enclosed, dust-free transfer of powders and granular materials across processing facilities.",
        specs: ["Dense & dilute phase", "Custom engineered", "Rotary airlock valves included"],
      },
    ],
  },
  {
    title: "Screening & Classification",
    icon: Filter,
    products: [
      {
        name: "Vibrating Screens",
        image: "/images/products/vibrating-screen.png",
        description: "Deliver reliable, high-throughput material classification across a broad range of particle sizes. Precision-engineered screen decks with robust drive mechanisms.",
        specs: ["Capacity: 150–200 TPH", "Models: CHVS-600 to CHVS-2400mm", "Single & multi-deck", "Anti-blinding arrangement"],
      },
      {
        name: "Gyro Sifters",
        image: "/images/products/gyro-sifter.png",
        description: "High-precision, multi-plane screening machine for accurate classification, de-dusting, and quality control. Simultaneous vertical, circular, and horizontal vibrations.",
        specs: ["Single, Double & Triple Ribbon", "Ultrasonic anti-blinding option", "SS construction", "Food & pharma grade"],
      },
      {
        name: "Graders",
        image: "/images/products/grader.png",
        description: "Industrial vibrating screen machine for high-precision, multi-layer separation, size grading, and impurity removal of powders, grains, and granules.",
        specs: ["Unbalanced motor driven", "Multi-layer classification", "Coarse, medium & fine fractions"],
      },
      {
        name: "Cyclone Separators",
        image: "/images/products/cyclone-separator.jpg",
        description: "Highly efficient removal of particulate matter from gas or air streams using centrifugal force. Available in single and multi-cyclone configurations.",
        specs: ["Custom dust loading specs", "Single & multi-cyclone", "High efficiency"],
      },
    ],
  },
  {
    title: "Mixing & Blending",
    icon: Blend,
    products: [
      {
        name: "Ribbon Blenders",
        image: "/images/products/ribbon-blender.png",
        description: "Industrial mixing machines for homogeneous blending of dry powders, granules, and pastes. Helical inner and outer ribbon agitators work in opposition for thorough, uniform mixing.",
        specs: ["MOC: SS304/316 contact parts", "Food, pharma & chemical grade", "Batch processing"],
      },
    ],
  },
];

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={() => setExpanded(!expanded)}
      className={`group cursor-pointer rounded-xl border transition-all duration-500 overflow-hidden ${expanded ? "border-primary/50 bg-card border-glow-amber" : "border-border hover:border-primary/30 bg-card/50 hover:bg-card"
        }`}
    >
      {product.image && (
        <div className="w-full h-64 md:h-72 overflow-hidden bg-muted/10 border-b border-border">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h4>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="w-4 h-4 text-primary" />
          </motion.div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{product.description}</p>

        <motion.div
          initial={false}
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {product.specs && (
            <div className="pt-4 mt-4 border-t border-border">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Specifications</h5>
              <ul className="space-y-1.5">
                {product.specs.map((spec) => (
                  <li key={spec} className="text-sm text-muted-foreground flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

const Products = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="pt-28 pb-16 px-6 bg-gradient-hero relative">
          <div className="max-w-7xl mx-auto text-center">
            <motion.span
              className="text-primary text-sm font-semibold uppercase tracking-widest"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            >
              Product Catalogue
            </motion.span>
            <motion.h1
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-3 text-foreground"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            >
              Our <span className="text-primary text-glow-amber">Products</span>
            </motion.h1>
            <motion.p
              className="text-muted-foreground mt-4 max-w-2xl mx-auto"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            >
              Industrial-grade grinding, conveying, screening, and blending equipment engineered for precision and durability.
            </motion.p>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="py-16 px-6 bg-gradient-dark">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
              {categories.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.title}
                    onClick={() => setActiveCategory(i)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-display font-semibold text-sm transition-all duration-300 ${activeCategory === i
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.title}
                  </button>
                );
              })}
            </div>

            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {categories[activeCategory].products.map((product, i) => (
                <ProductCard key={product.name} product={product} index={i} />
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;