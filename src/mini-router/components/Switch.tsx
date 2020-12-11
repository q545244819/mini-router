import { useContext } from "react";
import { match, isChildrenPath } from "../utils";
import { RouterContext } from "../store/context";

// 用于控制 Route 组件展示，类同编程语言 switch case 语法
interface ISwitchProps {
  children: JSX.Element | JSX.Element[] | null;
}
interface IRoutes {
  route: JSX.Element;
  weight: number;
}
enum Weight {
  Default = 0,
  Exact = 1 << 2,
  Matched = 1 << 1,
  isChildren = 1,
}

function Switch(props: ISwitchProps) {
  const { children } = props;
  const routerContext = useContext(RouterContext);
  const state = routerContext?.routerState;
  const path = state ? state.path : "";

  let route: JSX.Element | null = null;
  let routes: IRoutes[] | null = null;

  if (Array.isArray(children) && children.length) {
    routes = children.map(
      (route: JSX.Element): IRoutes => {
        let weight = Weight.Default;
        if (route.props.exact && route.props.path === path) {
          weight |= Weight.Exact;
        }
        if (match(route.props.path, path)) {
          weight |= Weight.Matched;
        }
        if (isChildrenPath(route.props.path, path)) {
          weight |= Weight.isChildren;
        }

        return {
          route,
          weight,
        };
      }
    );
    routes.sort((a, b) => b.weight - a.weight);
    route = routes.length ? (routes[0].weight ? routes[0].route : null) : null;
  }

  return route;
}

export default Switch;
