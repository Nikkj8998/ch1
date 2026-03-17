import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Clock, Award, Users } from "lucide-react";
import { FaMedal, FaProjectDiagram, FaIndustry, FaTools, FaCogs, FaBolt, FaHeadset } from "react-icons/fa";

const stats = [
  { icon: Clock, value: 25, suffix: "+", label: "Years Experience" },
  { icon: Award, value: 500, suffix: "+", label: "Installations" },
  { icon: Shield, value: 3, suffix: "", label: "ISO Certifications" },
  { icon: Users, value: 200, suffix: "+", label: "Active Clients" },
];

const capabilities = [
  { icon: FaMedal,          text: "Over 10 Years of Combined Expertise in Grinding Technology" },
  { icon: FaProjectDiagram, text: "End-to-End Solutions – From Concept Design to Commissioning" },
  { icon: FaIndustry,       text: "Expertise in Greenfield and Turnkey Grinding Projects" },
  { icon: FaTools,          text: "Plant Modernization and Capacity Enhancement Solutions" },
  { icon: FaCogs,           text: "Customized Solutions for Specialized Grinding Applications" },
  { icon: FaBolt,           text: "Energy-Efficient Grinding System Design" },
  { icon: FaHeadset,        text: "Comprehensive Technical Support and After-Sales Service" },
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

      <motion.div
        className="mb-14 p-8 rounded-xl border border-primary/20 bg-card/50 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
          {capabilities.map(({ icon: Icon, text }, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-4 group"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <span className="mt-0.5 w-8 h-8 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
                <Icon className="w-3.5 h-3.5 text-primary" />
              </span>
              <span className="text-muted-foreground text-sm leading-relaxed font-medium pt-1.5 group-hover:text-foreground transition-colors duration-300">
                {text}
              </span>
            </motion.li>
          ))}
        </ul>
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
        className="mt-8 grid md:grid-cols-2 gap-8"
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
