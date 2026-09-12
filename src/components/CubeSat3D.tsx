"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { Suspense, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

const AZURE = "#126bff";
const DEEP = "#071329";
const SILVER = "#9aa7bd";

function SolarPanel({ position, rotY = 0 }: { position: [number, number, number]; rotY?: number }) {
  return (
    <group position={position} rotation={[0, rotY, 0]}>
      {[-0.9, -0.3, 0.3, 0.9].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.6, 0.05, 1.2]} />
          <meshStandardMaterial color={i % 2 === 0 ? AZURE : DEEP} metalness={0.3} roughness={0.4} />
        </mesh>
      ))}
      <mesh position={[0, -0.12, 0]}>
        <boxGeometry args={[2.2, 0.08, 1.3]} />
        <meshStandardMaterial color="#c3cddd" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

function CubeSatBody() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.002;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#e8edf4" metalness={0.6} roughness={0.35} />
      </mesh>

      <mesh position={[0, 0, 0.501]}>
        <boxGeometry args={[0.8, 0.8, 0.02]} />
        <meshStandardMaterial color={AZURE} metalness={0.4} roughness={0.4} />
      </mesh>

      <mesh position={[0, 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
        <meshStandardMaterial color={SILVER} metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.78, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color={AZURE} emissive={AZURE} emissiveIntensity={0.6} />
      </mesh>

      {[0.501, -0.501].map((z, i) => (
        <mesh key={i} position={[0, 0, z]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[1.06, 0.04, 1.06]} />
          <meshStandardMaterial color={SILVER} metalness={0.85} roughness={0.25} />
        </mesh>
      ))}

      <SolarPanel position={[1.35, 0, 0]} rotY={Math.PI / 2} />
      <SolarPanel position={[-1.35, 0, 0]} rotY={-Math.PI / 2} />

      <mesh position={[0.3, 0.5, 0.3]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#0a0f1a" metalness={0.4} roughness={0.2} />
      </mesh>
      <mesh position={[-0.3, -0.5, 0.3]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#0a0f1a" metalness={0.4} roughness={0.2} />
      </mesh>
    </group>
  );
}

function OrbitRings() {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.05;
  });
  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2.4, 0, 0]}>
      <torusGeometry args={[2.1, 0.004, 8, 120]} />
      <meshBasicMaterial color={AZURE} transparent opacity={0.5} />
    </mesh>
  );
}

function Scene({ progressRef }: { progressRef?: MutableRefObject<{ v: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  const isMobile = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches,
    []
  );
  useFrame((state) => {
    if (!groupRef.current) return;
    if (!isMobile) {
      const p = progressRef?.current.v ?? 0;
      groupRef.current.position.y =
        p * 0.6 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
      groupRef.current.rotation.z = state.pointer.x * 0.2;
      groupRef.current.rotation.x = -state.pointer.y * 0.15;
    }
  });

  return (
    <>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
        <group ref={groupRef}>
          <OrbitRings />
          <CubeSatBody />
        </group>
      </Float>
      {!isMobile && (
        <Stars radius={30} depth={30} count={500} factor={2} saturation={0} fade speed={1} />
      )}
    </>
  );
}

export default function CubeSat3D({
  progressRef,
}: {
  progressRef?: MutableRefObject<{ v: number }>;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.3, 4], fov: 45 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 4, 4]} intensity={1.4} color="#cfe0ff" />
      <directionalLight position={[-4, -2, -2]} intensity={0.4} color={AZURE} />
      <pointLight position={[0, 2, 3]} intensity={0.5} color={AZURE} />
      <Suspense fallback={null}>
        <Scene progressRef={progressRef} />
      </Suspense>
    </Canvas>
  );
}