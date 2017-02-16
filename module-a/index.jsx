import React from 'react';
import R from 'ramda';
import _ from 'lodash';

export default class A extends React.Component {

  render() {
    return (
      <div>
        <div>{ _.VERSION }</div>
      </div>
    );
  }

}
