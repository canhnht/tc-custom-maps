

function getRandomInRange(from, to) {
  return Math.random() * (to - from) + from;
}

const MIN_LAT = -90;
const MAX_LAT = +90;
const MIN_LNG = -180;
const MAX_LNG = +180;
const NUMBER_MARKERS = 5000;

let markers = [];
for (let iter = 0; iter < NUMBER_MARKERS; ++iter) {
  let marker = {
    lat: getRandomInRange(MIN_LAT, MAX_LAT),
    lng: getRandomInRange(MIN_LNG, MAX_LNG),
  };
  marker.a = parseInt(Math.random() * 100);
  marker.b = parseInt(Math.random() * (100 - marker.a));
  marker.c = 100 - marker.a - marker.b;
  marker.size = Math.random();
  markers.push(marker);
}

export { markers };

const FIXED_SIZE = 70;
const markerColors = [ '#61C0BF', '#DA507A', '#BB3D49' ];

export const pieCharts = markers.map((item) => {
  const data = {
    size: FIXED_SIZE * item.size,
    sectors: [item.a/100, item.b/100, item.c/100],
  };
  const sectors = calculateSectors(data);
  const paths = sectors.map((sector) => {
    const { color, L, arcSweep, X, Y, R } = sector;
    return `<path fill="${color}" d="M${L},${L} L${L},0 A${L},${L} 0 ${arcSweep},1 ${X}, ${Y} z" transform="translate(2, 2) rotate(${R}, ${L}, ${L})"/>`;
  });
  const svgSize = data.size + 4;
  const circleRadius = svgSize / 2;
  const svg = [
    '<?xml version="1.0"?>',
    `<svg width="${svgSize}px" height="${svgSize}px" viewBox="0 0 ${svgSize} ${svgSize}" version="1.1" xmlns="http://www.w3.org/2000/svg">`,
      `<circle cx="${circleRadius}" cy="${circleRadius}" r="${circleRadius}" fill="white" />`,
      ...paths,
    '</svg>'
  ].join('\n');

  const { lat, lng } = item;
  return {
    svg,
    size: svgSize,
    position: { lat, lng },
  };
});

function calculateSectors( data ) {
  var sectors = [];

  var l = data.size / 2
  var a = 0 // Angle
  var aRad = 0 // Angle in Rad
  var z = 0 // Size z
  var x = 0 // Side x
  var y = 0 // Side y
  var X = 0 // SVG X coordinate
  var Y = 0 // SVG Y coordinate
  var R = 0 // Rotation

  data.sectors.map( function(percentage, key ) {
    a = 360 * percentage;
    var aCalc = ( a > 180 ) ? 360 - a : a;
    aRad = aCalc * Math.PI / 180;
    z = Math.sqrt( 2*l*l - ( 2*l*l*Math.cos(aRad) ) );
    if( aCalc <= 90 ) {
      x = l*Math.sin(aRad);
    }
    else {
      x = l*Math.sin((180 - aCalc) * Math.PI/180 );
    }
    
    y = Math.sqrt( z*z - x*x );
    Y = y;

    if( a <= 180 ) {
      X = l + x;
      var arcSweep = 0;
    }
    else {
      X = l - x;
      var arcSweep = 1;
    }

    sectors.push({
      percentage: percentage,
      color: markerColors[key],
      arcSweep: arcSweep,
      L: l,
      X: X,
      Y: Y,
      R: R
    });

    R = R + a;
  })

  return sectors;
}
