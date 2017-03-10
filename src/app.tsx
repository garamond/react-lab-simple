import * as React from "react";
import { render } from "react-dom";

import "glamor/reset";
import { styled } from "glamor/styled";
import R from "ramda";

const Main = styled.div`
  color: white;
  background-color: coral;
  width: 100vw;
  height: 100vh;
`;

class App extends React.PureComponent<any, any> {
  public render() {
    return (
      <Main>
        Hello, World!
      </Main>
    );
  }
}

render(<App />, document.getElementById("app"));
