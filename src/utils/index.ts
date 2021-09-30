import { useState, useEffect } from "react";
import { TupleType } from "typescript";

const isFalse = (value: unknown): boolean => {
  //if value equals zero return false(!value ==== true), or return true
  return value === 0 ? false : !value;
};

/**
 *
 * @param {object} object
 * @returns object
 * @description "delete value of the key that equals null/undefined but not include 0"
 * @author "Benchen"
 *
 */
const cleanObject: (object: object) => object = (object) => {
  const result: object = { ...object };
  Object.keys(result).forEach((key) => {
    //@ts-ignore
    const value = result[key];
    if (isFalse(value)) {
      //@ts-ignore
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
const useFetch = (
  url: string,
  callback: (object: any) => void,
  dependence: (object | string | number)[]
) => {
  if (typeof callback === "function") {
    useEffect(() => {
      fetch(url).then(async (response) => {
        if (response.ok) {
          callback(await response.json());
        }
      });
    }, [...dependence]);
  } else {
    throw new Error("the second parameter should be a function");
  }
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
