var wms_layers = [];

        var lyr_OSMStandard_0 = new ol.layer.Tile({
            'title': 'OSM Standard',
            'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: '<a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
                url: 'http://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });var lyr_625kbedrock_1 = new ol.layer.Image({
                            opacity: 1,
                            title: "625kbedrock",
                            
                            
                            source: new ol.source.ImageStatic({
                               url: "./layers/625kbedrock_1.png",
    attributions: '<a href=""></a>',
                                projection: 'EPSG:3857',
                                alwaysInRange: true,
                                imageExtent: [-1038238.872868, 6392949.512973, 424927.548345, 8595010.835937]
                            })
                        });var lyr_625ksuper_2 = new ol.layer.Image({
                            opacity: 1,
                            title: "625ksuper",
                            
                            
                            source: new ol.source.ImageStatic({
                               url: "./layers/625ksuper_2.png",
    attributions: '<a href=""></a>',
                                projection: 'EPSG:3857',
                                alwaysInRange: true,
                                imageExtent: [-937071.156865, 6395992.553669, 317823.440079, 8591950.178755]
                            })
                        });

lyr_OSMStandard_0.setVisible(true);lyr_625kbedrock_1.setVisible(true);lyr_625ksuper_2.setVisible(true);
var layersList = [lyr_OSMStandard_0,lyr_625kbedrock_1,lyr_625ksuper_2];
