// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import Relay from 'react-relay';

class HelloApp extends React.Component {
  render() {
    const {hello} = this.props.greetings;
    return <h1>{hello}</h1>;
  }
}


HelloApp = Relay.createContainer(HelloApp, {
  fragments: {
    greetings: () => Relay.QL`
      fragment on Greetings {
        hello,
      }
    `,
  },
});

class HelloRoute extends Relay.Route {
  static routeName = 'Hello';
  static queries = {
    greetings: () => Relay.QL`
      query {
        greetings
      }
    `,
  };
}


ReactDOM.render(
  <Relay.RootContainer
    Component={HelloApp}
    route={new HelloRoute()}
  />,
  document.getElementById('app')
);