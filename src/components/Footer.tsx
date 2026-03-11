import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/30 py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <Link to="/" className="flex items-center mb-4">
            <div className="w-16 h-16">
              <img
                src="/images/logo.png"
                alt="CarbonHive Logo"
                className="w-full h-full object-contain"
              />
            </div>
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
