import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Cog, ArrowRight, Filter, Blend, Archive, Wind } from "lucide-react";

// ─── Products Page Hero Animation ────────────────────────────────
const heroParticles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 4,
}));

const processNodes = [
  { label: "Grind",   sub: "6 Products", angle: -90,  glyph: "G" },
  { label: "Convey",  sub: "5 Products", angle: -30,  glyph: "C" },
  { label: "Screen",  sub: "4 Products", angle:  30,  glyph: "S" },
  { label: "Blend",   sub: "2 Products", angle:  90,  glyph: "B" },
  { label: "Store",   sub: "1 Product",  angle: 150,  glyph: "St" },
  { label: "Dedust",  sub: "2 Products", angle: -150, glyph: "D" },
];

const R_ORBIT = 132;
const SV_CX = 200, SV_CY = 200;

function nodePos(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: SV_CX + R_ORBIT * Math.cos(rad), y: SV_CY + R_ORBIT * Math.sin(rad) };
}

const ProcessFlowVisual = () => (
  <div className="relative w-full flex items-center justify-center">
    <div className="absolute w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
    <svg viewBox="0 0 400 400" className="w-full max-w-md h-auto">

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
      {processNodes.map((node, i) => {
        const { x, y } = nodePos(node.angle);
        return (
          <line
            key={`spoke-${i}`}
            x1={SV_CX} y1={SV_CY} x2={x} y2={y}
            stroke="hsl(42,100%,55%)" strokeWidth="0.8" opacity="0.2"
          />
        );
      })}

      {/* Animated particle dots traveling along each spoke */}
      {processNodes.map((node, i) => {
        const { x, y } = nodePos(node.angle);
        return (
          <motion.circle
            key={`dot-${i}`}
            cx={SV_CX} cy={SV_CY}
            r="3.5"
            fill="hsl(42,100%,65%)"
            opacity="0.9"
            filter="url(#glow)"
            animate={{ cx: [SV_CX, x, SV_CX], cy: [SV_CY, y, SV_CY] }}
            transition={{
              duration: 2.4,
              delay: i * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Glow filter */}
      <defs>
        <filter id="glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Central hub */}
      <motion.circle
        cx={SV_CX} cy={SV_CY} r={36}
        fill="hsl(220,30%,7%)" stroke="hsl(42,100%,55%)" strokeWidth="1.5"
        animate={{ scale: [1, 1.04, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: `${SV_CX}px ${SV_CY}px` }}
      />
      {/* Hub pulse ring — scale instead of r to avoid SVG attr warnings */}
      <motion.circle
        cx={SV_CX} cy={SV_CY} r={36}
        fill="none" stroke="hsl(42,100%,55%)" strokeWidth="1"
        animate={{ scale: [1, 1.56, 1.94], opacity: [0.6, 0.2, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
        style={{ transformOrigin: `${SV_CX}px ${SV_CY}px` }}
      />
      <text x={SV_CX} y={SV_CY - 4} textAnchor="middle" dominantBaseline="middle"
        fill="hsl(42,100%,55%)" fontSize="9" fontFamily="Rajdhani,sans-serif" fontWeight="700">
        CARBON
      </text>
      <text x={SV_CX} y={SV_CY + 7} textAnchor="middle" dominantBaseline="middle"
        fill="hsl(42,100%,55%)" fontSize="9" fontFamily="Rajdhani,sans-serif" fontWeight="700">
        HIVE
      </text>

      {/* Process nodes */}
      {processNodes.map((node, i) => {
        const { x, y } = nodePos(node.angle);
        return (
          <motion.g
            key={`node-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
          >
            {/* Node sonar pulse */}
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
            {/* Glyph */}
            <text x={x} y={y - 3} textAnchor="middle" dominantBaseline="middle"
              fill="hsl(42,100%,60%)" fontSize="13" fontFamily="Rajdhani,sans-serif" fontWeight="700">
              {node.label.slice(0, 1)}
            </text>
            <text x={x} y={y + 8} textAnchor="middle" dominantBaseline="middle"
              fill="hsl(42,100%,45%)" fontSize="7.5" fontFamily="Rajdhani,sans-serif" fontWeight="600">
              {node.label.slice(1)}
            </text>
            {/* Sub-label outside node */}
            <text
              x={node.angle > -60 && node.angle < 60 ? x + 32 : node.angle > 120 || node.angle < -120 ? x - 32 : x}
              y={node.angle < -60 && node.angle > -120 ? y - 30 : node.angle > 60 && node.angle < 120 ? y + 30 : y + 1}
              textAnchor={node.angle > -60 && node.angle < 60 ? "start" : node.angle > 120 || node.angle < -120 ? "end" : "middle"}
              fill="hsl(42,100%,55%)" fontSize="8" fontFamily="Rajdhani,sans-serif" fontWeight="600"
              opacity="0.7"
            >
              {node.sub}
            </text>
          </motion.g>
        );
      })}

      {/* Orbiting small dot around the outer ring */}
      <motion.circle
        cx={SV_CX + 168} cy={SV_CY}
        r="4" fill="hsl(42,100%,65%)" filter="url(#glow)"
        animate={{
          cx: [SV_CX + 168, SV_CX, SV_CX - 168, SV_CX, SV_CX + 168],
          cy: [SV_CY, SV_CY + 168, SV_CY, SV_CY - 168, SV_CY],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  </div>
);
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CallCTA from "@/components/CallCTA";

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
        image: "/images/products/BagEmptyingMachine.png",
        description: "Automatic Bag Slitting Machine purpose-built to process single and multi-layer bags with speed and precision. Integrates heavy-duty cutter, rotating trommel screen, belt conveyor, dust containment, empty bag compactor, and powder discharge screw conveyor.",
        specs: ["Dust-proof environment", "MOC: MS, SS304/SS316", "Size: 4.5m × 1.75m × 3.5m", "Human safety interlock"],
      },
      {
        name: "Air Classifying Mill (ACM)",
        image: "/images/products/AirClassifyingMill%20(ACM).jpg",
        description: "High-performance impact grinding mill with integrated dynamic classifier for precise particle size control. Rotor disc with impact hammers handles primary size reduction while built-in classifier wheel continuously recirculates oversize particles.",
        specs: ["Models: 5ACM to 120ACM", "Power: 5–120 HP", "Fineness: 3–3000 MESH", "Cast & fabricated casing"],
      },
      {
        name: "Air Swept Mill",
        image: "/images/products/AirSweptMill.jpg",
        description: "Specifically designed for size reduction of soft to medium-hard, fibrous, and slightly moist materials. Air sweep assists in product discharge and cooling, ideal for heat-sensitive or sticky materials.",
        specs: ["Models: ASM-15 to ASM-40", "Power: 20–75 HP", "Fineness: 40–80mm"],
      },
      {
        name: "Chopper Mill",
        image: "/images/products/ChopperMill.png",
        description: "Engineered for controlled pre-cutting and size reduction of fibrous, leafy, or irregular materials to 10–20mm or finer. Operates at lower rotor speeds to minimize heat — preserving essential oils and natural aroma.",
        specs: ["Models: CHM 8 to CHM 32", "Ideal for chillies, herbs, dried vegetables", "Minimal fines generation"],
      },
      {
        name: "Pulveriser Mill",
        image: "/images/products/PulveriserMill.jpg",
        description: "Versatile impact mill for irregularly shaped, coarse, and granular materials from soft to medium-hard. Widely used across food, pharma, and chemical industries.",
        specs: ["Power: 1–180 HP", "Fineness: 20–200 MESH", "Models: Bantam to Double 4", "Sugar, spices, chemicals, pharma"],
      },
      {
        name: "Crusher",
        image: "/images/products/CrusherMill.png",
        description: "Built for demanding size-reduction applications, processing brittle to medium-hard materials. Available in rigid hammer (P version) and swinging hammer (D version) configurations.",
        specs: ["Capacity: 1.5–15 ton/hr", "Power: 11–90 kW", "Feed size up to 150mm", "Double roll type available"],
      },
    ],
  },
  {
    title: "Conveying Equipment",
    icon: ArrowRight,
    products: [
      {
        name: "Belt Conveyor",
        image: "/images/products/BeltConveyor.png",
        description: "Built for continuous, high-volume bulk material transfer across processing lines. Heavy-duty frames and premium belting deliver consistent, reliable performance.",
        specs: ["Width: 500–2000mm", "Capacity: 5–800 TPH"],
      },
      {
        name: "Bucket Elevator",
        image: "/images/products/BucketElevatorTwinLeg.png",
        description: "Engineered for vertical material handling with dependable, high-efficiency transport. Available in belt type, single-leg chain, twin-leg chain, and Z-type configurations.",
        specs: ["Capacity: up to 100 TPH", "Models: COBE-150 to COBE-600", "Multiple configurations"],
      },
      {
        name: "Chain Conveyor",
        description: "Designed for reliable movement of heavy, abrasive, or high-temperature bulk materials where belt conveyors are not suitable.",
        specs: ["Width: 500–2000mm", "Capacity: up to 80 TPH", "Max incline: 30°", "Models: DC-200 to DC-600"],
      },
      {
        name: "Screw Conveyor",
        image: "/images/products/ScrewConveyor.jpg",
        description: "Effective and controlled movement of powders, granules, and bulk solids in horizontal, vertical, and inclined orientations. Available in U-type open and O-type closed configurations.",
        specs: ["Width: 100–600mm", "Capacity: up to 15 TPH", "Types: Horizontal, Vertical, Inclined, Reversible"],
      },
      {
        name: "Pneumatic Conveying",
        image: "/images/products/PneumaticConveyingSystems.jpg",
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
        image: "/images/products/GyroShifter.png",
        description: "Deliver reliable, high-throughput material classification across a broad range of particle sizes. Precision-engineered screen decks with robust drive mechanisms.",
        specs: ["Capacity: 150–200 TPH", "Models: CHVS-600 to CHVS-2400mm", "Single & multi-deck", "Anti-blinding arrangement"],
      },
      {
        name: "Graders",
        image: "/images/products/Graders.png",
        description: "Industrial vibrating screen machine for high-precision, multi-layer separation, size grading, and impurity removal of powders, grains, and granules.",
        specs: ["Unbalanced motor driven", "Multi-layer classification", "Coarse, medium & fine fractions"],
      },
      {
        name: "Cyclone Separators",
        image: "/images/products/CycloneSeparators.png",
        description: "Highly efficient removal of particulate matter from gas or air streams using centrifugal force. Available in single and multi-cyclone configurations.",
        specs: ["Custom dust loading specs", "Single & multi-cyclone", "High efficiency"],
      },
      {
        name: "Destoner",
        image: "/images/products/Destoner.png",
        description: "Gravity-based separation machine that effectively removes stones, metals, and heavy impurities from grains, pulses, and other agricultural products prior to processing.",
        specs: ["Gravity separation principle", "Adjustable deck angle", "High throughput capacity"],
      },
    ],
  },
  {
    title: "Mixing & Blending",
    icon: Blend,
    products: [
      {
        name: "Ribbon Blenders",
        image: "/images/products/RibbonBlenders.png",
        description: "Industrial mixing machines for homogeneous blending of dry powders, granules, and pastes. Helical inner and outer ribbon agitators work in opposition for thorough, uniform mixing.",
        specs: ["MOC: SS304/316 contact parts", "Food, pharma & chemical grade", "Batch processing"],
      },
      {
        name: "Roasters",
        image: "/images/products/Roasters.png",
        description: "Industrial thermal processing machines for spice, food, and agro-processing. Efficiently reduces moisture, enhances flavour profiles, and improves shelf life by inhibiting microbial activity.",
        specs: ["Capacity: 22–5000 litres", "Temp: up to 250°C", "MOC: SS/MS", "240V/440V options"],
      },
    ],
  },
  {
    title: "Storage",
    icon: Archive,
    products: [
      {
        name: "Silos",
        image: "/images/products/Silos.png",
        description: "Heavy-duty storage silos for bulk powders, granules, and agricultural commodities. Designed for safe, efficient storage with airtight construction and easy discharge.",
        specs: ["Custom capacities", "MOC: MS / SS304", "Cone & flat bottom options", "Level indication systems"],
      },
    ],
  },
  {
    title: "Dedusting",
    icon: Wind,
    products: [
      {
        name: "Bag Filters",
        image: "/images/products/BagFilters.png",
        description: "High-efficiency pulse-jet bag filter systems for dust collection and air pollution control. Ensure clean working environments and regulatory compliance across processing plants.",
        specs: ["Filtration efficiency: >99%", "Pulse-jet cleaning", "MOC: MS / SS304", "Custom air-to-cloth ratio"],
      },
      {
        name: "Centrifugal Fans",
        image: "/images/products/CentrifugalFans.png",
        description: "Industrial centrifugal fans engineered for high-volume air movement in dedusting, pneumatic conveying, and ventilation systems. Robust construction for continuous duty.",
        specs: ["Custom CFM & static pressure", "MOC: MS / SS304", "Direct & belt-driven options", "ATEX versions available"],
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
        <section className="relative min-h-[62vh] flex items-start overflow-hidden pt-[72px]">
          {/* Background video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/hero-bg-vedio.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/70 z-[1]" />
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
                  Product Catalogue
                </span>
              </motion.div>

              <motion.h1
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5"
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }}
              >
                <span className="text-foreground">Precision Equipment,</span>
                <br />
                <span className="text-primary text-glow-amber">End-to-End</span>
              </motion.h1>

              <motion.p
                className="text-base text-muted-foreground max-w-lg mb-8 font-body leading-relaxed"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}
              >
                Industrial-grade grinding, conveying, screening, and blending equipment — engineered for maximum throughput, minimal downtime, and precise output across every process stage.
              </motion.p>

              {/* Category quick-stats */}
              <motion.div
                className="grid grid-cols-2 gap-3"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.7 }}
              >
                {[
                  { icon: Cog,       label: "Grinding",  count: "6 machines" },
                  { icon: ArrowRight, label: "Conveying", count: "5 systems"  },
                  { icon: Filter,    label: "Screening", count: "4 machines" },
                  { icon: Blend,     label: "Mixing",    count: "2 machines" },
                  { icon: Archive,   label: "Storage",   count: "1 system"   },
                  { icon: Wind,      label: "Dedusting", count: "2 systems"  },
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

            {/* Right: process flow animation */}
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.9 }}
            >
              <ProcessFlowVisual />
            </motion.div>
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
      <CallCTA />
      <Footer />
    </div>
  );
};

export default Products;