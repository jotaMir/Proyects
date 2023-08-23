import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

const baseURL = 'https://censo.develotion.com/';

const Login = ({ datosLogin }) => {
  let navigate = useNavigate (); 

  useEffect (() => {
    if(localStorage.length > 0)
    navigate("/Dashboard");
  }, [])
  const usuario = useRef(null);
  const contrasenia = useRef(null);
  const [errorLogin, setError] = useState(false);
  const [camposCompletos, setCamposCompletos] = useState(false); 
  const verCamposCompletos= () => {
    setCamposCompletos(!!usuario.current.value && !!contrasenia.current.value);
  };
  
  const tomarDatos = () => {
    let usuarioLogin = {
      usuario: usuario.current.value,
      password: contrasenia.current.value
    };

    fetch(baseURL + 'login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuarioLogin)
    })
      .then(response => response.json())
      .then(data => {
        if (data.mensaje) {       
          setError(true);
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
            <div className="col-lg-4 d-none d-lg-flex">
                <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" alt="Trendy Pants and Shoes"
                     className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5" />
            </div>
            <div className="col-lg-8">
                <div className="card-body py-5 px-md-5">
                    <h1>Censo 2023!</h1>
                    <form method="Post" onChange={verCamposCompletos}>
                        <div className="form-outline mb-4">
                            <input type="text" id="txtUsuarioLogin" className="form-control" ref={usuario}/>
                            <label className="form-label" htmlFor="txtUsuariologin">Usuario</label>
                        </div>
                        <div className="form-outline mb-4">
                            <input type="password" id="txtContraseniaLogin" name="contrasenia" className="form-control" ref={contrasenia}/>
                            <label className="form-label" htmlFor="txtContraseniaLogin">Contraseña</label>
                        </div>                     
                        <input type="button"  onClick={tomarDatos} className="btn btn-primary btn-block mb-4" value = "Ingresar" disabled={!camposCompletos}/></form>

                    <p className="lead mt-6">Si aún no tienes una cuenta, <Link to = "/registro" >regístrate aquí</Link> </p>
                    {errorLogin && <p className="p-2 bg-danger text-white">Usuario y/o contraseña incorrectos</p>}
                </div>            
            </div>
        </div>
    </div>
</div>
    )
}

export default Login


