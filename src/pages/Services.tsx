import { motion } from "framer-motion";
import { Wrench, Settings, RefreshCw, GraduationCap, TrendingUp, ShieldCheck, FlaskConical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CallCTA from "@/components/CallCTA";

const services = [
  {
    icon: Wrench,
    title: "Spare Parts",
    description: "We supply genuine, high-quality spare parts to keep your equipment running at peak performance.",
  },
  {
    icon: Settings,
    title: "Maintenance Packages",
    description: "Our tailored maintenance packages help maximise uptime and extend the life of your equipment.",
  },
  {
    icon: RefreshCw,
    title: "Refurbishments & Repairs",
    description: "We offer expert refurbishment and repair services to restore equipment performance and reliability.",
  },
  {
    icon: GraduationCap,
    title: "Training Packages",
    description: "We provide customised training packages to equip your teams with the skills to operate and maintain systems effectively.",
  },
  {
    icon: TrendingUp,
    title: "Optimisation Upgrades",
    description: "Our optimisation upgrades improve equipment efficiency, productivity and process performance.",
  },
  {
    icon: ShieldCheck,
    title: "Extended Warranties",
    description: "We offer extended warranties for added peace of mind and long-term equipment protection.",
  },
  {
    icon: FlaskConical,
    title: "Containment Testing",
    description: "We carry out specialist containment testing to ensure safety, compliance, and operator protection.",
  },
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero with reference image */}
        <section className="pt-28 pb-16 px-6 bg-gradient-hero relative">
          <div className="max-w-7xl mx-auto text-center">
            <motion.span className="text-primary text-sm font-semibold uppercase tracking-widest"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              Aftermarket Services
            </motion.span>
            <motion.h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-3 text-foreground"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              Our <span className="text-primary text-glow-amber">Services</span>
            </motion.h1>
            <motion.p className="text-muted-foreground mt-4 max-w-2xl mx-auto"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              Complete aftermarket support to keep your operations running at peak performance throughout the equipment lifecycle.
            </motion.p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-6 bg-gradient-dark">
          <div className="max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {services.slice(0, 4).map((service, i) => {
                const Icon = service.icon;
                return (
                  <motion.div key={service.title}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="group p-6 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-500 flex flex-col">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{service.description}</p>
                    <button onClick={() => navigate("/contact")}
                      className="mt-4 text-primary text-sm font-semibold hover:underline self-start">
                      Discover More →
                    </button>
                  </motion.div>
                );
              })}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
              {services.slice(4).map((service, i) => {
                const Icon = service.icon;
                return (
                  <motion.div key={service.title}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: (i + 4) * 0.1 }}
                    className="group p-6 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-500 flex flex-col">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{service.description}</p>
                    <button onClick={() => navigate("/contact")}
                      className="mt-4 text-primary text-sm font-semibold hover:underline self-start">
                      Discover More →
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services Overview Image */}
        <section className="py-16 px-6 bg-background">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden border border-border"
            >
              <img
                src="/images/services-reference.png"
                alt="CarbonHive Aftermarket Services Overview"
                className="w-full h-auto"
                loading="lazy"
              />
            </motion.div>
          </div>
        </section>
      </main>
      <CallCTA />
      <Footer />
    </div>
  );
};

export default Services;
