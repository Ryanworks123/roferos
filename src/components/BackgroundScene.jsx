import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const createPoints = () => {
  let seed = 13;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  return Array.from({ length: 54 }, (_, index) => ({
    id: index,
    x: random(),
    y: random(),
    z: 0.35 + random() * 0.95,
    speed: 0.08 + random() * 0.18,
    radius: 0.8 + random() * 1.8,
  }));
};

const POINTS = createPoints();

export default function BackgroundScene() {
  const canvasRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return undefined;

    const context = canvas.getContext("2d", { alpha: true });
    let frame = 0;
    let width = 0;
    let height = 0;
    const pointer = { x: 0, y: 0 };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const onPointerMove = (event) => {
      pointer.x = (event.clientX / Math.max(width, 1) - 0.5) * 18;
      pointer.y = (event.clientY / Math.max(height, 1) - 0.5) * 12;
    };

    const draw = (time) => {
      context.clearRect(0, 0, width, height);
      context.lineWidth = 1;

      POINTS.forEach((point, index) => {
        const drift = time * 0.00004 * point.speed;
        const x = ((point.x + drift) % 1) * width + pointer.x * point.z;
        const y = (point.y + Math.sin(time * 0.0004 + index) * 0.018) * height + pointer.y * point.z;
        const radius = point.radius * point.z;

        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle = index % 3 === 0 ? "rgba(116, 211, 174, 0.34)" : index % 3 === 1 ? "rgba(240, 179, 90, 0.24)" : "rgba(143, 183, 255, 0.22)";
        context.fill();

        if (index % 5 === 0) {
          const next = POINTS[(index + 7) % POINTS.length];
          const nextX = ((next.x + drift) % 1) * width + pointer.x * next.z;
          const nextY = next.y * height + pointer.y * next.z;
          context.beginPath();
          context.moveTo(x, y);
          context.lineTo(nextX, nextY);
          context.strokeStyle = "rgba(255, 255, 255, 0.055)";
          context.stroke();
        }
      });

      frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [reducedMotion]);

  return (
    <div className="background-scene background-fallback" aria-hidden="true">
      {!reducedMotion && <canvas ref={canvasRef} />}
    </div>
  );
}
