// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import Relay from 'react-relay';


let ProfileApp = (props) => {
  const viewer = props.viewer;
  return (
    <div>
      <select value={ props.relay.variables.uid }
              onChange={ (e) => props.relay.setVariables({ uid: +e.target.value })}>
        { viewer.users.map(u => <option key={u.uid} value={u.uid}>{u.name}</option> ) }
      </select>
      <h1>{ viewer.user.name }</h1>
      <ul>
        { viewer.user.friends.map(f => <li key={f.name}>{ f.name }</li>) }
      </ul>
    </div>
  );
}
ProfileApp = Relay.createContainer(ProfileApp, {
  initialVariables: {
    uid: 1
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        users {
          uid
          name
        }
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

class ProfileRoute extends Relay.Route {
  static routeName = 'Profile';
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
    Component={ProfileApp}
    route={new ProfileRoute()}
  />,
  document.getElementById('app')
);