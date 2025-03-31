
      
        var vista = new ol.View({
          projection: "EPSG:4326",
          center: [-78.8, -1.78],
          zoom: 7,
        });
        
        var map = new ol.Map({
          target: 'map',
          view: vista,

          controls: ol.control.defaults().extend ( [
            new ol.control.MousePosition ({
               coordinateFormat: ol.coordinate.toStringHDMS,
            }),
            new ol.control.ScaleLine (),
            new ol.control.ZoomSlider (),            
          ]),

        });
        
        // vista.fit([-75, -83, -4, -2], map.getSize());
        

        
        var wmsLayer1 = new ol.layer.Tile({
          type: 'base',
          title: 'Mapa Base',
          source: new ol.source.TileWMS({
            url: 'https://www.geoportaligm.gob.ec/geoserver/mapabase/wms',
            params: {LAYERS: 'mapabaseecuador', format: "image/png"},           
          })
        });
       
        var vectorLayer = new ol.layer.Vector({
          type: 'base',
          title: 'Vacía',
        });
        
        var wmsLayer2 = new ol.layer.Tile({
          title: 'Cantones',          
          source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/p9/wms',
            params: {LAYERS: 'Cantones', format: "image/png"},             
          })          
        });
        
        var wmsLayer3 = new ol.layer.Tile({
          title: 'ruta_local',
          source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/p9/wms',
            params: {LAYERS: 'ruta_local', format: "image/png"}, 
          })          
        });
        
        var wmsLayer4 = new ol.layer.Tile({
          title: 'ruta_prim_sec',
          source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/p9/wms',
            params: {LAYERS: 'ruta_prim_sec', format: "image/png"}, 
          })          
        });


        var group1 = 
            new ol.layer.Group ({
                title: 'Capas base',
                layers: [vectorLayer, wmsLayer1],
            });
        var group2 = 
            new ol.layer.Group ({
                title: 'Capas Overlay',
				layers: [wmsLayer2, wmsLayer3, wmsLayer4],
            });
        
        map.addLayer(group1);
        map.addLayer(group2);
        
        var layerSwitcher = new ol.control.LayerSwitcher({
            tipLabel: 'Leyenda' 
        });
        map.addControl(layerSwitcher);                

