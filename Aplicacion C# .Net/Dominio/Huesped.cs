using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Dominio
{

    //Creación de la clase Huèsped, con herencia de Usuario, la interfaz IValidable para garantizar la existencia del metodo Validar() y la interfaz IEquatable para definir el Contains por número de documento.
    public class Huesped : Usuario, IValidable, IEquatable<Huesped>
    {
        public string TipoDocumento { get; set; }
        public string NumeroDocumento { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Habitacion { get; set; }
        public string Fidelizacion { get; set; }

        public DateTime FechaNacimiento { get; set; }

        //Constructor con herencia
        public Huesped(string tipoDocumento, string numeroDocumento, string nombre,
            string apellido, string habitacion, string fidelizacion, DateTime fechaNacimiento,
            string email, string contrasenia) :
            base(email, contrasenia)
        {
            TipoDocumento = tipoDocumento;
            NumeroDocumento = numeroDocumento;
            Nombre = nombre;
            Apellido = apellido;
            Habitacion = habitacion;
            Fidelizacion = fidelizacion;
            FechaNacimiento = fechaNacimiento;
        }

        //Métodos
        public void Validar()
        {
            ValidarNombre();
            ValidarApellido();
            ValidarTipoDocumento();
            ValidarNumeroDocumento();
            ValidarHabitacion();
            ValidarFidelizacion();
            ValidaFechaNacimiento();



        }

        //Método para validar String vacío
        public void ValidarStringVacio(string parametro)
        {
            if (string.IsNullOrEmpty(parametro))
            { throw new Exception("Debe completar todos los campos"); }
        }

        //Método para validar que Nombre no sea string vacío
        public void ValidarNombre()
        {
            ValidarStringVacio(Nombre);
        }

        //Método para validar que Apellido no sea string vacío
        public void ValidarApellido()
        {
            ValidarStringVacio(Apellido);
        }

        //Método para validar Tipo de Documento
        public void ValidarTipoDocumento()
        {
            ValidarStringVacio(TipoDocumento);
            TipoDocumento = TipoDocumento.ToLower();

            if (TipoDocumento != "ci" && TipoDocumento != "pasaporte" && TipoDocumento != "otros")
            {
                throw new Exception("El documento solo puede ser : CI, Pasaporte u Otros");
            }
        }

        //Método para validar Número de Documento según los requerimientos y el dígito verificador de la cédula uruguaya.
        public void ValidarNumeroDocumento()
        {

            ValidarStringVacio(NumeroDocumento);

            TipoDocumento = TipoDocumento.ToLower();
            if (TipoDocumento == "ci")
            {
                if (NumeroDocumento.Length != 8)
                {
                    throw new Exception("La cédula debe tener 8 dìgitos");
                }
                else if (NumeroDocumento.Length == 8)
                {
                    int suma = 0;

                    for (int i = 0; i < 7; i++)
                    {
                        suma += (int.Parse("2987634"[i].ToString()) * int.Parse(NumeroDocumento[i].ToString())) % 10;
                    }

                    int digitoVerificador = 0;

                    if (suma % 10 != 0)
                    {
                        digitoVerificador = 10 - suma % 10;
                    }

                    int ultimoDigito = int.Parse(NumeroDocumento[NumeroDocumento.Length - 1].ToString());
                    if (ultimoDigito != digitoVerificador)
                    {
                        throw new Exception("La cédula no es válida");
                    }
                }
            }
        }

        //Método para validar que habitación no sea un string vacío, y sea un número
        public void ValidarHabitacion()
        {
            ValidarStringVacio(Habitacion);
            int number;
            bool isNumber = int.TryParse(Habitacion, out number);
            if (!isNumber) {
                throw new Exception("La habiración debe ser un número");
            }
        }

        public void ValidaFechaNacimiento()
        {
            if (FechaNacimiento > DateTime.Today)
            {
                throw new Exception("La fecha de nacimiento no puede ser mayor a la fecha actual");
            }
        }

        //Método para que fidalización no sea un string vacío, y sea un número del 1 al 4
        public void ValidarFidelizacion()
        {
            ValidarStringVacio(Fidelizacion);
            int fidel = int.Parse(Fidelizacion);

            if (fidel > 4 || fidel < 1)
            {
                throw new Exception("El numero de Fidelizacion debe estar entre 1 y 4");
            }
        }

        //Sobrescritura del Contains para que verifique unicidad por Tipo y Número de Documento
        public bool Equals(Huesped? other)
        {
            return other != null && (TipoDocumento == other.TipoDocumento) && (NumeroDocumento == other.NumeroDocumento);
        }
    }
}
