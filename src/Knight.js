/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from '@react-three/drei';
import { LoopOnce } from "three";
import { useKeyboardControls } from "./useKeyboardControls";
import { useFrame } from "@react-three/fiber";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export function Knight({ dead }) {
  const char = useRef();
  const weapon = useRef();
  const shield = useRef();

  const [action, setAction] = useState("Idle");
  const [attack, setAttack] = useState(false);

  const { nodes, materials, animations } = useGLTF("/Knight.glb");
  const Sword = useGLTF("/Sword.glb");
  const Shield = useGLTF("/Shield.glb");
  
  const { actions } = useAnimations(animations, char);
  const previousAction = usePrevious(action);
  const controls = useKeyboardControls();

  console.log(actions)

  useEffect(() => {
    nodes.mixamorigRightHand.add(weapon.current);
    nodes.mixamorigLeftHand.add(shield.current);
  }, [nodes]);

  console.log(actions)


  useEffect(() => {
    const { moveForward, moveBackward, turnLeft, turnRight, block } = controls;
    if (dead) {
      setAction("Death");
      return;
    }
    if (attack) {
      setAction("Attack");
      return;
    }

    if (turnLeft || turnRight) {
      setAction("Walk");
    }
    if (moveForward) {
      setAction("RunForward");
    } else if (moveBackward) {
      setAction("RunBackward");
    } else if (!turnRight && !turnLeft && !block) {
      setAction("Idle");
    }

    if (block) {
      setAction("Block");
    }
  }, [controls, previousAction, dead, attack]);

  useEffect(() => {
    window.addEventListener("mousedown", () => setAttack(true));
    window.addEventListener("mouseup", () => setAttack(false));
    return () => {
      window.removeEventListener("mousedown", () => setAttack(true));
      window.removeEventListener("mouseup", () => setAttack(false));
    };
  }, []);

  useEffect(() => {
    if (action === "Death") {
      if (previousAction && previousAction !== action) {
        actions[previousAction].fadeOut(0.2);
        actions[action].stop();
      }
      actions[action].setLoop(LoopOnce);
      actions[action].clampWhenFinished = true;
      actions[action].play();
    } else {
      if (previousAction && previousAction !== action) {
        actions[previousAction].fadeOut(0.2);
        actions[action].stop();
        actions[action].clampWhenFinished = true;
        actions[action].play();
        actions[action].fadeIn(0.2);
      }
    }
  }, [actions, action, previousAction]);

  useFrame(() => {
    const { turnLeft } = controls;
    if (turnLeft) {
      char.current.rotation.y += 0.02;
    }
  });

  useFrame(() => {
    const { turnRight } = controls;
    if (turnRight) {
      char.current.rotation.y -= 0.02;
    }
  });

  return (
    <group dispose={null}>
      <group name="Player" ref={char} position={[0, 0, -3]}>
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.035}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh 
            name="Knight" 
            geometry={nodes.Knight.geometry} 
            material={materials.Knight_Mat} 
            skeleton={nodes.Knight.skeleton} 
            castShadow 
            receiveShadow 
          />
        </group>
      </group>
      <mesh
        name="Sword"
        ref={weapon}
        geometry={Sword.nodes.Sword.geometry}
        material={useGLTF('/Shield.glb').materials['Knight_Tristan_Blue.003']}
        rotation={[Math.PI / 2.4, Math.PI / -2.5, 0]}
        position={[-5, 16, 5.5]}
        scale={1.2}
        castShadow
        receiveShadow
      />
      <mesh
        name="Shield"
        ref={shield}
        geometry={Shield.nodes.Shield.geometry}
        material={useGLTF('/Sword.glb').materials['Knight_Tristan_Blue.003']}
        rotation={[0, Math.PI / 1.75, Math.PI / -2.5]}
        position={[-5, 16, -2]}
        scale={1.2}
        castShadow
        receiveShadow
      />
    </group>
  )
}

useGLTF.preload('/Knight.glb');
useGLTF.preload("/Sword.glb");
useGLTF.preload("/Shield.glb");

export default Knight;