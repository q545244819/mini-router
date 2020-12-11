import React from 'react';
import { useCallback, useEffect } from "react";
import { RouterContext } from "../store/context";
import { useRouterReducer } from "../store";
import {
  changePath,
  changeHashMode,
  changeHistoryMode,
} from "../store/actionCreators";
import { hash2pathname } from "../utils";

// 哈希路由器组件
interface IHashRouterProps {
  children: JSX.Element | JSX.Element[] | null
}

function HashRouter(props: IHashRouterProps) {
  const { children } = props;
  const [state, dispatch] = useRouterReducer();

  const handleHashChange = useCallback(() => {
    dispatch(changePath(hash2pathname(window.location.hash)));
  }, [dispatch]);

  useEffect(() => {
    dispatch(changeHashMode());
    window.addEventListener("hashchange", handleHashChange, false);
    return () => {
      window.removeEventListener("hashchange", handleHashChange, false);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <RouterContext.Provider
      value={{ routerState: state, routerDispatch: dispatch }}
    >
      {children}
    </RouterContext.Provider>
  );
}

interface IHistoryRouter {
  children: JSX.Element | JSX.Element[] | null
}

function HistoryRouter(props: IHistoryRouter) {
  const { children } = props;
  const [state, dispatch] = useRouterReducer();

  const handlePopstate = useCallback(() => {
    dispatch(changePath(window.location.pathname));
  }, [dispatch]);

  useEffect(() => {
    dispatch(changeHistoryMode());
    window.addEventListener("popstate", handlePopstate, false);
    return () => {
      window.removeEventListener("popstate", handlePopstate, false);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <RouterContext.Provider
      value={{ routerState: state, routerDispatch: dispatch }}
    >
      {children}
    </RouterContext.Provider>
  );
}

export { HashRouter, HistoryRouter };