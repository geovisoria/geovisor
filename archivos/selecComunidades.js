const municipioSelect = document.getElementById("municipioSelect");
const municipioSearch = document.getElementById("municipioSearch");

// Inicializar mapa
let comunidadesLayer = L.layerGroup().addTo(map);

// --- 1. Obtener lista única de pares Departamento+Municipio ---
const municipiosDeptos = [
  ...new Set(
    json_comunidades_0.features.map(
      f => `${f.properties.Departamento}, ${f.properties.Municipio}`
    )
  )
];

// --- 2. Rellenar select con "Departamento, Municipio" ---
function rellenarSelect(lista) {
  municipioSelect.innerHTML = '<option value="">Elija un municipio</option>';
  lista.forEach(dm => {
    const option = document.createElement("option");
    option.value = dm;
    option.textContent = dm;
    municipioSelect.appendChild(option);
  });
}
rellenarSelect(municipiosDeptos);

// --- 3. Filtrar opciones según búsqueda ---
municipioSearch.addEventListener("input", () => {
  const texto = municipioSearch.value.toLowerCase();
  const filtrados = municipiosDeptos.filter(dm =>
    dm.toLowerCase().includes(texto)
  );
  rellenarSelect(filtrados);
});

// --- 4. Evento al cambiar municipio ---
municipioSelect.addEventListener("change", () => {
  const seleccion = municipioSelect.value;
  if (!seleccion) return;

  const [departamento, municipio] = seleccion.split(",").map(s => s.trim());

  const comunidades = json_comunidades_0.features.filter(
    f => f.properties.Municipio === municipio && f.properties.Departamento === departamento
  );

  comunidadesLayer.clearLayers();
  comunidades.forEach(c => {
    const coords = c.geometry.coordinates;
    L.circleMarker([coords[1], coords[0]], {
      radius: 8,
      color: "#00ff00",
      weight: 2,
      fillColor: "#00ff00",
      fillOpacity: 0.7
    }).addTo(comunidadesLayer)
      .bindPopup(`<b>${c.properties.Comunidad}</b><br>${c.properties.Municipio}, ${c.properties.Departamento}`);
  });

  if (comunidades.length > 0) {
    const bounds = L.latLngBounds(
      comunidades.map(c => [c.geometry.coordinates[1], c.geometry.coordinates[0]])
    );
    map.fitBounds(bounds, { padding: [50, 50] });
  }
});