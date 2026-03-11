import { motion } from "framer-motion";

const items = [
  "Air Classifying Mill",
  "Pulveriser",
  "Hammer Mill",
  "Crusher",
  "Chopper Mill",
  "Roaster",
  "Belt Conveyor",
  "Bucket Elevator",
  "Screw Conveyor",
  "Pneumatic Conveying",
  "Vibrating Screen",
  "Gyro Sifter",
  "Grader",
  "Cyclone Separator",
  "Ribbon Blender",
  "Bag Filter",
  "Fan & Ducting",
];

const MarqueeRow = ({ reverse = false }: { reverse?: boolean }) => (
  <div className="flex overflow-hidden">
    <motion.div
      className="flex shrink-0 gap-3"
      animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      {[...items, ...items].map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="shrink-0 px-4 py-1.5 text-xs font-display font-semibold uppercase tracking-wider text-primary/80 border border-primary/20 rounded-full bg-primary/5 whitespace-nowrap"
        >
          {item}
        </span>
      ))}
    </motion.div>
  </div>
);

const ProductMarquee = () => (
  <div className="w-full bg-background/80 border-b border-border py-2.5 overflow-hidden">
    <MarqueeRow />
  </div>
);

export default ProductMarquee;
