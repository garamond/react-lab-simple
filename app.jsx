// @flow

import React from 'react';
import { render } from 'react-dom';
import A from 'module-a';
import _ from 'lodash';

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <div>lodash in app: { _.VERSION }</div>
        <A />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
