//import React, { useRef, useEffect } from 'react';
 
import './Map.css';

//app id=  GFid5mTtzIs2Pw3Vc5As
// api key   Yi4mEcQdVrHUljXoeTXlQa4Z8EDNpKZQMhCEq-BikHo

// MapComponent.js
/*import React, { useEffect } from 'react';
import loadjs from 'loadjs';

const MapComponent = ({ apiKey, zoom, center }) => {
  useEffect(() => {
    let map;

    const initializeMap = () => {
      if (map) {
        map.dispose();
      }
    
      const platform = new window.H.service.Platform({
        'apikey': apiKey
      });
    
      const maptypes = platform.createDefaultLayers();
    
      map = new window.H.Map(
        document.getElementById('mapContainer'),
        maptypes.vector.normal.map,
        {
          zoom: zoom || 12,
          center: center || { lng: -73.9878584, lat: 40.7484405 }
        });
    
      if (window.H.ui) {
        const ui = window.H.ui.UI.createDefault(map, maptypes);
        const behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));

        const zoomControl = new window.H.ui.ZoomControl({ 'zoomSpeed': 0.7 });
        ui.addControl('zoom', zoomControl);
    
        // Explicitly remove the additional canvas created by the default UI
        const extraCanvas = document.querySelector('.huddles-container'); // Replace with the actual class name
        if (extraCanvas) {
          extraCanvas.remove();
        }
      } else {
        console.error('The HERE Maps UI module is not available.');
      }
    };
    

    loadjs(
      [
        'https://js.api.here.com/v3/3.1/mapsjs-core.js',
        'https://js.api.here.com/v3/3.1/mapsjs-service.js',
        'https://js.api.here.com/v3/3.1/mapsjs-mapevents.js',
        'https://js.api.here.com/v3/3.1/mapsjs-ui.js',
      ],
      {
        success: initializeMap,
        error: (path, scriptEl, err) => {
          console.error(`Failed to load the HERE Maps script: ${path}`);
          console.error(err);
        },
        async: true,
        crossOrigin: 'anonymous',
      }
    );

    return () => {
      if (map) {
        map.dispose();
      }
    };
  }, [apiKey, zoom, center]);

  return <div style={{ width: '640px', height: '480px' }} id="mapContainer"></div>;
};

export default MapComponent;
*/

import React, { useEffect } from 'react';

const MapComponent = ({ apiKey, zoom, center }) => {
  useEffect(() => {
    let map;

    const loadScript = (url, callback) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.onload = callback;
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (map) {
        map.dispose();
      }

      const platform = new window.H.service.Platform({
        'apikey': apiKey
      });

      const maptypes = platform.createDefaultLayers();

      map = new window.H.Map(
        document.getElementById('mapContainer'),
        maptypes.vector.normal.map,
        {
          zoom: zoom || 12,
          center: center || { lng: -73.9878584, lat: 40.7484405 }
        });

      const behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));

      // Manually create UI components
      const ui = new window.H.ui.UI(map, maptypes);
      const zoomControl = new window.H.ui.ZoomControl({ 'zoomSpeed': 0.5 });
      ui.addControl('zoom', zoomControl);

      const marker = new window.H.map.Marker(center);
      map.addObject(marker);
    };

    loadScript('https://js.api.here.com/v3/3.1/mapsjs-core.js', () => {
      loadScript('https://js.api.here.com/v3/3.1/mapsjs-service.js', () => {
        loadScript('https://js.api.here.com/v3/3.1/mapsjs-mapevents.js', () => {
          loadScript('https://js.api.here.com/v3/3.1/mapsjs-ui.js', initializeMap);
        });
      });
    });

    return () => {
      if (map) {
        map.dispose();
      }
    };
  }, [apiKey, zoom, center]);

  return <div style={{ width: '640px', height: '480px' }} id="mapContainer"></div>;
};

export default MapComponent;




