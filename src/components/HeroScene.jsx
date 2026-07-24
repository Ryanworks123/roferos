import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import { Suspense, useRef } from "react";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const particlePositions = Array.from({ length: 26 }, (_, index) => {
  const seed = index + 1;
  const x = ((seed * 37) % 100) / 100 - 0.5;
  const y = ((seed * 53) % 100) / 100 - 0.5;
  const z = ((seed * 71) % 100) / 100 - 0.5;

  return {
    id: index,
    position: [x * 8, y * 5, z * 4],
  };
});

function FloatingShape({ position, color, speed, scale, geometry = "box" }) {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useFrame((state) => {
    if (!ref.current || prefersReducedMotion) return;
    ref.current.rotation.x = state.clock.elapsedTime * speed;
    ref.current.rotation.y = state.clock.elapsedTime * speed * 0.75;
  });

  const Geometry = geometry === "sphere" ? "sphereGeometry" : "boxGeometry";

  return (
    <Float speed={prefersReducedMotion ? 0 : 1.35} rotationIntensity={0.35} floatIntensity={0.6}>
      <mesh ref={ref} position={position} scale={scale}>
        {Geometry === "sphereGeometry" ? (
          <sphereGeometry args={[1, 32, 32]} />
        ) : (
          <boxGeometry args={[1.4, 1.4, 1.4]} />
        )}
        <MeshDistortMaterial color={color} roughness={0.35} metalness={0.08} distort={0.18} speed={1.4} />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  return (
    <group>
      {particlePositions.map((point) => (
        <mesh key={point.id} position={point.position}>
          <sphereGeometry args={[0.025, 10, 10]} />
          <meshBasicMaterial color="#8ab4ff" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={1.8} />
      <directionalLight position={[4, 5, 5]} intensity={2.1} />
      <pointLight position={[-3, -2, 3]} intensity={1.2} color="#7dd3fc" />
      <FloatingShape position={[-1.6, 0.15, 0]} color="#2563eb" speed={0.28} scale={1.15} />
      <FloatingShape position={[1.25, -0.8, -0.4]} color="#38bdf8" speed={0.18} scale={0.72} geometry="sphere" />
      <FloatingShape position={[1.55, 1.05, -1.2]} color="#a78bfa" speed={0.22} scale={0.52} />
      <ParticleField />
      <OrbitControls enablePan={false} enableZoom={false} rotateSpeed={0.25} autoRotate autoRotateSpeed={0.35} />
    </>
  );
}

function HeroScene() {
  return (
    <div className="hero-scene" aria-hidden="true">
      <Suspense fallback={<div className="scene-skeleton" />}>
        <Canvas camera={{ position: [0, 0, 6], fov: 38 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
          <SceneContent />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default HeroScene;
