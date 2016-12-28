// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import Relay from 'react-relay';

class HelloApp extends React.Component {
  render() {
    // Relay will materialize this prop based on the
    // result of the query in the next component.
    const {hello} = this.props.greetings;
    return <h1>{hello}</h1>;
  }
}


HelloApp = Relay.createContainer(HelloApp, {
  fragments: {
    // This GraphQL query executes against
    // the schema in the 'schema' tab above.
    //
    // To learn more about Relay.QL, visit:
    //   https://facebook.github.io/relay/docs/api-reference-relay-ql.html
    greetings: () => Relay.QL`
      fragment on Greetings {
        hello,
      }
    `,
  },
});

class HelloRoute extends Relay.Route {
  static routeName = 'Hello';  // A unique name
  static queries = {
    // Here, we compose your Relay container's
    // 'greetings' fragment into the 'greetings'
    // field at the root of the GraphQL schema.
    greetings: (Component) => Relay.QL`
      query GreetingsQuery {
        greetings {
          ${Component.getFragment('greetings')},
        },
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