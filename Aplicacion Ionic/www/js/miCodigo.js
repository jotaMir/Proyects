
//pantallas

const MENU = document.querySelector("#menu");
const ROUTER = document.querySelector("#ruteo");
const NAV = document.querySelector("#navegador");
const PANTALLA_LOGIN = document.querySelector("#pantalla-login");
const PANTALLA_REGISTRO = document.querySelector("#pantalla-registro");
const PANTALLA_INICIO = document.querySelector("#pantalla-inicio");
const PANTALLA_AGREGAR_GASTO = document.querySelector("#pantalla-agregarGasto");
const PANTALLA_AGREGAR_INGRESO = document.querySelector("#pantalla-agregarIngreso");
const PANTALLA_MOVIMIENTOS = document.querySelector("#pantalla-movimientos");
const SELECT_DEPARTAMENTOS = document.querySelector("#slcDepartamentos");
const PANTALLA_MAPA = document.querySelector("#pantalla-mapa");
const SELECT_MOVIMIENTOS = document.querySelector("#slcMovimientos");
const CAJEROS_SELECCIONADOS = document.querySelector("#slcDistanciaMapa");

//variables
const baseURL = 'https://dwallet.develotion.com/';
let tokenUsuario = "";
let usuarioId;
let movimientos;
let sumaGastos = 0;
let sumaIngresos = 0;
let markers;
let map = null;
let marker = null;
let markerCajero = null;
let marcadoresCajero = [];

let posicionUsuario;
let posicionUsuarioIcon = L.icon({
    iconUrl: 'img/hombre.png',
    iconSize: [35, 35]
});
let posicionCajeroIcon = L.icon({
    iconUrl: 'img/cajero-automatico.png',
    iconSize: [25, 25]
});

window.addEventListener("load", inicializar);

function inicializar() {
    actualizarMenu();
    mostrarLogin();
    capturarEventos();
    cargarPosicionUsuario();

}

const capturarEventos = () => {

    // Login.
    document.querySelector("#btnLogin").addEventListener("click", loguearUsuario);
    // Registro.
    document.querySelector("#btnRegistro").addEventListener("click", registrarUsuario);
    // Ruteo
    ROUTER.addEventListener("ionRouteDidChange", navegar);
    //Select Ciudades
    SELECT_DEPARTAMENTOS.addEventListener("ionChange", cargarCiudades);
    SELECT_MOVIMIENTOS.addEventListener("ionChange", cargarMovimientos);
    CAJEROS_SELECCIONADOS.addEventListener("ionChange", CargarMarkers);

}

const actualizarMenu = () => {

    document.querySelector("#btnMenuLogin").style.display = "none";
    document.querySelector("#btnMenuRegistrar").style.display = "none";
    document.querySelector("#btnMenuAgregarGasto").style.display = "none";
    document.querySelector("#btnAgregarIngreso").style.display = "none";
    document.querySelector("#btnMenuCerrarSesion").style.display = "none";
    document.querySelector("#btnListarMovimientos").style.display = "none";
    document.querySelector("#btnMenuMapa").style.display = "none";

    tokenUsuario = localStorage.getItem("token");
    usuarioId = localStorage.getItem("IdUsuario");
    if (tokenUsuario) {
        document.querySelector("#btnMenuAgregarGasto").style.display = "block";
        document.querySelector("#btnMenuCerrarSesion").style.display = "block";
        document.querySelector("#btnAgregarIngreso").style.display = "block";
        document.querySelector("#btnListarMovimientos").style.display = "block";
        document.querySelector("#btnMenuMapa").style.display = "block";
        NAV.setRoot("page-inicio");
        NAV.popToRoot();
    }
    else {

        document.querySelector("#btnMenuLogin").style.display = "block";
        document.querySelector("#btnMenuRegistrar").style.display = "block";
        
        NAV.setRoot("page-login");
        NAV.popToRoot();
        // mostrarLogin();      
    }
}


const ocultarPantallas = () => {

    PANTALLA_LOGIN.style.display = "none";
    PANTALLA_INICIO.style.display = "none";
    PANTALLA_AGREGAR_GASTO.style.display = "none";
    PANTALLA_REGISTRO.style.display = "none";
    PANTALLA_AGREGAR_INGRESO.style.display = "none";
    PANTALLA_MOVIMIENTOS.style.display = "none";
    PANTALLA_MAPA.style.display = "none";
}


const mostrarLogin = () => {

    ocultarPantallas();
    PANTALLA_LOGIN.style.display = "block";
}

const mostrarRegistro = () => {

    ocultarPantallas();
    PANTALLA_REGISTRO.style.display = "block";
}

const mostrarInicio = () => {

    ocultarPantallas();
    PANTALLA_INICIO.style.display = "block";
}

const mostrarAgregarGasto = () => {

    ocultarPantallas();
    PANTALLA_AGREGAR_GASTO.style.display = "block";
}
const mostrarAgregarIngreso = () => {

    ocultarPantallas();
    PANTALLA_AGREGAR_INGRESO.style.display = "block";
}

const mostrarMovimientos = () => {

    ocultarPantallas();
    PANTALLA_MOVIMIENTOS.style.display = "block";
}

const mostrarMapa = () => {

    ocultarPantallas();
    PANTALLA_MAPA.style.display = "block";
    iniciarMapa();
}


const verificarInicio = () => {

    tokenUsuario = localStorage.getItem("APPProductosToken");
    actualizarMenu();

    /*if (tokenUsuario) {
        NAV.setRoot("page-inicio");
        NAV.popToRoot();
    } else {
        NAV.setRoot("page-login");
        NAV.popToRoot();
    }*/

}

const cerrarMenu = () => {

    MENU.close();

}



function navegar(evt) {

    const ruta = evt.detail.to;
   
    //ocultarPantallas();
    switch (ruta) {
        case "/login": mostrarLogin(); 
            break;
        case "/registrar": mostrarRegistro();
            cargarDepartamentos();
            break;
        case "/inicio": mostrarInicio();
            break;
        case "/agregarGasto": mostrarAgregarGasto();
            CargarRubroGasto();
            break;
        case "/agregarIngreso": mostrarAgregarIngreso();
            CargarRubroIngreso();
            break;
        case "/listarMovimientos": mostrarMovimientos();
            listarMovimientos();
            break;
        case "/mapa": mostrarMapa();
          
            break;
    }

}

const cerrarSesion = () => {
  
    window.location.hash="no-back-button";
    window.location.hash="Again-No-back-button" //chrome
    window.onhashchange=function(){window.location.hash="no-back-button";}
    document. addEventListener("backbutton", function(){}, false);
    localStorage.clear();
    tokenUsuario = "";
    limpiarCamposLogin();
    ocultarPantallas();
    actualizarMenu();
    NAV.setRoot("page-login");
    NAV.popToRoot();
    inicializar();
   
}

const loguearUsuario = () => {

   
   let usuarioRegistrado = localStorage.getItem("usuario");
    let passwordRegistrado = localStorage.getItem("password");

    if(usuarioRegistrado == null && passwordRegistrado == null){
    
    let usuario = document.querySelector("#txtLoginUsuario").value;
    let contrasenia = document.querySelector("#txtLoginPassword").value;

    if (usuario.trim().length > 0 && contrasenia.trim().length > 0) {

        let usarioLogueado = {
            usuario: usuario,
            password: contrasenia
        }
        fetch(baseURL + '/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usarioLogueado)
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.mensaje) {
                    mostrarToast('ERROR', 'Error', data.mensaje);
                } else if (data) {
                    usuarioId = data.id;
                  
                    tokenUsuario = data.apiKey;
                    mensaje = data.mensaje;
                    localStorage.setItem("token", tokenUsuario);
                    localStorage.setItem("IdUsuario", usuarioId);
                    mostrarToast('SUCCESS', '', "Ingreso exitoso");
                    actualizarMenu();
                    NAV.setRoot("page-inicio");
                    NAV.popToRoot();
                  
                    window.location.hash="no-back-button";
                    window.location.hash="Again-No-back-button"
                    window.onhashchange=function(){window.location.hash="no-back-button";}
                    document. addEventListener("backbutton", function(){}, false);
                }
            })
            .catch(error => console.log(error));
    }
    else {
        mostrarToast('ERROR', '', "Los campos no pueden estar vacios");
    }
    }

else{

    let usarioLogueado = {
        usuario: usuarioRegistrado,
        password: passwordRegistrado
    }
    fetch(baseURL + '/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usarioLogueado)
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.mensaje) {
                mostrarToast('ERROR', 'Error', data.mensaje);
            } else if (data) {
                usuarioId = data.id;
            
                tokenUsuario = data.apiKey;
                mensaje = data.mensaje;
                localStorage.setItem("token", tokenUsuario);
                localStorage.setItem("IdUsuario", usuarioId);
                mostrarToast('SUCCESS', '', "Ingreso exitoso");
                actualizarMenu();
                NAV.setRoot("page-inicio");
                NAV.popToRoot();
              
                window.location.hash="no-back-button";
                window.location.hash="Again-No-back-button"
                window.onhashchange=function(){window.location.hash="no-back-button";}
                document. addEventListener("backbutton", function(){}, false);
            }
        })
        .catch(error => console.log(error));
}


}




const registrarUsuario = () => {

    let mensaje = "";
    let usuario = document.querySelector("#txtRegistroUsuario").value;
    let password = document.querySelector("#txtRegistroContrasenia").value;
    let idDepartamento = Number(document.querySelector("#slcDepartamentos").value);
    let idCiudad = Number(document.querySelector("#slcCiudades").value);



    if (usuario.trim().length > 0 && password.trim().length > 0 && !isNaN(idDepartamento) && !isNaN(idCiudad)) {

        if (password.trim().length > 7) {

            let nuevoUsuario = new Usuario(usuario, password, idDepartamento, idCiudad);

            fetch(baseURL + '/usuarios.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoUsuario)
            })
                .then(response => {
                    if (response.status === 200) {
                        limpiarCamposRegistro();
                        mostrarToast('SUCCESS', 'Registro exitoso', "Ya puede iniciar sesion")
                        localStorage.setItem("usuario", usuario);
                        localStorage.setItem("password", password);
                        loguearUsuario();
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.mensaje) {
                        mensaje = data.mensaje;
                        mostrarToast('ERROR', '', mensaje);
                    }
                })
                .catch(error => console.log(error));
        }
        else {
            mensaje = "La contrasenia debe tener al menos 8 caracteres";
        }
    }
    else {
        mensaje = "Revise que no hayan campos vacios"
    }
    mostrarToast('ERROR', '', mensaje);
}

const limpiarCamposRegistro = () => {

    document.querySelector("#txtRegistroUsuario").value = "";
    document.querySelector("#txtRegistroContrasenia").value = "";
    document.querySelector("#slcDepartamentos").value = "";
    document.querySelector("#slcCiudades").value = "";

}

const limpiarCamposLogin = () => {

    document.querySelector("#txtLoginUsuario").value = "";
    document.querySelector("#txtLoginPassword").value = "";

}

const limpiarCamposIngresos = () => {

    document.querySelector("#txtDescripcionIngreso").value = "";
    document.querySelector("#selectRubroIngreso").value = "";
    document.querySelector("#selectMedioIngreso").value = "";
    document.querySelector("#txtTotalIngreso").value = "";
    document.querySelector("#dateIngreso").value = "";

}

const limpiarCamposGastos = () => {

    document.querySelector("#descripcionGasto").value = "";
    document.querySelector("#selectRubroGasto").value = "";
    document.querySelector("#selectMedioPago").value = "";
    document.querySelector("#txtTotalGasto").value = "";
    document.querySelector("#dateGasto").value = "";

}

const CargarRubroGasto = () => {
    document.querySelector("#selectRubroGasto").innerHTML = ``;
    let rubros = [];
    fetch(baseURL + "/rubros.php", {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "apikey": tokenUsuario
        }
    })
        .then(response => response.json())
        .then(data => {

            if (data.mensaje) {
                mensaje = data.mensaje;
                mostrarToast('ERROR', '', mensaje);
            } else if (data.rubros) {
                rubros = data.rubros;
                document.querySelector("#selectRubroGasto").innerHTML = "";
                rubros.forEach(function (value) {
                    if (value.tipo == "gasto") {
                        document.querySelector("#selectRubroGasto").innerHTML += `
                        <ion-select-option value="${value.id}">${value.nombre}</ion-select-option>`
                    }
                })
            }
        })
        .catch(error => console.log(error));
}

const CargarRubroIngreso = () => {
    document.querySelector("#selectRubroIngreso").innerHTML = ``;
    let rubros = [];
    fetch(baseURL + "/rubros.php", {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "apikey": tokenUsuario
        }
    })
        .then(response => response.json())
        .then(data => {

            if (data.mensaje) {
                mensaje = data.mensaje;
                mostrarToast('ERROR', '', mensaje);
            } else if (data.rubros) {
                rubros = data.rubros;
                document.querySelector("#selectRubroGasto").innerHTML = "";
                rubros.forEach(function (value) {
                    if (value.tipo == "ingreso") {
                        document.querySelector("#selectRubroIngreso").innerHTML += `
                        <ion-select-option value="${value.id}">${value.nombre}</ion-select-option>`
                    }
                })
            }
        })
        .catch(error => console.log(error));
}

const agregarGasto = () => {


    let mensaje = "";
    let concepto = document.querySelector("#descripcionGasto").value;
    let categoria = Number(document.querySelector("#selectRubroGasto").value);
    let medio = document.querySelector("#selectMedioPago").value;
    let total = Number(document.querySelector("#txtTotalGasto").value);
    let fecha = document.querySelector("#dateGasto").value;

    if (concepto.trim().length > 0 && medio.trim().length > 0 && fecha !== "") {

        let nuevoGasto = new Gasto(usuarioId, concepto, categoria, medio, total, fecha);
        

        fetch(baseURL + "/movimientos.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': tokenUsuario
            },
            body: JSON.stringify(nuevoGasto)

        })
            .then(response => { return response.json() })
            .then(result => {

                if (result.codigo == 200) {

                    mostrarToast('SUCCESS', 'Ingreso de movimiento', result.mensaje);
                    let idMovimiento = result.idMovimiento;
                    
                    limpiarCamposGastos();

                }

            })
            .catch(error => console.log('error', error));

    }
    else {

        mensaje = "No pueden existir campos sin completar"
    }
    mostrarToast('ERROR', '', mensaje);
   

}



const agregarIngreso = () => {
  
    let mensaje = "";
    let concepto = document.querySelector("#txtDescripcionIngreso").value;
    let categoria = Number(document.querySelector("#selectRubroIngreso").value);
    let medio = document.querySelector("#selectMedioIngreso").value;
    let total = Number(document.querySelector("#txtTotalIngreso").value);
    let fecha = document.querySelector("#dateIngreso").value;


    if (concepto.trim().length > 0 && medio.trim().length > 0 && fecha !== "") {


        let nuevoIngreso = new Ingreso(usuarioId, concepto, categoria, medio, total, fecha);
     

        fetch(baseURL + "/movimientos.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': tokenUsuario
            },
            body: JSON.stringify(nuevoIngreso)

        })
            .then(response => { return response.json() })
            .then(result => {

                if (result.codigo == 200) {

                    mostrarToast('SUCCESS', 'Ingreso de movimiento', result.mensaje);
                    let idMovimiento = result.idMovimiento;
                 
                    limpiarCamposIngresos();

                }

            })
            .catch(error => console.log('error', error));
    }
    else {

        mensaje = "No pueden existir campos sin completar"

    }

    mostrarToast('ERROR', '', mensaje);
   
}


const cargarDepartamentos = () => {

    fetch(baseURL + "/departamentos.php", {

        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })

        .then(response => response.text())

        .then(result => {

            let objetoDevuelto = JSON.parse(result);

            let arrayDepartamentos = objetoDevuelto.departamentos;

           

            for (let i = 0; i < arrayDepartamentos.length; i++) {

                document.querySelector("#slcDepartamentos").innerHTML += `<ion-select-option value= ${arrayDepartamentos[i].id}>  ${arrayDepartamentos[i].nombre}</ion-select-option>`

            }

        })

        .catch(error => console.log('error', error));

}


const cargarCiudades = () => {
    document.querySelector("#slcCiudades").innerHTML = ""
    let idDepartamento = Number(document.querySelector("#slcDepartamentos").value);
   

    fetch(baseURL + '/ciudades.php?idDepartamento=' + idDepartamento, {

        method: 'GET',
        headers: { "Content-Type": "application/json" }

    })
        .then(response => response.text())
        .then(result => {
            let objetoDevuelto = JSON.parse(result);
            let arrayCiudades = objetoDevuelto.ciudades;

            for (let i = 0; i < arrayCiudades.length; i++) {

                document.querySelector("#slcCiudades").innerHTML += `<ion-select-option value= ${arrayCiudades[i].id}>  ${arrayCiudades[i].nombre}</ion-select-option>`

            }

        })

        .catch(error => console.log('error', error));
}


const listarMovimientos = () => {

    document.querySelector("#cardsMovimiento").innerHTML = ``;



    fetch(baseURL + "/movimientos.php?idUsuario=" + usuarioId, {

        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "apikey": tokenUsuario,
        }


    })
        .then(response => { return response.json() })
        .then(result => {

            movimientos = result.movimientos
            document.querySelector("#slcMovimientos").value = "";
            listarTodosLosMovimientos();
        })
        .catch(error => console.log('error', error));

}

const cargarMovimientos = () => {


    let tipoMovimientoSeleccionado = document.querySelector("#slcMovimientos").value;

    switch (tipoMovimientoSeleccionado) {
        case "gastos": listarGastos();
            break;
        case "ingresos": listarIngresos();
            break;
        case "todos": listarTodosLosMovimientos();
            break;
    }

}

const listarGastos = () => {

    let contadorGastos = 0;
    sumaGastos = 0;

    document.querySelector("#cardsMovimiento").innerHTML = ``;

    movimientos.forEach(value => {

        if (value.categoria < 7) { 
            document.querySelector("#cardsMovimiento").innerHTML += `
        <fieldset>
        <ion-card> 
        <ion-card-content id="${value.id}"> 
        <ion-card-header>
            <ion-card-title>Concepto: ${value.concepto}</ion-card-title>
            <ion-card-subtitle>Fecha: ${value.fecha}</ion-card-subtitle>
        </ion-card-header>
    
            Categoria : ${value.categoria} <br/>
            Medio : ${value.medio} <br/>
            Total : ${value.total} <br/>
            <ion-button color="danger" data-idmovimiento="${value.id}" color = "danger" class="btnsEliminar">ELIMINAR</ion-button class="btnEliminar"> 
        </ion-card-content>
        <ion-card> 
        </fieldset>`
            sumaGastos = sumaGastos + value.total
            contadorGastos++;
        }
    })

    document.querySelector("#total").innerHTML = "Total de Gastos por: $" + sumaGastos

    if (contadorGastos === 0) {

        mostrarToast('ERROR', '', "No tiene gastos para mostrar");

    }

    let btnsEliminar = document.querySelectorAll(".btnsEliminar");
    for (let i = 0; i < btnsEliminar.length; i++) {
        btnsEliminar[i].addEventListener("click", eliminarMovimiento);
    }


}


const listarIngresos = () => {

    let contadorIngresos = 0;
    sumaIngresos = 0;
    document.querySelector("#cardsMovimiento").innerHTML = ``;

    movimientos.forEach(value => {

        if (value.categoria >= 7) { 
            document.querySelector("#cardsMovimiento").innerHTML += `
        <fieldset>
        <ion-card > 
        <ion-card-content id="${value.id}"> 
        <ion-card-header>
            <ion-card-title>Concepto: ${value.concepto}</ion-card-title>
            <ion-card-subtitle>Fecha: ${value.fecha}</ion-card-subtitle>
        </ion-card-header>
    
            Categoria : ${value.categoria} <br/>
            Medio : ${value.medio} <br/>
            Total : ${value.total} <br/>
            <ion-button color="danger" data-idmovimiento="${value.id}" color = "danger" class="btnsEliminar">ELIMINAR</ion-button class="btnEliminar"> 
        </ion-card-content>
       <ion-card>
       </fieldset> `;
            sumaIngresos = sumaIngresos + value.total
            contadorIngresos++;
        }
    })

    document.querySelector("#total").innerHTML = "Total de Ingresos por: $" + sumaIngresos

    if (contadorIngresos === 0) {

        mostrarToast('ERROR', '', "No tiene ingresos para mostrar");

    }

    let btnsEliminar = document.querySelectorAll(".btnsEliminar");
    for (let i = 0; i < btnsEliminar.length; i++) {
        btnsEliminar[i].addEventListener("click", eliminarMovimiento);
    }

}


const listarTodosLosMovimientos = () => {
    let contadorMovimientos = 0;
    sumaGastos = 0;
    sumaIngresos = 0;

    document.querySelector("#cardsMovimiento").innerHTML = ``;

    movimientos.forEach(value => {

        document.querySelector("#cardsMovimiento").innerHTML += `
        <fieldset>
      <ion-card> 
      <ion-card-content id="${value.id}"> 
      <ion-card-header>
          <ion-card-title>Concepto: ${value.concepto}</ion-card-title>
          <ion-card-subtitle>Fecha: ${value.fecha}</ion-card-subtitle>
      </ion-card-header>
  
          Categoria : ${value.categoria} <br/>
          Medio : ${value.medio} <br/>
          Total : ${value.total} <br/>
          <ion-button color="danger" data-idmovimiento="${value.id}" color = "danger" class="btnsEliminar">ELIMINAR</ion-button class="btnEliminar"> 
      </ion-card-content>
       </ion-card> 
       </fieldset>`;
        if (value.categoria >= 7) {
            sumaIngresos = sumaIngresos + value.total

        }

        else {
            sumaGastos = sumaGastos + value.total
        }
        contadorMovimientos++;

    })
    let total = sumaIngresos - sumaGastos;

    document.querySelector("#total").innerHTML = `Su saldo total es de $${total}`

    if (contadorMovimientos === 0) {

        mostrarToast('ERROR', '', "No tiene movimientos para mostrar");

    }

    let btnsEliminar = document.querySelectorAll(".btnsEliminar");
    for (let i = 0; i < btnsEliminar.length; i++) {
        btnsEliminar[i].addEventListener("click", (event) => eliminarMovimiento(event));
    }

}

const eliminarMovimiento = (event) => {


    let eliminar = confirm(`Desea eliminar este movimiento?`);

    let idMovParaEliminar = Number(event.target.getAttribute("data-idmovimiento"));

    if (eliminar) {

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("apikey", tokenUsuario);

        let raw = JSON.stringify({
            "idMovimiento": idMovParaEliminar
        });

        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseURL + "movimientos.php?Content-Type=application/json&apikey=" + tokenUsuario, requestOptions)
            .then(response => { return response.json() })
            .then(result => {
                mostrarToast('SUCCESS', '', result.mensaje);
                listarMovimientos();
            })
            .catch(error => console.log('error', error));

    }
}

const iniciarMapa = () => {

    if (map!=undefined) {
        map.remove();
    }


        fetch(baseURL + '/cajeros.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.codigo == 200) {
                    markers = data.cajeros;

                } else {
                    
                    mostrarToast('ERROR', 'Error', "No se pudo cargar el mapa");

                }
            })
            .catch(error => console.log(error));


        map = L.map('map')//l.map es la libreria
        map.setView([posicionUsuario.latitude, posicionUsuario.longitude], 17);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        marker = L.marker([posicionUsuario.latitude, posicionUsuario.longitude], { icon: posicionUsuarioIcon }).addTo(map); 
        let popup = marker.bindPopup("<b>Mi ubicación");
        popup.openPopup();
   


}

function CargarMarkers() {

    let distanciaSeleccionada = 0;
    if (marcadoresCajero.length > 0) {
        

        map.eachLayer(function (layer) {
          

            layer.remove();

        })
        marker = L.marker([posicionUsuario.latitude, posicionUsuario.longitude], { icon: posicionUsuarioIcon }).addTo(map);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        marcadoresCajero.length = 0;
    }

    let disponibleDeposito;
    let disponible;
    let tienePesos;
    let tieneDolares;
    let tienePos;

    for (let i = 0; i < markers.length; i++) {

        distanciaSeleccionada = Number(document.querySelector("#slcDistanciaMapa").value);
        let distance = map.distance([posicionUsuario.latitude, posicionUsuario.longitude], [markers[i].latitud, markers[i].longitud])
        if (distance <= distanciaSeleccionada) {
            marcadoresCajero.push(markers[i]);
        }
    }

    for (let i = 0; i < marcadoresCajero.length; i++) {

        let distance = map.distance([posicionUsuario.latitude, posicionUsuario.longitude], [marcadoresCajero[i].latitud, marcadoresCajero[i].longitud])

        markerCajero = L.marker([marcadoresCajero[i].latitud, marcadoresCajero[i].longitud], { icon: posicionCajeroIcon }).addTo(map);
        if (marcadoresCajero[i].depositos == 1) {
            disponibleDeposito = "Si";
        }
        else {
            disponibleDeposito = "No";
        }
        if (marcadoresCajero[i].disponible == 1) {
            disponible = "Si";
        }
        else {
            disponible = "No";
        }
        if (marcadoresCajero[i].tienePesos == 1) {
            tienePesos = "Si";

        }
        else {
            tienePesos = "No";
        }
        if (marcadoresCajero[i].tieneDolares == 1) {
            tieneDolares = "Si";
        }
        else {
            tieneDolares = "No";
        }
        if (marcadoresCajero[i].pos == 1) {
            tienePos = "Si";
        }
        else {
            tienePos = "No";
        }
        
        let mensajeDistancia;
        if(2001>distance){
            distance = parseInt(distance / 100);
            mensajeDistancia = "cuadras";
         }
            else { 
                distance = (distance / 1000).toFixed(1);
                mensajeDistancia = "Kilometros";
            }

        let popup = markerCajero.bindPopup(`<b>Disponible Para déposito: ${disponibleDeposito} </br><b>Cajero Disponible: ${disponible} </br><b>Pesos Disponibles: ${tienePesos} </br><b>Dólares Disponibles: ${tieneDolares} </br> <b>Tiene Pos: ${tienePos} </br> Distancia :${distance} ${mensajeDistancia}`
        );

    }


}

const cargarPosicionUsuario = () => {

    if (Capacitor.isNativePlatform()) {
        const loadCurrentPosition = async () => {
            const resultado = await Capacitor.Plugins.Geolocation.getCurrentPosition({ timeout: 3000 });
            if (resultado.coords && resultado.coords.latitude) {
                posicionUsuario = {
                    latitude: resultado.coords.latitude,
                    longitude: resultado.coords.longitude
                }
            }
        };
        loadCurrentPosition();
    } else {
        window.navigator.geolocation.getCurrentPosition(
          
            function (pos) {
                if (pos && pos.coords && pos.coords.latitude)
                posicionUsuario = {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                };
            },
            
            function () {
                
            }
        );
    }

}


async function mostrarToast(tipo, titulo, mensaje) {
    const toast = document.createElement('ion-toast');
    toast.header = titulo;
    toast.message = mensaje;
    toast.position = 'bottom';
    toast.duration = 2000;
    if (tipo === "ERROR") {
        toast.color = "danger";
    } else if (tipo === "SUCCESS") {
        toast.color = "success";
    } else if (tipo === "WARNING") {
        toast.color = "warning";
    }

    document.body.appendChild(toast);
    return toast.present();
}

function compartirAplicacion() {
    cerrarMenu();
    if (Capacitor.isNativePlatform()) {
        Capacitor.Plugins.Share.share({
            title: `Aplicacion para finanzas Personales!`,
            text: `¡Te recomiendo esta Aplicación!`,
            url: 'https://dwallet.develotion.com/site/',
            dialogTitle: '¡Gracias!',
        })
    } else {
        mostrarToast('WARNING', 'No disponible', 'Funcionalidad disponible en celulares o tablets');
    }
}
