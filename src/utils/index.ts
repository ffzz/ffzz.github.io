import { useState, useEffect } from "react";

const isFalse = (value: unknown): boolean => {
  //if value equals zero return false(!value ==== true), or return true
  return value === 0 ? false : !value;
};

const isVoid = (value: unknown) => {
  return value === undefined || value === null || value === "";
};

/**
 *
 * @param {object} object
 * @returns object
 * @description "delete value of the key that equals null/undefined but not include 0"
 * @author "Benchen"
 *
 */
const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

/**
 *
 * @param {String} url
 * @param {function} callback a function to accept the json-data-form parameter
 * @param {Array} dependence
 */
const useFetch = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValue;
};

export { isFalse, cleanObject, useDebounce, useFetch };
