using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.NetworkInformation;
using System.Reflection.Metadata;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Consola
{
    //Creación de la clase Utilidades para auxiliar en las validaciones y mensajes mostrados en Consola. Todos los métodos finalizan si se pulsa 0, retornando al menú principal
    public static class Utilidades
    {
        //Método para perdir string, y validar que no sea nula o vacía.
        public static string PedirString(string mensaje)
        {
            string textoPedido;
            do
            {
                Console.WriteLine(mensaje);
                textoPedido = Console.ReadLine();
                if (string.IsNullOrEmpty(textoPedido))
                {
                    Console.WriteLine("Debe ingresar el dato requerido");
                }

            } while (string.IsNullOrEmpty(textoPedido));
            return textoPedido;
        }

        //Méotodo para pedir la fecha "Desde", validarla, y mostrar los mensajes según corresponda.
        public static DateTime PedirFechaActividad() {

            string mensaje = "Ingrese fecha desde en el siguiente formato yyyy/MM/dd"; 
            int number;
            string fecha = PedirString(mensaje);
            if (fecha == "0")
            {
                throw new Exception();
            }
            bool isNumber = int.TryParse(fecha, out number);
            DateTime fechaConvertida = DateTime.MinValue;
            try
            {
                //Convertir el string a fecha
                fechaConvertida = DateTime.ParseExact(fecha, "yyyy/MM/dd", CultureInfo.InvariantCulture);
            }
            
            catch (Exception)
            {
                Console.WriteLine("La fecha ingresada no es valida");
                PedirFechaActividad();  
            }
            return fechaConvertida;
        }

        //Método para pedir la fecha "Hasta", validarla internamente y de acuerdo a la fecha "Desde", y mostrar los mensajes según corresponda.
        public static DateTime PedirFechaActividadHasta(DateTime fecha)
        {

            string mensaje = "Ingrese fecha hasta en el siguiente formato yyyy/MM/dd";
            int number;
            string fechaHasta = PedirString(mensaje);
            if (fechaHasta == "0")
            {
                throw new Exception();
            }
            bool isNumber = int.TryParse(fechaHasta, out number);
            DateTime fechaConvertida = DateTime.MinValue;
            try
            {   //Convierte el string a fecha
                fechaConvertida = DateTime.ParseExact(fechaHasta, "yyyy/MM/dd", CultureInfo.InvariantCulture);
                if (fechaConvertida < fecha) 
                {
                    Console.WriteLine("Fecha desde no puede ser menor que fecha hasta");
                    PedirFechaActividad();
                }
                return fechaConvertida;
            }

            catch (Exception)
            {
                Console.WriteLine("La fecha ingresada no es valida");
                return PedirFechaActividadHasta(fecha);
            }
        }

        //Método para pedir costo, y validar que se ingresen números.
        public static decimal PedirCosto()
        {
            string mensaje = "Ingrese un costo (se mostraran todas las actividades con costo mayor al ingresado, en forma descendente)\n";
            string costo = PedirString(mensaje);
            decimal numero;
            bool esNumero = decimal.TryParse(costo, out numero);
            if (costo == "0")
            {
                throw new Exception();
            }
             if(esNumero == false)
            {
                Console.WriteLine("Debe ingresar numeros");
                return PedirCosto();
            }
            decimal costoConvertido = int.Parse(costo);
            return costoConvertido;
        }

        //Método para pedir Tipo de Documento y garantizar que se ingrese el dato solicitado.
        public static string PedirTipoDocumento()
        {
            string mensaje = "Ingrese el tipo de Documento (El documento solo puede ser : CI, Pasaporte u Otros. 0 para salir)";

            string tipoDocumento = PedirString(mensaje);
            tipoDocumento = tipoDocumento.ToLower();
            if (tipoDocumento == "0")
            {
                throw new Exception();
            }
            if (tipoDocumento == "ci" || tipoDocumento == "pasaporte" || tipoDocumento == "otros")
            { return tipoDocumento; }

            return PedirTipoDocumento();
        }

        //Método para pedir Número de documento, validarlo, y mostrar los mensajes según corresponda.
        public static string PedirNumeroDocumento(string tipoDocumento)
        {
            string mensaje = "Ingrese el numero de Documento. 0 para salir";
            string numeroDocumento = PedirString(mensaje);
            int numero;
            bool esNumero = int.TryParse(numeroDocumento, out numero);

            if (numeroDocumento == "0")
            {
                throw new Exception();
            }
            numeroDocumento = numeroDocumento.ToLower();

            if (tipoDocumento == "ci")
            {   //Validación de la longitud de la cédula
                if (numeroDocumento.Length != 8)
                {
                    Console.WriteLine("La cédula debe tener 8 dìgitos y ser solo numeros");
                    return PedirNumeroDocumento(tipoDocumento);
                }

                if (!esNumero)
                {
                    return PedirNumeroDocumento(tipoDocumento);
                }

                if (numeroDocumento.Length == 8) //Validación de la cédula uruguaya
                {
                    int suma = 0;

                    for (int i = 0; i < 7; i++)
                    {
                        suma += (int.Parse("2987634"[i].ToString()) * int.Parse(numeroDocumento[i].ToString())) % 10;
                    }

                    int digitoVerificador = 0;

                    if (suma % 10 != 0)
                    {
                        digitoVerificador = 10 - suma % 10;
                    }

                    int ultimoDigito = int.Parse(numeroDocumento[numeroDocumento.Length - 1].ToString());
                    if (ultimoDigito != digitoVerificador)
                    {
                        Console.WriteLine("La cédula no es válida");
                        return PedirNumeroDocumento(tipoDocumento);
                        
                    }
                    return numeroDocumento;
                }
                 
            } //Validación de Pasaporte y Otros
            if (tipoDocumento == "pasaporte" || tipoDocumento == "otros")
            {
                int number;
                bool isNumber = int.TryParse(numeroDocumento, out number);
                if (isNumber)
                {
                    return numeroDocumento;
                }
                else {
                    Console.WriteLine("Debe ingresar numeros");
                    return PedirNumeroDocumento(tipoDocumento);
                }

            }
            return PedirNumeroDocumento(tipoDocumento);
        }

        //Método para pedir Nombre y Apellido en Alta de huésped, y validar que nos sean vacíos.
        public static string PedirStringAlta(string mensaje)
        {
            string textoPedido;

            do
            {
                Console.WriteLine(mensaje);
                textoPedido = Console.ReadLine();
                if (textoPedido == "0")
                {
                    throw new Exception();
                }
                if (string.IsNullOrEmpty(textoPedido))
                {
                    Console.WriteLine("Debe ingresar el dato requerido");
                }

            } while (string.IsNullOrEmpty(textoPedido));
            return textoPedido;
        }

        //Método paa pedir habitación, validar que se ingrese un número y que no sea vacío.
        public static string PedirHabitacionAlta()
        {
            int number;
            string mensaje = "Ingrese el numero de habitacion";
            string habitacion = PedirString(mensaje); ;
            bool isNumber = int.TryParse(habitacion, out number);


            if (habitacion == "0")
            {
                throw new Exception();
            }
            if (string.IsNullOrEmpty(habitacion))
            {
                Console.WriteLine("Debe ingresar el dato requerido");
            }
            if (!isNumber)
            {
                Console.WriteLine("Debe ingresar numeros");
                return PedirHabitacionAlta();
            }
            return habitacion;
        }

        //Método para pedir fidelización, validar que sea un número del 1 al 4 y no sea vacío
        public static string PedirFidelizacion()
        {
            string fidelizacion = "";
            string mensaje = "Ingrese fidelización (1 al 4)";
            int number;
            fidelizacion = PedirString(mensaje);
            bool isNumber = int.TryParse(fidelizacion, out number);

            if (fidelizacion == "0")
            {
                throw new Exception();
            }
            if (!isNumber)
            {
                Console.WriteLine("Debe ingresar numeros");
                return PedirFidelizacion();
            }
            if (int.Parse(fidelizacion) < 1 || int.Parse(fidelizacion) > 4)
                {
                    Console.WriteLine("Fidelizacion debe ser un numero del 1 al 4");
                    return PedirFidelizacion();
                }
            return fidelizacion;
        }

        //Método para pedir Fecha de nacimiento, validar que tenga el formato correcto y que no sea posterior a la fecha actual.
        public static DateTime PedirFechaNacimiento()
        {
            string mensaje = "Ingrese la fecha de nacimiento en el siguiente formato yyyy/MM/dd";
            int number;
            string fechaNacimiento = PedirString(mensaje);
            if (fechaNacimiento == "0")
            {
                throw new Exception();
            }
            bool isNumber = int.TryParse(fechaNacimiento, out number);
            DateTime fechaConvertida = DateTime.MinValue;
            try
            {
                fechaConvertida = DateTime.ParseExact(fechaNacimiento, "yyyy/MM/dd", CultureInfo.InvariantCulture);
                if (fechaConvertida > DateTime.Today)
                {
                    Console.WriteLine("La fecha de nacimiento debe ser posterior a la fecha de hoy");
                    PedirFechaNacimiento();
                }
            }
            catch (Exception)
            {
                Console.WriteLine("La fecha ingresada no es valida");
                PedirFechaNacimiento();
            }
            return fechaConvertida;
        }

        //Métddo para pedir nuevo valor de promoción y validar que sea un número entre 0 y 100.
        public static string PedirNuevoValorDescuento()
        {
            int nuevoValorPromocion = -1;
            do
            {
                try
                {
                    Console.WriteLine("Ingrese el nuevo valor de promocion (entre 0 y 100)\n");
                    nuevoValorPromocion = int.Parse(Console.ReadLine());

                    if (nuevoValorPromocion < 0 || nuevoValorPromocion > 100)
                    {
                        Console.WriteLine("El Valor ingresado debe ser entre 0 y 100 ");
                    }

                }
                catch (Exception)
                {
                    Console.WriteLine("El Valor ingresado debe ser un numero");
                }
            }
            while (nuevoValorPromocion < 0 || nuevoValorPromocion > 100);
            return Convert.ToString(nuevoValorPromocion);
        }

        // Método para pedir el Email, validarlo y mostrar los mensajes según corresponda.
        public static string PedirEmail()
        {
            string mensaje = "Ingrese el Email";

            string email = PedirString(mensaje).ToLower();
            
            if (email == "0")
            {
                throw new Exception();
            }

            if (email.IndexOf('@') < 1 || email.LastIndexOf('@') == email.Length - 1) { 
                 Console.WriteLine("El email ingresado no es valido");
                PedirEmail();
            }
            return email;
        }
        // Método para pedir contraseña, validarla y mostrar los mensajes según corresponda.
        public static string PedirContrasenia()
        {
            string mensaje = "Ingrese la contraseña";

            string contrasenia = PedirString(mensaje);
            if (contrasenia == "0")
            {
                throw new Exception();
            }

             if (contrasenia.Length < 8) { 
                 Console.WriteLine("Contraseña muy corta, debe contener al menos 8 caracteres");
                 PedirContrasenia();
            }
            return contrasenia;
        }

       
    }

}