import { PointerLockControls, Sky, Stars } from '@react-three/drei';
import { Ground } from 'components/Ground';
import { Player } from 'components/Player';
import { Cubes } from 'components/Cube';
import { AKS74U } from 'components/Weapons/AKS-74U';
import { Physics } from '@react-three/rapier';

export const App = () => {
  return (
    <>
      <PointerLockControls />
      <Sky sunPosition={[0, 0, 0]} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={1.5} />
      <Physics gravity={[0, -20, 0]}>
        <Ground />
        <Player />
        <Cubes />
      </Physics>

      <group position={[0, 3, 0]}>
        <AKS74U />
      </group>
    </>
  );
};

export default App;
