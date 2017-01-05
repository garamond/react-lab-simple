// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import Relay from 'react-relay';

let UserButton = (props) =>
  <button onClick={ () => alert(`User has ID ${props.user.uid}`)}>Alert!</button>
UserButton = Relay.createContainer(UserButton, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        uid
      }
    `
  }
})

let UserInfo = (props) =>
  <div>
    <h1>{ props.user.name }</h1>
    <h2>Friends</h2>
    <ul>
      { props.user.friends.map(f => <li key={f.name}>{ f.name }</li>) }
    </ul>
    <h2>Pets</h2>
    <ul>
      { props.user.pets.edges.map(e => <li key={e.node.name}>{ e.node.name }</li>) }
    </ul>
  </div>
UserInfo = Relay.createContainer(UserInfo, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        name
        friends {
          name
        }
        pets(first: 200) {
          edges {
            node {
              name
            }
          }
        }
      }
    `
  }
})

let ProfileViewer = (props) =>
  console.log(props) || <div>
    <select value={ props.relay.variables.uid }
            onChange={ (e) => props.relay.setVariables({ uid: +e.target.value })}>
      { props.viewer.users.map(u => <option key={u.uid} value={u.uid}>{u.name}</option> ) }
    </select>
    <UserInfo user={props.viewer.user} />
    <UserButton user={props.viewer.user} />
  </div>
ProfileViewer = Relay.createContainer(ProfileViewer, {
  initialVariables: {
    uid: 1
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        name
        users {
          uid
          name
        }
        user(uid: $uid) {
          ${UserInfo.getFragment('user')}
          ${UserButton.getFragment('user')}
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
    Component={ProfileViewer}
    route={new ProfileRoute()}
  />,
  document.getElementById('app')
);
