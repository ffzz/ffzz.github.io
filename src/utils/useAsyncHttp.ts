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

export const useAsyncHttp = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

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

  const fetchData = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("Please pass Promise type data!");
    }

    setState({ ...state, status: "loading" });

    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        return error;
      });
  };

  return {
    isPending: state.status === "pending",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    fetchData,
    setData,
    setError,
    ...state,
  };
};
