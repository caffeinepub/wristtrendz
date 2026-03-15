import { Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer
      data-ocid="footer.panel"
      className="border-t border-border py-12 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <p className="font-display text-lg font-semibold tracking-widest gold-shimmer mb-2">
              WRISTTRENDZ
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Luxury timepieces at accessible prices. Curated for the discerning
              collector.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-3">
              Navigate
            </p>
            <nav className="space-y-2">
              {["Home", "Collection", "About"].map((link) => (
                <button
                  type="button"
                  key={link}
                  data-ocid="footer.link"
                  onClick={() =>
                    document
                      .getElementById(link.toLowerCase())
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-3">
              Contact
            </p>
            <a
              href="mailto:hello@wristtrendz.com"
              data-ocid="footer.link"
              className="text-sm text-muted-foreground hover:text-primary transition-colors block"
            >
              hello@wristtrendz.com
            </a>
            <p className="text-sm text-muted-foreground mt-1">
              Monday – Friday, 9am – 6pm GMT
            </p>
          </div>
        </div>

        <div className="gold-divider mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {year} WristTrendz. All rights reserved.</p>
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            Built with <Heart className="h-3 w-3 fill-primary text-primary" />{" "}
            using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
