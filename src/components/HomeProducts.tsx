import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const products = [
  { name: "Air Classifying Mill", image: "/images/products/acm.png" },
  { name: "Pulveriser Mill", image: "/images/products/pulveriser.png" },
  { name: "Chopper Mill", image: "/images/products/chopper-mill.png" },
  { name: "Crusher", image: "/images/products/crusher.png" },
  { name: "Air Swept Mill", image: "/images/products/air-swept-mill.png" },
  { name: "Roaster", image: "/images/products/roaster.png" },
  { name: "Bucket Elevator", image: "/images/products/bucket-elevator.png" },
  { name: "Screw Conveyor", image: "/images/products/screw-conveyor.png" },
  { name: "Vibrating Screen", image: "/images/products/vibrating-screen.png" },
  { name: "Gyro Sifter", image: "/images/products/gyro-sifter.png" },
  { name: "Ribbon Blender", image: "/images/products/ribbon-blender.png" },
  { name: "Cyclone Separator", image: "/images/products/cyclone-separator.jpg" },
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
          Industrial-grade grinding, conveying, screening, and blending equipment.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product, i) => (
          <motion.div
            key={product.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.05, 0.4) }}
            className="group rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-300 overflow-hidden"
          >
            <div className="w-full h-40 overflow-hidden bg-muted/10 border-b border-border">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h3 className="font-display text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                {product.name}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center mt-10"
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
