type NumberPair = [number, number];

export function remapper(
  [pMin, pMax]: NumberPair,
  [tMin, tMax]: NumberPair
): (p: number) => number {
  const factor = (tMax - tMin) / (pMax - pMin);
  return (p) => tMin + factor * (p - pMin);
}
