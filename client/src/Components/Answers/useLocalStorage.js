import { useState } from "react";
export default function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    const value = localStorage.getItem(key);
    if (value === null) {
      return initialValue;
    }
    return value;
  });
  const setStateAndUpdateLocalStorage = (newState) => {
    if ([...state].includes(newState)) {
      // console.log("key already in container");
    } else {
      setState([...state, newState]);
      localStorage.setItem(key, JSON.stringify([...state, newState]));
    }
  };
  return [state, setStateAndUpdateLocalStorage];
}
