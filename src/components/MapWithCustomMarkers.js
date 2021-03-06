import React, { Component } from 'react';
import { Marker } from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';

import MyMap from './MyMap';
import { markers, pieCharts } from '../data/markers';


export default class MapWithCustomMarkers extends Component {

  render() {
    return (
      <MyMap>
        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={60}
        >
          {pieCharts.map((item, idx) => {
            const { svg, size, position } = item;
            return (
              <Marker 
                key={idx} 
                position={position}
                icon={{
                  url: 'data:image/svg+xml;utf8,' + svg,
                  anchor: { x: size / 2, y: size / 2 }
                }}
                onClick={() => console.log(`Marker Index: ${idx}`)}
              />
            )
          })}
        </MarkerClusterer>
      </MyMap>
    )
  }
}