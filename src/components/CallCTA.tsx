import { motion } from "framer-motion";
import { Phone } from "lucide-react";

const PHONE = "+919999999999";
const PHONE_DISPLAY = "+91 99999 99999";

const CallCTA = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-background">
      {/* Ambient glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[hsl(142_60%_22%/0.18)] blur-[90px]" />
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-[hsl(42_100%_55%/0.07)] blur-[60px]" />
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-[hsl(142_70%_40%/0.07)] blur-[60px]" />
      </div>

      {/* Top decorative border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(142_70%_45%/0.5)] to-transparent" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[hsl(142_70%_45%/0.7)]" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(142_70%_50%)]">
            Talk to an Engineer
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[hsl(142_70%_45%/0.7)]" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
        >
          Ready to Solve Your{" "}
          <span className="text-primary">Process Challenge?</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-5 text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Speak directly with our engineering team. No intermediaries — just expert
          guidance on milling, mixing, spares, and complete plant solutions.
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={`tel:${PHONE}`}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-display font-bold text-lg text-white
              bg-[hsl(142_60%_22%)] border border-[hsl(142_70%_45%/0.55)]
              shadow-[0_0_20px_hsl(142_70%_40%/0.35)]
              hover:bg-[hsl(142_60%_28%)] hover:shadow-[0_0_32px_hsl(142_70%_50%/0.6)]
              hover:-translate-y-0.5 transition-all duration-300"
          >
            <span className="w-10 h-10 rounded-lg bg-[hsl(142_70%_50%/0.15)] border border-[hsl(142_70%_50%/0.35)] flex items-center justify-center shrink-0 group-hover:bg-[hsl(142_70%_50%/0.25)] transition-colors">
              <Phone className="w-5 h-5 text-[hsl(142_70%_55%)]" />
            </span>
            Call Us Now
            <span className="text-[hsl(142_70%_65%)] font-normal text-base hidden sm:inline">
              {PHONE_DISPLAY}
            </span>
          </a>
        </motion.div>

        {/* Mobile phone number shown separately */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
          className="mt-4 text-sm text-muted-foreground sm:hidden"
        >
          {PHONE_DISPLAY}
        </motion.p>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-xs text-muted-foreground/60 uppercase tracking-widest"
        >
          Available Mon – Sat &nbsp;·&nbsp; 9 AM – 6 PM IST
        </motion.p>
      </div>

      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};

export default CallCTA;
