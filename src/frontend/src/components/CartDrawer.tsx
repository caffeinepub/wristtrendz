import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import {
  useGetAllWatches,
  useGetCart,
  useGetCartTotal,
  useRemoveFromCart,
} from "../hooks/useQueries";
import { formatPrice, getWatchImage } from "../lib/watchImages";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { data: cartItems = [] } = useGetCart();
  const { data: watches = [] } = useGetAllWatches();
  const { data: totalCents = 0n } = useGetCartTotal();
  const removeFromCart = useRemoveFromCart();

  const handleRemove = async (watchId: bigint) => {
    try {
      await removeFromCart.mutateAsync(watchId);
    } catch {
      toast.error("Failed to remove item");
    }
  };

  const getWatch = (watchId: bigint) => watches.find((w) => w.id === watchId);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            data-ocid="cart.panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-card border-l border-border flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <span className="font-display text-xl font-semibold">
                  Your Cart
                </span>
                {cartItems.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    ({cartItems.length}{" "}
                    {cartItems.length === 1 ? "item" : "items"})
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                data-ocid="cart.close_button"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Items */}
            {cartItems.length === 0 ? (
              <div
                data-ocid="cart.empty_state"
                className="flex-1 flex flex-col items-center justify-center gap-4 px-6"
              >
                <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center">
                  <ShoppingBag className="h-7 w-7 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <p className="font-display text-lg font-semibold text-muted-foreground">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add a timepiece to get started.
                  </p>
                </div>
                <Button
                  variant="outline"
                  data-ocid="cart.secondary_button"
                  onClick={onClose}
                  className="mt-2 border-border hover:border-primary rounded-none tracking-widest uppercase text-xs"
                >
                  Browse Collection
                </Button>
              </div>
            ) : (
              <ScrollArea className="flex-1 px-6 py-4">
                <div className="space-y-5">
                  {cartItems.map((item, idx) => {
                    const watch = getWatch(item.watchId);
                    if (!watch) return null;
                    const lineTotal = watch.priceCents * item.quantity;
                    return (
                      <motion.div
                        key={String(item.watchId)}
                        data-ocid={`cart.item.${idx + 1}`}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex gap-4"
                      >
                        <div className="w-20 h-20 flex-shrink-0 bg-secondary overflow-hidden">
                          <img
                            src={getWatchImage(watch.id)}
                            alt={watch.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] tracking-widest uppercase text-primary mb-0.5">
                            {watch.brand}
                          </p>
                          <p className="font-display font-semibold text-sm leading-snug truncate">
                            {watch.name}
                          </p>
                          <p className="text-sm font-medium text-muted-foreground mt-1">
                            {formatPrice(watch.priceCents)}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs text-muted-foreground">
                              Qty: {String(item.quantity)}
                            </span>
                            <button
                              type="button"
                              data-ocid={`cart.delete_button.${idx + 1}`}
                              onClick={() => handleRemove(item.watchId)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-display text-sm font-bold gold-shimmer">
                            {formatPrice(lineTotal)}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </ScrollArea>
            )}

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="px-6 py-5 border-t border-border space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground tracking-widest uppercase">
                    Subtotal
                  </span>
                  <span className="font-display text-2xl font-bold gold-shimmer">
                    {formatPrice(totalCents)}
                  </span>
                </div>
                <div className="gold-divider" />
                <Button
                  data-ocid="cart.submit_button"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-12 text-sm font-semibold tracking-widest uppercase transition-all duration-300"
                  onClick={() =>
                    toast.info("Checkout coming soon!", {
                      description: "We're working on it.",
                    })
                  }
                >
                  Proceed to Checkout
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Free shipping on all orders. Returns within 30 days.
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
