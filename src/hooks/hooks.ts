import { useEffect, useState } from 'react';

export interface IKeys {
  [key: string]: string;
}

export const usePersonControls = () => {
  const keys: IKeys = {
    KeyW: 'forward',
    KeyS: 'backward',
    KeyA: 'left',
    KeyD: 'right',
    Space: 'jump'
  };

  const moveFieldByKey = (key: keyof IKeys) => keys[key];

  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false
  });

  const setMovementStatus = (code: any, status: any) => {
    console.log(code);
    console.log(status);

    setMovement((m) => ({ ...m, [code]: status }));
  };

  useEffect(() => {
    const handleKeyDown = (ev: any) => {
      setMovementStatus(moveFieldByKey(ev.code), true);
    };

    const handleKeyUp = (ev: any) => {
      setMovementStatus(moveFieldByKey(ev.code), false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return movement;
};
