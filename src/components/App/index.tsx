import { PointerLockControls, Sky, Stars } from '@react-three/drei';
import { Ground } from 'components/Ground';
import { Player } from 'components/Player';
import { Cubes } from 'components/Cube';
import { Physics } from '@react-three/rapier';

const shadowOffset = 50;

export const App = () => {
  return (
    <>
      <PointerLockControls />
      <Sky sunPosition={[0, 0, 0]} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={1.5} />
      <directionalLight
        castShadow
        intensity={1.5}
        shadow-mapSize={4096}
        shadow-camera-top={shadowOffset}
        shadow-camera-bottom={-shadowOffset}
        shadow-camera-left={shadowOffset}
        shadow-camera-right={-shadowOffset}
        position={[100, 100, 0]}
      />
      <Physics gravity={[0, -20, 0]}>
        <Ground />
        <Player />
        <Cubes />
      </Physics>
    </>
  );
};

export default App;
