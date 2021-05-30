// Check to see if the file is being read
console.log("Logic File Loaded");

var earthquakes = new L.LayerGroup();

// Create overlay object to hold our overlay layer
var overlayMaps = {Earthquakes: earthquakes};

// Define a baseMaps object to hold base layers
var baseMaps = {"Light map": lightmap};

// Adding a tile layer (the background map image) to map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
    });

// Creating our initial map object
var myMap = L.map("map", {
    center: [0,0],
    zoom: 2,
    layers: [lightmap,earthquakes]
    });

// Store API endpoint inside queryUrl - Weekly Earthquake data
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(earthquakedata) {
    console.log(earthquakedata);
    var mColors = ["#ff5f65", "#fca35d", "#fbd72a", "#f7db11", "#dcf400", "#a3f600"]

    // Function to determine the marker color
    function markerColors(depth) {
        var colorFill = "white";
        switch(true){
            case depth > 90:
                colorFill = mColors[0];
                break;
    
            case depth > 70:
                colorFill = mColors[1];
                break;
    
            case depth > 50:
                colorFill = mColors[2];
                break;
    
            case depth > 30:
                colorFill = mColors[3];
                break;
    
            case depth > 10:
                colorFill = mColors[4];
                break;
    
            case depth > -10:
                colorFill = mColors[5];
                break;
        }
        return colorFill;
    }

    function markerStyle(features){
        return {
            opacity: 1, 
                fillOpacity: 1,
                fillColor: markerColors(features.geometry.coordinates[2]),
                color: "#FFFFFF",
                radius: 5 * features.properties.mag,
                stroke: true,
                weight: 0.5
        };
    }

    L.geoJSON(earthquakedata, {
        pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
        },

        style: markerStyle,

        onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>Magnitude: " + feature.properties.mag +
        "</h3><h3>Depth: " + feature.geometry.coordinates[2] + "</h3><hr><p>" + feature.properties.place + "<p>");
        }

    }).addTo(earthquakes);
    earthquakes.addTo(myMap);

});
