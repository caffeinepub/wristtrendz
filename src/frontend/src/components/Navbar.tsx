import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { motion } from "motion/react";

interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
}

export default function Navbar({ cartCount, onCartOpen }: NavbarProps) {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      data-ocid="nav.panel"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          data-ocid="nav.link"
          className="font-display text-xl font-semibold tracking-widest gold-shimmer"
        >
          WRISTTRENDZ
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Home", id: "hero" },
            { label: "Collection", id: "collection" },
            { label: "About", id: "about" },
          ].map((item) => (
            <button
              type="button"
              key={item.id}
              data-ocid="nav.link"
              onClick={() => scrollToSection(item.id)}
              className="text-sm font-medium tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200 uppercase"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Cart */}
        <Button
          variant="ghost"
          size="icon"
          data-ocid="cart.open_modal_button"
          onClick={onCartOpen}
          className="relative text-foreground hover:text-primary hover:bg-transparent"
        >
          <ShoppingBag className="h-5 w-5" />
          {cartCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground border-0 rounded-full">
              {cartCount}
            </Badge>
          )}
        </Button>
      </nav>
    </motion.header>
  );
}
