import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import type { Watch } from "../backend.d";
import { formatPrice, getWatchImage } from "../lib/watchImages";

interface WatchCardProps {
  watch: Watch;
  index: number;
  onAddToCart: (watchId: bigint) => void;
  isAdding: boolean;
}

export default function WatchCard({
  watch,
  index,
  onAddToCart,
  isAdding,
}: WatchCardProps) {
  return (
    <motion.article
      data-ocid={`watch.item.${index}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="watch-card-hover group relative bg-card border border-border overflow-hidden flex flex-col cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={getWatchImage(watch.id)}
          alt={`${watch.brand} ${watch.name}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Price overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Badge className="absolute top-3 left-3 bg-primary/20 text-primary border border-primary/30 text-[10px] tracking-widest uppercase rounded-none">
          {watch.brand}
        </Badge>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display text-lg font-semibold mb-1 leading-snug">
          {watch.name}
        </h3>

        {/* Specs row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4 mt-2">
          {[
            { label: "Movement", value: watch.movement },
            { label: "Case", value: `${watch.caseSize}mm` },
            { label: "Material", value: watch.material },
            { label: "Water Res.", value: watch.waterResistance },
          ].map((spec) => (
            <div key={spec.label} className="flex flex-col">
              <span className="text-[10px] tracking-widest uppercase text-muted-foreground">
                {spec.label}
              </span>
              <span className="text-xs font-medium text-foreground/80">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <div className="gold-divider mb-4" />
          <div className="flex items-center justify-between">
            <span className="font-display text-xl font-bold gold-shimmer">
              {formatPrice(watch.priceCents)}
            </span>
            <Button
              data-ocid={`watch.add_button.${index}`}
              size="sm"
              disabled={isAdding}
              onClick={() => onAddToCart(watch.id)}
              className="bg-primary/10 border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground rounded-none transition-all duration-300 text-xs tracking-widest uppercase h-9 px-4"
            >
              {isAdding ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
              )}
              {isAdding ? "Adding..." : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
