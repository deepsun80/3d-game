import { useState, useEffect } from "react";
function actionByKey(key) {
  const keys = {
    KeyW: "moveForward",
    KeyS: "moveBackward",
    KeyA: "turnLeft",
    KeyD: "turnRight",
    Space: "block"
  };
  return keys[key];
}

export const useKeyboardControls = () => {
  const [movement, setMovement] = useState({
    moveForward: false,
    moveBackward: false,
    turnLeft: false,
    turnRight: false
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Movement key
      if (actionByKey(e.code)) {
        setMovement((state) => ({ ...state, [actionByKey(e.code)]: true }));
      }
    };
    const handleKeyUp = (e) => {
      // Movement key
      if (actionByKey(e.code)) {
        setMovement((state) => ({ ...state, [actionByKey(e.code)]: false }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return movement;
};
