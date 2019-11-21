var leafletMap = {};
var control = {};
var baseMaps = {};
var map;

var mapCentre = [55, -2.54];
var initZoom = 6;
var southWest = L.latLng(-89.98155760646617, -180);
var northEast = L.latLng(89.99346179538875, 180);
var bounds = L.latLngBounds(southWest, northEast);

/** Create the Leaflet map instance */
leafletMap.init = function () {
    map = L.map('mapDiv', {
        center: mapCentre,
        zoom: initZoom,
        maxBounds: bounds,
        fullscreenControl: true
    });

    var topo = L.esri.basemapLayer("Topographic")
    var imagery = L.esri.basemapLayer("Imagery");
    var gray = L.esri.basemapLayer("Gray").addTo(map);
    var flows = [];

    var eer_boundaries = L.geoJson(null, {
        style: function (feature) {
            return {
                color: '#666666',
                weight: 1,
                fillOpacity: 0.2
            };
        }
    });

    eer_boundaries.addTo(map);

    baseMaps["<img width='20' height='20' src='assets/images/imagery.png' /> <span style='vertical-align: top; color: black; font-size: 12px;'>Gray</span>"] = gray;
    baseMaps["<img width='20' height='20' src='assets/images/topo.png' /> <span style='vertical-align: top; color: black; font-size: 12px;'>Topographic Map</span>"] = topo;
    baseMaps["<img width='20' height='20' src='assets/images/imagery.png' /> <span style='vertical-align: top; color: black; font-size: 12px;'>Satellite Imagery</span>"] = imagery;

    control = L.control.layers(baseMaps, null, { collapsed: true }).addTo(map);

    $.ajax({
        dataType: "json",
        url: "assets/topo_eer.json",
        success: function (data) {

            $(data.features).each(function (key, layer) {
                eer_boundaries.addData(layer);
            });

            eer_boundaries.eachLayer(function (layer) {
                const centre = layer.getBounds().getCenter();

                layer.on('click', function (evt) {
                    map.flyTo(centre, 8);

                    if (flows.length > 0) {
                        flows.forEach(swp => {
                            map.removeLayer(swp);
                        });
                    }

                    eer_boundaries.eachLayer(function (layer2) {
                        var startCentre = layer2.getBounds().getCenter();

                        var options = {
                            color: '#000000'.replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); }),
                            weight: Math.floor(Math.random() * 20) + 1,
                            dashArray: [
                                1,
                                50
                            ],
                            delay: 800,
                            hardwareAccelerated: true,
                        };

                        var antPolyline = new L.Polyline.AntPath([startCentre, centre], options);
                        antPolyline.addTo(map);
                        flows.push(antPolyline);
                    });

                });

                layer.on('mouseover', function () {
                    this.setStyle({
                        'fillColor': '#fff',
                        'color': '#fff',
                        'weight': 2,
                        'fillOpacity': 0.2
                    });
                });
                layer.on('mouseout', function () {
                    this.setStyle({
                        'fillColor': '#666666',
                        'color': '#666666',
                        'weight': 1,

                    });
                });

                L.marker(centre, {
                    icon: L.divIcon({
                        className: 'region-label',
                        html: layer.feature.properties.EER13NM,
                        iconSize: [100, 40]
                    })
                }).addTo(map);

            });
        }
    });

}

$(document).ready(leafletMap.init);