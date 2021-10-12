import { cleanObject } from "utils";
import { useMemo, useState } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

/**
 *
 * @returns return params on the url of the page
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [stateKeys] = useState(keys);
  const [searchParams, setSearchParams] = useSearchParams();

  return [
    useMemo(
      () =>
        stateKeys.reduce((prev, key: string) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      [searchParams, stateKeys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParams(o);
    },
  ] as const;
};
