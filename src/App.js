import "./styles.css";
import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Plane } from "@react-three/drei";
import Knight from "./Knight";

export default function App() {
  const [dead, setDead] = useState(false);

  return (
    <>
      <button onClick={() => setDead(true)} style={{ margin: 10 }}>
        DEAD
      </button>
      <Canvas shadows camera={{ position: [0, 6.5, -12], fov: 80 }}>
        <ambientLight intensity={0.5} />
        <directionalLight
          intensity={1}
          position={[4, 20, 0]}
          color={0xffffff}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.002}
        />
        <Suspense fallback={null}>
          <Knight dead={dead} />
        </Suspense>
        <Plane
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          args={[200, 200]}
        >
          <meshStandardMaterial attach="material" color="green" />
        </Plane>
        <OrbitControls />
      </Canvas>
    </>
  );
}
