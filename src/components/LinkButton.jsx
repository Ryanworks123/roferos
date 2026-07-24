import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

function LinkButton({ href, children, variant = "secondary", disabledLabel, ...props }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 180, damping: 18, mass: 0.35 });
  const springY = useSpring(pointerY, { stiffness: 180, damping: 18, mass: 0.35 });
  const x = useTransform(springX, (value) => (prefersReducedMotion ? 0 : value));
  const y = useTransform(springY, (value) => (prefersReducedMotion ? 0 : value));

  const handlePointerMove = (event) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left - rect.width / 2) * 0.18);
    pointerY.set((event.clientY - rect.top - rect.height / 2) * 0.18);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  if (!href) {
    return (
      <span className={`button button-${variant} button-disabled`} aria-disabled="true">
        {disabledLabel || children}
      </span>
    );
  }

  return (
    <motion.a
      className={`button button-${variant}`}
      href={href}
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      onPointerUp={resetPointer}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
      {...props}
    >
      <span className="button-ripple" aria-hidden="true" />
      {children}
    </motion.a>
  );
}

export default LinkButton;
