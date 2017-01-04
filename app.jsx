// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import Relay from 'react-relay';


class HelloApp extends React.Component {
  render() {
    const viewer = this.props.viewer;
    return (
      <div>
        <h1>{ viewer.user.name }</h1>
        <ul>
          { viewer.user.friends.map(f => <li key={f.name}>{ f.name }</li>) }
        </ul>
        <input type="text" 
               value={ this.props.relay.variables.uid }
               onChange={ (e) => this.props.relay.setVariables({ uid: +e.target.value })} 
        />
      </div>
    );
  }
}

HelloApp = Relay.createContainer(HelloApp, {
  initialVariables: {
    uid: 1
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        user(uid: $uid) {
          name
          friends {
            name
          }
        }
      }
    `,
  },
});

class HelloRoute extends Relay.Route {
  static routeName = 'Hello';
  static queries = {
    viewer: () => Relay.QL`
      query ProfileQuery {
        viewer
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