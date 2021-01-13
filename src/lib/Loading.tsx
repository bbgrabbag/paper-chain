import React, { PropsWithChildren, SetStateAction } from "react";

export enum LoaderStates {
  Loading = "LOADING",
  TimedOut = "TIMED_OUT",
}

export interface LoaderAPI {
  status: LoaderStates;
  setStatus: React.Dispatch<SetStateAction<LoaderStates>>;
}

const useLoading = () => {
  const [status, setStatus] = React.useState(LoaderStates.Loading);
  return {
    status,
    setStatus,
  };
};

const useLoadingEffects = (
  duration: number,
  loaderAPI: LoaderAPI
): LoaderAPI => {
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      loaderAPI.setStatus(LoaderStates.TimedOut);
    }, duration);

    return () => clearTimeout(timeout);
  }, [loaderAPI.status]);
  return loaderAPI;
};

export interface LoadingProps {
  timeout?: number;
}

export const Loading: React.FC<PropsWithChildren<LoadingProps>> = ({
  timeout = 5000,
  ...props
}) => {
  const loaderAPI = useLoadingEffects(timeout, useLoading());

  switch (loaderAPI.status) {
    case LoaderStates.Loading:
      return <div>...Loading</div>;
    case LoaderStates.TimedOut:
      return <div>{props.children}</div>;
  }
};
