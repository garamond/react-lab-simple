require('babel-polyfill');
// @flow

import React from 'react';
import { render, findDOMNode } from 'react-dom';

import MapGL, { DraggablePointsOverlay, SVGOverlay, HTMLOverlay } from 'react-map-gl';
import ViewportMercator from 'viewport-mercator-project';

const accessToken = 'pk.eyJ1IjoiZ2FyYW1vbmQiLCJhIjoiY2lwNXFyNHBsMDAwMXh0a281cmY3N2plbCJ9.Meb_5_d0YbhwRwFHOYYiPg'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 47.377767,
        longitude: 8.540850,
        zoom: 16.140440,
        isDragging: false
      },
      width: 500,
      height: 500
    };
  }

  render() {
    const {viewport, width, height} = this.state;

    return (
      <MapGL
        ref={m => this.map = m}
        {...viewport}
        mapboxApiAccessToken={accessToken}
        mapStyle="mapbox://styles/garamond/ciytttmbg003e2rphdake2riw"
        onChangeViewport={v => this.setState({ viewport: v })}
        preventStyleDiffing={false}
        perspectiveEnabled
        width={width}
        height={height}>
      </MapGL>
    );
  }
}

render(<App />, document.getElementById('app'));
