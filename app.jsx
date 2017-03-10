// @flow

import React from 'react';
import { render } from 'react-dom';

import 'glamor/reset';
import { styled } from 'glamor/styled'

const Main = styled.div`
  color: white;
  background-color: coral;
  width: 100vw;
  height: 100vh;
`

class App extends React.PureComponent {
  render() {
    return (
      <Main>
        Hello, World!
      </Main>
    );
  }
}

render(<App />, document.getElementById('app'));
