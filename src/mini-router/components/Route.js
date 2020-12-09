import { useCallback, useContext, useMemo } from "react";
import { routerContext } from "../store/context";
import {
  hash2pathname,
  match,
  isChildrenPath,
  getParams,
  getQuery,
} from "../utils";
import { HASH_MODE, HISTORY_MODE } from "../store/contants";
import { push, goBack } from "../utils";

// 用于展示对应路由的视图
function Route(props) {
  const { path, component: Component } = props;
  const { routerState: state } = useContext(routerContext);

  const getMatchPropsByMode = useCallback(
    (mode) => {
      const data = {
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
    [path, state.path]
  );

  const matched = match(path, state.path);
  const isChildren = isChildrenPath(path, state.path);
  const matchProps = getMatchPropsByMode(state.mode);
  const historyProps = {
    history: {
      push: (to) => push(to, state.mode),
      goBack: () => goBack(),
    },
  };

  const hoc = useMemo(() => {
    return <Component {...matchProps} {...historyProps} />;
    // eslint-disable-next-line
  }, [matchProps]);

  return (matched || isChildren) && hoc;
}

export default Route;
