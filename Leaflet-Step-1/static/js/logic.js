// Check to see if the file is being read
console.log("Logic File Loaded");

// Store API endpoint inside queryUrl - Weekly Earthquake data
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  console.log(data);
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

    function pointToLayer(feature, latlng){
        return L.circleMarker(latlng);
    }

    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing 
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>Magnitude: " + feature.properties.mag +
        "</h3><h3>Depth: " + feature.geometry.coordinates[2] + "</h3><hr><p>" + feature.properties.place + "<p>");
    }
  
    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature,
      pointToLayer: pointToLayer,
    //   style: style
    });
  
    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes);
}

function createMap(earthquakes) {
     // Create overlay object to hold our overlay layer
     var overlayMap = {
        Earthquakes: earthquakes
     };

    // Adding a tile layer (the background map image) to map
    var baseMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v10",
        accessToken: API_KEY
        });

    // Creating our initial map object
    var myMap = L.map("map", {
        center: [0,0],
        zoom: 2,
        layers: [baseMap,overlayMap]
        });
    // Create a layer control   
    L.control.layers(baseMap, overlayMaps, {
        collapsed: false
        }).addTo(myMap);
  };



