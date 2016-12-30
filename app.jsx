// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import Relay from 'react-relay';

class HelloApp extends React.Component {
  render() {
    const {name, friends=[]} = this.props.user;
    console.log('this.props.user', this.props.user);
    return (
      <div>
        <h1>{name}</h1>
      </div>
    );
  }
}


HelloApp = Relay.createContainer(HelloApp, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        name
        id
      }
    `,
  },
});

class HelloRoute extends Relay.Route {
  static routeName = 'Hello';
  static queries = {
    user: () => Relay.QL`
      query {
        user(id: $id)
      }
    `,
  };
}


ReactDOM.render(
  <Relay.RootContainer
    Component={HelloApp}
    route={new HelloRoute({ id: 1 })}
  />,
  document.getElementById('app')
);