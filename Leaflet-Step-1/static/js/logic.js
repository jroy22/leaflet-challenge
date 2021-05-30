// Check to see if the file is being read
console.log("Logic File Loaded");

// Creating our initial map object
var myMap = L.map("map", 
    {
    center: [37.09, -95.71],
    zoom: 4.5
    }
    );
  
  // Adding a tile layer (the background map image) to our map
  var baseMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v10",
    accessToken: API_KEY
  }).addTo(myMap);

// Store API endpoint inside queryUrl - Weekly Earthquake data
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(weeklyearthquakedata) {
  // Once we get a response, send the data.features object to the createFeatures function
  console.log(weeklyearthquakedata);
});

function createMap(earthquakes) {
     // Create overlay object to hold our overlay layer
     var overlayMaps = {
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
        }).addTo(myMap);

    // Creating our initial map object
    var myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 4.5,
        layers: [baseMap,overlayMaps]
        });
    // Create a layer control   
    L.control.layers(baseMap, overlayMaps, {
        collapsed: false
        }).addTo(myMap);
  };

