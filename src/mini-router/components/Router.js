import { useCallback, useEffect } from "react";
import { routerContext } from "../store/context";
import { useRouterReducer } from "../store";
import {
  changePath,
  changeHashMode,
  changeHistoryMode,
} from "../store/actionCreators";
import { hash2pathname } from "../utils";

// 哈希路由器组件
function HashRouter(props) {
  const { children } = props;
  const [state, dispatch] = useRouterReducer();

  const handleHashChange = useCallback(() => {
    dispatch(changePath(hash2pathname(window.location.hash)));
  }, []);

  useEffect(() => {
    dispatch(changeHashMode());
    window.addEventListener("hashchange", handleHashChange, false);
    return () => {
      window.removeEventListener("hashchange", handleHashChange, false);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <routerContext.Provider
      value={{ routerState: state, routerDispatch: dispatch }}
    >
      {children}
    </routerContext.Provider>
  );
}

function HistoryRouter(props) {
  const { children } = props;
  const [state, dispatch] = useRouterReducer();

  const handlePopstate = useCallback(() => {
    dispatch(changePath(window.location.pathname));
  }, []);

  useEffect(() => {
    dispatch(changeHistoryMode());
    window.addEventListener("popstate", handlePopstate, false);
    return () => {
      window.removeEventListener("popstate", handlePopstate, false);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <routerContext.Provider
      value={{ routerState: state, routerDispatch: dispatch }}
    >
      {children}
    </routerContext.Provider>
  );
}

export { HashRouter, HistoryRouter };
