import React, { createContext } from 'react';
import { IState, IAction } from './reducer'

interface IRouterContext {
  routerState: IState;
  routerDispatch: React.Dispatch<IAction>;
}

const RouterContext = createContext<IRouterContext | null>(null);

export { RouterContext };
