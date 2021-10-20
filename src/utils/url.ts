import { cleanObject, subset } from "utils";
import { useMemo, useState } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

/**
 *
 * @returns return params on the url of the page
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [stateKeys] = useState(keys);
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();

  return [
    useMemo(
      () =>
        subset(Object.fromEntries(searchParams), stateKeys) as {
          [key in K]: string;
        },
      [searchParams, stateKeys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params);
    },
  ] as const;
};

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();

  return (params: Partial<{ [key in string]: unknown }>) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParam(o);
  };
};
