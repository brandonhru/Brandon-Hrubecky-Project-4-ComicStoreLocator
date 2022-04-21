//Code examples from Mapbox JS documentation https://docs.mapbox.com/mapbox-gl-js/guides/
//FETCHING INFORMATION FROM THE BACKEND
//Icons taken from mapquest library 
mapboxgl.accessToken = 'pk.eyJ1IjoiYnJhbmRvbmhydSIsImEiOiJjbDI4OHZtbjAwMzltM2Rxa2pxcWdpaTE5In0.gAZi9rAiWmDwMRem3ZAUkg';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-79.688467, 43.478877], // starting position [lng, lat] OAKVILLE
    zoom: 9 // starting zoom
});


//Grab Stores from API
async function getStores() {
    const res = await fetch('/api/v1/stores');
    const data = await res.json();

    const stores = data.data.map(store => {
        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [
                    store.location.coordinates[0],
                    store.location.coordinates[1]
                ]
            },
            properties: {
                storeId: store.storeId,
                icon: 'shop'
            }
        };
    });

    loadMap(stores);
};


//Load map with points of comic book stores
function loadMap(stores) {
    map.on('load', function() {
        map.addLayer({
            id: 'points',
            type: 'symbol',
            source: {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: stores
                }
            },
            layout: {
                'icon-image': 'suitcase-15',
                'icon-size': 2,
                'text-field': '{storeId}',
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.9],
                'text-anchor': 'top',
            }
        });
    });
}

getStores();