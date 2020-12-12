import React from "react";
import { useCallback, useContext } from "react";
import { RouterContext } from "../store/context";
import { HISTORY_MODE } from "../store/contants";
import { changePath } from "../store/actionCreators";
import { push } from "../utils";

// 用于控制路由之间跳转的组件
interface ILinkProps {
  to: string;
  children: any;
}

function Link(props: ILinkProps) {
  const { to, children } = props;
  const routerContext = useContext(RouterContext);
  const state = routerContext?.routerState!;
  const dispatch = routerContext?.routerDispatch!;

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      push(to, state.mode);

      // 违背了单一原则，属于 hack 代码段，导致了部分逻辑耦合，建议使用发布/订阅模式解耦
      if (state && state.mode === HISTORY_MODE) {
        dispatch(changePath(window.location.pathname));
      }
    },
    [to, state, dispatch]
  );

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

export default Link;
