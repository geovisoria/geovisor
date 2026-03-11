const options = {
  // Required: API key
  key: '9QLnUin0JSGYLhPokveKUEbKtdfHpxq7', // REPLACE WITH YOUR KEY !!!

  // Put additional console output
  verbose: true,

};

// Initialize Windy API
windyInit(options, windyAPI => {

  const { map } = windyAPI;
  map.setView([-16.2588034, -64.9609351], 6);

  function style_municipios_0_0() {
    return {

      opacity: 1,
      color: '#070707',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 1,
      fillOpacity: 0,
      interactive: true,
    }
  }

  //popups para las capas 

  function popupMunis(feature, layer) {
    if (feature.properties && feature.properties.Departamento) {
      layer.bindPopup("Departamento: " + feature.properties.Departamento
        + "<br> Provincia: " + feature.properties.Provincia
        + "<br> Municipio: " + feature.properties.Municipio

      );
    }

  }

  const municipios = L.geoJSON(json_municipios_0, {
    style: style_municipios_0_0,
    onEachFeature: popupMunis,
  }).addTo(map);

  document.getElementById("municipios").addEventListener("change", (e) => {
    toggleLayer(municipios, e.target.checked);
  });

  function toggleLayer(layer, on) {
    if (on) layer.addTo(map);
    else map.removeLayer(layer);
  }

  var capas = {};

  // Popups que muestran TODOS los atributos
  function popupAllProps(feature, layer) {
    if (feature.properties) {
      let props = feature.properties;
      let content = "<b>Atributos:</b><br>";
      for (let key in props) {
        content += key + ": " + props[key] + "<br>";
      }
      layer.bindPopup(content);
    }
  }

  // Alternar capas
  function toggleLayer(layer, on) {
    if (on) layer.addTo(map);
    else map.removeLayer(layer);
  }

  // Cargar archivo
  document.getElementById('fileInput').addEventListener('change', function (evt) {
    var file = evt.target.files[0];
    if (file) {
      var reader = new FileReader();

      if (file.name.endsWith(".zip")) {
        reader.onload = function (e) {
          shp(e.target.result).then(function (geojson) {
            crearCapa(file.name, geojson);
          });
        };
        reader.readAsArrayBuffer(file);
      } else {
        reader.onload = function (e) {
          var geojson = JSON.parse(e.target.result);
          crearCapa(file.name, geojson);
        };
        reader.readAsText(file);
      }
    }
  });

  // Crear capa y checkbox
  function crearCapa(nombre, geojson) {
    var capa = L.geoJSON(geojson, {
      style: {
        color: '#808080',      // gris para las líneas
        weight: 1.5,           // grosor de las líneas
        fillColor: '#b0b0b0',  // gris claro para el relleno
        fillOpacity: 0.4       // transparencia del relleno

      },
      onEachFeature: popupAllProps
    }).addTo(map);

    capas[nombre] = capa;
    map.fitBounds(capa.getBounds());

    var div = document.createElement("div");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = nombre;
    checkbox.checked = true;
    checkbox.addEventListener("change", function (e) {
      toggleLayer(capas[nombre], e.target.checked);
    });

    var label = document.createElement("label");
    label.htmlFor = nombre;
    label.innerText = " " + nombre;

    div.appendChild(checkbox);
    div.appendChild(label);
    document.getElementById("layerControls").appendChild(div);
  }
});


