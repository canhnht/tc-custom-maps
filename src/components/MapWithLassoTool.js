/* eslint-disable no-undef */

import React, { Component } from 'react';
import DrawingManager from 'react-google-maps/lib/components/drawing/DrawingManager';
import { Polygon } from 'react-google-maps';

import MyMap from './MyMap';

export class MapWithLassoTool extends Component {
  state = {
    paths: [],
  };

  onPolylineComplete = (polyline) => {
    console.log('evt', polyline);
    const path = polyline.getPath();
    this.setState({ paths: this.state.paths.concat(path) });
    path.forEach((point, idx) => {
      if (idx === path.getLength() - 1) return;
      console.log(`Lat: ${point.lat()}, Lng: ${point.lng()}`);
    });
  }

  render() {
    const { paths } = this.state;

    return (
      <MyMap>
        <DrawingManager
          defaultDrawingMode={'polyline'}
          defaultOptions={{
            drawingControl: true,
            drawingControlOptions: {
              drawingModes: ['polygon', 'polyline']
            },
          }}
          onPolylineComplete={this.onPolylineComplete}
        />
        {paths.map((path, idx) => (
          <Polygon
            key={idx}
            path={path}
            strokeColor='#FF0000'
            strokeOpacity={1}
            strokeWeight={1}
            fillColor={'#000000'}
            fillOpacity={0.3}
          />
        ))}
      </MyMap>
    )
  }
}