var showMenu = function (e) {
    $('#menuMobile').animate({ "right": '+=100%' });
    event.preventDefault();
}
var hideMenu = function (e) {
    $('#menuMobile').animate({ "right": '-=100%' });
    event.preventDefault();
}
var preventDefault = function (e) {
    event.preventDefault();
}
var closeModal= function(modalId) {
  $('#' + modalId).modal('hide');
}
$(document).ready(function() {
    $('#exitButton').click(function() {
      var url = $(this).data('url');
      window.open(url, '_blank');
      closeModal('leavingModal');
    });
});
  
const DOCTORES_JSON_URL = "../js/data.json";
let doctoresData = [];

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(DOCTORES_JSON_URL);
    doctoresData = await response.json();

    const selector = document.getElementById("selectorEstado");

    // Estados únicos y ordenados (locale ES)
    const estadosUnicos = [...new Set(
      doctoresData
        .map(doc => (doc.estado ?? "").toString().trim())
        .filter(Boolean)
    )];
    const collator = new Intl.Collator("es", { sensitivity: "base" });
    estadosUnicos.sort(collator.compare);

    estadosUnicos.forEach(estado => {
      const option = document.createElement("option");
      option.value = estado;
      option.textContent = estado;
      selector.appendChild(option);
    });

    selector.addEventListener("change", () => {
      const estadoSeleccionado = selector.value;
      if (!estadoSeleccionado || selector.selectedIndex === 0) return;
      mostrarDoctoresPorEstado(estadoSeleccionado);
    });
  } catch (error) {
    console.error("Error al cargar el JSON:", error);
  }
});

function telHref(value) {
  // Convierte a string y quita cualquier caracter no numérico
  const digits = (value ?? "").toString().replace(/\D+/g, "");
  return digits ? `tel:${digits}` : "";
}

function mostrarDoctoresPorEstado(estado) {
  const contenedor = document.querySelector(".addressBookContainer");
  contenedor.innerHTML = "";

  const doctores = doctoresData.filter(
    doc => (doc.estado ?? "").toString().trim() === estado
  );

  doctores.forEach((doc) => {
    const nombre = (doc.nombre ?? "").toString().trim();
    const especialidad = (doc.especialidad ?? "").toString().trim();
    const cedula = (doc.cedula ?? "").toString().trim();
    const direccion = (doc.direccion ?? "").toString().trim();
    const municipio = (doc.municipio ?? "").toString().trim();
    const email = (doc.email ?? "").toString().trim();
    const consultorio = (doc.consultorio ?? "").toString().trim();
    const extension = (doc.extension ?? "").toString().trim();
    const imagen = (doc.imagen ?? "").toString().trim();

    // Span de Extensión solo si hay dato
    const extensionHTML = extension ? `<span> Extensión: ${extension}</span>` : "";

    const emailHTML = email
      ? `<a href="mailto:${email}"><span>${email}</span></a>`
      : `<span>No disponible</span>`;

    const consultorioHref = telHref(consultorio);
    const consultorioHTML = consultorio
      ? `<a href="${consultorioHref}"><span>${consultorio}</span></a>`
      : `<span>No disponible</span>`;


    const item = document.createElement("div");
    item.className = "col-12 col-sm-12 col-md-12 col-lg-9 col-xl-8 col-xxl-7 mx-auto";
    item.innerHTML = `
      <div class="row addressBookItem d-flex align-items-center">
        <div class="col-11 col-sm-11 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
          <img src="../img/medicos/${imagen}" alt="${nombre}" />
        </div>
        <div class="col-11 col-sm-11 col-md-8 col-lg-9 col-xl-9 col-xxl-9">
          <h3><span>${nombre}.</span></h3>
          <p>Especialidad: <span>${especialidad}.</span></p>
          <p>Cédula Profesional: <span>${cedula}.</span></p>
          <p>Dirección:
            <a href="https://www.google.com/maps/search/${encodeURIComponent(`${direccion} ${municipio}, ${estado}`)}" target="_blank">
              <span>${direccion} ${municipio}, ${estado}</span>
            </a>.
          </p>
          <p>Correo Electrónico: ${emailHTML}</p>
          <p>Teléfono de consultorio: ${consultorioHTML}.${extensionHTML}</p>
        </div>
      </div>
    `;
    contenedor.appendChild(item);
  });
}
