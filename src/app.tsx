import * as React from 'react';
import { render } from 'react-dom';

import { css } from 'glamor';
import 'glamor/reset';

const appStyle = css({
  backgroundColor: 'coral',
  color: 'white',
  height: '100vh',
  width: '100vw',
});

class App extends React.PureComponent<{}, {}> {
  public render() {
    return <div {...appStyle}>Hello, World!</div>;
  }
}

render(<App />, document.getElementById('app'));
