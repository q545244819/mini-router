import React, { FC, ReactElement } from "react";
import { Switch, Route, Link } from "./mini-router";

const Home: FC = (): ReactElement => <div>Hello Home Page!</div>;
const IdPage: FC = (): ReactElement => <div>Hello :id Page!</div>;
const Foo: FC = (): ReactElement => {
  return (
    <div>
      <div>Hello Foo Page!</div>
    </div>
  );
};
const Bar: FC = (): ReactElement => <div>Hello Bar Page!</div>;

function App(): ReactElement {
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
        <Route path="/" component={Home} />
        <Route path="/:id" component={IdPage} />
        <Route path="/foo" exact component={Foo} />
        <Route path="/bar" component={Bar} />
      </Switch>
    </div>
  );
}

export default App;
