import { useState } from "react";
import { motion } from "framer-motion";
import { FlaskConical, Search, FileText, Briefcase } from "lucide-react";

const steps = [
  {
    icon: FlaskConical,
    title: "Send Material",
    description:
      "Ship your sample material or simply send a snap to our state-of-the-art industry. We will help you find the right manufacturing components!",
  },
  {
    icon: Search,
    title: "Get Genuine Spare Parts",
    description:
      "Our engineers conduct comprehensive tests — particle size analysis, moisture content, abrasion index, and process simulation under real-world conditions before we pass OK on these spare parts  .",
  },
  {
    icon: FileText,
    title: "Feasibility Report",
    description:
      "Receive a detailed feasibility report with recommended equipment, expected throughput, power consumption, and cost-benefit analysis.",
  },
  {
    icon: Briefcase,
    title: "Full Proposal",
    description:
      "Get a turnkey proposal with equipment selection, layout design, installation timeline, and ROI projections — no obligation.",
  },
];

const InnovationLab = () => {
  const [activeStep, setActiveStep] = useState(0);
  const ActiveIcon = steps[activeStep].icon;

  return (
    <section id="lab" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Innovation Lab</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-foreground">Try Before You Buy</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            De-risk your equipment investment with our material testing lab. See results before you commit.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = activeStep === i;
              return (
                <motion.button
                  key={step.title}
                  onClick={() => setActiveStep(i)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-400 ${
                    isActive
                      ? "border-primary/50 bg-card border-glow-amber"
                      : "border-border bg-card/30 hover:border-border hover:bg-card/50"
                  }`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                          0{i + 1}
                        </span>
                        <h3
                          className={`font-display text-lg font-bold ${isActive ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {step.title}
                        </h3>
                      </div>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="text-sm text-muted-foreground mt-2 leading-relaxed"
                        >
                          {step.description}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Visual */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="w-72 h-72 md:w-80 md:h-80 relative">
              {/* Hex background */}
              <svg viewBox="0 0 300 300" className="w-full h-full">
                <polygon
                  points="150,15 270,80 270,220 150,285 30,220 30,80"
                  fill="hsl(220 25% 8%)"
                  stroke="hsl(42 100% 55% / 0.3)"
                  strokeWidth="1.5"
                />
                <polygon
                  points="150,45 240,95 240,205 150,255 60,205 60,95"
                  fill="none"
                  stroke="hsl(42 100% 55% / 0.1)"
                  strokeWidth="1"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ActiveIcon className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h3 className="font-display text-xl font-bold text-foreground">{steps[activeStep].title}</h3>
                  <p className="text-xs text-muted-foreground mt-2">Step {activeStep + 1} of 4</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InnovationLab;
