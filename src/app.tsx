import * as React from "react";
import { render } from "react-dom";

import { css } from "glamor";
import "glamor/reset";

const appStyle = css`
  color: white;
  background-color: green;
  width: 100vw;
  height: 100vh;
`;

class App extends React.PureComponent<undefined, undefined> {

  public render() {
    return (
      <div {...appStyle}>
        Hello, World!
      </div>
    );
  }

}

render(<App />, document.getElementById("app"));
