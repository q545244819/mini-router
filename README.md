mini-router 是基于 React 的轻量前端路由组件库，目的是帮助大家理解前端路由库的开发原理和配合 React 开发路由组件的实践过程。适合刚学习前端和 React 开发的同学，作为深入理解前端路由知识领域的学习。

## 哈希（Hash）路由和原生（History）路由

一般路由库中会提供两种路由模式，分别是：哈希路由和原生路由。哈希路由以`/#`作为路径（path）前缀，当哈希值改变后，浏览器标签页不会重新刷新网页内容。原生路由直接修改 url 中的路径（path），需要使用浏览器的 History API 控制路由，直接在浏览器地址栏中修改会导致当前标签页刷新网页内容。一般情况下，会根据项目的需求选择不同路由模式。

当哈希路由的哈希值发生变化时，事件`hashchange`会被触发，可以通过`window.location.hash`获取哈希值（当中包含当前路径信息），哈希路由器的功能就是依靠这两个 API。

```JavaScript
function locationHashChanged() {
  if (location.hash === '#cool-feature') {
    console.log("You're visiting a cool feature!");
  }
}

window.onhashchange = locationHashChanged;
```

对于原生路由来说，浏览器提供了 History API 用于修改路由状态（State），如：pushState()、go() 和 back() 等。当触发路由回退时，事件`popstate`事件会被触发。**注意使用`pushState`是无法触发`popstate`事件。**原生路由器的功能就是依靠浏览器提供了 History API。

```JavaScript
window.onpopstate = function(event) {
  alert(`location: ${document.location}, state: ${JSON.stringify(event.state)}`)
}

history.pushState({page: 1}, "title 1", "?page=1")
history.pushState({page: 2}, "title 2", "?page=2")
history.replaceState({page: 3}, "title 3", "?page=3")
history.back() // alerts "location: http://example.com/example.html?page=1, state: {"page":1}"
history.back() // alerts "location: http://example.com/example.html, state: null"
history.go(2)  // alerts "location: http://example.com/example.html?page=3, state: {"page":3}"
```

## mini-rouer 路由组件库

mini-router 是以 react-router-dom 使用方式和 API 的基础进行开发。min-router 一样地提供了五个核心组件：

- `<HashRouter>`基于 URL 哈希的路由器组件。类似：/#/home、/#/user/1000 等;
- `<HistoryRouter>`基于 HTML5 History State 的路由组件。类似：/home、/article/hell-mini-router 等;
- `<Switch>`控制 Route 组件渲染的逻辑组件，类似编程语言的 switch case 语法;
- `<Route>`渲染相应 path 的路由容器组件，能够根据配置 props 实现对应的 React 组件渲染;
- `<Link>`控制路由器前进功能的容器组件。

首先，我们使用`create-react-app`创建一个 React 应用，并且在 src 目录下新建一个 mini-router 文件夹，我们会把所有的代码放到该文件夹当中，而这个项目则是用于测试我们 mini-router 库。

在 src/mini-router 当中新建一个入口文件 index.js 和工具类文件 utils.js，分别是导出核心组件和存放工具类函数。

```JavaScript
// src/mini-router/index.js
import { HashRouter, HistoryRouter } from "./components/Router";
import Switch from "./components/Switch";
import Route from "./components/Route";
import Link from "./components/Link";

export { HashRouter, HistoryRouter, Switch, Route, Link };
```

新建一个 componnents 文件夹，该文件夹存放我们核心组件的代码。同时，分别在该文件夹下，新建四个文件：Router.js、Switch.js、Route.js 和 Link.js。

```JavaScript
// src/mini-router/Router.js
function HashRouter(props) {}

function HistoryRouter(props) {}

export { HashRouter, HistoryRouter };

// src/mini-router/Switch.js
function Switch(props) {}

export default Switch;

// src/mini-router/Route.js
function Route(props) {}

export default Route;

// src/mini-router/Link.js
function Link(props) {}

export default Link;
```

新建一个 store 文件夹，该文件夹存放我们组件数据通信的代码。使用 React 提供的 context 和 useReducer 实现轻量的状态管理器。同时，分别在该文件夹下，新建五个文件：actionCreators.js、constants.js、context.js、reducer.js
和 index.js。

sotre/index.js 用于导出 reducer 函数和我们自定义的 useRouterReducer 钩子，该钩子函数用于路由路径通信的场景。

```JavaScript
// src/mini-router/store/index.js
import { useReducer } from "react";
import reducer, { defaultState } from "./reducer";

function useRouterReducer() {
  return useReducer(reducer, defaultState);
}

export { reducer, useRouterReducer };
```

以上就完成了 mini-router 的基本项目结构，接下来就来完善组件、数据层和 utils.js 的代码部分。为了方便读者测试，将 src/index.js 和 src/App.js 修改为如下代码。最后完成 mini-router 后运行项目就能看到我们所实现路由组件库的效果了。

```JavaScript
// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HistoryRouter } from "./mini-router";

ReactDOM.render(
  <HistoryRouter>
    <App />
  </HistoryRouter>,
  document.getElementById("root")
);

// src/App.js
import { Switch, Route, Link } from "./mini-router";

function App() {
  return (
    <div>
      <h1>mini-router</h1>
      <ul>
        <li>
          <Link to="/">/home</Link>
        </li>
        <li>
          <Link to="/foo">/foo</Link>
        </li>
        <li>
          <Link to="/bar">/bar</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/" component={() => <div>Hello Home Page!</div>} />
        <Route path="/:id" component={() => <div>Hello :id Page!</div>} />
        <Route
          path="/foo"
          exact
          component={({ history }) => (
            <div>
              <div>Hello Foo Page!</div>
              <ul>
                <li>
                  <Link to="/foo/a">/foo/a</Link>
                </li>
                <li>
                  <Link to="/foo/b">/foo/b</Link>
                </li>
              </ul>
              <Switch>
                <Route path="/foo/:id" component={() => <p>Foo :id Page!</p>} />
                <Route
                  path="/foo/b"
                  exact
                  component={() => (
                    <p onClick={() => history.goBack()}>Foo B Page!</p>
                  )}
                />
              </Switch>
            </div>
          )}
        />
        <Route path="/bar" component={() => <div>Hello Bar Page!</div>} />
      </Switch>
    </div>
  );
}

export default App;
```

## 数据层开发

constants.js 存放数据层使用到的所有常量，包括 reducer 的 action 类型和路由类型。

```JavaScript
// src/mini-router/store/constants.js
export const CHANGE_PATH = "mini-router/CHANGE_PATH";
export const CHANGE_MODE = "mini-router/CHANGE_MODE";

export const HASH_MODE = Symbol("mini-router/HASH_MODE");
export const HISTORY_MODE = Symbol("mini-router/HISTORY_MODE");
```

actionCreators.js 存放不同功能 action，分别是修改路径（path）属性、修改路由类型（mode）属性。

> `hash2pathname(hash)`方法用于接受一个哈希值并且将该值转换成 pathname 结构，例如`hash2pathname('#/hello/world') = '/hello/world'`。

```JavaScript
// src/mini-router/store/actionCreators.js
import * as actionTypes from "./contants";
import { hash2pathname } from "../utils";

export function changePath(data) {
  return {
    type: actionTypes.CHANGE_PATH,
    data,
  };
}

export function changeHashMode() {
  return {
    type: actionTypes.CHANGE_MODE,
    path: hash2pathname(window.location.hash),
    mode: actionTypes.HASH_MODE,
  };
}

export function changeHistoryMode() {
  return {
    type: actionTypes.CHANGE_MODE,
    path: window.location.pathname,
    mode: actionTypes.HISTORY_MODE,
  };
}
```

reducer.js 实现修改 state 的 reducer 函数和默认 state 的变量 defaultState。mini-router 中只需要 path 和 mode 两个属性，path 表示当前路由的路径，mode 表示应用所使用的路由器类型。当应用的 path 修改时，reducer 函数会重新计算新的状态，`<Swith>`和`<Route>`组件就会根据新的状态来判断哪些路由组件会被渲染。

```JavaScript
import * as actionTypes from "./contants";

export const defaultState = {
  path: "",
  mode: null,
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_PATH:
      return { ...state, path: action.data };
    case actionTypes.CHANGE_MODE:
      return { ...state, path: action.path, mode: action.mode };
    default:
      return state;
  }
}

export default reducer;
```

context.js 存放路由组件之间通信的上下文变量。

```JavaScript
const { createContext } = require("react");

const routerContext = createContext();

export { routerContext };
```

## 路由器组件：`<HashRouter>`和`<HistoryRouter>`开发

`<HashRouter>`组件功能比较简单，将 props.children 包裹在`<<routerContext.Provider>`当中，这是因为其他组件需要依赖路由状态进行工作，所以这里`useRouterReducer()`导出的`[state, dispatch]`放到上下文当中`value={{ routerState: state, routerDispatch: dispatch }}`。这样，其他组件就可以通过`useContext`钩子函数访问。

`<HashRouter>`组件具备两个副作用，一是修改 mode 为`HASH_MODE`，二是监听`hashchange`事件。是该组件的核心功能。当`hashchange`事件触发时，就会修改 routerState 的 path 属性，重新渲染路由组件。

```JavaScript
import { useCallback, useEffect } from "react";
import { routerContext } from "../store/context";
import { useRouterReducer } from "../store";
import {
  changePath,
  changeHashMode,
  changeHistoryMode,
} from "../store/actionCreators";
import { hash2pathname } from "../utils";

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
```

`<HistoryRouter>`组件实现基本和`<HashRouter>`组件相同。不同的是，副作用函数中会修改 mode 为 HISTORY_MODE 和监听的是`popstate`事件。

```JavaScript
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
```

## 路由组件：`<Switch>`和`<Route>`开发

`<Route>`组件渲染匹配路径规则的组件。props 中接受三个参数：path、exact 和 component。path 表示当前组件所匹配的路径（普通路径或参数路径）、exact 表示是否完全匹配（优先级高于符合规则的参数路径）和需要渲染的 component 组件。

> `match(to, from)`方法判断两个路由是否匹配，同时支持普通路径和参数路径匹配。例如：`match("/foo", "/foo") = true` 和`match("/foo/:id","/foo/bar") = true`。

> `isChildrenPath(path, child)`方法判断第二个参数路径是否是第一个参数路径的子路径。例如：`isChildrenPath("/foo", "/foobar") = true`

> `getParams(path, pattern)`解析参数路径中的参数，且返回一个参数对象。

> `getQuery(querystring)`解析 querystring 字符串，返回一个 query 对象。

> `push(to, mode)`控制路由前进到 to 路径，根据 mode 参数分别调用不同 push 函数实现。

> `goBack()`控制路由回退。

```JavaScript
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
```

`<Switch>`组件只能用于嵌套`<Route>`组件的场景，并且只会渲染匹配权重最高的`<Route>`组件。若单独使用`<Route>`组件，会出现多个路径匹配的情况，就会同时渲染多个`<Route>`组件，而`<Switch>`组件就是用于解决该问题。内部实现了对`<Route>`组件的权重计算，规则如下：

- 若`<Route>`组件`exact = true`且当前路径和`path`属性完全相同（普通路径），权重为`0b100`；
- 若`<Route>`组件的`path`属性和当前路径匹配（`match()` 计算得出），权重为`0b010`；
- 若当前路径属于`<Route />`组件的`path`属性的子路径，权重为`0b001`；

默认权重值（weight）为 0，只要负责其中一个规则，与权重值做与运算。待计算完所有的`<Route>`组件权限后，取出权限最高且权重不为 0 的`<Route>`组件渲染。若不存在则不渲染。

```JavaScript
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
```

## 控制器组件：`<Link>`开发

`<Link>`组件实现比较简单，渲染 a 标记并且控制默认点击事件，将路由前进的逻辑替换成 push 方法。这里需要注意，使用 History API 的 pushstate 方法时，是无法触发 popstate 事件，所以这里需要手动通知修改 routerState 中 path 属性，才能够正确渲染。

```JavaScript
import { useCallback, useContext } from "react";
import { routerContext } from "../store/context";
import { HISTORY_MODE } from "../store/contants";
import { changePath } from "../store/actionCreators";
import { push } from "../utils";

// 用于控制路由之间跳转的组件
function Link(props) {
  const { to, children } = props;
  const { routerState: state, routerDispatch: dispatch } = useContext(
    routerContext
  );

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      push(to, state.mode);

      // 违背了单一原则，属于 hack 代码段，导致了部分逻辑耦合，建议使用发布/订阅模式解耦
      if (state.mode === HISTORY_MODE) {
        dispatch(changePath(window.location.pathname));
      }
    },
    [state]
  );

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

export default Link;
```

## 最后一步，utils.js

在实现组件和数据层时使用了不少 utils.js 提供的函数，这里把具体的代码实现。

```JavaScript
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
```

## 总结

前端路由库作为单页应用（SPA）核心功能之一，属于 Web 前端开发者需要掌握的重要技能。若能够在熟练使用前端路由库基础上，尝试开发一个简单的路由库，便能够加深对该知识领域的理解。在熟悉前端常见的两种路由模式及它们的背后的实现原理，开发基于任何框架的专属路由库就不再是一件非常困难的事情了。本文以 React 作为基础，从零到一实现了一个简单路由库，希望能够对大家对路由库开发和 React 实践方面有所帮助。

本文所使用到的所有代码：[q545244819/mini-router](https://github.com/q545244819/mini-router)

## 参考

- [Window: hashchange event - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event)
- [History API - Web APIs | MDN](https://developer.mozilla.org/hello)
- [History.pushState() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState)
- [react-router-dom](https://reactrouter.com/web/guides/quick-start)
