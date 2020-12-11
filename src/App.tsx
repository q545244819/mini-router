import React from "react";
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
          component={(props: any) => (
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
                    <p onClick={() => props.history.goBack()}>Foo B Page!</p>
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
