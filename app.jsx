// @flow

require("babel-polyfill");

import React from 'react';
import { render, findDOMNode } from 'react-dom';

import { mouse } from 'd3-selection';

import R from 'ramda';

import Immutable from 'immutable';

import { geoDistance, geoRotation } from 'd3-geo';

// import DeckGL from 'deck.gl/react';
// import { LineLayer } from 'deck.gl';

import MapGL, { DraggablePointsOverlay, SVGOverlay, HTMLOverlay } from 'react-map-gl';

import ViewportMercator from 'viewport-mercator-project';

import { NavigationControl } from 'mapbox-gl';
require('mapbox-gl/dist/mapbox-gl.css')
import MapboxGeocoder from 'mapbox-gl-geocoder';
require('mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css')

const accessToken = 'pk.eyJ1IjoiZ2FyYW1vbmQiLCJhIjoiY2lwNXFyNHBsMDAwMXh0a281cmY3N2plbCJ9.Meb_5_d0YbhwRwFHOYYiPg'

const initialPois = [
  { location: [8.540850, 47.377767], id: 0, radius: 0.00001, name: 'Zentrum' }
]

const placeTypes = {
  'address': {
    zoomLevel: 16,
    createPoi: true
  },
  'country': {
    zoomLevel: 5,
    createPoi: false
  },
  'region': {
    zoomLevel: 7,
    createPoi: false
  },
  'place': {
    zoomLevel: 14,
    createPoi: false
  },
  'neighborhood': {
    zoomLevel: 14,
    createPoi: false
  },
  'poi': {
    zoomLevel: 14,
    createPoi: false
  },
  'poi.landmark': {
    zoomLevel: 14,
    createPoi: false
  },
}

class POIEditor extends React.Component {

  constructor(props) {
    super(props);
    const { x, y } = props.origin;
    this.state = {
      mousePos: { x, y },
      tmpPOI: { location: this.props.unproject([x, y]), radius: 0.00001, name: 'n/a' }
    };
  }

  getMousePosition = (el, event) => {
    const rect = el.getBoundingClientRect();
    event = event.touches ? event.touches[0] : event;
    return {
      x: event.clientX - rect.left - el.clientLeft,
      y: event.clientY - rect.top - el.clientTop
    };
  }

  calcRadius = () => {
    const { origin: { x: x1, y: y1 }, unproject } = this.props;
    const { mousePos: { x: x2, y: y2 } } = this.state;
    const a = unproject([x1, y1])
    const b = unproject([x2, y2])
    return geoDistance(a, b);
  }

  handleClick = () => {
    this.props.onSave(this.state.tmpPOI);
  }

  handleMouseMove = (e) => {
    this.setState({
      mousePos: this.getMousePosition(this.container, e),
      tmpPOI: R.assoc('radius', this.calcRadius(), this.state.tmpPOI)
    })
  }

  renderEditor = (opts) => {
    const { origin: { x: x1, y: y1 } } = this.props;
    const { mousePos: { x: x2, y: y2 } } = this.state;
    const r = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    return (
      <g>
        <line x1={x1} x2={x2}
          y1={y1} y2={y2}
          stroke="black" strokeWidth="5" />
        <circle cx={x1} cy={y1} r={r} fillOpacity={0.1} stroke='black' />
        <circle cx={x1} cy={y1} r={5} stroke='red' />
      </g>
    )
  }

  render() {
    const { width, height, viewport } = this.props;
    const { mousePos } = this.state;
    return (
      <g>
        <rect ref={d => this.container = d}
          style={{ width, height, fillOpacity: 0, pointerEvents: 'all' }}
          onClick={this.handleClick}
          onMouseMove={this.handleMouseMove}>
        </rect>
        {this.renderEditor()}
      </g>
    )
  }
}

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
      width: 1000,
      height: 1000,

      mode: null,

      pois: initialPois,
      mousePos: { x: 0, y: 0 },

      radiusOrigin: undefined,
      radiusEnd: undefined,
      tmpPOI: undefined
    };
  }

  handleMapClick = () => {
    // const { radiusOrigin, radiusEnd, pois, mousePos, width, height, viewport } = this.state
    // const { x, y } = mousePos;
    // const mercator = new ViewportMercator({ width, height, ...viewport })
    // const point = mercator.unproject([x, y])
    // if (radiusOrigin && !radiusEnd) {
    //   this.setState({
    //     radiusEnd: { x, y }
    //   })
    // }
    // else if (radiusOrigin && radiusEnd) {
    //   console.log(R.union([{ location: point, name: 'manual' }], pois));
    //   this.setState({
    //     pois: R.union([{ location: point, name: 'manual' }], pois),
    //     radiusOrigin: null,
    //     radiusEnd: null,
    //   })
    // } else {
    //   this.setState({
    //     tmpPOI: [{ location: point, name: 'manual' }],
    //     radiusOrigin: { x, y },
    //     radiusEnd: null
    //   })
    // }
  }

  handleLocationLookup = (arg) => {
    const config = placeTypes[R.head(arg.result.place_type)] || placeTypes.place
    const latitude = arg.result.center[1],
      longitude = arg.result.center[0]

    const poi = {
      location: [longitude, latitude],
      name: arg.result.place_name,
      id: R.length(this.state.pois)
    }
    this.setState({
      pois: config.createPoi
        ? R.union([poi], this.state.pois)
        : this.state.pois,
      viewport: {
        latitude,
        longitude,
        zoom: config.zoomLevel
      }
    })
  }

  componentDidMount = () => {
    const map = this.map._getMap()
    const geocoder = new MapboxGeocoder({
      accessToken: accessToken,
      flyTo: false
    })
    geocoder.on('result', this.handleLocationLookup)
    map.addControl(geocoder);
    map.on('click', (e) => this.setState({ mode: 'poi-editor', lastClick: e.point }))
  }

  renderPOIOverlay = (opts) => {
    return this.state.pois.map(l => {
      const [ x, y ] = opts.project(l.location)
      const [u, v] = opts.project(geoRotation(
        [ 0, l.radius * (180 / Math.PI) ])(l.location))
      const r = Math.sqrt(Math.pow(x - u, 2) + Math.pow(y - v, 2))
      console.log('l.name, l.radius, r', l.name, l.radius, r)
      return (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r={r} fill='black' />
          <circle cx={x} cy={y} r={5} fill='red' />
        </g>
      )
    })
  }

  handleAddPOI = (poi) => {
    const { pois } = this.state;
    this.setState({
      pois: R.union([poi], pois),
      mode: null
    })
  }

  render() {
    const {viewport, width, height} = this.state;
    const { mode } = this.state;
    const map =
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

        {
          mode === 'poi-editor' ?
            <SVGOverlay
              key="poi-editor-overlay"
              { ...viewport }
              width={width}
              height={height}
              redraw={(props) => <POIEditor { ...props }
                origin={this.state.lastClick}
                onSave={this.handleAddPOI} />} />
            : null
        }


        <SVGOverlay
          key="poi-overlay"
          { ...viewport }
          width={width}
          height={height}
          redraw={this.renderPOIOverlay} />


        {/*<DraggablePointsOverlay key="draggable-overlay" { ...viewport }
            points={Immutable.fromJS(this.state.pois)}
            onAddPoint={ this.handleAddPOI }
            onUpdatePoint={ f => f }
            width={width}
            height={height}
            renderPoint={
              (point, pixel) => {
                return (
                  <g>
                    <circle
                      style={{ fill: 'red', pointerEvents: 'all' }} r={10} />
                  </g>
              )}
            } />*/}

      </MapGL>

    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }}>
        {map}
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
