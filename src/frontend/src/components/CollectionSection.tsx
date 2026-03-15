import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useAddToCart, useGetAllWatches } from "../hooks/useQueries";
import WatchCard from "./WatchCard";

interface CollectionSectionProps {
  onCartOpen: () => void;
}

export default function CollectionSection({
  onCartOpen,
}: CollectionSectionProps) {
  const { data: watches, isLoading } = useGetAllWatches();
  const addToCart = useAddToCart();

  const handleAddToCart = async (watchId: bigint) => {
    try {
      await addToCart.mutateAsync({ watchId, quantity: 1n });
      const watch = watches?.find((w) => w.id === watchId);
      toast.success(`${watch?.name ?? "Watch"} added to cart`, {
        description: "Your selection has been added.",
        action: {
          label: "View Cart",
          onClick: onCartOpen,
        },
      });
      onCartOpen();
    } catch {
      toast.error("Failed to add to cart", {
        description: "Please try again.",
      });
    }
  };

  const skeletonKeys = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6", "sk7", "sk8"];

  return (
    <section
      id="collection"
      data-ocid="collection.section"
      className="py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-12 bg-primary/50" />
            <span className="text-xs font-medium tracking-[0.3em] text-primary uppercase">
              Our Collection
            </span>
            <span className="h-px w-12 bg-primary/50" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Curated <span className="gold-shimmer italic">Timepieces</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-base">
            Every watch in our collection is hand-selected for its movement
            quality, finishing, and value — without compromise.
          </p>
        </motion.div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {skeletonKeys.map((key) => (
              <div
                key={key}
                data-ocid="collection.loading_state"
                className="bg-card border border-border overflow-hidden"
              >
                <Skeleton className="aspect-square w-full bg-secondary" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-4 w-3/4 bg-secondary" />
                  <Skeleton className="h-3 w-1/2 bg-secondary" />
                  <Skeleton className="h-8 w-full bg-secondary" />
                </div>
              </div>
            ))}
          </div>
        ) : watches && watches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {watches.map((watch, i) => (
              <WatchCard
                key={String(watch.id)}
                watch={watch}
                index={i + 1}
                onAddToCart={handleAddToCart}
                isAdding={
                  addToCart.isPending &&
                  addToCart.variables?.watchId === watch.id
                }
              />
            ))}
          </div>
        ) : (
          <div data-ocid="collection.empty_state" className="text-center py-24">
            <p className="font-display text-2xl text-muted-foreground">
              No watches available
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Check back soon for new arrivals.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
