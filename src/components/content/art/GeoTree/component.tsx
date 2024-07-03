import { useEffect, useRef, useState } from "react";
import { Canvas } from "./resources/canvas";
import { Vec2D, Vector } from "./resources/vectors";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { Pane } from "tweakpane";
import { Config } from "./types";
import {
  determineTriangleTip,
  hsvGradient,
  MAX_ITERATIONS,
} from "./resources/ctxHelpers";

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
  const _width = width / 1.25;
  const _height = height / 1.25;
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
    if (!ctx || !_width || !_height) return;

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
      ctx.fillRect(0, 0, _width, _height);
      ctx.translate(_width / 2, _height);

      const half = size / 2;
      drawBranch([-half, 0], [half, 0]);
    };

    const draw = () => {
      const maxW = _width / 9;
      const maxH = _height / 5;
      drawTree(Math.min(maxW, maxH));
    };

    draw();
  }, [config, ctx, _width, _height, config.animateIterations]);

  useEffect(() => {
    if (config.animateIterations) {
      const interval = setInterval(() => {
        setConfig((prevState) => ({
          ...prevState,
          iterations: (prevState.iterations + 1) % (MAX_ITERATIONS + 1), // Loop back to 0
        }));
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [config.animateIterations]);

  return (
    <div className="flex flex-col justify-end">
      <div>
        <Canvas setCtx={setCtx} width={_width} height={_height} />
      </div>
      <div className="absolute z-10" ref={paneContainerRef} />
    </div>
  );
};

export default GeoTree;
