import * as THREE from 'three';
import * as RAPIER from '@dimforge/rapier3d-compat';
import { RapierRigidBody, CapsuleCollider, useRapier, RigidBody } from '@react-three/rapier';
import { MutableRefObject, RefObject, useRef } from 'react';
import { usePersonControls } from 'hooks/hooks';
import { useFrame } from '@react-three/fiber';
import { Weapon } from 'components/Weapon/';

const MOVE_SPEED = 5;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const rotation = new THREE.Vector3();

export const Player = () => {
  const playerRef: RefObject<RapierRigidBody> | MutableRefObject<RapierRigidBody> = useRef(null);

  const { forward, backward, left, right, jump } = usePersonControls();

  const objectInHandRef = useRef<THREE.Group>(null);

  const rapier = useRapier();

  useFrame((state) => {
    if (!playerRef.current) return;

    const velocity = playerRef.current.linvel();

    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(MOVE_SPEED)
      .applyEuler(state.camera.rotation);

    playerRef.current.wakeUp();
    playerRef.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z }, true);

    const world = rapier.world;
    const ray = world.castRay(
      new RAPIER.Ray(playerRef.current.translation(), { x: 0, y: -1, z: 0 }),
      1,
      true
    );
    const { x, y, z } = playerRef.current.translation();
    const grounded = ray && ray.collider && y <= 1.5;

    if (jump && grounded) doJump();

    state.camera.position.set(x, y, z);

    if (objectInHandRef.current) {
      const objectInHand = objectInHandRef.current as THREE.Object3D;
      objectInHand.rotation.copy(state.camera.rotation);
      objectInHand.position
        .copy(state.camera.position)
        .add(state.camera.getWorldDirection(rotation));
    }
  });

  const doJump = () => {
    if (!playerRef.current) return;
    playerRef.current.setLinvel({ x: 0, y: 8, z: 0 }, false);
  };

  return (
    <>
      <RigidBody colliders={false} mass={1} ref={playerRef} lockRotations>
        <mesh receiveShadow>
          <CapsuleCollider args={[0.75, 0.5]} />
        </mesh>
      </RigidBody>

      <group ref={objectInHandRef}>
        <Weapon position={[0.3, -0.1, 0.3]} scale={0.3} />
      </group>
    </>
  );
};
