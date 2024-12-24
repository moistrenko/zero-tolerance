import { RigidBody } from '@react-three/rapier';
import cubes from './cubes.json';

export interface IProps {
  key: number;
  position: number[];
}

export const Cubes = () => {
  return (
    <>
      {cubes.map((coords, index) => (
        <Cube key={index} position={coords} />
      ))}
    </>
  );
};

const Cube = (props: IProps) => {
  const { position, ...rest } = props;
  const validPosition: [number, number, number] =
    position.length === 3 ? [position[0], position[1], position[2]] : [0, 0, 0];

  return (
    <RigidBody position={validPosition} {...rest}>
      <mesh castShadow receiveShadow>
        <meshStandardMaterial color="white" />
        <boxGeometry />
      </mesh>
    </RigidBody>
  );
};
