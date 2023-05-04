using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio
{
    //Creación de la clase Usuario, con la interfaz IValidable para garantizar la existencia del método Validar(), y la interfaz IEquatable para que Conntains verifique por el Email
    public abstract class Usuario: IValidable, IEquatable<Usuario>
    {
        public string Email { get; set; }
        public string Contrasenia { get; set; }
       
        //Constructor
        public Usuario(string email, string contrasenia)
        {
            Email = email;
            Contrasenia = contrasenia;
        }

        //Método validar
        public void Validar()
        {
            validarEmail();
            validarContrasenia();
        }

        //Método para validar Email según los requerimientos
        public void validarEmail()
        {
            
            if (Email.Contains("@") && Email.IndexOf("@") > 0 && Email.LastIndexOf("@") < Email.Length - 1)
            {
                
            }
            else
            {
                throw new Exception("La dirección de correo electrónico no es válida.");
            }
            
        }

        // Método para validar Contraseña según los requerimientos
        public void validarContrasenia()
        {
            if ( Contrasenia.Length < 8)
            {
                throw new Exception("La Contraseña debe contener al menos 8 caracteres");
            }
 
        }

        // Definición del Contains por Email
        public bool Equals(Usuario? other) 
        {
            return other != null && Email == other.Email;
        }

    }
}
