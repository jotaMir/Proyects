window.addEventListener("load", inicio);

//VARIABLES GLOBALES

let arrayUsuariosImportador = [];
let arrayUsuariosImportadorHabilitados = [];
let arrayUsuariosEmpresa = [];
let arrayViajesSolicitudesImportador = [];
let arrayViajesEmpresa = [];
let usuarioLogueado = null;
let fechaHoy = mostrarFechaHoy();
let usuario; // Se carga en el inicio de sesion y se usa en todo el código
let cantidadContenedoresDisponibles = 0; //dato


//FUNCION DE INICIO

function inicio() {
  //FUNCIONES PARA PRECARGAR INFORMACIÓN

  precargarDatos();
  ocultarSecciones();
  filtrarImportadoresHabilitados(); 
  document.querySelector("#cabezal").style.display = "none";

  //REGISTRO E INICIO DE SESIÓN

  document
    .querySelector("#btnRegistrarImportador")
    .addEventListener("click", registroNuevoImportador);
  document
    .querySelector("#btnIngresarUsuario")
    .addEventListener("click", inicioSesion);

  // BOTONES NAVEGACION IMPORTADOR

  document
    .querySelector("#btnCerrarSesionImportador")
    .addEventListener("click", mostrarSeccion);
  document
    .querySelector("#btnCerrarSesionPlataformaEmpresa")
    .addEventListener("click", mostrarSeccion);
  document
    .querySelector("#btnCrearNuevaSolicitudImportador")
    .addEventListener("click", mostrarSeccion);
  document
    .querySelector("#btnConsultaSolicitudesImportador")
    .addEventListener("click", mostrarSeccion);
  document
    .querySelector("#btnVisualizarInformacionImportador")
    .addEventListener("click", mostrarSeccion);

  // BOTONES NAVEGACION EMPRESA

  document
    .querySelector("#btnCrearNuevoViajeEmpresa")
    .addEventListener("click", mostrarSeccion);
  document
    .querySelector("#btnAsignarSolicitudParaEmpresa")
    .addEventListener("click", mostrarSeccion);
  document
    .querySelector("#btnRolloverParaEmpresa")
    .addEventListener("click", mostrarSeccion);
  document
    .querySelector("#btnManifiestoDeCargaParaEmpresa")
    .addEventListener("click", mostrarSeccion);
  document
    .querySelector("#btnHabilitarImportadoresParaEmpresa")
    .addEventListener("click", mostrarSeccion);
  document
    .querySelector("#btnCargaPeligrosaParaEmpresa")
    .addEventListener("click", mostrarSeccion);

  // BOTONES PARA NAVEGACION PANTALLA INICIO

  document
    .querySelector("#btnAtrasLogin")
    .addEventListener("click", mostrarSeccion);
  document
    .querySelector("#btnAtrasRegistro")
    .addEventListener("click", mostrarSeccion);

  let botones = document.querySelectorAll(".btnInicio");

  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", mostrarSeccion);
  }
  mostrarBotones("user");

  //BOTONES PARA FUNCIONALIDADES EMPRESA

  document
    .querySelector("#btnCrearViajeEmpresa")
    .addEventListener("click", crearViajeEmpresa);

    document
    .querySelector("#btnListarManifiestoEmpresa")
    .addEventListener("click", listarManifiestoDeCarga);

    document
    .querySelector("#btnRolloverEmpresa").addEventListener("click", listarRolloverEmpresa);

    document.querySelector("#btnListarCargaPeligrosaEmpresa").addEventListener("click",cargaPeligrosaEmpresa);

  //BOTONES PARA FUNCIONALIDADES IMPORTADOR

  document
    .querySelector("#btnCrearCargaImportador")
    .addEventListener("click", solicitudDeCargaImportador);

  document
    .querySelector("#btnConsultaSolicitudesPendientes")
    .addEventListener("click", busquedaSolicitudesPendientesImportador);

    document
    .querySelector("#btnInformacionEstadisticaImportador")
    .addEventListener("click", mostrarInformacionEstadísticaImportador);
}

//________________________________________________________________________________________________________________

//REGISTRO DE UN NUEVO IMPORTADOR

function registroNuevoImportador() {
  let mensaje = "";
  let nombreUsuario = document.querySelector("#txtRegistroUsuarioImportador").value.toLowerCase()
  let senia = document.querySelector(
    "#txtContraseniaaRegistroImportador"
  ).value;
  let nombreImportador = document.querySelector(
    "#txtNombreRegistroImportador"
  ).value;
  let foto = document.querySelector("#fotoPerfilImportadorRegistro").value;
  let nombreFoto = foto.substring(foto.lastIndexOf("\\") + 1);

  if (
    validarCamposVaciosRegistro(nombreUsuario, senia, nombreImportador, foto)
  ) {
    if (confirmacionFormatoSenia(senia)) {
      if (
        !buscarElemento(arrayUsuariosImportador, "usuario", nombreUsuario) &&
        !buscarElemento(arrayUsuariosEmpresa, "usuario", nombreUsuario)
      ) {
        let usuario = new UsuarioImportador(
          nombreUsuario,
          senia,
          nombreImportador,
          nombreFoto,
          true,
          arrayUsuariosImportador.length + 1,
          0
        );
        arrayUsuariosImportador.push(usuario);

        alert("Registro exitoso!");
        document.querySelector("#txtNombreRegistroImportador").value = "";
        document.querySelector("#txtRegistroUsuarioImportador").value = "";
        document.querySelector("#txtContraseniaaRegistroImportador").value = "";
        document.querySelector("#fotoPerfilImportadorRegistro").value = "";
      } else {
        alert("Ya existe un usuario con ese nombre")
      }
    } else {
      alert("Formato de contraseña incorrecto")
    }
  } else {
    alert("Los campos no pueden estar vacíos")
  }
}

//________________________________________________________________________________________________________________

//INICIAR SESION

function inicioSesion() {
  usuario = document.querySelector("#txtIngresoUsuario").value.toLowerCase()
  let senia = document.querySelector("#txtIngresoContrasenia").value;

  let login = verificarLogin(usuario, senia);
  let esImportador = buscarElemento(
    arrayUsuariosImportador,
    "usuario",
    usuario
  );

  let usuarioLogueadoImportador = obtenerObjeto(
    arrayUsuariosImportador,
    "usuario",
    usuario
  );
  let usuarioLogueadoEmpresa = obtenerObjeto(
    arrayUsuariosEmpresa,
    "usuario",
    usuario
  );

  if (login) {
    if (esImportador) {
      document.querySelector(
        "#pfotoPerfil"
      ).innerHTML = `<img src="img/${usuarioLogueadoImportador.foto}" width="100"">`;
      document.querySelector("#nombreUsuarioLogueado").innerHTML =
        usuarioLogueadoImportador.nombre;

      document.querySelector("#seccionInicioSesion").style.display = "none";
      document.querySelector("#cabezal").style.display = "block";
      mostrarBotones("btnImportador");
    } else {
      document.querySelector(
        "#pfotoPerfil"
      ).innerHTML = `<img src="img/${usuarioLogueadoEmpresa.foto}" width="100"">`;
      document.querySelector("#nombreUsuarioLogueado").innerHTML =
        usuarioLogueadoEmpresa.nombre;

      document.querySelector("#seccionInicioSesion").style.display = "none";
      document.querySelector("#cabezal").style.display = "block";
      mostrarBotones("btnEmpresa");

    }
    document.querySelector("#txtIngresoUsuario").value = "";
    document.querySelector("#txtIngresoContrasenia").value = "";
  } else {
   alert("Usuario y/o contraseña incorrectos")
  }
}

//________________________________________________________________________________________________________________

//Pare verificar que el usuario exista y loguearse

function verificarLogin(nomUsuario, clave) {
  let resultado = false;
  let unUsuario = obtenerObjeto(arrayUsuariosImportador, "usuario", nomUsuario); //recorre array importador
  if (unUsuario !== null) {
    if (unUsuario.senia === clave) {
      usuarioLogueado = unUsuario;
      resultado = true;
    }
  }
  let unUsuarioEmpresa = obtenerObjeto(
    arrayUsuariosEmpresa,
    "usuario",
    nomUsuario
  ); //recorre array empresa
  if (unUsuarioEmpresa !== null) {
    if (unUsuarioEmpresa.senia === clave) {
      usuarioLogueado = unUsuario;
      resultado = true;
    }
  }
  return resultado;
}

//________________________________________________________________________________________________________________

//FUNCIONALIDADES PARA LOS MENU IMPORTADOR Y EMPRESA
//_______________________________________________________________________________________________________________
function mostrarSeccion() {
  ocultarSecciones();
  let idBtn = this.getAttribute("id");

  switch (idBtn) {
    case "btnRegistroImportador":
      document.querySelector("#seccionRegistroImportador").style.display =
        "block";

      break;

    case "btnLogin":
      document.querySelector("#seccionInicioSesion").style.display = "block";

      break;

    case "btnAtrasLogin":
      document.querySelector("#seccionPantallaInicio").style.display = "block";

      break;

    case "btnAtrasRegistro":
      document.querySelector("#seccionPantallaInicio").style.display = "block";

      break;

    case "btnCerrarSesionImportador":
      document.querySelector("#seccionPantallaInicio").style.display = "block";
      document.querySelector("#cabezal").style.display = "none";

      break;

    case "btnCerrarSesionPlataformaEmpresa":
      document.querySelector("#seccionPantallaInicio").style.display = "block";
      document.querySelector("#cabezal").style.display = "none";

      break;

    case "btnCrearNuevaSolicitudImportador":
      document.querySelector(
        "#seccionCrearNuevaCargaImportador"
      ).style.display = "block";

      break;

    case "btnConsultaSolicitudesImportador":
      document.querySelector(
        "#seccionConsultaSolicitudImportador"
      ).style.display = "block";

      solicitudesPendientesImportador();

      break;

    case "btnVisualizarInformacionImportador":
      document.querySelector(
        "#seccionInformacionEstadisticaImportador"
      ).style.display = "block";

      break;

    case "btnCrearNuevoViajeEmpresa":
      document.querySelector("#seccionCrearNuevoViajeEmpresa").style.display =
        "block";        
      break;

    case "btnAsignarSolicitudParaEmpresa":
      document.querySelector("#seccionAsignarSolicitudEmpresa").style.display =
        "block"; 
      cargarIdVIajes();
      armarListaAsignarSolicitudesCarga();

      break;

    case "btnRolloverParaEmpresa":
      document.querySelector("#seccionRolloverEmpresa").style.display = "block";      
      cargarIdVIajesRollover();
      break;

    case "btnManifiestoDeCargaParaEmpresa":
      document.querySelector("#seccionManifiestoEmpresa").style.display =
        "block";
      cargarIdVIajesManifiesto();

      break;

    case "btnHabilitarImportadoresParaEmpresa":
      document.querySelector(
        "#habilitarImportadoresEmpresa"
      ).style.display = "block";
      armarListaImportadoresDeshabilitados();

      break;

    case "btnCargaPeligrosaParaEmpresa":
      document.querySelector("#seccionCargaPeligrosaEmpresa").style.display =
        "block";
    cargarIdVIajesCargaPeligrosa();

      break;
  }
}

//________________________________________________________________________________________________________________

function mostrarBotones(tipo) {
  let botonesOcultar = document.querySelectorAll(".btnSeccion");
  for (let i = 0; i < botonesOcultar.length; i++) {
    botonesOcultar[i].style.display = "none";
  }
  let botonesMostrar = document.querySelectorAll("." + tipo);
  for (let i = 0; i < botonesMostrar.length; i++) {
    botonesMostrar[i].style.display = "block";
  }
}

//FUNCIONALIDADES PARA EMPRESAS

//________________________________________________________________________________________________________________

function crearViajeEmpresa() {//PARTE 2 EMPRESA
  
  let nombreBuque = document.querySelector("#txtNombreBuque").value;
  let cantidadMaxContenedores = Number(
    document.querySelector("#nmbCantidadContenedores").value
  );

  let usuarioEmpresa = obtenerObjeto(arrayUsuariosEmpresa, "usuario", usuario);
  let fecha = document.querySelector("#dateLlegadaBuque").value;
  let idEmpresa = usuarioEmpresa.id; //simplemente accedo al id del objeto que corresponde al usuario empresa.

  let fechaLlegada = cargarFecha(fecha);

  if(validarCamposVaciosCrearViaje(nombreBuque,cantidadMaxContenedores,fecha)){
  let viajeEmpresa = new ViajeEmpresa(
    nombreBuque,
    cantidadMaxContenedores,
    idEmpresa,
    fechaLlegada,
    arrayViajesEmpresa.length + 1
  );

  arrayViajesEmpresa.push(viajeEmpresa);
  alert("VIAJE CREADO EXITOSAMENTE");
    document.querySelector("#txtNombreBuque").value="";
    document.querySelector("#nmbCantidadContenedores").value="";
} else {

  alert("Debe completar todos los campos. La cantidad de contenedores debe ser mayor a 0")

} }  


//_____________________________________________________________________________________________________________


function asignarSolicitudDeCargaEmpresa() { // PARTE 3 EMPRESA
 
  let idViajeSeleccionado = Number(
    document.querySelector("#slcAsignarViajeEmpresa").value
  ); //se corresponde con el arrayViajesEmpresaidAutonumerico

  if(idViajeSeleccionado===-1){
    alert("Debe seleccionar un viaje")
    }

  let objetoDelViajeSeleccionado = obtenerObjeto(
    arrayViajesEmpresa,
    "idAutonumerico",
    idViajeSeleccionado
  ); //objeto del viaje empresa seleccionado

  let idSolicitud = Number(this.getAttribute("data-idSolicitud"));

  let objetoSolicitudCargaImportador = obtenerObjeto(
    arrayViajesSolicitudesImportador,
    "idSolicitud",
    idSolicitud
  ); //objeto de la solicitud de carga

  let contenedoresDeLaSolicitud =
    objetoSolicitudCargaImportador.cantidadContenedores;

  let idImportadorQueHaceSolicitud =
    objetoSolicitudCargaImportador.idImportador;

  let esImportadorHabilitado = controlarImportadorHabilitado(
    idImportadorQueHaceSolicitud
  );

  let contenedoresRestantesViaje = objetoDelViajeSeleccionado.cantidadRestante;


  if (esImportadorHabilitado) {    
    let solicitudParaAsignar = confirm(
      `¿Esta seguro que desea asignar la solicitud: ${objetoSolicitudCargaImportador.idSolicitud} al viaje con nombre de Buque: ${objetoDelViajeSeleccionado.nombreBuque} y fecha de llegada: ${objetoDelViajeSeleccionado.fechaLlegada}?`
    );

    if (contenedoresDeLaSolicitud <= contenedoresRestantesViaje) {
      if (solicitudParaAsignar) {
        for (let i = 0; i < arrayViajesSolicitudesImportador.length; i++) {
          if (arrayViajesSolicitudesImportador[i].idSolicitud === idSolicitud) {
            arrayViajesSolicitudesImportador[i].estado = "CONFIRMADA";
            arrayViajesSolicitudesImportador[i].idViaje =
              objetoDelViajeSeleccionado.idAutonumerico;
              arrayViajesSolicitudesImportador[i].fechaLlegada = objetoDelViajeSeleccionado.fechaLlegada
          }
        }
        armarListaAsignarSolicitudesCarga();
        alert("LA SOLICITUD HA SIDO ASIGNADA CORRECTAMENTE")
        objetoDelViajeSeleccionado.cantidadRestante -=
          contenedoresDeLaSolicitud;
      }
    } else {
      alert(
        "La cantidad de contenedores de la solicitud supera a la cantidad de contenedores disponibles en el Viaje"
      );
    }
  } else {
    alert("El importador que realiza la solicitud NO esta habilitado");
  }
}

//_____________________________________________________________________________________________________________

function listarRolloverEmpresa() {//Parte 4 empresa
  let usuarioEmpresa = obtenerObjeto(arrayUsuariosEmpresa, "usuario", usuario);

  let idEmpresa = usuarioEmpresa.id; //esto me da el id de la empresa que esta logueada

  let idViajeSeleccionado = Number(
    document.querySelector("#slcidViajesParaListarRollover").value
  ); //esto me da el id del viaje que el usuario quiere mostrar para rollear una solicitud

  let objetoDelViajeSeleccionado = obtenerObjeto(
    arrayViajesEmpresa,
    "idAutonumerico",
    idViajeSeleccionado
  ); //aca tengo el objeto del viaje seleccionado

  let contador = 0;

  document.querySelector("#tblRollearSolicitudDeCarga").innerHTML = "";

  for (let i = 0; i < arrayViajesSolicitudesImportador.length; i++) {
    let nombreImportador = capturarImportador(
      arrayViajesSolicitudesImportador[i].idImportador
    ); //capturo el nombre del importador

    if (
      arrayViajesSolicitudesImportador[i].estado === "CONFIRMADA" &&
      idEmpresa === arrayViajesSolicitudesImportador[i].idEmpresa &&
      idViajeSeleccionado === arrayViajesSolicitudesImportador[i].idViaje
    ) {
      document.querySelector("#tblRollearSolicitudDeCarga").innerHTML += `<tr>

    <td>${arrayViajesSolicitudesImportador[i].puerto}</td>
    
    <td>${arrayViajesSolicitudesImportador[i].cantidadContenedores}</td>
    
    <td>${nombreImportador}</td>
    
    <td>${arrayViajesSolicitudesImportador[i].descripcionMercaderia}</td>
    
    <td>${arrayViajesSolicitudesImportador[i].tipoMercaderia}</td>
      
    <td><input type="button" value="REASIGNAR" data-idSolicitudReAsignar="${arrayViajesSolicitudesImportador[i].idSolicitud}" class="btnReAsignar"></td>
    
     </tr>`;
      contador++;
    }
  }

  let btnsAsignar = document.querySelectorAll(".btnReAsignar");
  for (let i = 0; i < btnsAsignar.length; i++) {
    btnsAsignar[i].addEventListener("click", rollearCarga);
  }

  if (contador === 0) {
    alert("No tiene solicitudes confirmadas para reasignar");
  }
  cargarIdVIajesReAsignarRollover(idViajeSeleccionado);
}

function rollearCarga() {
  let idViajeSeleccionado = Number(
    document.querySelector("#slcidViajesParaListarRollover").value
  ); //esto me da el id del viaje que el usuario quiere mostrar para rollear una solicitud

  let objetoDelViajeSeleccionado = obtenerObjeto(
    arrayViajesEmpresa,
    "idAutonumerico",
    idViajeSeleccionado
  );

  let reasignar = confirm(`Desea reasignar esta solicitud?`);

  if (reasignar) {
    let idSolicitud = Number(this.getAttribute("data-idSolicitudReAsignar"));

    let objetoSolicitud = obtenerObjeto(
      arrayViajesSolicitudesImportador,
      "idSolicitud",
      idSolicitud
    );

    let idViajeNuevo = Number(
      document.querySelector("#slcidViajesParaRollover").value
    );

    let objetoViajeNuevo = obtenerObjeto(
      arrayViajesEmpresa,
      "idAutonumerico",
      idViajeNuevo
    );

    if (
      objetoViajeNuevo.cantidadRestante >= objetoSolicitud.cantidadContenedores
    ) {
      objetoSolicitud.idViaje = objetoViajeNuevo.idAutonumerico;

      objetoViajeNuevo.cantidadRestante -= objetoSolicitud.cantidadContenedores; //resto contenedores al nuevo viaje asignado
      objetoSolicitud.fechaLlegada = objetoViajeNuevo.fechaLlegada
      objetoDelViajeSeleccionado.cantidadRestante =
        objetoDelViajeSeleccionado.cantidadRestante +
        objetoSolicitud.cantidadContenedores; //sumo contenedores que habia restado al viaje del cual deseo sacar la solicitud

      alert("La solicitud ha sido reasignada correctamente")
        
      listarRolloverEmpresa();
    } else {
      alert(
        "El viaje al cual desea reasignar la solicitud no dispone de suficientes contenedores disponibles"
      );
    }
  }
}

//_____________________________________________________________________________________________________________

function listarManifiestoDeCarga() {
  //Parte 5 Empresa

  let usuarioEmpresa = obtenerObjeto(arrayUsuariosEmpresa, "usuario", usuario);

  let idEmpresa = usuarioEmpresa.id; //esto me da el id de la empresa que esta logueada

  let viajeSeleccionado = Number(
    document.querySelector("#slcListarManifiestoViajeEmpresa").value
  ); //esto me da el id del viaje que el usuario quiere mostrar -- FUNCIONA
  console.log(viajeSeleccionado);

  let objetoDelViajeSeleccionado = obtenerObjeto(
    arrayViajesEmpresa,
    "idAutonumerico",
    viajeSeleccionado
  ); //aca tengo el viaje seleccionado

  let idViajeSeleccionado = objetoDelViajeSeleccionado.idAutonumerico;
  let contador = 0;

  document.querySelector("#listarManifiestodeCargaEmpresa").innerHTML = "";

  for (let i = 0; i < arrayViajesSolicitudesImportador.length; i++) {
    let nombreImportador = capturarImportador(
      arrayViajesSolicitudesImportador[i].idImportador
    ); //capturo el nombre del importador

    if (
      arrayViajesSolicitudesImportador[i].estado === "CONFIRMADA" &&
      idEmpresa === arrayViajesSolicitudesImportador[i].idEmpresa &&
      idViajeSeleccionado === arrayViajesSolicitudesImportador[i].idViaje
    ) {
      document.querySelector(
        "#listarManifiestodeCargaEmpresa"
      ).innerHTML += `<tr>

    <td>${arrayViajesSolicitudesImportador[i].puerto}</td>
    
    <td>${arrayViajesSolicitudesImportador[i].cantidadContenedores}</td>
    
    <td>${nombreImportador}</td>
    
    <td>${arrayViajesSolicitudesImportador[i].descripcionMercaderia}</td>
    
    <td>${arrayViajesSolicitudesImportador[i].tipoMercaderia}</td>
      
     </tr>`;
      contador++;
    }
  }

  if (contador === 0) {
    alert("No tiene solicitudes confirmadas para mostrar");
  }
}

//_________________________________________________________________________________________________________

function habilitarImportadoresEmpresa() {



  let ignorar = confirm("DESEA IGNORAR ESTA SOLICITUD?");

  if (ignorar) {
    let idSolicitud = Number(this.getAttribute("data-idSolicitudIgnorar"));

    let objetoSolicitud = obtenerObjeto(
      arrayViajesSolicitudesImportador,
      "idSolicitud",
      idSolicitud
    );

    let importadorQueSolicita=obtenerObjeto(arrayUsuariosImportador, "id", objetoSolicitud.idImportador)


    objetoSolicitud.estado = "IGNORADA";
    armarListaImportadoresDeshabilitados();
    document.querySelector("#pMessageImportadoresDeshabilitados").innerHTML="LA SOLICITUD HA SIDO IGNORADA"

    importadorQueSolicita.canceladas--;
    
    if(importadorQueSolicita.canceladas<3){

      
      importadorQueSolicita.habilitado=true;

      alert("El importador esta nuevamente habilitado")

    }
  }
}

  //_________________________________________________________________________________________________________

  function cargaPeligrosaEmpresa() {

  let usuarioEmpresa = obtenerObjeto(arrayUsuariosEmpresa, "usuario", usuario);

  let idEmpresa = usuarioEmpresa.id; //esto me da el id de la empresa que esta logueada

  let viajeSeleccionado = Number(
    document.querySelector("#slcListarViajes").value
  ); //esto me da el id del viaje que el usuario quiere mostrar 
  if(viajeSeleccionado===-1){
  alert("Debe seleccionar un viaje")
  }
  

  let objetoDelViajeSeleccionado = obtenerObjeto(
    arrayViajesEmpresa,
    "idAutonumerico",
    viajeSeleccionado
  ); //aca tengo el viaje seleccionado


  let idViajeSeleccionado = objetoDelViajeSeleccionado.idAutonumerico;
 
  let contador = 0;

  document.querySelector(
    "#slcListarCargaPeligrosaEmpresa"
  ).innerHTML = "";

  for (let i = 0; i < arrayViajesSolicitudesImportador.length; i++) {
    let nombreImportador = capturarImportador(
      arrayViajesSolicitudesImportador[i].idImportador
    ); //capturo el nombre del importador

    if (
      arrayViajesSolicitudesImportador[i].estado === "CONFIRMADA" &&
      idEmpresa === arrayViajesSolicitudesImportador[i].idEmpresa &&
      idViajeSeleccionado === arrayViajesSolicitudesImportador[i].idViaje
      && arrayViajesSolicitudesImportador[i].tipoMercaderia === "carga_peligrosa"

    ) {
      document.querySelector(
        "#slcListarCargaPeligrosaEmpresa"
      ).innerHTML += `<tr>



     <td>${arrayViajesSolicitudesImportador[i].puerto}</td>
    
    <td>${arrayViajesSolicitudesImportador[i].cantidadContenedores}</td>
    
    <td>${nombreImportador}</td>
    
    <td>${arrayViajesSolicitudesImportador[i].descripcionMercaderia}</td>
    
    <td>${arrayViajesSolicitudesImportador[i].tipoMercaderia}</td>
      
     </tr>`;
      contador++;
    }
  }

  if (contador === 0) {
    alert("No tiene solicitudes con cargas peligrosas confirmadas para mostrar");
  }
}


//FUNCIONALIDADES PARA IMPORTADOR

//________________________________________________________________________________________________________________

function solicitudDeCargaImportador() { //Parte 3 Importador
  let usuarioImportador = obtenerObjeto(
    arrayUsuariosImportador,
    "usuario",
    usuario
  );
 
  let tipoMercaderia = document.querySelector("#slcNuevaCargaImportador").value;
  let descripcionMercaderia = document.querySelector(
    "#txtdescripcionMercaderiaImportador"
  ).value;
  let puertoOrigen = document.querySelector("#slcPuertoOrigenImportador").value;
  let cantidadContenedores = Number(
    document.querySelector("#nmbcontenedoresNuevaCargaImportador").value
  );
  let idEmpresa = Number(
    document.querySelector("#slcIdEmpresaParaImportador").value
  );

  if (
    validarCamposVaciosCreacionCarga(
      tipoMercaderia,
      descripcionMercaderia,
      puertoOrigen,
      cantidadContenedores,
      idEmpresa
    )&&usuarioImportador.habilitado===true
  ) {
    let NuevaSolicitudDeCarga = new SolicitudesCargaImportador(
      tipoMercaderia,
      descripcionMercaderia,
      puertoOrigen,
      cantidadContenedores,
      idEmpresa,
      arrayViajesSolicitudesImportador.length + 1,
      usuarioImportador.id
    );
    arrayViajesSolicitudesImportador.push(NuevaSolicitudDeCarga);
    alert("Carga creada exitosamente!");

    document.querySelector("#txtdescripcionMercaderiaImportador").value = "";
    document.querySelector("#nmbcontenedoresNuevaCargaImportador").value = "";
  } else if (usuarioImportador.habilitado===false){
    alert("Usted no está habilitado para crear cargas");
    document.querySelector("#txtdescripcionMercaderiaImportador").value = "";
    document.querySelector("#nmbcontenedoresNuevaCargaImportador").value = "";
   }   
    else {
    alert("Debe completar todos los campos. La cantidad de contenedores debe ser mayor a 0")
      ;
  }
}


//________________________________________________________________________________________________________________


function solicitudesPendientesImportador() { //Parte 4 Importador
  let usuarioImportador = obtenerObjeto(
    arrayUsuariosImportador,
    "usuario",
    usuario
  );

 document.querySelector("#tblSolicitudesPendientes").innerHTML = "";

  for (let i = 0; i < arrayViajesSolicitudesImportador.length; i++) {
    if (
      arrayViajesSolicitudesImportador[i].estado === "Pendiente" &&
      usuarioImportador.id === arrayViajesSolicitudesImportador[i].idImportador
    ) {
      document.querySelector("#tblSolicitudesPendientes").innerHTML += `<tr>
     
      <td>${arrayViajesSolicitudesImportador[i].tipoMercaderia}</td>
     
     <td>${arrayViajesSolicitudesImportador[i].descripcionMercaderia}</td>
     
     <td>${arrayViajesSolicitudesImportador[i].puerto}</td>
     
     <td>${arrayViajesSolicitudesImportador[i].cantidadContenedores}</td>
     
     <td>${arrayViajesSolicitudesImportador[i].estado}</td>

      <td><input type="button" value="CANCELAR" data-idSolicitud="${arrayViajesSolicitudesImportador[i].idSolicitud}" class="btnCancelar"></td>
      </tr>`;
    }   }

  let btnCancelar = document.querySelectorAll(".btnCancelar");
  for (let i = 0; i < btnCancelar.length; i++) {
    btnCancelar[i].addEventListener("click", cancelarSolicitudImportador);
  }
}

//________________________________________________________________________________________________________________

function busquedaSolicitudesPendientesImportador() { //Parte 4 Importador // Buscador
 
  let campoBusqueda = document
    .querySelector("#txtConsultaSolicitudImportadorDescripcion")
    .value.toLowerCase();

  let usuarioImportador = obtenerObjeto(
    arrayUsuariosImportador,
    "usuario",
    usuario
  );

  if (campoBusqueda != "") {
    document.querySelector("#pCancelarSolicitudImportador").innerHTML = "";
    document.querySelector("#tblSolicitudesPendientes").innerHTML = "";

    for (let i = 0; i < arrayViajesSolicitudesImportador.length; i++) {
      let busqueda =
        arrayViajesSolicitudesImportador[i].descripcionMercaderia.toLowerCase();
      if (
        arrayViajesSolicitudesImportador[i].estado === "Pendiente" &&
        usuarioImportador.id === arrayViajesSolicitudesImportador[i].idImportador &&
        busqueda.indexOf(campoBusqueda)!==-1
      ) {
        document.querySelector("#tblSolicitudesPendientes").innerHTML += `<tr>
   
    <td>${arrayViajesSolicitudesImportador[i].tipoMercaderia}</td>
   
   <td>${arrayViajesSolicitudesImportador[i].descripcionMercaderia}</td>
   
   <td>${arrayViajesSolicitudesImportador[i].puerto}</td>
   
   <td>${arrayViajesSolicitudesImportador[i].cantidadContenedores}</td>
  
   <td>${arrayViajesSolicitudesImportador[i].estado}</td>

    <td><input type="button" value="CANCELAR" data-idSolicitud="${arrayViajesSolicitudesImportador[i].idSolicitud}" class="btnCancelar"></td>
    </tr>`;
      }
      let btnCancelar = document.querySelectorAll(".btnCancelar");
      for (let i = 0; i < btnCancelar.length; i++) {
        btnCancelar[i].addEventListener("click", cancelarSolicitudImportador);
      }
    }
  } else {
    alert("Campo búsqueda de no puede estar vacío")
      ;
  }
}

//________________________________________________________________________________________________________________

function cancelarSolicitudImportador() {
  //Parte 5 importador

  let idSolicitud = Number(this.getAttribute("data-idSolicitud"));

  let usuarioImportador = obtenerObjeto(
    arrayUsuariosImportador,
    "usuario",
    usuario
  );

  usuarioImportador.canceladas = 0;

  let solicitudParaCancelar = confirm(
    `¿Esta seguro que desea cancelar esta solicitud?`
  );

  if (solicitudParaCancelar) {
    for (let i = 0; i < arrayViajesSolicitudesImportador.length; i++) {
      if (arrayViajesSolicitudesImportador[i].idSolicitud === idSolicitud) {
        arrayViajesSolicitudesImportador[i].estado = "CANCELADA";
        arrayViajesSolicitudesImportador[i].fechaCancelada = fechaHoy;
      }
    }

    solicitudesPendientesImportador();

    alert("La solicitud ha sido cancelada correctamente");
  }
  for (let i = 0; i < arrayViajesSolicitudesImportador.length; i++) {
    if (
      arrayViajesSolicitudesImportador[i].idImportador ===
        usuarioImportador.id &&
      arrayViajesSolicitudesImportador[i].estado === "CANCELADA"
    ) {
      usuarioImportador.canceladas += 1;
    }
  }
  if (usuarioImportador.canceladas >= 3) {
    usuarioImportador.habilitado = false;
  }
}

//________________________________________________________________________________________________________________

function mostrarInformacionEstadísticaImportador() {
  let contadorContenedoresConfirmados = 0;
  let usuarioImportador = obtenerObjeto(
    arrayUsuariosImportador,
    "usuario",
    usuario
  );

  let fechaDesde = cargarFecha(
    document.querySelector("#fchinformacionEstadisticaImportadorDesde").value
  );
  let fechaHasta = cargarFecha(
    document.querySelector("#fchinformacionEstadisticaImportadorHasta").value
  );

  document.querySelector(
    "#tblInformacionEstadisticaImportadorCancelaciones"
  ).innerHTML = "";
  document.querySelector(
    "#tblInformacionEstadisticaImportadorLlegadas"
  ).innerHTML = "";
  document.querySelector("#tblPorcentajeParticipacion").innerHTML = "";

  if (fechaHasta < fechaDesde) {
    alert("El intervalo elegido no es correcto");
  }
  if (fechaDesde === 0 || fechaHasta === 0) {
    alert("Seleccione un intervalo de fechas");
  }

  if (fechaDesde != 0 && fechaHasta != 0 && fechaDesde <= fechaHasta) {
    for (let i = 0; i < arrayViajesSolicitudesImportador.length; i++) {
      if (
        arrayViajesSolicitudesImportador[i].estado === "CANCELADA" &&
        usuarioImportador.id ===
          arrayViajesSolicitudesImportador[i].idImportador &&
        arrayViajesSolicitudesImportador[i].fechaCancelada >= fechaDesde &&
        arrayViajesSolicitudesImportador[i].fechaCancelada <= fechaHasta
      ) {
        document.querySelector(
          "#tblInformacionEstadisticaImportadorCancelaciones"
        ).innerHTML += `<tr>
     
      <td>${arrayViajesSolicitudesImportador[i].tipoMercaderia}</td>
     
     <td>${arrayViajesSolicitudesImportador[i].descripcionMercaderia}</td>
     
     <td>${arrayViajesSolicitudesImportador[i].puerto}</td>
     
     <td>${arrayViajesSolicitudesImportador[i].cantidadContenedores}</td>
     
     <td>${arrayViajesSolicitudesImportador[i].fechaCancelada}</td>
`;
      }
    }

    for (let i = 0; i < arrayViajesSolicitudesImportador.length; i++) {
      if (
        arrayViajesSolicitudesImportador[i].estado === "CONFIRMADA" &&
        usuarioImportador.id ===
          arrayViajesSolicitudesImportador[i].idImportador &&
        arrayViajesSolicitudesImportador[i].fechaLlegada >= fechaDesde &&
        arrayViajesSolicitudesImportador[i].fechaLlegada <= fechaHasta
      ) {
        let nombreEmpresa = obtenerObjeto(
          arrayUsuariosEmpresa,
          "id",
          arrayViajesSolicitudesImportador[i].idEmpresa
        ).nombre;

        document.querySelector(
          "#tblInformacionEstadisticaImportadorLlegadas"
        ).innerHTML += `<tr>
     
      <td>${arrayViajesSolicitudesImportador[i].tipoMercaderia}</td>
     
     <td>${arrayViajesSolicitudesImportador[i].descripcionMercaderia}</td>
     
     <td>${arrayViajesSolicitudesImportador[i].puerto}</td>
     
     <td>${arrayViajesSolicitudesImportador[i].cantidadContenedores}</td>
     
     <td>${arrayViajesSolicitudesImportador[i].fechaLlegada}</td>

     <td>${nombreEmpresa}</td>`;
      }
    }
  }

  for (let i = 0; i < arrayViajesSolicitudesImportador.length; i++) {
    if (
      arrayViajesSolicitudesImportador[i].estado === "CONFIRMADA" &&
      usuarioImportador.id ===
      arrayViajesSolicitudesImportador[i].idImportador &&
      arrayViajesSolicitudesImportador[i].fechaLlegada >= fechaDesde &&
      arrayViajesSolicitudesImportador[i].fechaLlegada <= fechaHasta
    ) {
      contadorContenedoresConfirmados +=
        arrayViajesSolicitudesImportador[i].cantidadContenedores;
    }
  }

  let porcentajeParticipacion = 0;

  for (let j = 0; j < arrayUsuariosEmpresa.length; j++) {
    let unIdEmpresa = arrayUsuariosEmpresa[j].id;
    let unNombreEmpresa = arrayUsuariosEmpresa[j].nombre;
    porcentajeParticipacion = calcularPorcentajeParticipacion(unIdEmpresa);

    if (porcentajeParticipacion === 0) {
    } else {
      document.querySelector("#tblPorcentajeParticipacion").innerHTML += `<tr>
   
    <td>${unNombreEmpresa}</td>
   
   <td>${porcentajeParticipacion.toFixed(2)}</td>`;
    }
  }
}

// Calcula porcentaje de participacion pasando el IdEmpresa por parámetro
function calcularPorcentajeParticipacion(unIdEmpresa) {
  let fechaDesde = cargarFecha(
    document.querySelector("#fchinformacionEstadisticaImportadorDesde").value
  );
  let fechaHasta = cargarFecha(
    document.querySelector("#fchinformacionEstadisticaImportadorHasta").value
  );

  let usuarioImportador = obtenerObjeto(
    arrayUsuariosImportador,
    "usuario",
    usuario
  );

  let cantidadContenedoresTotales = cantidadContenedoresTotalesfuncion();
 
  let cantidadContenedores = 0;
  let contador = 0;
  let porcentajeParticipacion;
  for (let i = 0; i < arrayViajesSolicitudesImportador.length; i++) {
    if (
      arrayViajesSolicitudesImportador[i].idEmpresa === unIdEmpresa &&
      arrayViajesSolicitudesImportador.cantidadContenedores !== 0 &&
      arrayViajesSolicitudesImportador[i].estado === "CONFIRMADA" &&
      arrayViajesSolicitudesImportador[i].idImportador ===
      usuarioImportador.id &&
      arrayViajesSolicitudesImportador[i].fechaLlegada >= fechaDesde &&
      arrayViajesSolicitudesImportador[i].fechaLlegada <= fechaHasta
    ) {
      cantidadContenedores +=
        arrayViajesSolicitudesImportador[i].cantidadContenedores;
      contador++;
    }
  }
  if (contador !== 0) {
    porcentajeParticipacion =
      (cantidadContenedores / cantidadContenedoresTotales) * 100;
  } else {
    porcentajeParticipacion = 0;
  }

  return porcentajeParticipacion;
}

function cantidadContenedoresTotalesfuncion() {
  let fechaDesde = cargarFecha(
    document.querySelector("#fchinformacionEstadisticaImportadorDesde").value
  );
  let fechaHasta = cargarFecha(
    document.querySelector("#fchinformacionEstadisticaImportadorHasta").value
  );

  let usuarioImportador = obtenerObjeto(
    arrayUsuariosImportador,
    "usuario",
    usuario
  );

  let cantidadContenedoresTotalesConfirmados = 0;

  for (let i = 0; i < arrayViajesSolicitudesImportador.length; i++) {
    if (
      arrayViajesSolicitudesImportador[i].estado === "CONFIRMADA" &&
      usuarioImportador.id ===
      arrayViajesSolicitudesImportador[i].idImportador &&
      arrayViajesSolicitudesImportador[i].fechaLlegada >= fechaDesde &&
      arrayViajesSolicitudesImportador[i].fechaLlegada <= fechaHasta
    ) {
      cantidadContenedoresTotalesConfirmados +=
        arrayViajesSolicitudesImportador[i].cantidadContenedores;
    }
  }

  return cantidadContenedoresTotalesConfirmados;
}