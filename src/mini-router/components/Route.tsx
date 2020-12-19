import React, { FC, ReactElement } from "react";
import { useCallback, useContext, useMemo } from "react";
import { RouterContext } from "../store/context";
import {
  hash2pathname,
  match,
  isChildrenPath,
  getParams,
  getQuery,
} from "../utils";
import { HASH_MODE, HISTORY_MODE } from "../store/contants";
import { push, goBack } from "../utils";
import { IMatch, IHistoryProps } from "../types";

// 用于展示对应路由的视图
interface IRouteProps {
  path: string;
  component: FC<any>;
  exact?: boolean;
}

const Route: FC<IRouteProps> = ({
  path,
  component: Component,
}): ReactElement | null => {
  const routerContext = useContext(RouterContext);
  const state = routerContext?.routerState!;

  const getMatchPropsByMode = useCallback(
    (mode: string): IMatch => {
      const data: { [key: string]: any } = {
        [HASH_MODE]: {
          match: {
            path: path,
            params: getParams(path, state.path),
            query: getQuery(window.location.hash),
            url: hash2pathname(window.location.search),
          },
        },
        [HISTORY_MODE]: {
          match: {
            path: path,
            params: getParams(path, state.path),
            query: getQuery(window.location.search),
            url: window.location.pathname,
          },
        },
      };

      return data[mode];
    },
    [path, state]
  );

  const matched = match(path, state.path);
  const isChildren = isChildrenPath(path, state.path);
  const matchProps = getMatchPropsByMode(state.mode);
  const historyProps: IHistoryProps = {
    history: {
      push: (to: string) => push(to, state.mode),
      goBack: () => goBack(),
    },
  };

  const hoc = useMemo((): ReactElement => {
    return <Component {...matchProps} {...historyProps} />;
    // eslint-disable-next-line
  }, [matchProps]);

  return matched || isChildren ? hoc : null;
};

export default Route;
