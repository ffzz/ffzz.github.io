import { useMountedRef } from "./index";
import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  status: "pending" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  status: "pending",
  data: null,
  error: null,
};

const defaultConfig = {
  throwError: false,
};

export const useAsyncHttp = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...defaultConfig,
    ...initialState,
    ...initialConfig,
  });

  const [refetch, setRefetch] = useState(() => () => {});

  const setData = (data: D) =>
    setState({
      data,
      status: "success",
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      error,
      status: "error",
      data: null,
    });

  /**
   *
   * @param promise fetch data function
   * @param fetchConfig refetch data config if refetch
   * @returns fetchData, refetch, isLoading, isError...
   * @description async fetch data with three status: pending, loading, error
   */
  const fetchData = (
    promise: Promise<D>,
    fetchConfig?: { refetch: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error("Please pass Promise type data!");
    }

    setState({ ...state, status: "loading" });

    setRefetch(() => () => {
      if (fetchConfig?.refetch) {
        fetchData(fetchConfig?.refetch(), fetchConfig);
      }
    });

    const mountedRef = useMountedRef();

    return promise
      .then((data) => {
        if (mountedRef.current) {
          setData(data);
        }
        return data;
      })
      .catch((error) => {
        setError(error);
        return Promise.reject(error);
      });
  };

  return {
    isPending: state.status === "pending",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    fetchData,
    refetch,
    setData,
    setError,
    ...state,
  };
};
