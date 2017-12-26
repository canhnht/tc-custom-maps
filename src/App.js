import React, { Component } from 'react';
import './App.css';
import MapWithLassoTool from './components/MapWithLassoTool';
import MapWithPolygons from './components/MapWithPolygons';

class App extends Component {
  render() {
    return (
      <div>
        <h3>1. Custom markers</h3>
        <h3>2. Create Polygons</h3>
        <MapWithPolygons />
        <h3>3. Lasso tool</h3>
        <MapWithLassoTool />
      </div>
    );
  }
}

export default App;
