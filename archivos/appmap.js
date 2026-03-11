
let map = L.map('map').setView([-16.2588034, -64.9609351], 6);


let openStreet = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
let imagen = L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}');

let carto = L.tileLayer('https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png');
let cartoL = L.tileLayer('https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png');
let esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}')

/* ==========================
   Estilos y capas
   ========================== */


function style_municipios_0_0() {
  return {

    opacity: 1,
    color: '#65e0ff',
    dashArray: '',
    lineCap: 'butt',
    lineJoin: 'miter',
    weight: 1,
    fillOpacity: 0,
    interactive: true,
  }
}



function popupMunis(feature, layer) {
  if (feature.properties && feature.properties.Departamento) {
    layer.bindPopup("Departamento: " + feature.properties.Departamento
      + "<br> Provincia: " + feature.properties.Provincia
      + "<br> Municipio: " + feature.properties.Municipio

    );
  }

}



//  vias
function styleRed_vial() {
  return {
    opacity: 1,
    color: 'rgba(255,115,0,1.0)',
    dashArray: '',
    lineCap: 'square',
    lineJoin: 'bevel',
    weight: 3.0,
    fillOpacity: 0,
    interactive: true,
  }
}

function popupvias(feature, layer) {
  if (feature.properties && feature.properties.rodadura) {
    layer.bindPopup("Departamento: </stronge>" + feature.properties.rodadura
      + "<br>Tipo:" + feature.properties.tipo

    );
  }

}

let viasEVF = new L.geoJson(json_abc_red_vial_fundamental_2024_0, {
  onEachFeature: popupvias,
  style: styleRed_vial
})

// bloqueso ABC

let puntosABC = L.layerGroup();

// Función para asignar color según estado
function getColor(estado) {
  switch (estado.descripcion_estado) {
    case "TRANSITABLE": return "green";
    case "TRANSITABLE CON DESVIOS": return "orange";
    case "NO TRANSITABLE POR CONFLICTOS SOCIALES": return "red";
    case "TRANSITABLE CON PRECAUCIÓN": return "#BE0493";
    default: return "blue";
  }
}


fetch("https://transitabilidad.abc.gob.bo/api/v1/data")
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
      let lat = parseFloat(item.latitud_inicio_seccion);
      let lng = parseFloat(item.longitud_inicio_seccion);

      // Crear círculo con color según estado
      L.circleMarker([lat, lng], {
        radius: 8,
        fillColor: getColor(item.estado),
        color: "black",
        fillOpacity: 0.8
      })
        .bindPopup(`
            <b>Ruta:</b> ${item.ruta}<br>
            <b>Sección:</b> ${item.seccion}<br>
            <b>Inicio:</b> ${item.inicio_seccion}<br>
            <b>Fin:</b> ${item.fin_seccion}<br>
            <b>Departamento:</b> ${item.departamento}<br>
            <b>Estado:</b> ${item.estado.descripcion_estado}<br>
            <b>Evento:</b> ${item.evento.descripcion_evento}<br>
            <b>Clima:</b> ${item.clima.descripcion_clima}<br>
            <b>Restricción:</b> ${item.restriccion_vehicular.descripcion_restriccion_vehicular}<br>
            <b>Fecha:</b> ${item.fecha_registro_hora}
          `)
        .addTo(puntosABC);
    });
  })
  .catch(err => console.error("Error cargando datos:", err));


const municipios = L.geoJSON(json_municipios_0, {
  style: style_municipios_0_0,
  onEachFeature: popupMunis,
}).addTo(map);

// capa de comunidades

function popupComunidaes(feature, layer) {
  if (feature.properties && feature.properties.Departamento) {
    layer.bindPopup("Departamento: " + feature.properties.Departamento
      + "<br>Municipio: " + feature.properties.Municipio
      + "<br>Comunidad: " + feature.properties.Comunidad
      + "<br>Amenaza de Sequia: " + feature.properties.AmzSequ
      + "<br>Amenaza de Inundación: " + feature.properties.AmzInun11
      + "<br>Amenaza de Helada: " + feature.properties.Amzhela
      + "<br>Amenaza de Granizo: " + feature.properties.AmzGran
      + "<br>Sensibilidad Agropecuaria: " + feature.properties.SensAgrop
      + "<br>Sensibilidad Desarrollo Productivo: " + feature.properties.SensDePro
      + "<br>Superficie Agricola: " + feature.properties.porcsupagr
      + "<br>Superficie Ganadera: " + feature.properties.porcsupgan
      + "<br>Vulnerabilidad en Disponibilidad Alimentaria: " + feature.properties.NormDispo1
      + "<br>Vulnerabilidad en Acceso a los Alimentos: " + feature.properties.NormAcce1
      + "<br>Vulnerabilidad en Uso de los Alimentos: " + feature.properties.NormUso1
      + "<br>Vulnerabilidad a la Inseguridad Alimentaria: " + feature.properties.NormICCOM1
    );
  }
}

function style_comunidades_0_0(feature) {
  if (feature.properties['NormICCOM1'] >= 0.000000 && feature.properties['NormICCOM1'] <= 0.383900) {
    return {

      radius: 4.0,
      opacity: 1,
      color: 'rgba(35,35,35,1.0)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 1,
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(18,186,97,1.0)',
      interactive: true,
    }
  }
  if (feature.properties['NormICCOM1'] >= 0.383900 && feature.properties['NormICCOM1'] <= 0.523800) {
    return {

      radius: 4.0,
      opacity: 1,
      color: 'rgba(35,35,35,1.0)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 1,
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(255,242,1,1.0)',
      interactive: true,
    }
  }
  if (feature.properties['NormICCOM1'] >= 0.523800 && feature.properties['NormICCOM1'] <= 0.632700) {
    return {

      radius: 4.0,
      opacity: 1,
      color: 'rgba(35,35,35,1.0)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 1,
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(252,179,34,1.0)',
      interactive: true,
    }
  }
  if (feature.properties['NormICCOM1'] >= 0.632700 && feature.properties['NormICCOM1'] <= 0.740300) {
    return {

      radius: 4.0,
      opacity: 1,
      color: 'rgba(35,35,35,1.0)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 1,
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(255,116,9,1.0)',
      interactive: true,
    }
  }
  if (feature.properties['NormICCOM1'] >= 0.740300 && feature.properties['NormICCOM1'] <= 1.000000) {
    return {

      radius: 4.0,
      opacity: 1,
      color: 'rgba(35,35,35,1.0)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 1,
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(255,0,0,1.0)',
      interactive: true,
    }
  }
}


var layerComunidades = new L.geoJson(json_comunidades_0, {
  onEachFeature: popupComunidaes,

  pointToLayer: function (feature, latlng) {
    var context = {
      feature: feature,
      variables: {}
    };
    return L.circleMarker(latlng, style_comunidades_0_0(feature));
  },
});

// gasolineras

function style_estacion(feature, latlng) {
  return L.circleMarker(latlng, {
    radius: 6,
    opacity: 1,
    color: 'rgba(255,255,255,1.0)',
    weight: 2.0,
    fillOpacity: 0.5,
    fillColor: 'rgba(0,0,0,1.0)',
  });
}

function popupEstacion(feature, layer) {
  if (feature.properties && feature.properties.esta_servi) {
    layer.bindPopup("Nombre: " + feature.properties.esta_servi
      + "<br>Localidad: " + feature.properties.localidad
      + "<br>Zona: " + feature.properties.zona
      + "<br>Referencia: " + feature.properties.referencia
      + "<br>Area: " + feature.properties.ubicacio
      + "<br>GNV: " + feature.properties.gnv
      + "<br>Gasolina: " + feature.properties.gasolina
      + "<br>Diesel: " + feature.properties.diesel
    );
  }
}

let gasolineras = new L.geoJson(json_estacion_servicio_anh_2013_0, {
  onEachFeature: popupEstacion,
  pointToLayer: style_estacion
});

/* ==========================
   Controles de capas 
   ========================== */

document.getElementById("layerVias").addEventListener("change", (e) => {
  toggleLayer(viasEVF, e.target.checked);
});

document.getElementById("layerABC").addEventListener("change", (e) => {
  toggleLayer(puntosABC, e.target.checked);
});


document.getElementById("municipios").addEventListener("change", (e) => {
  toggleLayer(municipios, e.target.checked);
});

document.getElementById("layercomunidades").addEventListener("change", (e) => {
  toggleLayer(layerComunidades, e.target.checked);
});

document.getElementById("estacion").addEventListener("change", (e) => {
  toggleLayer(gasolineras, e.target.checked);
});


/* ==========================
   Controles de mapa base
   ========================== */


document.getElementById("layeropenstr").addEventListener("change", (e) => {
  toggleLayer(openStreet, e.target.checked);
});

document.getElementById("layerimagen").addEventListener("change", (e) => {
  toggleLayer(imagen, e.target.checked);
});

document.getElementById("layercarto").addEventListener("change", (e) => {
  toggleLayer(carto, e.target.checked);
});

document.getElementById("layercartoL").addEventListener("change", (e) => {
  toggleLayer(cartoL, e.target.checked);
});

document.getElementById("layeresri").addEventListener("change", (e) => {
  toggleLayer(esri, e.target.checked);
});

function toggleLayer(layer, on) {
  if (on) layer.addTo(map);
  else map.removeLayer(layer);
}

// --- Botón de recarga ---
L.Control.Reload = L.Control.extend({
  onAdd: function(map) {
    const btn = L.DomUtil.create("button", "leaflet-bar");
    btn.innerHTML = "⟳"; // ícono de recarga
    btn.title = "Recargar página";
    btn.style.cursor = "pointer";

    btn.onclick = function() {
      location.reload(); // recarga la página
    };

    return btn;
  },
  onRemove: function(map) {}
});

L.control.reload = function(opts) {
  return new L.Control.Reload(opts);
};
L.control.reload({ position: "topleft" }).addTo(map);

// Activar controles de Leaflet.PM
map.pm.addControls({
  position: 'topleft',
  drawMarker: false,
  drawCircleMarker: false,
  drawPolyline: true,   // medir distancias
  drawPolygon: true,    // medir áreas
  drawCircle: false,
  drawRectangle: false,
  editMode: true,
  dragMode: false
});

// Mostrar distancia/área al terminar de dibujar
map.on('pm:create', e => {
  if (e.shape === 'Line') {
    const latlngs = e.layer.getLatLngs();
    let distancia = 0;
    for (let i = 0; i < latlngs.length - 1; i++) {
      distancia += latlngs[i].distanceTo(latlngs[i+1]);
    }
    e.layer.bindPopup(`Distancia: ${(distancia/1000).toFixed(2)} km`).openPopup();
  }
  if (e.shape === 'Polygon') {
    const area = L.GeometryUtil.geodesicArea(e.layer.getLatLngs()[0]);
    e.layer.bindPopup(`Área: ${(area/10000).toFixed(2)} ha`).openPopup();
  }
});

// Escala
L.control.scale().addTo(map);


