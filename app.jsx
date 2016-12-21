// @flow

import React from 'react';
import { render } from 'react-dom';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';

import './style.css'
import 'graphiql/graphiql.css';

function graphQLFetcher(graphQLParams) {
  return fetch(window.location.origin + '/graphql', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json());
}

class App extends React.PureComponent {
  render() {
    return (
      <GraphiQL fetcher={ graphQLFetcher } />
    );
  }
}

render(<App />, document.getElementById('app'));
