import * as THREE from 'three';
import * as RAPIER from '@dimforge/rapier3d-compat';
import { RapierRigidBody, useRapier, RigidBody } from '@react-three/rapier';
import { MutableRefObject, RefObject, useRef } from 'react';
import { usePersonControls } from 'hooks/hooks';
import { useFrame } from '@react-three/fiber';

const MOVE_SPEED = 5;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export const Player = () => {
  const playerRef: RefObject<RapierRigidBody> | MutableRefObject<RapierRigidBody> = useRef(null);

  const { forward, backward, left, right, jump } = usePersonControls();

  const rapier = useRapier();

  useFrame(() => {
    if (!playerRef.current) return;

    const velocity = playerRef.current.linvel();

    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(MOVE_SPEED);

    playerRef.current.wakeUp();
    playerRef.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z }, true);

    const world = rapier.world;
    const ray = world.castRay(
      new RAPIER.Ray(playerRef.current.translation(), { x: 0, y: -1, z: 0 }),
      0,
      false
    );

    // const grounded = ray && ray.collider && Math.abs(ray.toi) <= 0.75;
    const grounded = ray && ray.collider;
    if (jump && grounded) doJump();
  });

  const doJump = () => {
    if (!playerRef.current) return;
    playerRef.current.setLinvel({ x: 0, y: 8, z: 0 }, false);
  };

  return (
    <>
      <RigidBody position={[0, 1, -2]} mass={1} ref={playerRef} lockRotations>
        <mesh>
          <capsuleGeometry args={[0.5, 0.5]} />
        </mesh>
      </RigidBody>
    </>
  );
};
