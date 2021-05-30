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
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v10",
    accessToken: API_KEY
  }).addTo(myMap);

// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(weekearthquakedata) {
  // Once we get a response, send the data.features object to the createFeatures function
  console.log(weekearthquakedata);
});