
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

//popups para las capas 

function popupMunis(feature, layer) {
  if (feature.properties && feature.properties.Departamento) {
    layer.bindPopup("Departamento: " + feature.properties.Departamento
      + "<br> Provincia: " + feature.properties.Provincia
      + "<br> Municipio: " + feature.properties.Municipio

    );
  }

}

// servicio de SENAMHI

let climaSenamhi = L.layerGroup();

// Definición de íconos para fenómenos climáticos
var icons = {
  lluvia: L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/13063/13063799.png',
    iconSize: [32, 32]
  }),
  lluviasDispersas: L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/5826/5826017.png',
    iconSize: [32, 32]
  }),
  tormenta: L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1146/1146869.png',
    iconSize: [32, 32]
  }),
  tormentaElectrica: L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1146/1146860.png',
    iconSize: [32, 32]
  }),
  nuboso: L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/704/704743.png',
    iconSize: [32, 32]
  }),
  pocoNuboso: L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3076/3076129.png',
    iconSize: [32, 32]
  }),
  despejado: L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/869/869869.png',
    iconSize: [32, 32]
  }),
  default: L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/869/869869.png',
    iconSize: [32, 32]
  })
};

// Función para elegir ícono según fenómeno individual
function getIcon(fenomeno) {
  fenomeno = fenomeno.toLowerCase().trim();
  if (fenomeno.includes("tormenta eléctrica")) return icons.tormentaElectrica;
  if (fenomeno.includes("tormenta")) return icons.tormenta;
  if (fenomeno.includes("lluvias dispersas")) return icons.lluviasDispersas;
  if (fenomeno.includes("lluvia")) return icons.lluvia;
  if (fenomeno.includes("poco nuboso")) return icons.pocoNuboso;
  if (fenomeno.includes("nuboso")) return icons.nuboso;
  if (fenomeno.includes("despejado")) return icons.despejado;
  return icons.default;
}

// Función para elegir el ícono más severo dentro de un grupo
function getPriorityIcon(estacionesGrupo) {
  let fenomenos = estacionesGrupo.map(e => e.fenomeno.toLowerCase().trim());

  if (fenomenos.some(f => f.includes("tormenta eléctrica"))) return icons.tormentaElectrica;
  if (fenomenos.some(f => f.includes("tormenta"))) return icons.tormenta;
  if (fenomenos.some(f => f.includes("lluvias dispersas"))) return icons.lluviasDispersas;
  if (fenomenos.some(f => f.includes("lluvia"))) return icons.lluvia;
  if (fenomenos.some(f => f.includes("poco nuboso"))) return icons.pocoNuboso;
  if (fenomenos.some(f => f.includes("nuboso"))) return icons.nuboso;
  if (fenomenos.some(f => f.includes("despejado"))) return icons.despejado;
  return icons.default;
}

// Fetch y agrupación de estaciones
//https://senamhi.gob.bo/pronjsondiario.php"

let grupos = {};

// Agrupar por coordenadas
estaciones.forEach(estacion => {
  let lat = parseFloat(estacion.latitud);
  let lon = parseFloat(estacion.long);
  let key = `${lat},${lon}`;

  if (!grupos[key]) {
    grupos[key] = [];
  }
  grupos[key].push(estacion);
});

// Crear un solo marcador por grupo
Object.keys(grupos).forEach(key => {
  let [lat, lon] = key.split(",").map(parseFloat);
  let estacionesGrupo = grupos[key];

  // Concatenar la info en el popup
  let popupContent = estacionesGrupo.map(estacion => `
        <b>${estacion.estacion}</b><br>
        Fecha: ${estacion.fecha}<br>
        🌡️ Máx: ${estacion.TMAX} °C<br>
        💧 Precipitación: ${estacion.PCPN} mm<br>
        💨 Humedad: ${estacion.HR} %<br>
        🌤️ Fenómeno: ${estacion.fenomeno}
        <hr>
      `).join("");

  // Usar ícono más severo del grupo
  L.marker([lat, lon], { icon: getPriorityIcon(estacionesGrupo) })
    .bindPopup(popupContent)
    .addTo(climaSenamhi);
});

const municipios = L.geoJSON(json_municipios_0, {
  style: style_municipios_0_0,
  onEachFeature: popupMunis,
}).addTo(map);



// incendios videci   

function style_incendios() {
  return {

    opacity: 1,
    color: 'rgba(35,35,35,1.0)',
    dashArray: '',
    lineCap: 'butt',
    lineJoin: 'miter',
    weight: 1.0,
    fill: true,
    fillOpacity: 0.5,
    fillColor: 'rgba(232,20,70,1.0)',
    interactive: true,
  }
}

function popupIncendiosV(feature, layer) {
  if (feature.properties && feature.properties.DEPARTAMEN) {
    layer.bindPopup("Departamento: " + feature.properties.DEPARTAMEN
      + "<br> Provincia: " + feature.properties.PROVINCIA
      + "<br> Población 2024: " + feature.properties.CNPV_24
      + "<br> Nº de Reportes: " + feature.properties.Book2_Cuen
      + "<br> Comunidades Afectadas: " + feature.properties.Book2_Comu
      + "<br> Familias Afectadas: " + feature.properties.Book2_Fami
      + "<br> Viviendas Afectadas: " + feature.properties.Book2_Vivi
      + "<br> Ha Afectadas: " + feature.properties.Book2_Ha_A
      + "<br> Ganado Afectado: " + feature.properties.Book2_Gana
      + "<br> Fallecidos: " + feature.properties.Book2_Fall

    );
  }

}

let humedadRelativaDwe = new L.geoJson(json_incendios_videci2025_0, {
  onEachFeature: popupIncendiosV,
  style: style_incendios,
});

//inundaciones videci

function style_inundaciones() {
  return {

    opacity: 1,
    color: 'rgba(35,35,35,1.0)',
    dashArray: '',
    lineCap: 'butt',
    lineJoin: 'miter',
    weight: 1.0,
    fill: true,
    fillOpacity: 0.5,
    fillColor: 'rgba(58,156,230,1.0)',
    interactive: true,
  }
}
function popupInundaV(feature, layer) {
  if (feature.properties && feature.properties.DEPARTAMEN) {
    layer.bindPopup("Departamento: " + feature.properties.DEPARTAMEN
      + "<br> Provincia: " + feature.properties.PROVINCIA
      + "<br> Población 2024: " + feature.properties.CNPV_24
      + "<br> Nº de Reportes: " + feature.properties.inundacion
      + "<br> Comunidades Afectadas: " + feature.properties.inundaci_1
      + "<br> Familias Afectadas: " + feature.properties.inundaci_2
      + "<br> Viviendas Afectadas: " + feature.properties.inundaci_3
      + "<br> Ha Afectadas: " + feature.properties.inundaci_4
      + "<br> Ganado Afectado: " + feature.properties.inundaci_5
      + "<br> Fallecidos: " + feature.properties.inundaci_6

    );
  }

}

let InundacionV = new L.geoJson(json_inundaciones_videci2025_0, {
  onEachFeature: popupInundaV,
  style: style_inundaciones,
});

// mapas de riesgo

function style_Sequia_Agricola_General_0_0(feature) {
  var context = {
    feature: feature,
    variables: {}
  };
  // Start of if blocks and style check logic
  if (exp_Sequia_Agricola_General_0rule0_eval_expression(context)) {
    return {

      opacity: 1,
      color: 'rgba(35,35,35,1.0)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 1,
      fill: true,
      fillOpacity: 0.5,
      fillColor: 'rgba(112,168,0,1.0)',
      interactive: true,
    };
  }
  else if (exp_Sequia_Agricola_General_0rule1_eval_expression(context)) {
    return {

      opacity: 1,
      color: 'rgba(35,35,35,1.0)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 1,
      fill: true,
      fillOpacity: 0.5,
      fillColor: 'rgba(255,255,115,1.0)',
      interactive: true,
    };
  }
  else if (exp_Sequia_Agricola_General_0rule2_eval_expression(context)) {
    return {

      opacity: 1,
      color: 'rgba(35,35,35,1.0)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 1,
      fill: true,
      fillOpacity: 0.5,
      fillColor: 'rgba(252,176,0,1.0)',
      interactive: true,
    };
  }
  else if (exp_Sequia_Agricola_General_0rule3_eval_expression(context)) {
    return {

      opacity: 1,
      color: 'rgba(35,35,35,1.0)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 1,
      fill: true,
      fillOpacity: 0.5,
      fillColor: 'rgba(255,1,9,1.0)',
      interactive: true,
    };
  }
  else {
    return { fill: false, stroke: false };
  }
}


function popupAgricoGeneral(feature, layer) {
  if (feature.properties && feature.properties.DEPARTAMEN) {
    layer.bindPopup("Departamento: " + feature.properties.DEPARTAMEN
      + "<br> Provincia: " + feature.properties.PROVINCIA_
      + "<br> Municipio: " + feature.properties.MUNICIPIO_

    );
  }

}

var layer_Sequia_Agricola_General_0 = new L.geoJson(json_Sequia_Agricola_General_0, {

  onEachFeature: popupAgricoGeneral,
  style: style_Sequia_Agricola_General_0_0,
});

// sequia meteorologica

function style_Sequia_Meteorologica_General_2_0(feature) {
  var context = {
    feature: feature,
    variables: {}
  };
  // Start of if blocks and style check logic
  if (exp_Sequia_Meteorologica_General_2rule0_eval_expression(context)) {
    return {

      opacity: 1,
      color: 'rgba(35,35,35,1.0)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 1,
      fill: true,
      fillOpacity: 0.5,
      fillColor: 'rgba(112,168,0,1.0)',
      interactive: true,
    };
  }
  else if (exp_Sequia_Meteorologica_General_2rule1_eval_expression(context)) {
    return {

      opacity: 1,
      color: 'rgba(35,35,35,1.0)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 1,
      fill: true,
      fillOpacity: 0.5,
      fillColor: 'rgba(255,255,115,1.0)',
      interactive: true,
    };
  }
  else if (exp_Sequia_Meteorologica_General_2rule2_eval_expression(context)) {
    return {

      opacity: 1,
      color: 'rgba(35,35,35,1.0)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 1,
      fill: true,
      fillOpacity: 0.5,
      fillColor: 'rgba(252,176,0,1.0)',
      interactive: true,
    };
  }
  else if (exp_Sequia_Meteorologica_General_2rule3_eval_expression(context)) {
    return {

      opacity: 1,
      color: 'rgba(35,35,35,1.0)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 1,
      fill: true,
      fillOpacity: 0.5,
      fillColor: 'rgba(245,0,0,1.0)',
      interactive: true,
    };
  }
  else {
    return { fill: false, stroke: false };
  }
}


var layer_Sequia_meteorologica_General_0 = new L.geoJson(json_Sequia_Meteorologica_General_2, {

  onEachFeature: popupAgricoGeneral,
  style: style_Sequia_Meteorologica_General_2_0,
});

//anegamiento

function style_Anegamiento_Hidrologico_General_4_0(feature) {
  var context = {
    feature: feature,
    variables: {}
  };
  // Start of if blocks and style check logic
  if (exp_Anegamiento_Hidrologico_General_4rule0_eval_expression(context)) {
    return {

      opacity: 1,
      color: 'rgba(35,35,35,1.0)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 1,
      fill: true,
      fillOpacity: 0.5,
      fillColor: 'rgba(112,168,0,1.0)',
      interactive: true,
    };
  }
  else if (exp_Anegamiento_Hidrologico_General_4rule1_eval_expression(context)) {
    return {

      opacity: 1,
      color: 'rgba(35,35,35,1.0)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 1,
      fill: true,
      fillOpacity: 0.5,
      fillColor: 'rgba(255,255,115,1.0)',
      interactive: true,
    };
  }
  else if (exp_Anegamiento_Hidrologico_General_4rule2_eval_expression(context)) {
    return {

      opacity: 1,
      color: 'rgba(35,35,35,1.0)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 1,
      fill: true,
      fillOpacity: 0.5,
      fillColor: 'rgba(252,176,0,1.0)',
      interactive: true,
    };
  }
  else if (exp_Anegamiento_Hidrologico_General_4rule3_eval_expression(context)) {
    return {

      opacity: 1,
      color: 'rgba(35,35,35,1.0)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 1,
      fill: true,
      fillOpacity: 0.5,
      fillColor: 'rgba(245,0,0,1.0)',
      interactive: true,
    };
  }
  else {
    return { fill: false, stroke: false };
  }
}

var layer_Anegamiento_Hidrologico_General_4 = new L.geoJson(json_Anegamiento_Hidrologico_General_4, {

  onEachFeature: popupAgricoGeneral,
  style: style_Anegamiento_Hidrologico_General_4_0,
});

/* ==========================
   capas midewetra 
   ========================== */
let PresiDwe = L.tileLayer.wms("https://bolivia.mydewetra.cimafoundation.org/geoserver/dds/wms", {
  layers: "WRF_BOLIVIA_TEST_WRF_BOLIVIA_TEST_72_Native_RAINNC_-_1772755200000_1773014400000",
  format: "image/png",
  transparent: true,
  attribution: "myDEWETRA Bolivia"
});

let tempDwe = L.tileLayer.wms("https://bolivia.mydewetra.cimafoundation.org/geoserver/dds/wms", {
  layers: "WRF_BOLIVIA_TEST_WRF_BOLIVIA_TEST_1_Native_T2_-_1772323200000_1772582400000",
  format: "image/png",
  transparent: true,
  attribution: "myDEWETRA Bolivia"
});


/* ==========================
   Controles de capas 
   ========================== */

document.getElementById("municipios").addEventListener("change", (e) => {
  toggleLayer(municipios, e.target.checked);
});

document.getElementById("climaSenamhi").addEventListener("change", (e) => {
  toggleLayer(climaSenamhi, e.target.checked);
});

document.getElementById("presipita").addEventListener("change", (e) => {
  toggleLayer(PresiDwe, e.target.checked);
});

document.getElementById("temperatura").addEventListener("change", (e) => {
  toggleLayer(tempDwe, e.target.checked);
});

document.getElementById("humedad").addEventListener("change", (e) => {
  toggleLayer(humedadRelativaDwe, e.target.checked);
});


document.getElementById("inunda").addEventListener("change", (e) => {
  toggleLayer(InundacionV, e.target.checked);
});

document.getElementById("SagricoG").addEventListener("change", (e) => {
  toggleLayer(layer_Sequia_Agricola_General_0, e.target.checked);
});

document.getElementById("SmeteorologicaG").addEventListener("change", (e) => {
  toggleLayer(layer_Sequia_meteorologica_General_0, e.target.checked);
});

document.getElementById("AhidrologicoG").addEventListener("change", (e) => {
  toggleLayer(layer_Anegamiento_Hidrologico_General_4, e.target.checked);
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


