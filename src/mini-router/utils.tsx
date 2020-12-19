import { HASH_MODE, HISTORY_MODE } from "./store/contants";
import { IPushFn, IGoBack } from "./types";

// 将 window.location.hash 转换成 window.location.pathname 格式
export function hash2pathname(hash: string): string {
  if (typeof hash !== "string") {
    return "";
  }

  if (hash.length > 0 && hash[0] === "#") {
    return hash.slice(1);
  }

  return "";
}

// 判断是否为参数路径的参数占位符
function isPathPlaceholder(path: string): boolean {
  return path.length > 1 && path[0] === ":";
}

// 匹配两个路径，支持参数路径匹配
export function match(to: string, from: string): boolean {
  if (typeof to !== "string" || typeof from !== "string") {
    return false;
  }

  let toArray: string[] = to.split("/");
  let fromArray: string[] = from.split("/");

  if (toArray.length !== fromArray.length) {
    return false;
  }

  for (let i = 0; i < toArray.length; i++) {
    if (toArray[i] !== fromArray[i] && !isPathPlaceholder(toArray[i])) {
      return false;
    }
  }

  return true;
}

// 检查当前路径是否为目标路径的子路径，如 /foo/bar 是 /foo 的子路径
// 嵌套（nesting）路由功能解决方案
export function isChildrenPath(path: string, child: string): boolean {
  if (typeof path !== "string" || typeof child !== "string") {
    return false;
  }
  if (path.length <= 1 || child.length <= 1) {
    return false;
  }
  if (path.length === child.length) {
    return false;
  }

  return child.startsWith(path);
}

// 根据实际路径和参数路径获取对应的参数对象
interface IParams {
  [key: string]: any;
}
export function getParams(to: string, from: string): IParams {
  if (typeof to !== "string" || typeof from !== "string") {
    return {};
  }

  let toArray: string[] = to.split("/");
  let fromArray: string[] = from.split("/");

  if (toArray.length !== fromArray.length) {
    return {};
  }

  let res: IParams = {};

  for (let i = 0; i < toArray.length; i++) {
    if (isPathPlaceholder(toArray[i])) {
      res[toArray[i].slice(1)] = decodeURIComponent(fromArray[i]);
    }
  }

  return res;
}

// 获取路由参数对象
interface IQuery {
  [key: string]: any;
}
export function getQuery(querystring: string): IQuery {
  if (querystring.indexOf("?") === -1) {
    return {};
  }

  let querystringArray: string[] = querystring
    .slice(querystring.indexOf("?") + 1)
    .split("&");
  let tuples: Array<string[]> = [];

  if (querystringArray.length) {
    tuples = querystringArray.map((item): string[] => item.split("="));
  }

  let res: IQuery = {};

  tuples.forEach(([key, value]) => {
    res[key] = value;
  });

  return res;
}

// 控制浏览器标签页前进
const push: IPushFn = (to, mode) => {
  switch (mode) {
    case HASH_MODE:
      pushOfHashRouter(to);
      break;
    case HISTORY_MODE:
      pushOfHistoryRouter(to);
      break;
  }
};

function pushOfHashRouter(to: string) {
  window.location.hash = `#${to}`;
}

function pushOfHistoryRouter(to: string) {
  window.history.pushState({}, "", to);
}

// 控制浏览器标签页后退
const goBack: IGoBack = () => {
  window.history.back();
};

export { push, goBack };
