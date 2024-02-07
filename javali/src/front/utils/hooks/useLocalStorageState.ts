import { useState, useEffect } from "react";

export function useLocalStorageState<T>(key: string, defaultValue: T) {
  const initialStateByKey =
    typeof window !== "undefined" ? localStorage.getItem(key) : null;
  const initialState =
    typeof initialStateByKey === "string"
      ? JSON.parse(initialStateByKey)
      : defaultValue;

  const [state, setState] = useState(initialState);

  function setLocalStorageState(newState: T) {
    setState(newState);
    if (Boolean(newState)) {
      return localStorage.setItem(key, JSON.stringify(newState));
    }
    return localStorage.removeItem(key);
  }

  return [state, setLocalStorageState];
}
