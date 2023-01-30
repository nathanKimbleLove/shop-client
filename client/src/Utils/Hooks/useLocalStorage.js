import { useState } from 'react';

export default function useLocalStorage(key, initialValue) {

  const [state, setState] = useState(() => {
    const value = localStorage.getItem(key);
    if (value === null) {
      return initialValue;
    }
    return value;
  });

  const setStateAndUpdateLocalStorage = (newState) => {
    setState(newState);
    localStorage.setItem(key, newState);
  };

  return [state, setStateAndUpdateLocalStorage];
}