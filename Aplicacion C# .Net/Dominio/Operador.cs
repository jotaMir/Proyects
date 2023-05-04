using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio

{
    //Creación de la clase Operador, con herencia de Usuario, la interfaz IValidable para garantizar la existencia del método Validar() y la interfaz IEquatable para definir el Contains por Email.
    public class Operador : Usuario, IEquatable<Operador>, IValidable
    {


        public Operador(string email, string contrasenia) :
            base(email, contrasenia)
        {

        }

        //Método Validar
        public void Validar()
        {
            validarEmail();
            validarContrasenia();
        }

        //Método para validar el Email de acuerdo con los requerimientos.
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

        //Método para validar la contraseña de acuerdo con los requerimientos.
        public void validarContrasenia()
        {
            if (Contrasenia.Length < 8)
            {
                throw new Exception("La Contraseña debe contener al menos 8 caracteres");
            }
        }

        // Definición del Contains por Email
        public bool Equals(Operador? other)
        {
            return other != null && Email == other.Email;
        }
    }
}
