import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CallCTA from "@/components/CallCTA";

const contactParticles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 3,
}));

const ContactParticle = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-primary/40"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
    transition={{ duration: 4 + Math.random() * 3, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const ContactHeroVisual = () => {
  const rings = [80, 120, 160];
  const nodes = [
    { angle: 0, ring: 1, label: "Email" },
    { angle: 60, ring: 0, label: "Call" },
    { angle: 120, ring: 2, label: "Quote" },
    { angle: 180, ring: 1, label: "Visit" },
    { angle: 240, ring: 0, label: "Chat" },
    { angle: 300, ring: 2, label: "Support" },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
      <svg viewBox="0 0 400 400" className="w-full max-w-md h-auto">
        {rings.map((r, i) => (
          <motion.polygon
            key={i}
            points={Array.from({ length: 6 }, (_, j) => {
              const angle = (Math.PI / 3) * j - Math.PI / 6;
              return `${200 + r * Math.cos(angle)},${200 + r * Math.sin(angle)}`;
            }).join(" ")}
            fill="none"
            stroke="hsl(42 100% 55%)"
            strokeWidth={1 - i * 0.2}
            opacity={0.4 - i * 0.1}
            animate={{ rotate: [0, i % 2 === 0 ? 360 : -360] }}
            transition={{ duration: 30 + i * 10, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "200px 200px" }}
          />
        ))}

        {nodes.map((node, i) => {
          const r = rings[node.ring];
          const baseAngle = (node.angle * Math.PI) / 180 - Math.PI / 6;
          const cx = 200 + r * Math.cos(baseAngle);
          const cy = 200 + r * Math.sin(baseAngle);
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
            >
              <motion.circle
                cx={cx}
                cy={cy}
                r={18}
                fill="hsl(220 30% 8%)"
                stroke="hsl(42 100% 55%)"
                strokeWidth={1.2}
                animate={{ r: [18, 20, 18] }}
                transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <text
                x={cx}
                y={cy + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="hsl(42 100% 55%)"
                fontSize="8"
                fontFamily="Rajdhani, sans-serif"
                fontWeight="600"
              >
                {node.label}
              </text>
            </motion.g>
          );
        })}

        <motion.polygon
          points={Array.from({ length: 6 }, (_, j) => {
            const angle = (Math.PI / 3) * j - Math.PI / 6;
            return `${200 + 30 * Math.cos(angle)},${200 + 30 * Math.sin(angle)}`;
          }).join(" ")}
          fill="hsl(42 100% 55% / 0.1)"
          stroke="hsl(42 100% 55%)"
          strokeWidth={1.5}
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "200px 200px" }}
        />
        <text
          x={200}
          y={198}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="hsl(42 100% 55%)"
          fontSize="9"
          fontFamily="Rajdhani, sans-serif"
          fontWeight="700"
        >
          Connect
        </text>
        <text
          x={200}
          y={210}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="hsl(42 100% 55%)"
          fontSize="9"
          fontFamily="Rajdhani, sans-serif"
          fontWeight="700"
        >
          With Us
        </text>

        {nodes.map((node, i) => {
          const r = rings[node.ring];
          const baseAngle = (node.angle * Math.PI) / 180 - Math.PI / 6;
          const cx = 200 + r * Math.cos(baseAngle);
          const cy = 200 + r * Math.sin(baseAngle);
          return (
            <motion.line
              key={`line-${i}`}
              x1={200}
              y1={200}
              x2={cx}
              y2={cy}
              stroke="hsl(42 100% 55%)"
              strokeWidth={0.5}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0.1] }}
              transition={{ delay: 1.5 + i * 0.1, duration: 2, repeat: Infinity }}
            />
          );
        })}
      </svg>
    </div>
  );
};

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", industry: "", requirements: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch("/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitResult({ type: "success", message: "Thank you! We'll be in touch shortly." });
        setForm({ name: "", email: "", phone: "", company: "", industry: "", requirements: "" });
      } else {
        setSubmitResult({ type: "error", message: data.error || "Something went wrong. Please try again." });
      }
    } catch {
      setSubmitResult({ type: "error", message: "Network error. Please check your connection and try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center bg-gradient-hero overflow-hidden pt-24 pb-16 px-6">
          {/* Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {contactParticles.map((p) => (
              <ContactParticle key={p.id} x={p.x} y={p.y} delay={p.delay} />
            ))}
          </div>

          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(hsl(42 100% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(42 100% 55%) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-5"
              >
                <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-primary text-xs font-medium bg-primary/5 uppercase tracking-widest">
                  Get in Touch
                </span>
              </motion.div>

              <motion.h1
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="text-foreground">Let's Build</span>
                <br />
                <span className="text-primary text-glow-amber">Together</span>
              </motion.h1>

              <motion.p
                className="text-base md:text-lg text-muted-foreground max-w-lg mb-8 font-body leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Tell us about your process requirements. From lab trials to full turnkey installations — our engineers
                are ready to craft a precision solution for you.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {[
                  { icon: Mail, label: "info@carbonhive.com" },
                  { icon: Phone, label: "+91 99999 99999" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon className="w-4 h-4 text-primary shrink-0" />
                    <span>{label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Animated Visual */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <ContactHeroVisual />
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 px-6 bg-gradient-dark">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12">
            <motion.form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <input type="text" placeholder="Your Name *" value={form.name} required
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all text-sm" />
                </div>
                <div>
                  <input type="email" placeholder="Email Address *" value={form.email} required
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all text-sm" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <input type="tel" placeholder="Contact Number" value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all text-sm" />
                <input type="text" placeholder="Company" value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all text-sm" />
              </div>
              <select value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all text-sm">
                <option value="">Select Industry</option>
                <option value="pharma">Pharmaceuticals</option>
                <option value="food">Food & Spices</option>
                <option value="chemicals">Chemicals</option>
                <option value="minerals">Minerals</option>
                <option value="other">Other</option>
              </select>
              <textarea placeholder="Tell us about your process requirements..." value={form.requirements}
                onChange={(e) => setForm({ ...form, requirements: e.target.value })} rows={6}
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all text-sm resize-none" />
              <button type="submit" disabled={isSubmitting}
                className="w-full py-3.5 bg-primary text-primary-foreground font-display font-bold rounded-lg text-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none">
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                ) : (
                  <><Send className="w-5 h-5" /> Request a Quote</>
                )}
              </button>
              {submitResult && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
                    submitResult.type === "success"
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}
                >
                  {submitResult.type === "success" ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                  {submitResult.message}
                </motion.div>
              )}
            </motion.form>

            <motion.div className="lg:col-span-2 flex flex-col gap-6"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="p-6 rounded-xl border border-border bg-card/50 space-y-4">
                <h3 className="font-display text-lg font-bold text-foreground">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <span>info@carbonhive.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <span>+91 99999 99999</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>India</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card/50">
                <h3 className="font-display text-lg font-bold text-foreground mb-2">Quick Connect</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Need spare parts or urgent support? Reach us directly on WhatsApp.
                </p>
                <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[hsl(142_60%_22%)] border border-[hsl(142_70%_45%/0.6)] shadow-[0_0_12px_hsl(142_70%_45%/0.4)] hover:bg-[hsl(142_60%_28%)] hover:shadow-[0_0_20px_hsl(142_70%_50%/0.65)] text-white font-semibold text-sm transition-all duration-300">
                  <SiWhatsapp className="w-4 h-4" />
                  WhatsApp for Spares
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <CallCTA />
      <Footer />
    </div>
  );
};

export default ContactPage;
