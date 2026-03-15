import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import AboutSection from "./components/AboutSection";
import CartDrawer from "./components/CartDrawer";
import CollectionSection from "./components/CollectionSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import { useGetCart } from "./hooks/useQueries";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const { data: cartItems = [] } = useGetCart();

  const cartCount = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity),
    0,
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <main>
        <HeroSection />
        <CollectionSection onCartOpen={() => setCartOpen(true)} />
        <AboutSection />
      </main>

      <Footer />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <Toaster
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast: "bg-card border border-border text-foreground",
            title: "text-foreground font-semibold",
            description: "text-muted-foreground",
            actionButton: "bg-primary text-primary-foreground",
          },
        }}
      />
    </div>
  );
}
