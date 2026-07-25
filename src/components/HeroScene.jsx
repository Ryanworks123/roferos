import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const nodes = [
  [-2.5, 1.6, -1.2],
  [2.2, 1.8, -1.8],
  [2.8, -1.2, -1.1],
  [-2.6, -1.5, -2],
  [0.2, 2.4, -2.4],
  [0.8, -2.4, -1.7],
];

function InterfaceOrbit() {
  const group = useRef(null);
  const core = useRef(null);
  const elapsed = useRef(0);

  useFrame((state, delta) => {
    elapsed.current += Math.min(delta, 0.04);
    if (!group.current || !core.current) return;
    group.current.rotation.y += (state.pointer.x * 0.22 - group.current.rotation.y) * 0.035;
    group.current.rotation.x += (-state.pointer.y * 0.12 - group.current.rotation.x) * 0.035;
    core.current.rotation.x += delta * 0.13;
    core.current.rotation.y += delta * 0.2;
    group.current.position.y = Math.sin(elapsed.current * 0.55) * 0.12;
  });

  return (
    <group ref={group} rotation={[0.08, -0.16, 0]}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.18, 1]} />
        <meshPhysicalMaterial color="#102b25" emissive="#164d42" emissiveIntensity={0.45} metalness={0.48} roughness={0.22} wireframe />
      </mesh>
      <mesh rotation={[0.35, 0.1, 0]}>
        <torusGeometry args={[1.9, 0.018, 8, 96]} />
        <meshBasicMaterial color="#6ee7d2" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[1.2, 0.6, 0.4]}>
        <torusGeometry args={[2.65, 0.012, 8, 96]} />
        <meshBasicMaterial color="#c8f56a" transparent opacity={0.3} />
      </mesh>
      {nodes.map((position, index) => (
        <group key={position.join("-")} position={position}>
          <mesh rotation={[0.25 * index, 0.18 * index, 0]}>
            <boxGeometry args={index % 2 ? [0.82, 0.52, 0.08] : [0.56, 0.78, 0.08]} />
            <meshPhysicalMaterial color={index % 3 === 0 ? "#173b34" : "#111816"} emissive={index % 3 === 0 ? "#0c4438" : "#101c18"} emissiveIntensity={0.28} roughness={0.28} metalness={0.35} transparent opacity={0.88} />
          </mesh>
          <mesh position={[0, 0, 0.055]}>
            <planeGeometry args={index % 2 ? [0.54, 0.018] : [0.34, 0.018]} />
            <meshBasicMaterial color={index % 2 ? "#6ee7d2" : "#c8f56a"} />
          </mesh>
        </group>
      ))}
      {Array.from({ length: 24 }, (_, index) => {
        const angle = (index / 24) * Math.PI * 2;
        const radius = 3.2 + (index % 3) * 0.32;
        return (
          <mesh key={index} position={[Math.cos(angle) * radius, Math.sin(angle) * radius * 0.65, -2.4 + (index % 4) * 0.25]}>
            <sphereGeometry args={[0.022, 6, 6]} />
            <meshBasicMaterial color={index % 4 === 0 ? "#c8f56a" : "#6ee7d2"} transparent opacity={0.62} />
          </mesh>
        );
      })}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.05} />
      <directionalLight position={[4, 5, 6]} intensity={2.2} color="#d9fff6" />
      <pointLight position={[-4, -2, 3]} intensity={18} distance={9} color="#2ac9ad" />
      <InterfaceOrbit />
    </>
  );
}

export default function HeroScene() {
  const reducedMotion = usePrefersReducedMotion();
  if (reducedMotion) return <div className="scene-fallback" />;

  return (
    <div className="hero-scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 42 }}
        dpr={[1, 1.35]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        performance={{ min: 0.6 }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
