import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/30 py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6">
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <polygon points="20,2 37,11 37,29 20,38 3,29 3,11" fill="none" stroke="hsl(42 100% 55%)" strokeWidth="2" />
              </svg>
            </div>
            <span className="font-display text-xl font-bold text-primary">CarbonHive</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Process Solution Architects specializing in milling, mixing, and air pollution control equipment.
          </p>
        </div>

        <div>
          <h4 className="font-display font-bold text-foreground mb-4">Quick Links</h4>
          <div className="space-y-2">
            {[
              { label: "Products", href: "/products" },
              { label: "Services", href: "/services" },
              { label: "Spares", href: "/spares" },
              { label: "About Us", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-foreground mb-4">Contact</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>info@carbonhive.com</p>
            <p>+91 99999 99999</p>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[hsl(142_70%_50%)] hover:text-[hsl(142_70%_60%)] transition-colors"
            >
              WhatsApp for Spares →
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} CarbonHive. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
