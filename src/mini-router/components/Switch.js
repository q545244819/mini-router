import { useContext } from "react";
import { match, isChildrenPath } from "../utils";
import { routerContext } from "../store/context";

// 用于控制 Route 组件展示，类同编程语言 switch case 语法
function Switch(props) {
  const { children } = props;
  const { routerState: state } = useContext(routerContext);

  let route = null;
  let routes = null;

  if (Array.isArray(children) && children.length) {
    routes = children.map((route) => {
      let weight = 0;

      if (route.props.exact && route.props.path === state.path) {
        weight |= 1 << 2;
      }
      if (match(route.props.path, state.path)) {
        weight |= 1 << 1;
      }
      if (isChildrenPath(route.props.path, state.path)) {
        weight |= 1;
      }

      return {
        route,
        weight,
      };
    });
    routes.sort((a, b) => b.weight - a.weight);
    route = routes.length ? (routes[0].weight ? routes[0].route : null) : null;
  }

  return route;
}

export default Switch;
