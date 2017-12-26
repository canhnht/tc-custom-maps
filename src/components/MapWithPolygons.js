import React, { Component } from 'react';
import { Polygon } from 'react-google-maps';

import MyMap from './MyMap';
import { polygons, polygonColors } from '../data/polygons';

export default class MapWithPolygons extends Component {
  state = {
    hoveredIdx: null,
  };

  selectPolygon = (hoveredIdx) => {
    this.setState({ hoveredIdx });
  }

  unselectPolygon = () => {
    this.setState({ hoveredIdx: null });
  }
  
  render() {
    const { hoveredIdx } = this.state;

    return (
      <MyMap mapTypeId="satellite">
        {polygons.map((path, idx) => (
          <Polygon
            key={idx}
            path={path}
            options={{
              strokeColor: '#FFFFFF',
              strokeOpacity: (idx === hoveredIdx ? 1 : 0),
              strokeWeight: 2,
              fillColor: polygonColors[idx],
              fillOpacity: 0.3,
            }}
            onMouseOver={() => this.selectPolygon(idx)}
            onMouseOut={() => this.unselectPolygon(idx)}
            onClick={() => console.log(`Polygon Index: ${idx}`)}
          />
        ))}
      </MyMap>
    )
  }
}