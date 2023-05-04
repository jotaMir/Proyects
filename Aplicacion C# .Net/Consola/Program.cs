using Dominio;
using System.Globalization;
using System.Runtime.CompilerServices;
using System.Security.Cryptography.X509Certificates;

namespace Consola
{
    internal class Program
    {
        // Creación de Sistema mediante Instancia siguiendo el patrón Singleton
        static private Sistema _sistema = Sistema.Instancia;

        static void Main(string[] args)
        {
            // Try y catch para controlar validaciones con la precarga.
            try
            {
                _sistema.Precargar();
                Iniciar();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        //Método para mostrar el menú y acceder a sus diferentes métodos.
        static void Iniciar()
        {
            int opcion = 1;
            do
            {
                if (opcion != 0)
                {
                    MostrarMenu("Seleccionar (del 1 al 6):\n1-Listar Actividades\n2-Listar Proveedores Alfabeticamente\n3-Listar Actividad Segun Fecha y Costo\n" +
                        "4-Establecer Valor de Promoción\n5-Alta de Huespedes\n6-Mostrar Agenda\n" +
                        "0-Salir");
                    try
                    {
                        opcion = PedirNumero();
                        switch (opcion)
                        {
                            case 1:
                                ListarActividades();
                                break;
                            case 2:
                                ListarProveedores();
                                break;
                            case 3:
                                ActividadSegunFechaYCosto();
                                break;
                            case 4:
                                ValorDePromocion();
                                break;
                            case 5:
                                AltaDeHuespedes();
                                break;
                            case 6:
                                MostrarAgenda();
                                break;
                            default:
                                break;
                        }
                    }
                    catch (Exception)
                    {
                        Console.WriteLine("Ingrese una opción válida\n");
                    }

                }
            } while (opcion != 0);

            MostrarFinPrograma();
        }

        //Método que muestra el texto del menú
        static void MostrarMenu(string texto)
        {
            Console.WriteLine(texto);
        }

        //Metodo para mostrar el final del programa
        static void MostrarFinPrograma()
        {
            Console.WriteLine("Programa Finalizado");
        }

        //Método para pedir número de acuerdo al switch del menú
        static int PedirNumero()
        {
            Console.WriteLine("Ingrese un numero entre 1 y 6 o cero para terminar");
            int numero = int.Parse(Console.ReadLine());
            ControlarNumero(numero);
            return numero;
        }
        //Método para controlar el ingreso de los números del menú
        static void ControlarNumero(int numero)
        {
            if (numero > 6 || numero < 0)
            {
                MensajeErrorNumeros();
            }
        }

        //Método para mostrar el error en el ingreso de los números del menú
        static void MensajeErrorNumeros()
        {
            Console.WriteLine("Debe ingresar un numero entre 1 y 6\n");
        }

        //METODOS DEL MENÚ

        //Método Listar Actividades
        static void ListarActividades()
        {
            Console.WriteLine("Listado de Actividades: ");


            foreach (Actividad item in _sistema.Actividades)
            {
                Console.WriteLine(item);
            }
        }

        //Metodo para listar proveedores ordenados usando la lista ordenada creada en Sistema.
        static void ListarProveedores()
        {

            Console.WriteLine("Listado de Proveedores: ");

            foreach (Proveedor item in _sistema.ProveedoresOrdenados())
            {
                Console.WriteLine("-" + item);

            }

        }

        //Metodo para listar Actividad según fecha y costo, usando la lista ordenada creada en Sistema.
        static void ActividadSegunFechaYCosto()
        {
            Console.WriteLine("LISTADO SEGUN FECHA Y COSTO\n");

            DateTime fecha1;
            DateTime fecha2;
            decimal costo;


            try
            {
                fecha1 = Utilidades.PedirFechaActividad();
                fecha2 = Utilidades.PedirFechaActividadHasta(fecha1);
                costo = Utilidades.PedirCosto();

                foreach (Actividad item in _sistema.ListarActividadesFechaCosto(fecha1, fecha2, costo))
                {
                    Console.WriteLine("Costo de la actividad: " + item.Costo);
                    Console.WriteLine(item);
                }
            }
            catch (Exception)
            {
                return;
            }

        }

        //Método para establecer valor de promoción de un proveedor seleccionada
        static void ValorDePromocion()
        {
            Proveedor proveedor = SeleccionarProveedor();

            string nuevoDescuento = Utilidades.PedirNuevoValorDescuento();
            int result;
            if (int.TryParse(nuevoDescuento, out result))
            {
                proveedor.Descuento = nuevoDescuento;
                Console.WriteLine("El valor se modifico correctamente\n");
            }
            else
            {
                Console.WriteLine("El valor ingresado no es valido");
            }
        }

        //Método para seleccionar el proveedor por ID.
        static Proveedor SeleccionarProveedor()
        {
            Proveedor proveedor = null;
            ListarProveedores();
            do
            {
                try
                {
                    Console.WriteLine("Seleccione el proveedor al que desea modificarle su valor promocional por el numero de ID\n");
                    int opcion = int.Parse(Console.ReadLine());

                    proveedor = _sistema.ObtenerProveedorPorId(opcion);

                    if (proveedor == null)
                    {
                        Console.WriteLine("El proveedor seleccionado no existe - Ingrese Nuevamente ");

                    }
                }
                catch (Exception)
                {
                    Console.WriteLine("La opcion ingresada no es valida");
                }
            }
            while (proveedor == null);

            Console.WriteLine("Proovedor seleccionado:\n" + proveedor);

            return proveedor;
        }

        //Método para dar de Alta un Huésped con validación línea a línea.
        static void AltaDeHuespedes()
        {
            Console.WriteLine("ALTA DE HUESPED\n");
            string tipoDocumento = "";
            string numeroDocumento = "";
            string nombre = "";
            string apellido = "";
            string habitacion = "";
            string fidelizacion = "";
            DateTime fechaDeNacimiento;
            string email = "";
            string contrasenia = "";

            try
            {
                tipoDocumento = Utilidades.PedirTipoDocumento(); //Validacion linea a linea
                numeroDocumento = Utilidades.PedirNumeroDocumento(tipoDocumento);
                ValidarNumeroDocNoRepetido(numeroDocumento);
                nombre = Utilidades.PedirStringAlta("Ingrese el nombre");
                apellido = Utilidades.PedirStringAlta("Ingrese el apellido");
                habitacion = Utilidades.PedirHabitacionAlta();
                fidelizacion = Utilidades.PedirFidelizacion();
                fechaDeNacimiento = Utilidades.PedirFechaNacimiento();
                email = Utilidades.PedirEmail();
                contrasenia = Utilidades.PedirContrasenia();

                Usuario unHuesped = new Huesped(tipoDocumento, numeroDocumento, nombre, apellido, habitacion, fidelizacion, fechaDeNacimiento, email, contrasenia);

                try
                {
                    Console.WriteLine("Ingresando...\n");
                    _sistema.AgregarUsuario(unHuesped); // Aqui se valida el huésped con las validaciones de la clase, que están en el                                          método AgregarUsuario() en Sistema
                    Console.WriteLine("El huesped ha sido registrado correctamente\n");
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message); 
                }

            }
            catch (Exception)
            {
                return;
            }
        }

        //Método que valida la unicidad del documento, en la validación línea a línea del Alta de Huésped
        static void ValidarNumeroDocNoRepetido(string numeroDocumento)
        {
            if (_sistema.ObtenerHuespedPorCedula(numeroDocumento) != null)
            {
                Console.WriteLine("Ya existe un usuario con ese documento\n");
                throw new Exception("Ya existe un usuario con ese documento");
            }
        }

        //Método para mostrar la Agenda.
        static void MostrarAgenda()
        {
            Console.WriteLine("Agenda: ");
            int numeroAgenda = 1;

            foreach (Agenda item in _sistema.Agenda)
            {
                Console.WriteLine(numeroAgenda + "-" + item);
                numeroAgenda++;
            }
        }

    }
}





