import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Clock, Award, Users } from "lucide-react";

const stats = [
  { icon: Clock, value: 25, suffix: "+", label: "Years Experience" },
  { icon: Award, value: 500, suffix: "+", label: "Installations" },
  { icon: Shield, value: 3, suffix: "", label: "ISO Certifications" },
  { icon: Users, value: 200, suffix: "+", label: "Active Clients" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-display text-4xl md:text-5xl font-bold text-primary text-glow-amber">
      {count}{suffix}
    </span>
  );
};

const TrustSignals = () => (
  <section id="trust" className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-primary text-sm font-semibold uppercase tracking-widest">Why CarbonHive</span>
        <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-foreground">
          Trusted by Industry Leaders
        </h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
          Engineering excellence backed by decades of experience and certified quality.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className="text-center p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <Counter target={stat.value} suffix={stat.suffix} />
              <p className="text-muted-foreground text-sm mt-2 font-medium">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="mt-16 grid md:grid-cols-2 gap-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="p-8 rounded-xl border border-border bg-card/50">
          <h3 className="font-display text-xl font-bold text-foreground mb-3">For Engineers</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Precision-engineered solutions with detailed technical specs, CFD analysis, and material-specific testing.
            Every installation is backed by comprehensive documentation and ongoing technical support.
          </p>
        </div>
        <div className="p-8 rounded-xl border border-border bg-card/50">
          <h3 className="font-display text-xl font-bold text-foreground mb-3">For Procurement</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Competitive pricing with clear ROI projections. ISO-certified manufacturing, on-time delivery track record,
            and flexible payment terms. De-risk your purchase with our lab trial program.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default TrustSignals;
