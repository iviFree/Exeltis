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
        const estadosUnicos = [...new Set(doctoresData.map(doc => doc.estado).filter(Boolean))];

        estadosUnicos.forEach(estado => {
            const option = document.createElement("option");
            option.value = estado;
            option.textContent = estado;
            selector.appendChild(option);
        });

        selector.addEventListener("change", () => {
            const estadoSeleccionado = selector.value;
            mostrarDoctoresPorEstado(estadoSeleccionado);
        });
    } catch (error) {
        console.error("Error al cargar el JSON:", error);
    }
});

function mostrarDoctoresPorEstado(estado) {
    const contenedor = document.querySelector(".addressBookContainer");
    contenedor.innerHTML = "";
    const doctores = doctoresData.filter(doc => doc.estado === estado);
    doctores.forEach((doc, index) => {
        const nombre = doc.nombre ? String(doc.nombre).trim() : "";
        const especialidad = doc.especialidad ? String(doc.especialidad).trim() : "";
        const cedula = doc.cedula ? String(doc.cedula).trim() : "";
        const direccion = doc.direccion ? String(doc.direccion).trim() : "";
        const email = doc.email ? String(doc.email).trim() : "";
        const consultorio = doc.consultorio ? String(doc.consultorio).trim() : "";
        const movil = doc.movil ? String(doc.movil).trim() : "";
        const imagen = doc.imagen ? String(doc.imagen).trim() : "";
        const item = document.createElement("div");
        item.className = "col-12 col-sm-12 col-md-12 col-lg-9 col-xl-8 col-xxl-7 mx-auto";
        item.innerHTML = `
        <div class="row addressBookItem">
            <div class="col-11 col-sm-11 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
                <img src="../img/medicos/${imagen}" alt="${nombre}" />
            </div>
            <div class="col-11 col-sm-11 col-md-8 col-lg-9 col-xl-9 col-xxl-9">
                <h3>Nombre: <span>${nombre}</span></h3>
                <p>Especialidad: <span>${especialidad}</span></p>
                <p>Cédula Profesional: <span>${cedula}</span></p>
                <p>Dirección: 
                <a href="https://www.google.com/maps/search/${encodeURIComponent(direccion)}" target="_blank">
                    <span>${direccion}</span>
                </a>
                </p>
                <p>Correo Electrónico: 
                <a href="mailto:${email}">
                    <span>${email}</span>
                </a>
                </p>
                <p>Teléfono de consultorio: 
                <a href="tel:${consultorio}">
                    <span>${consultorio}</span>
                </a>
                </p>
                <p>Teléfono móvil: 
                <a href="tel:${movil}">
                    <span>${movil}</span>
                </a>
                </p>
            </div>    
        </div>
        `;
        contenedor.appendChild(item);
    });
}