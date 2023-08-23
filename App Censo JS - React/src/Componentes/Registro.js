import { useRef, useState, useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';


const baseURL = 'https://censo.develotion.com/';


const Registro = () => {
    let navigate = useNavigate (); 

    useEffect (() => {
      if(localStorage.length > 0)
      navigate("/Dashboard");
    }, [])
    const dispatch = useDispatch() ; 
    const [errorRegistro, setError] = useState(false);
    const [mensaje, setMensaje] = useState(false);    
    const [mensajeExito, setMensajeExito] = useState(false);  

   
    const usuario = useRef(null);
    const contrasenia = useRef(null);
    
    const tomarDatos = () => {
        if (
            usuario.current && usuario.current.value != "" &&
            contrasenia.current && contrasenia.current.value != "") {
            let usuarioRegistro = {
                usuario: usuario.current.value,
                password: contrasenia.current.value
                
              }  
              registrarNuevaPersona(usuarioRegistro);
            }
            else{
              setError(false);
              setMensaje(true); 
      
            }  
        }
const registrarNuevaPersona = (usuarioRegistro) => {
                        setError(false);
                        setMensaje(false);
                        setMensajeExito(false)
          fetch(baseURL + 'usuarios.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarioRegistro)
        })
        .then(response => {
                    if (response.status === 200) {
                    
                        setError(false);
                        setMensaje(false);
                        setMensajeExito(true)
                        dispatch(Login(usuarioRegistro))
                        Login(usuarioRegistro);              
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.mensaje) {
                        setError(true);
                        setMensaje(false);
                    }
                })
                .catch(error => console.log(error));
        };
       
        const Login = (usuario) => {
           
              fetch(baseURL + 'login.php', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
              })
                .then(response => response.json())
                .then(data => {
                  if (data.mensaje) {
                  } else if (data) {
                    localStorage.setItem("token", data.apiKey);
                    localStorage.setItem("IdUsuario", data.id);                    
                    navigate("/dashboard");
                  }
                })
                .catch(error => console.log(error));
            };

    return (
   
<div className="Container-fluid">
    <div className="card mb-3">
        <div className="row g-0 d-flex align-items-center">
            <div className="col-lg-4 d-none d-lg-flex fade show">
                <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/011.jpg" alt="Trendy Pants and Shoes"
                     className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5 img-fluid" />
            </div>
        
            <div className="col-lg-8">
                <div className="card-body py-5 px-md-5">

                    <h2>Para Registrarse debes ingresar un usuario y una contraseña nueva</h2>

                    <form method="Post">
                        <div className="form-outline mb-4">
                            <input type="text" id="txtUsuarioLogin" className="form-control" ref={usuario}/>
                            <label className="form-label" htmlFor="txtUsuariologin">Nuevo Usuario</label>
                        </div>
                        <div className="form-outline mb-4">
                            <input type="password" id="contrasenia" name="contrasenia" className="form-control" ref={contrasenia} />
                            <label className="form-label" htmlFor="contrasenia">Ingrese una Contraseña</label>
                        </div>                     
                        <input type="button"  onClick={tomarDatos} className="btn btn-primary btn-block mb-4" value = "Registrarse"/>
                    </form>
                    {mensaje && <p className="p-2 bg-danger text-white">Debe Completar Todos los Campos</p>}
                    {errorRegistro && <p className="p-2 bg-danger text-white">Usuario ya existente - Elija Otro</p>}
                    {mensajeExito && <p className="p-2 bg-success text-white">Registro Exitoso</p>}

                    <p className="lead mt-6"> <Link to = "/" >Volver al login</Link> </p>
                </div>
            </div>
        </div>
    </div>
</div>
    )
}

export default Registro