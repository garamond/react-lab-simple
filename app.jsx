// @flow

import React from 'react';
import { render } from 'react-dom';

class App extends React.PureComponent {
  render() {
    return (
      <h1>Hello, GraphQL</h1>
    );
  }
}

render(<App />, document.getElementById('app'));
