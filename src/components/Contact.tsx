import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const Contact = () => {
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
    <section id="contact" className="py-24 px-6 bg-gradient-dark relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Get in Touch</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-foreground">Request a Quote</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Tell us about your process requirements and request a detailed proposal.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <motion.form
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-5"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <input type="text" placeholder="Your Name *" value={form.name} required
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all text-sm" />
              <input type="email" placeholder="Email Address *" value={form.email} required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all text-sm" />
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
              <option value="" className="text-muted-foreground">Select Industry</option>
              <option value="pharma">Pharmaceuticals</option>
              <option value="food">Food & Spices</option>
              <option value="chemicals">Chemicals</option>
              <option value="minerals">Minerals</option>
              <option value="other">Other</option>
            </select>
            <textarea placeholder="Tell us about your process requirements..." value={form.requirements}
              onChange={(e) => setForm({ ...form, requirements: e.target.value })} rows={5}
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

          <motion.div
            className="lg:col-span-2 flex flex-col gap-6 justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="p-6 rounded-xl border border-border bg-card/50">
              <h3 className="font-display text-lg font-bold text-foreground mb-2">Quick Connect</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Need spare parts or urgent support? Reach us directly on WhatsApp.
              </p>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[hsl(142_70%_35%)] hover:bg-[hsl(142_70%_40%)] text-foreground font-semibold text-sm transition-colors">
                <MessageCircle className="w-4 h-4" />
                WhatsApp for Spares
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
