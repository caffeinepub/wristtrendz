export function getWatchImage(id: bigint): string {
  const num = Number(id);
  if (num >= 1 && num <= 8) {
    return `/assets/generated/watch-${num}.dim_600x600.jpg`;
  }
  // fallback to cycling through images for ids beyond 8
  const cycled = ((num - 1) % 8) + 1;
  return `/assets/generated/watch-${cycled}.dim_600x600.jpg`;
}

export function formatPrice(cents: bigint): string {
  const dollars = Number(cents) / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(dollars);
}
