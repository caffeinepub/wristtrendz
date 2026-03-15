import { Award, Compass, Shield } from "lucide-react";
import { motion } from "motion/react";

const pillars = [
  {
    icon: Award,
    title: "Swiss & Japanese Craftsmanship",
    description:
      "Every movement we carry bears the hallmark of centuries of horological tradition — from ETA to Miyota and beyond.",
  },
  {
    icon: Compass,
    title: "Curated with Purpose",
    description:
      "Our team of watchmakers personally evaluates every reference for finishing quality, accuracy, and long-term value.",
  },
  {
    icon: Shield,
    title: "Accessible Luxury",
    description:
      "We eliminate the boutique markup. The same prestige, the same complications — at a fraction of the typical price.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      data-ocid="about.section"
      className="py-28 px-6 relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5"
        style={{
          background:
            "radial-gradient(circle, oklch(0.77 0.12 82), transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-medium tracking-[0.3em] text-primary uppercase">
                Our Philosophy
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">
              Time is the{" "}
              <span className="gold-shimmer italic">only luxury</span>
              <br />
              that matters.
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              WristTrendz was founded on a simple conviction: the finest
              timepieces should not be reserved for the privileged few. We
              source directly from manufacture-authorised distributors, cutting
              out the layers of margin that inflate retail prices.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              From the Vallée de Joux to the workshops of Osaka, we bring you
              watches with genuine heritage — at prices that make sense. Every
              purchase includes a 2-year warranty and a certificate of
              authenticity.
            </p>
          </motion.div>

          {/* Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-6"
          >
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="flex gap-5 p-5 border border-border bg-card/50 hover:border-primary/40 transition-colors duration-300"
              >
                <div className="w-10 h-10 flex-shrink-0 border border-primary/30 flex items-center justify-center">
                  <pillar.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
