
let map = L.map('map').setView([-16.2588034, -64.9609351], 6);


    let openStreet = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    let imagen = L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}');

    let carto = L.tileLayer('https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png');
     let cartoL = L.tileLayer('https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png');
     let esri = L.tileLayer ('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}')

/* ==========================
   Estilos y capas
   ========================== */
   function style_Videci(feature) {
      if (feature.properties['Familias Afectadas'] >= 0.000000 && feature.properties['Familias Afectadas'] <= 0.000000) {
        return {
          opacity: 1,
          color: 'rgba(35,35,35,1.0)',
          dashArray: '',
          lineCap: 'butt',
          lineJoin: 'miter',
          weight: 1.0,
          fill: true,
          fillOpacity: 0.5,
          fillColor: 'rgba(11,121,55,1.0)',
          interactive: true,
        }
      }
      if (feature.properties['Familias Afectadas'] >= 0.000000 && feature.properties['Familias Afectadas'] <= 16.000000) {
        return {
          opacity: 1,
          color: 'rgba(35,35,35,1.0)',
          dashArray: '',
          lineCap: 'butt',
          lineJoin: 'miter',
          weight: 1.0,
          fill: true,
          fillOpacity: 0.5,
          fillColor: 'rgba(112,242,36,1.0)',
          interactive: true,
        }
      }
      if (feature.properties['Familias Afectadas'] >= 16.000000 && feature.properties['Familias Afectadas'] <= 174.000000) {
        return {
          opacity: 1,
          color: 'rgba(35,35,35,1.0)',
          dashArray: '',
          lineCap: 'butt',
          lineJoin: 'miter',
          weight: 1.0,
          fill: true,
          fillOpacity: 0.5,
          fillColor: 'rgba(250,246,5,1.0)',
          interactive: true,
        }
      }
      if (feature.properties['Familias Afectadas'] >= 174.000000 && feature.properties['Familias Afectadas'] <= 583.000000) {
        return {
          opacity: 1,
          color: 'rgba(35,35,35,1.0)',
          dashArray: '',
          lineCap: 'butt',
          lineJoin: 'miter',
          weight: 1.0,
          fill: true,
          fillOpacity: 0.5,
          fillColor: 'rgba(255,137,33,1.0)',
          interactive: true,
        }
      }
      if (feature.properties['Familias Afectadas'] >= 583.000000 && feature.properties['Familias Afectadas'] <= 5624.000000) {
        return {
          opacity: 1,
          color: 'rgba(35,35,35,1.0)',
          dashArray: '',
          lineCap: 'butt',
          lineJoin: 'miter',
          weight: 1.0,
          fill: true,
          fillOpacity: 0.5,
          fillColor: 'rgba(246,7,31,1.0)',
          interactive: true,
        }
      }
    }


    function style_cuencas_alerta17_12_2025_1_0() {
      return {
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1.0,
        fill: true,
        fillOpacity: 0.5,
        fillColor: 'rgba(245,6,44,1.0)',
        interactive: true,
      }
    }

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

function popupVideci(feature, layer) {
  if (feature.properties && feature.properties.Departamento) {
    layer.bindPopup("Departamento: " + feature.properties.Departamento
      + "<br> Provincia: " + feature.properties.Provincia
      + "<br> Municipio: " + feature.properties.Municipio
      + "<br> Fecha Reporte: " + feature.properties["Fecha Reporte"]
      + "<br> Comunidades: " + feature.properties.Comunidades
      + "<br> Evento: " + feature.properties.Evento
      + "<br> Familias Afectadas: " + feature.properties["Familias Afectadas"]
      + "<br> Familias Damnificadas: " + feature.properties["Familias Damnificadas"]
      + "<br> Total Familias: " + feature.properties["Total Familias"]
      + "<br> Viviendas Afectadas: " + feature.properties["Viviendas Afectadas"]
      + "<br> Viviendas Destruidas: " + feature.properties["Viviendas Destruidas"]
      + "<br> Ha Afectadas: " + feature.properties["Ha Afectadas"]
      + "<br> Ha Perdidas: " + feature.properties["Ha Perdidas"]
      + "<br> Ganado Afectado: " + feature.properties["Ganado Afectado"]
      + "<br> Ganado Perdido: " + feature.properties["Ganado Perdido"]
      + "<br> Fallecidos: " + feature.properties.Fallecidos
      + "<br> Desaparecidos: " + feature.properties.Desaparecidos
      + "<br> Evacuados: " + feature.properties.Evacuados
      + "<br> EDAN: " + feature.properties.EDAN
      + "<br> Declaratoria de Desastre: " + feature.properties["Declaratoria de Desastre"]
      + "<br> Declaratoria de Emergencia: " + feature.properties["Declaratoria de Emergencia"]
      + "<br> Tipo de Documento: " + feature.properties["Tipo de Documento"]
    );
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


function popupCuencas(feature, layer) {
  if (feature.properties && feature.properties.Nombre_UH) {
    layer.bindPopup("Nombre: " + feature.properties.Nombre_UH
      + "<br> Municipio: " + feature.properties.Area_km2

    )
    
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
 



const Videci = L.geoJSON(json_capas4326_1, {
  style: style_Videci,
  onEachFeature: popupVideci,
});

const cuencas = L.geoJSON(json_cuencas_alerta17_12_2025_1, {
  style: style_cuencas_alerta17_12_2025_1_0,
  onEachFeature: popupCuencas,

});

const municipios = L.geoJSON(json_municipios_0 , {
 style: style_municipios_0_0,
 onEachFeature: popupMunis,
}).addTo(map);


/* ==========================
   Controles de capas 
   ========================== */

document.getElementById("layerVideci").addEventListener("change", (e) => {
  toggleLayer(Videci, e.target.checked);
});

document.getElementById("cuencas").addEventListener("change", (e) => {
  toggleLayer(cuencas, e.target.checked);
});
document.getElementById("municipios").addEventListener("change", (e) => {
  toggleLayer(municipios, e.target.checked);
});

document.getElementById("climaSenamhi").addEventListener("change", (e) => {
  toggleLayer(climaSenamhi, e.target.checked);
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

 // Escala
    L.control.scale().addTo(map);


