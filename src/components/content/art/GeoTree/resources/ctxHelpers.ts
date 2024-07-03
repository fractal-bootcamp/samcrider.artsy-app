import { remapper } from "./scaling";
import { Vec2D, Matrix2D, Vector } from "./vectors";

function radians(angle: number) {
  return (angle * Math.PI) / 180;
}

export const MAX_ITERATIONS = 11;
export const remapH = remapper([0, MAX_ITERATIONS], [23, 88]);
export const hsvGradient = (iteration: number) =>
  `hsl(${remapH(iteration)}, 96%, 30%)`;

export function determineTriangleTip(
  angle: number
): (p1: Vec2D, p2: Vec2D) => Vec2D {
  const angleRad = radians(angle);

  const cos = Math.cos(angleRad);
  const cos2 = cos * cos;

  const sin = Math.sin(angleRad);
  const sincos = sin * cos;

  const rot: Matrix2D = [
    [cos2, sincos],
    [-sincos, cos2],
  ];

  return (p1, p2) => {
    const vec = Vector.sub(p1, p2);

    const dir = Vector.mul(vec, rot);
    const p3 = Vector.add(p2, dir);

    return p3;
  };
}
