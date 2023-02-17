import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

var Mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

Mapboxgl.accessToken = 'pk.eyJ1IjoiY3Jpc2xlZGV6bWEiLCJhIjoiY2treXc3NG1kNWduNzJxcGQxNzVyOHlvNSJ9.dJ32Ls23IDkq2g3Wz1TYqw';

if (!navigator.geolocation) {
  alert("Navegador no soporta la Geolocalización");
  throw new Error("Navegador no soporta la Geolocalización");
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
