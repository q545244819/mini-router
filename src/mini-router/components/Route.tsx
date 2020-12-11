import React from "react";
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
import { push, goBack, IPushFn, IGoBack } from "../utils";

// 用于展示对应路由的视图
export interface IRouteProps {
  path: string;
  component: any;
  exact?: boolean;
}
export interface IMatch {
  path: string;
  params: string;
  query: string;
  url: string;
}
export interface IHistory {
  push: IPushFn;
  goBack: IGoBack;
}
export interface IHistoryProps {
  history: IHistory;
}

function Route(props: IRouteProps) {
  const { path, component: Component } = props;
  const routerContext = useContext(RouterContext);
  const state = routerContext?.routerState;

  const getMatchPropsByMode = useCallback(
    (mode: string): IMatch => {
      const data: { [key: string]: any } = {
        [HASH_MODE]: {
          match: {
            path: path,
            params: getParams(path, state ? state.path : ""),
            query: getQuery(window.location.hash),
            url: hash2pathname(window.location.search),
          },
        },
        [HISTORY_MODE]: {
          match: {
            path: path,
            params: getParams(path, state ? state.path : ""),
            query: getQuery(window.location.search),
            url: window.location.pathname,
          },
        },
      };

      return data[mode];
    },
    [path, state]
  );

  const matched = match(path, state ? state.path : "");
  const isChildren = isChildrenPath(path, state ? state.path : "");
  const matchProps = getMatchPropsByMode(state ? state.mode : "");
  const historyProps: IHistoryProps = {
    history: {
      push: (to: string) => push(to, state ? state.mode : ""),
      goBack: () => goBack(),
    },
  };

  const hoc = useMemo(() => {
    return <Component {...matchProps} {...historyProps} />;
    // eslint-disable-next-line
  }, [matchProps]);

  return matched || isChildren ? hoc : null;
}

export default Route;
