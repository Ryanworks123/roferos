import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsVisible(false), prefersReducedMotion ? 80 : 520);
    return () => window.clearTimeout(timeout);
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="status"
          aria-live="polite"
          aria-label="Loading ARCADEVERSE"
        >
          <div className="loader-card">
            <div className="loader-mark">AV</div>
            <div className="loader-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PageLoader;
