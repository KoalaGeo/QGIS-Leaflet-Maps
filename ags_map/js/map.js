var map = L.map("map", {
    center: [52.74, -1.5],
    zoom: 6,
});

var positron = L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
    {
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    }
).addTo(map);

var wmsLayer = L.tileLayer.wms('https://map.bgs.ac.uk/arcgis/services/AGS/AGS_Export/MapServer/WMSServer?', {
    layers: 'Boreholes',
      format: 'image/png',
       transparent: true,
    attribution: "AGS Data from British Geological Survey",
}).addTo(map);

var agsboreholes = L.featureGroup
.ogcApi("https://ogcapi.bgs.ac.uk/", {
    collection: "agsboreholeindex",
    onEachFeature: function (feat, layer) {
        var properties = feat.properties;
        var popupContent = "<b>AGS Borehole Information</b><br><hr>" +
            "<b>BGS LOCA ID: </b>" + properties.bgs_loca_id + "<br>" +
            "<b>Depth (m): </b>" + properties.loca_fdep + "<br>" +
            "<b>Project Name: </b>" + properties.proj_name + "<br>" +
            "<b>Project Engineer: </b>" + properties.proj_eng + "<br>" +
            "<b>Project Contractor: </b>" + properties.proj_cont + "<br>" +
            "<b>Original LOCA ID: </b>" + properties.loca_id + "<br>" +
            "<b>AGS Graphical Log: </b>" + "<a href=" + "https://agsapi.bgs.ac.uk/ags_log/?bgs_loca_id=" + properties.bgs_loca_id + " target=" + "_blank" + ">View</a>" + "<br>" +
            "<b>AGS Submission Record (raw data): </b>" + "<a href=" + properties.dad_item_url + " target=" + "_blank" + ">View</a>" + "<br>";
        layer.bindPopup(popupContent);
    },
})
.addTo(map);

agsboreholes.once("ready", function (ev) {
    map.fitBounds(agsboreholes.getBounds());
});