import * as React from "react";
import { render } from "react-dom";

import "glamor/reset";
import { css } from "glamor";

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
