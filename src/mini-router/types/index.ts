export interface IPushFn {
  (to: string, mode: string): void;
}

export interface IGoBack {
  (): void;
}

export interface IMatch {
  path: string;
  params: string;
  query: string;
  url: string;
}

export interface IHistory {
  push: IPushFn;
  goBack: IGoBack;
}

export interface IHistoryProps {
  history: IHistory;
}
