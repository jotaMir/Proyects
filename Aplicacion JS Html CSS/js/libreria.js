function precargarDatos() {
  //4 empresas precargadas - lineas de carga
  let empresa1 = new Empresa("akatoen", "Katoen1234", "Katoen SA", "1.jpg", 1);
  let empresa2 = new Empresa(
    "bklassen",
    "Klassen1234",
    "Klassen srl",
    "2.jpg",
    2
  );
  let empresa3 = new Empresa("aperez", "Perez1234", "Perez SA", "3.jpg", 3);
  let empresa4 = new Empresa(
    "jmiranda",
    "Miranda1234",
    "Miranda srl",
    "4.jpg",
    4
  );

  arrayUsuariosEmpresa.push(empresa1, empresa2, empresa3, empresa4);

  //4 viajes precargados empresas  constructor(unNombreBuque, unaCantidadMax, unIdEmpresa, unaFechaLlegada, unIdAutonumerico)

  let viaje1 = new ViajeEmpresa("Portacontenedores", 100, 1, 20221104, 1);
  let viaje2 = new ViajeEmpresa("Bulkcarrier", 150, 2, 20221210, 2);
  let viaje3 = new ViajeEmpresa("BCordoba", 120, 3, 20221215, 3);
  let viaje4 = new ViajeEmpresa("Car-Carrier", 110, 1, 20221220, 4);

  arrayViajesEmpresa.push(viaje1, viaje2, viaje3, viaje4);

  //5 importadores precargados
  let importador1 = new UsuarioImportador(
    "fcolombi",
    "Colombi1234",
    "Colombi SA",
    "5.jpg",
    true,
    1,
    0
  );
  let importador2 = new UsuarioImportador(
    "fpagani",
    "Pagani1234",
    "Pagani SA",
    "6.jpg",
    true,
    2,
    0
  );
  let importador3 = new UsuarioImportador(
    "akuster",
    "Kuster1234",
    "Kuster SA",
    "7.jpg",
    true,
    3,
    0
  );
  let importador4 = new UsuarioImportador(
    "mnacimento",
    "Nacimento1234",
    "Nacimento SA",
    "8.jpg",
    false,
    4,
    0
  );
  let importador5 = new UsuarioImportador(
    "gbillino",
    "Billino1234",
    "Billino SA",
    "9.jpg",
    true,
    5,
    0
  );

  arrayUsuariosImportador.push(
    importador1,
    importador2,
    importador3,
    importador4,
    importador5
  );

  //5 solicitudes de carga importador precargados
  let solicitudImportador1 = new SolicitudesCargaImportador(
    "carga_general",
    "Zapatos",
    "Buenos Aires",
    10,
    1,
    1,
    1
  );
  let solicitudImportador2 = new SolicitudesCargaImportador(
    "refrigerado",
    "Ropa",
    "San Pablo",
    15,
    2,
    2,
    2
  );
  let solicitudImportador3 = new SolicitudesCargaImportador(
    "carga_peligrosa",
    "Accesorios para mascotas",
    "Barcelona",
    20,
    3,
    3,
    3
  );
  let solicitudImportador4 = new SolicitudesCargaImportador(
    "carga_general",
    "Electrodomésticos",
    "Buenos Aires",
    30,
    4,
    4,
    4
  );
  let solicitudImportador5 = new SolicitudesCargaImportador(
    "refrigerado",
    "Muebles",
    "Rio de Janeiro",
    40,
    2,
    5,
    5
  );

  arrayViajesSolicitudesImportador.push(
    solicitudImportador1,
    solicitudImportador2,
    solicitudImportador3,
    solicitudImportador4,
    solicitudImportador5
  );
}

function validarCamposVaciosRegistro(usuario, clave, nombre, foto) {
  let campoValido = false;
  if (usuario != "" && clave != "" && nombre != "" && foto != "") {
    campoValido = true;
  }
  return campoValido;
}

function confirmacionFormatoSenia(senia) {
  let validacion = false;

  let contadorMayusculas = 0;
  let contadorMinusculas = 0;
  let contadorNumeros = 0;

  for (i = 0; i < senia.length; i++) {
    if (senia.charCodeAt(i) >= 97 && senia.charCodeAt(i) < 123) {
      contadorMinusculas = contadorMinusculas + 1;
    }
    if (senia.charCodeAt(i) >= 65 && senia.charCodeAt(i) < 90) {
      contadorMayusculas = contadorMayusculas + 1;
    }
    if (senia.charCodeAt(i) >= 47 && senia.charCodeAt(i) < 58) {
      contadorNumeros = contadorNumeros + 1;
    }

    if (
      contadorMayusculas >= 1 &&
      contadorMinusculas >= 1 &&
      contadorNumeros >= 1 &&
      senia.length >= 5
    ) {
      validacion = true;
    }
  }
  return validacion;
}

function buscarElemento(arrElementos, propiedad, busqueda) {//RETORNA SI EXISTE EL ELEMENTO (TRUE OR FALSE)
  let existe = false;
  for (let i = 0; i < arrElementos.length; i++) {
    const unElemento = arrElementos[i];
    if (unElemento[propiedad] === busqueda) {
      existe = true;
      break;
    }
  }
  return existe;
}

function obtenerObjeto(arrElementos, propiedad, busqueda) {//RETORNA EL OBJETO DE LA BUSQUEDA
  let objeto = null;
  for (let i = 0; i < arrElementos.length; i++) {
    const unElemento = arrElementos[i];
    if (unElemento[propiedad] === busqueda) {
      objeto = unElemento;
      break;
    }
  }
  return objeto;
}

function ocultarSecciones() {
  let secciones = document.querySelectorAll(".seccion");

  for (let i = 0; i < secciones.length; i++) {
    secciones[i].style.display = "none";
  }
}

function validarCamposVaciosCreacionCarga(
  tipoMercaderia,
  descripcionMercaderia,
  puertoOrigen,
  cantidadContenedores,
  idEmpresa
) {
  let campoValido = false;
  if (
    tipoMercaderia != "" &&
    descripcionMercaderia != "" &&
    puertoOrigen != "" &&
    cantidadContenedores != "" &&
    idEmpresa != -1 &&
    cantidadContenedores > 0
  ) {
    campoValido = true;
  }
  return campoValido;
}

function validarCamposVaciosCrearViaje(
  nombreBuque,
  cantidadMaxContenedores,
  fecha
) {
  let campoValido = false;
  if (
    nombreBuque != "" &&
    cantidadMaxContenedores != "" &&
    fecha != "" &&
    cantidadMaxContenedores > 0
  ) {
    campoValido = true;
  }
  return campoValido;
}

function mostrarFechaHoy() {
  let fecha = new Date();

  let anio = fecha.getFullYear();
  let mes = fecha.getMonth() + 1;

  if (mes < 10) {
    mes = `0${mes}`;
  }

  let dia = fecha.getDate();
  let mifecha = `${anio}${mes}${dia}`;

  return Number(mifecha);
}

function cargarFecha(fecha) {
  fecha = fecha.replace("-", "");
  fecha = fecha.replace("-", "");
  return Number(fecha);
}

function cargarIdVIajes() {
  //Parte III empresa
  document.querySelector(
    "#slcAsignarViajeEmpresa"
  ).innerHTML = `<option value="-1">Seleccione un Viaje...</option>`;
  for (let i = 0; i < arrayViajesEmpresa.length; i++) {
    const unViaje = arrayViajesEmpresa[i];

    if (fechaHoy < unViaje.fechaLlegada) {
      document.querySelector(
        "#slcAsignarViajeEmpresa"
      ).innerHTML += `<option value="${unViaje.idAutonumerico}"> Buque: ${unViaje.nombreBuque} - Cantidad de contenedores: ${unViaje.cantidadMax} - Fecha de llegada: ${unViaje.fechaLlegada} </option>`;
    }
  }
}

function armarListaAsignarSolicitudesCarga() {
  //Parte III empresa

  let usuarioEmpresa = obtenerObjeto(arrayUsuariosEmpresa, "usuario", usuario);

  let idEmpresa = usuarioEmpresa.id;

  document.querySelector("#tblSolicitudesDeCarga").innerHTML = "";

  for (let i = 0; i < arrayViajesSolicitudesImportador.length; i++) {
    if (
      arrayViajesSolicitudesImportador[i].estado === "Pendiente" &&
      idEmpresa === arrayViajesSolicitudesImportador[i].idEmpresa
    ) {
      let nombreImportador = obtenerObjeto(
        arrayUsuariosImportador,
        "id",
        arrayViajesSolicitudesImportador[i].idImportador
      ).nombre;

      document.querySelector("#tblSolicitudesDeCarga").innerHTML += `<tr>
     

     <td>${arrayViajesSolicitudesImportador[i].tipoMercaderia}</td>
     
     <td>${arrayViajesSolicitudesImportador[i].descripcionMercaderia}</td>
     
     <td>${arrayViajesSolicitudesImportador[i].puerto}</td>
     
     <td>${arrayViajesSolicitudesImportador[i].cantidadContenedores}</td>
     
     <td>${nombreImportador}</td>
    
     <td>${arrayViajesSolicitudesImportador[i].estado}</td>

      <td><input type="button" value="ASIGNAR" data-idSolicitud="${arrayViajesSolicitudesImportador[i].idSolicitud}" class="btnAsignar"></td>
      </tr>`;
    } else {
    }
  }
  let btnsAsignar = document.querySelectorAll(".btnAsignar");
  for (let i = 0; i < btnsAsignar.length; i++) {
    btnsAsignar[i].addEventListener("click", asignarSolicitudDeCargaEmpresa);
  }
}

function filtrarImportadoresHabilitados() {
  //para asignar solicitudes parte 2 empresa

  for (let i = 0; i < arrayUsuariosImportador.length; i++) {
    const unUsuario = arrayUsuariosImportador[i];

    if (unUsuario.habilitado === true) {
      arrayUsuariosImportadorHabilitados.push(arrayUsuariosImportador[i]);
    }
  }
}

function controlarImportadorHabilitado(id) {
  let estaHabilitado = false;

  for (let i = 0; i < arrayUsuariosImportadorHabilitados.length; i++) {
    if (id === arrayUsuariosImportadorHabilitados[i].id) {
      estaHabilitado = true;

      break;
    }
  }

  return estaHabilitado;
}

function cargarIdVIajesManifiesto() {
  //Para asignar viaje de un buque EMPRESA
  document.querySelector(
    "#slcListarManifiestoViajeEmpresa"
  ).innerHTML = `<option value="-1">Seleccione un Viaje...</option>`;
  for (let i = 0; i < arrayViajesEmpresa.length; i++) {
    const unViaje = arrayViajesEmpresa[i];
    if (fechaHoy < unViaje.fechaLlegada) {
      document.querySelector(
        "#slcListarManifiestoViajeEmpresa"
      ).innerHTML += `<option value="${unViaje.idAutonumerico}"> Buque: ${unViaje.nombreBuque} - Cantidad de contenedores: ${unViaje.cantidadMax} - Fecha de llegada: ${unViaje.fechaLlegada} </option>`;
    }
  }
}

function capturarImportador(id) {
  let objetoImportador = obtenerObjeto(arrayUsuariosImportador, "id", id);

  let nombreImportador = objetoImportador.nombre;

  return nombreImportador;
}

function cargarIdVIajesRollover() {
  //parte 4 empresa

  document.querySelector(
    "#slcidViajesParaListarRollover"
  ).innerHTML = `<option value="-1">Seleccione un Viaje...</option>`;
  for (let i = 0; i < arrayViajesEmpresa.length; i++) {
    const unViaje = arrayViajesEmpresa[i];
    if (fechaHoy < unViaje.fechaLlegada) {
      document.querySelector(
        "#slcidViajesParaListarRollover"
      ).innerHTML += `<option value="${unViaje.idAutonumerico}"> Buque: ${unViaje.nombreBuque} - Cantidad de contenedores: ${unViaje.cantidadMax} - Fecha de llegada: ${unViaje.fechaLlegada} </option>`;
    }
  }
}

function cargarIdVIajesReAsignarRollover(idViajeSeleccionado) {
  //parte 4 empresa

  document.querySelector(
    "#slcidViajesParaRollover"
  ).innerHTML = `<option value="-1">Seleccione un Viaje...</option>`;
  for (let i = 0; i < arrayViajesEmpresa.length; i++) {
    const unViaje = arrayViajesEmpresa[i];
    if (
      fechaHoy < unViaje.fechaLlegada &&
      idViajeSeleccionado !== arrayViajesEmpresa[i].idAutonumerico
    ) {
      document.querySelector(
        "#slcidViajesParaRollover"
      ).innerHTML += `<option value="${unViaje.idAutonumerico}"> Buque: ${unViaje.nombreBuque} - Cantidad de contenedores: ${unViaje.cantidadMax} - Fecha de llegada: ${unViaje.fechaLlegada} </option>`;
    }
  }
}

function armarListaImportadoresDeshabilitados() {
  //Parte 6 empresa

  let usuarioEmpresa = obtenerObjeto(arrayUsuariosEmpresa, "usuario", usuario);

  let idEmpresa = usuarioEmpresa.id;

  document.querySelector("#tblListarImportadoresDeshabilitados").innerHTML = "";

  for (let i = 0; i < arrayViajesSolicitudesImportador.length; i++) {
    let nombreImportador = capturarImportador(
      arrayViajesSolicitudesImportador[i].idImportador
    );

    if (
      arrayViajesSolicitudesImportador[i].estado === "CANCELADA" &&
      idEmpresa === arrayViajesSolicitudesImportador[i].idEmpresa
    ) {
      document.querySelector(
        "#tblListarImportadoresDeshabilitados"
      ).innerHTML += `<tr>
     

      <td>${nombreImportador}</td>
     
     <td>${arrayViajesSolicitudesImportador[i].descripcionMercaderia}</td>
     
     <td>${arrayViajesSolicitudesImportador[i].tipoMercaderia}</td>
     
     <td>${arrayViajesSolicitudesImportador[i].estado}</td>

      <td><input type="button" value="IGNORAR" data-idSolicitudIgnorar="${arrayViajesSolicitudesImportador[i].idSolicitud}" class="btnIgnorar"></td>
      </tr>`;
    } else {
    }
  }
  let btnsIgnorar = document.querySelectorAll(".btnIgnorar");
  for (let i = 0; i < btnsIgnorar.length; i++) {
    btnsIgnorar[i].addEventListener("click", habilitarImportadoresEmpresa);
  }
}

function cargarIdVIajesCargaPeligrosa() {
  //parte 7 empresa

  document.querySelector(
    "#slcListarViajes"
  ).innerHTML = `<option value="-1">Seleccione un Viaje...</option>`;
  for (let i = 0; i < arrayViajesEmpresa.length; i++) {
    const unViaje = arrayViajesEmpresa[i];
    if (fechaHoy < unViaje.fechaLlegada) {
      document.querySelector(
        "#slcListarViajes"
      ).innerHTML += `<option value="${unViaje.idAutonumerico}"> Buque: ${unViaje.nombreBuque} - Cantidad de contenedores: ${unViaje.cantidadMax} - Fecha de llegada: ${unViaje.fechaLlegada} </option>`;
    }
  }
}
