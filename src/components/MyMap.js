import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import React from 'react';

const MyMapComponent = withScriptjs(withGoogleMap(({ children, ...others }) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    {...others}
  >
    {children}
  </GoogleMap>
))

export default ({ children, ...others }) => (
  <MyMapComponent
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDTb1mr8FfrBLgr0-3aqQurzD4br2hSNuM&v=3.exp&libraries=geometry,drawing,places"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
    {...others}
  >
    {children}
  </MyMapComponent>
)