// // geotree
// import Head from "next/head";
// import { ChangeEvent, useEffect, useRef, useState } from "react";
// // import DatGui, {
// //   DatBoolean,
// //   DatColor,
// //   DatFolder,
// //   DatNumber,
// // } from "react-dat-gui";

// import { Canvas } from "./resources/canvas";
// import { radians } from "./resources/ctxHelpers";
// import { getDescription } from "./resources/readFiles";
// import { remapper } from "./resources/scaling";
// import { Matrix2D, Vec2D, Vector } from "./resources/vectors";
// import useWindowDimensions from "@/hooks/useWindowDimensions";
// import { Pane } from "tweakpane";

// type Config = {
//   iterations: number;
//   animateIterations: boolean;
//   angle: number;
//   background: string;
//   fillTriangles: boolean;
//   fillSquares: boolean;
// };

// type Props = {
//   description: string;
// };

// const MAX_ITERATIONS = 11;

// function determineTriangleTip(angle: number): (p1: Vec2D, p2: Vec2D) => Vec2D {
//   const angleRad = radians(angle);

//   const cos = Math.cos(angleRad);
//   const cos2 = cos * cos;

//   const sin = Math.sin(angleRad);
//   const sincos = sin * cos;

//   const rot: Matrix2D = [
//     [cos2, sincos],
//     [-sincos, cos2],
//   ];

//   return (p1, p2) => {
//     const vec = Vector.sub(p1, p2);

//     const dir = Vector.mul(vec, rot);
//     const p3 = Vector.add(p2, dir);

//     return p3;
//   };
// }

// const remapH = remapper([0, MAX_ITERATIONS], [23, 88]);
// const hsvGradient = (iteration: number) =>
//   `hsl(${remapH(iteration)}, 96%, 30%)`;

// const GeoTree = () => {
//   const [config, setConfig] = useState<Config>({
//     iterations: 0,
//     animateIterations: true,
//     angle: 45,
//     background: "#252424",
//     fillTriangles: true,
//     fillSquares: true,
//   });

//   const { width, height } = useWindowDimensions();
//   const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

//   useEffect(() => {
//     if (!config.animateIterations) return;

//     const delay = config.iterations === MAX_ITERATIONS ? 2000 : 600;

//     const interval = setInterval(() => {
//       setConfig((config) => {
//         const iterations = (config.iterations + 1) % (MAX_ITERATIONS + 1);
//         return { ...config, iterations };
//       });
//     }, delay);

//     return () => clearInterval(interval);
//   }, [config.animateIterations, config.iterations]);

//   useEffect(() => {
//     if (!ctx || !width || !height) return;

//     const drawPoly = (points: Vec2D[], color: string, fill = true) => {
//       const [start, ...remaining] = points;

//       ctx.beginPath();
//       ctx.moveTo(...start);
//       remaining.forEach((point) => ctx.lineTo(...point));
//       ctx.closePath();

//       ctx.fillStyle = color;
//       if (fill) ctx.fill();
//       ctx.strokeStyle = color;
//       ctx.stroke();
//     };

//     const paneContainerRef = useRef(null);
//     const paneRef = useRef(null);

//     const config: Config = {
//       background: "#ff0000",
//       angle: 45,
//       iterations: 5,
//       animateIterations: false,
//       fillTriangles: true,
//       fillSquares: false,
//     };

//     const updateConfig = (newConfig: Config) => {
//       console.log(newConfig);
//     };

//     useEffect(() => {
//       if (paneContainerRef.current && !paneRef.current) {
//         paneRef.current = new Pane({ container: paneContainerRef.current });

//         const folder = paneRef.current.addFolder({
//           title: "Options",
//           expanded: false,
//         });

//         folder
//           .addInput(config, "background", { label: "background" })
//           .on("change", (ev: ChangeEvent<HTMLInputElement>) =>
//             updateConfig({ ...config, background: ev.target.value })
//           );
//         folder
//           .addInput(config, "angle", {
//             min: 30,
//             max: 60,
//             step: 1,
//             label: "angle",
//           })
//           .on("change", (ev: ChangeEvent<HTMLInputElement>) =>
//             updateConfig({ ...config, angle: Number(ev.target.value) })
//           );
//         folder
//           .addInput(config, "iterations", {
//             min: 0,
//             max: MAX_ITERATIONS,
//             step: 1,
//             label: "iterations",
//           })
//           .on("change", (ev: ChangeEvent<HTMLInputElement>) =>
//             updateConfig({ ...config, iterations: Number(ev.target.value) })
//           );
//         folder
//           .addInput(config, "animateIterations", { label: "animate" })
//           .on("change", (ev: ChangeEvent<HTMLInputElement>) =>
//             updateConfig({
//               ...config,
//               animateIterations: Boolean(ev.target.value),
//             })
//           );
//         folder
//           .addInput(config, "fillTriangles", { label: "fill triangles" })
//           .on("change", (ev: ChangeEvent<HTMLInputElement>) =>
//             updateConfig({ ...config, fillTriangles: Boolean(ev.target.value) })
//           );
//         folder
//           .addInput(config, "fillSquares", { label: "fill squares" })
//           .on("change", (ev: ChangeEvent<HTMLInputElement>) =>
//             updateConfig({ ...config, fillSquares: Boolean(ev.target.value) })
//           );
//       }

//       return () => {
//         if (paneRef.current) {
//           paneRef.current.dispose();
//           paneRef.current = null;
//         }
//       };
//     }, []);

//     const thirdPoint = determineTriangleTip(config.angle);

//     const drawBranch = (p1: Vec2D, p2: Vec2D, depth = 0) => {
//       const [x1, y1] = p1;
//       const [x2, y2] = p2;

//       const d: Vec2D = [y1 - y2, x2 - x1];

//       const p3 = Vector.sub(p2, d);
//       const p4 = Vector.sub(p1, d);

//       const color = hsvGradient(depth);
//       drawPoly([p1, p2, p3, p4], color, config.fillSquares);

//       if (depth === config.iterations) return;

//       const p5 = thirdPoint(p3, p4);
//       drawPoly([p3, p4, p5], color, config.fillTriangles);

//       drawBranch(p4, p5, depth + 1);
//       drawBranch(p5, p3, depth + 1);
//     };

//     const drawTree = (size: number) => {
//       ctx.resetTransform();
//       const ratio = Math.ceil(window.devicePixelRatio);
//       ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

//       ctx.fillStyle = config.background;
//       ctx.fillRect(0, 0, width, height);
//       ctx.translate(width / 2, height);

//       const half = size / 2;
//       drawBranch([-half, 0], [half, 0]);
//     };

//     const draw = () => {
//       const maxW = width / 9;
//       const maxH = height / 5;
//       drawTree(Math.min(maxW, maxH));
//     };

//     draw();
//   }, [config, ctx, width, height, config.animateIterations]);

//   const handleUpdate = (newData: Config) => {
//     setConfig((prevState) => ({ ...prevState, ...newData }));
//   };

//   return (
//     <div
//       style={{ maxHeight: `${height / 1.3}px`, maxWidth: `${width / 1.25}px` }}
//     >
//       <Head>
//         <title>Pythagoras Tree</title>
//         <meta name="description" content={`tree tree tree`} />
//       </Head>
//       <main>
//         <div ref={paneContainerRef} />

//         <div>
//           <Canvas setCtx={setCtx} width={width} height={height} />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default GeoTree;

import { useEffect, useRef, useState } from "react";
import { Canvas } from "./resources/canvas";
import { radians } from "./resources/ctxHelpers";
import { remapper } from "./resources/scaling";
import { Matrix2D, Vec2D, Vector } from "./resources/vectors";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { Pane } from "tweakpane";
import { Config } from "./types";

const MAX_ITERATIONS = 11;
const remapH = remapper([0, MAX_ITERATIONS], [23, 88]);
const hsvGradient = (iteration: number) =>
  `hsl(${remapH(iteration)}, 96%, 30%)`;

function determineTriangleTip(angle: number): (p1: Vec2D, p2: Vec2D) => Vec2D {
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

const GeoTree = () => {
  const [config, setConfig] = useState<Config>({
    iterations: 0,
    animateIterations: true,
    angle: 45,
    background: "#252424",
    fillTriangles: true,
    fillSquares: true,
  });

  const { width, height } = useWindowDimensions();
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const paneContainerRef = useRef(null);
  const paneRef = useRef<Pane | null>(null);

  useEffect(() => {
    if (paneContainerRef.current && !paneRef.current) {
      paneRef.current = new Pane({ container: paneContainerRef.current });

      paneRef.current.addBinding(config, "background").on("change", (ev) => {
        setConfig((prevConfig) => ({
          ...prevConfig,
          background: ev.value,
        }));
      });
      paneRef.current.addBinding(config, "angle").on("change", (ev) =>
        setConfig((prevConfig) => ({
          ...prevConfig,
          angle: Number(ev.value),
        }))
      );
      paneRef.current.addBinding(config, "iterations").on("change", (ev) =>
        setConfig((prevConfig) => ({
          ...prevConfig,
          iterations: Number(ev.value),
        }))
      );
      paneRef.current
        .addBinding(config, "animateIterations")
        .on("change", (ev) =>
          setConfig((prevConfig) => ({
            ...prevConfig,
            animateIterations: Boolean(ev.value),
          }))
        );
      paneRef.current.addBinding(config, "fillTriangles").on("change", (ev) =>
        setConfig((prevConfig) => ({
          ...prevConfig,
          fillTriangles: Boolean(ev.value),
        }))
      );
      paneRef.current.addBinding(config, "fillSquares").on("change", (ev) =>
        setConfig((prevConfig) => ({
          ...prevConfig,
          fillSquares: Boolean(ev.value),
        }))
      );
    }

    return () => {
      if (paneRef.current) {
        paneRef.current.dispose();
        paneRef.current = null;
      }
    };
  }, [config]);

  useEffect(() => {
    if (!ctx || !width || !height) return;

    const drawPoly = (points: Vec2D[], color: string, fill = true) => {
      const [start, ...remaining] = points;

      ctx.beginPath();
      ctx.moveTo(...start);
      remaining.forEach((point) => ctx.lineTo(...point));
      ctx.closePath();

      ctx.fillStyle = color;
      if (fill) ctx.fill();
      ctx.strokeStyle = color;
      ctx.stroke();
    };

    const thirdPoint = determineTriangleTip(config.angle);

    const drawBranch = (p1: Vec2D, p2: Vec2D, depth = 0) => {
      const [x1, y1] = p1;
      const [x2, y2] = p2;

      const d: Vec2D = [y1 - y2, x2 - x1];

      const p3 = Vector.sub(p2, d);
      const p4 = Vector.sub(p1, d);

      const color = hsvGradient(depth);
      drawPoly([p1, p2, p3, p4], color, config.fillSquares);

      if (depth === config.iterations) return;

      const p5 = thirdPoint(p3, p4);
      drawPoly([p3, p4, p5], color, config.fillTriangles);

      drawBranch(p4, p5, depth + 1);
      drawBranch(p5, p3, depth + 1);
    };

    const drawTree = (size: number) => {
      ctx.resetTransform();
      const ratio = Math.ceil(window.devicePixelRatio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      ctx.fillStyle = config.background;
      ctx.fillRect(0, 0, width, height);
      ctx.translate(width / 2, height);

      const half = size / 2;
      drawBranch([-half, 0], [half, 0]);
    };

    const draw = () => {
      const maxW = width / 9;
      const maxH = height / 5;
      drawTree(Math.min(maxW, maxH));
    };

    draw();
  }, [config, ctx, width, height, config.animateIterations]);

  const handleUpdate = (newData: Config) => {
    setConfig((prevState) => ({ ...prevState, ...newData }));
  };

  return (
    <div className="flex flex-col justify-end">
      <div>
        <Canvas setCtx={setCtx} width={500} height={1000} />
      </div>
      <div className="absolute z-10" ref={paneContainerRef} />
    </div>
  );
};

export default GeoTree;
