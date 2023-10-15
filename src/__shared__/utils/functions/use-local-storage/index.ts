"use client";
import { useState } from "react";
type Props = {
  key: string;
  initialValue?: any;
};
/**
 * @public
 */
export const useLocalStorage = ({ key, initialValue }: Props) => {
  const getInitialValue = () => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    }
    return initialValue;
  };

  const [storedValue, setStoredValue] = useState<any>(getInitialValue);

  const storeValue = (value: any) => {
    try {
      const valueToStore =
        typeof value === "function" ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error storing value in localStorage:", error);
    }
  };

  return [storedValue, storeValue];
};
