import { HASH_MODE, HISTORY_MODE } from "./store/contants";

// 将 window.location.hash 转换成 window.location.pathname 格式
export function hash2pathname(hash) {
  if (typeof hash !== "string") {
    return "";
  }

  if (hash.length > 0 && hash[0] === "#") {
    return hash.slice(1);
  }

  return "";
}

// 判断是否为参数路径的参数占位符
function isPathPlaceholder(path) {
  return path.length > 1 && path["0"] === ":";
}

// 匹配两个路径，支持参数路径匹配
export function match(to, from) {
  if (typeof to !== "string" || typeof from !== "string") {
    return false;
  }

  to = to.split("/");
  from = from.split("/");

  if (to.length !== from.length) {
    return false;
  }

  for (let i = 0; i < to.length; i++) {
    if (to[i] !== from[i] && !isPathPlaceholder(to[i])) {
      return false;
    }
  }

  return true;
}

// 检查当前路径是否为目标路径的子路径，如 /foo/bar 是 /foo 的子路径
// 嵌套（nesting）路由功能解决方案
export function isChildrenPath(path, child) {
  if (typeof path !== "string" || typeof child !== "string") {
    return false;
  }
  if (path.length <= 1 || child <= 1) {
    return false;
  }
  if (path.length === child.length) {
    return false;
  }

  return child.startsWith(path);
}

// 根据实际路径和参数路径获取对应的参数对象
export function getParams(to, from) {
  if (typeof to !== "string" || typeof from !== "string") {
    return {};
  }

  to = to.split("/");
  from = from.split("/");

  if (to.length !== from.length) {
    return {};
  }

  let res = {};

  for (let i = 0; i < to.length; i++) {
    if (isPathPlaceholder(to[i])) {
      res[to[i].slice(1)] = decodeURIComponent(from[i]);
    }
  }

  return res;
}

// 获取路由参数对象
export function getQuery(querystring) {
  if (querystring.indexOf("?") === -1) {
    return {};
  }

  querystring = querystring.slice(querystring.indexOf("?") + 1).split("&");

  if (querystring.length) {
    querystring = querystring.map((item) => item.split("="));
  }

  let res = {};

  querystring.forEach(([key, value]) => {
    res[key] = value;
  });

  return res;
}

// 控制浏览器标签页前进
export function push(to, mode) {
  switch (mode) {
    case HASH_MODE:
      pushOfHashRouter(to);
      break;
    case HISTORY_MODE:
      pushOfHistoryRouter(to);
      break;
  }
}

function pushOfHashRouter(to) {
  window.location.hash = `#${to}`;
}

function pushOfHistoryRouter(to) {
  window.history.pushState({}, "", to);
}

// 控制浏览器标签页后退
export function goBack() {
  window.history.back();
}
