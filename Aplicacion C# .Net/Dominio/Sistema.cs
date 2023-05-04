using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Intrinsics.X86;
using System.Text;
using System.Threading.Tasks;

namespace Dominio
{
    public class Sistema
    {

        //Creaciòn de listas, todas privadas.
        private List<Usuario> _usuarios = new List<Usuario>();
        private List<Actividad> _actividades = new List<Actividad>();
        private List<Proveedor> _proveedores = new List<Proveedor>();
        private List<Agenda> _agenda = new List<Agenda>();

        //Patron Singleton
        private static Sistema _instancia = null;
        public static Sistema Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new Sistema();
                }
                return _instancia;
            }
        }
        private Sistema()
        {
        }

        // Para acceder a las listas, pero no modificarlas.
        public List<Usuario> Usuarios
        {
            get { return _usuarios; }
        }
        public List<Actividad> Actividades
        {
            get { return _actividades; }
        }
        public List<Proveedor> Proveedores
        {
            get { return _proveedores; }
        }
        public List<Agenda> Agenda
        {
            get { return _agenda; }
        }

        // Precarga de datos
        public void Precargar()
        {
            PrecargarDatosUsuarios();
            PrecargarProveedores();
            PrecargarActividades();
            PrecargarAgenda();
        }

        //Precarga de dos huéspedes y un operador
        private void PrecargarDatosUsuarios()
        {
            //Dos huespedes
            DateTime fecha = new DateTime(1989, 01, 06);
            Usuario unHuesped1 = new Huesped("ci", "46112136", "Jonatan", "Miranda", "1", "3", fecha, "Huesped1@ort", "11223344");
            AgregarUsuario(unHuesped1);

            DateTime fecha2 = new DateTime(1986, 11, 29);
            Usuario unHuesped2 = new Huesped("ci", "46112142", "Alvaro", "Perez", "7", "4", fecha2, "Huesped2@ort", "11223344");
            AgregarUsuario(unHuesped2);

            //Un operador
            Usuario unOperador = new Operador("roberto@gmail.com", "11223344");
            AgregarUsuario(unOperador);

        }

        //Metodo para validar el ususario según su clase y validaciones internas, validar la unicidad de Documento e Email y luego agregarlo a la lista 
        public void AgregarUsuario(Usuario usuario)
        {
            if (usuario == null)
            {
                throw new Exception("El usuario recibido no es vàlido.");
            }
            if (usuario is Huesped) //Casteo hacia abajo para acceder a las validaciones de Huésped.
            {
                Huesped huesped = (Huesped)usuario;
                huesped.Validar(); //Validación del Huésped
                if (ListaHuespedes().Contains(huesped)) // Validación unicidad del Documento usando el Equals definido en Huésped
                { throw new Exception("Ya existe un Huésped con este documento\n"); }
                if (_usuarios.Contains(huesped))// Validacion unicidad del Email usando el Equals definido en Usuario
                {
                    throw new Exception("Ya existe un usario con ese correo\n");
                }
                _usuarios.Add(huesped); // Agrega el huésped
            } else if (usuario is Operador) //Casteo hacia abajo para acceder a las validaciones de Operador.
            {
                Operador operador = (Operador)usuario;
                operador.Validar(); // Validacion del Operador
                 if (_usuarios.Contains(operador))//  Validacion unicidad del Email usando el Equals definido en Usuario
                {
                    throw new Exception("Ya existe un usario con ese correo");
                    }
               _usuarios.Add(operador); // Agrega el operador
            }
        }

        //Precarga de Proveedores según los requerimientos
        public void PrecargarProveedores()
        {
            Proveedor proveedor1 = new Proveedor("DreamWorks S.R.L.", "23048549", "Suarez 3380 Apto 304", "10");
            AgregarProveedor(proveedor1);
            Proveedor proveedor2 = new Proveedor("Estela Umpierrez S.A.", "33459678", "Lima 2456", "7");
            AgregarProveedor(proveedor2);
            Proveedor proveedor3 = new Proveedor("TravelFun", "29152020", "Misiones 1140", "9");
            AgregarProveedor(proveedor3);
            Proveedor proveedor4 = new Proveedor("Rekreation S.A.", "29162019", "Bacacay 1211", "11");
            AgregarProveedor(proveedor4);
            Proveedor proveedor5 = new Proveedor("Alonso & Umpierrez", "24051920", "18 de Julio 1956 Apto 4", "10");
            AgregarProveedor(proveedor5);
            Proveedor proveedor6 = new Proveedor("Electric Blue", "26018945", "Cooper 678", "5");
            AgregarProveedor(proveedor6);
            Proveedor proveedor7 = new Proveedor("Lúdica S.A.", "26142967", "Dublin 560", "4");
            AgregarProveedor(proveedor7);
            Proveedor proveedor8 = new Proveedor("Gimenez S.R.L.", "29001010", "Andes 1190", "7");
            AgregarProveedor(proveedor8);
            Proveedor proveedor9 = new Proveedor("Fernandez S.R.L", "22041120", "Agraciada 2512 Apto. 1", "8");
            AgregarProveedor(proveedor9);
            Proveedor proveedor10 = new Proveedor("Norberto Molina", "22001189", "Paraguay 2100", "9");
            AgregarProveedor(proveedor10);
        }

        //Metodo para validar el Proveedor, asegurarse que no sea nulo, y que su nombre sea único.
        private void AgregarProveedor(Proveedor proveedor)
        {
            if (proveedor == null)
            {
                throw new Exception("El proveedor recibido no es vàlido.");
            }
            if (_proveedores.Contains(proveedor)) // Validación unicidad del Nombre de Proveedor utilizando el Equals definido en Proveedor.
            {
                throw new Exception($"El proveedor {proveedor.Nombre} ya existe."); 
            }
            proveedor.Validar();
            _proveedores.Add(proveedor);
        }

        //Precarga de Actividades
        private void PrecargarActividades()
        {
            //ACTIVIDADES HOSTEL

            //1
            DateTime fecha = new DateTime(2023, 06, 01);
            DateTime fechaConfirmacion = new DateTime(2023, 05, 25);
            Actividad actividad1 = new Actividad_Hostel("Cabalgata", "Cabalgata a la tarde", fecha, 15, 12, "Actividad_Hostel", "Luis Dentone", "Pradera del Hostel", true); // Actividad cargada sin costo para verificar que entra con costo 0.
            AgregarActividad(actividad1);
            //2
            DateTime fecha2 = new DateTime(2023, 06, 02);
            DateTime fechaConfirmacion2 = new DateTime(2023, 05, 25);
            Actividad actividad2 = new Actividad_Hostel("Piscina", "Actividades en Piscinas climatizadas", fecha2, 20, 10, "Actividad_Hostel",
                "Ricardo Dentone", "Piscinas del Hostel", false, 400);
            AgregarActividad(actividad2);
            //3
            DateTime fecha3 = new DateTime(2023, 06, 03);
            DateTime fechaConfirmacion3 = new DateTime(2023, 05, 25);
            Actividad actividad3 = new Actividad_Hostel("Kayak", "Kayak en el Rio", fecha3, 5, 18, "Actividad_Hostel",
                "Maximo Dentone", "Rio lindero al Hostel", true, 150);
            AgregarActividad(actividad3);
            //4
            DateTime fecha4 = new DateTime(2023, 06, 04);
            DateTime fechaConfirmacion4 = new DateTime(2023, 05, 25);
            Actividad actividad4 = new Actividad_Hostel("Kayak", "Kayak en el Rio", fecha4, 5, 18, "Actividad_Hostel",
                "Fernando Dentone", "Rio lindero al Hostel", true, 100);
            AgregarActividad(actividad4);
            //5
            DateTime fecha5 = new DateTime(2023, 06, 05);
            DateTime fechaConfirmacion5 = new DateTime(2023, 05, 25);
            Actividad actividad5 = new Actividad_Hostel("Padel", "Padel en Cancha del Hostel", fecha5, 4, 15, "Actividad_Hostel",
                "Ricardo Dentone", "Cancha Cerrada del Hostel", false, 200);
            AgregarActividad(actividad5);
            //6
            DateTime fecha6 = new DateTime(2023, 06, 06);
            DateTime fechaConfirmacion6 = new DateTime(2023, 05, 25);
            Actividad actividad6 = new Actividad_Hostel("Merienda para dos", "Merienda en cafeteria del Hostel", fecha6, 30, 1, "Actividad_Hostel",
                "Nelson Dentone", "Cafeteria", false, 500);
            AgregarActividad(actividad6);
            //7
            DateTime fecha7 = new DateTime(2023, 06, 07);
            DateTime fechaConfirmacion7 = new DateTime(2023, 05, 25);
            Actividad actividad7 = new Actividad_Hostel("Caminata", "Recorrida por la ciudad", fecha7, 10, 15, "Actividad_Hostel",
                "Roberto Dentone", "Afueras del Hostel", true, 100);
            AgregarActividad(actividad7);
            //8
            DateTime fecha8 = new DateTime(2023, 06, 08);
            DateTime fechaConfirmacion8 = new DateTime(2023, 05, 25);
            Actividad actividad8 = new Actividad_Hostel("Museo", "Visita al museo de la ciudad", fecha8, 20, 18, "Actividad_Hostel",
                "Juan Dentone", "Museo de la Ciudad", false, 1001);
            AgregarActividad(actividad8);
            //9
            DateTime fecha9 = new DateTime(2023, 06, 09);
            DateTime fechaConfirmacion9 = new DateTime(2023, 05, 25);
            Actividad actividad9 = new Actividad_Hostel("Masajes", "Masajes para huespedes", fecha9, 4, 18, "Actividad_Hostel",
                "Osvaldo Dentone", "Spa Hostel", false, 1000);
            AgregarActividad(actividad9);
            //10
            DateTime fecha10 = new DateTime(2023, 06, 10);
            DateTime fechaConfirmacion10 = new DateTime(2023, 05, 25);
            Actividad actividad10 = new Actividad_Hostel("Yoga", "Yoga a la mañana", fecha10, 10, 18, "Actividad_Hostel",
                "Christian Dentone", "jardin del Hostel", true, 150);
            AgregarActividad(actividad10);


            //ACTIVIDADES TERCERIZADAS
            //1
            DateTime fecha11 = new DateTime(2023, 06, 11);
            DateTime fechaConfirmacion11 = new DateTime(2023, 05, 20);
            Actividad actividad11 = new Actividad_Tercerizada("Paintball", "Juego de equipo", fecha11, 11, 18,
                "Actividad_Tercerizada", _proveedores[0], true, fechaConfirmacion2, 500);
            AgregarActividad(actividad11);
            //2
            DateTime fecha12 = new DateTime(2023, 06, 12);
            DateTime fechaConfirmacion12 = new DateTime(2023, 05, 21);
            Actividad actividad12 = new Actividad_Tercerizada("Bungee Jumping", "Extremo", fecha12, 11, 18,
                "Actividad_Tercerizada", _proveedores[0], true, fechaConfirmacion2, 200);
            AgregarActividad(actividad12);
            //3
            DateTime fecha13 = new DateTime(2023, 06, 13);
            DateTime fechaConfirmacion13 = new DateTime(2023, 05, 22);
            Actividad actividad13 = new Actividad_Tercerizada("Paracaidismo", "Exremo", fecha13, 11, 18,
                "Actividad_Tercerizada", _proveedores[0], true, fechaConfirmacion13, 100);
            AgregarActividad(actividad13);
            //4
            DateTime fecha17 = new DateTime(2023, 06, 14);
            DateTime fechaConfirmacion17 = new DateTime(2023, 05, 25);
            Actividad actividad17 = new Actividad_Tercerizada("Museos de noche", "Paseo por museos nocturnos", fecha17, 11, 18,
                "Actividad_Tercerizada", _proveedores[1], true, fechaConfirmacion17, 400);
            AgregarActividad(actividad17);
            //5
            DateTime fecha18 = new DateTime(2023, 06, 15);
            DateTime fechaConfirmacion18 = new DateTime(2023, 05, 25);
            Actividad actividad18 = new Actividad_Tercerizada("Lugares Historicos", "Paseo por puntos emblematicos de la ciudad", fecha18, 11, 18,
                "Actividad_Tercerizada", _proveedores[1], true, fechaConfirmacion18, 500);
            AgregarActividad(actividad18);
            //6
            DateTime fecha19 = new DateTime(2023, 06, 16);
            DateTime fechaConfirmacion19 = new DateTime(2023, 05, 25);
            Actividad actividad19 = new Actividad_Tercerizada("Atardecer", "Puesta de sol con musica y comida en la playa sur", fecha19, 11, 18,
                "Actividad_Tercerizada", _proveedores[1], true, fechaConfirmacion19, 600);
            AgregarActividad(actividad19);
            //7
            DateTime fecha14 = new DateTime(2023, 06, 17);
            DateTime fechaConfirmacion14 = new DateTime(2023, 05, 23);
            Actividad actividad14 = new Actividad_Tercerizada("Samba time", "Noche en la roda de samba ", fecha14, 11, 18,
                "Actividad_Tercerizada", _proveedores[2], true, fechaConfirmacion14, 700);
            AgregarActividad(actividad14);
            //8
            DateTime fecha15 = new DateTime(2023, 06, 18);
            DateTime fechaConfirmacion15 = new DateTime(2023, 05, 24);
            Actividad actividad15 = new Actividad_Tercerizada("Pagodinho", "Pagode en pedra do sal", fecha15, 11, 18,
                "Actividad_Tercerizada", _proveedores[2], true, fechaConfirmacion15, 800);
            AgregarActividad(actividad15);
            //9
            DateTime fecha16 = new DateTime(2023, 06, 19);
            DateTime fechaConfirmacion16 = new DateTime(2023, 05, 25);
            Actividad actividad16 = new Actividad_Tercerizada("Baile funk", "Baile en la comunidad", fecha16, 11, 18,
                "Actividad_Tercerizada", _proveedores[2], true, fechaConfirmacion16, 900);
            AgregarActividad(actividad16);
            //10
            DateTime fecha20 = new DateTime(2023, 06, 20);
            DateTime fechaConfirmacion20 = new DateTime(2023, 05, 25);
            Actividad actividad20 = new Actividad_Tercerizada("Futbol", "Futbol 5", fecha20, 11, 18,
                "Actividad_Tercerizada", _proveedores[3], true, fechaConfirmacion20, 600);
            AgregarActividad(actividad20);
            //11
            DateTime fecha21 = new DateTime(2023, 06, 21);
            DateTime fechaConfirmacion21 = new DateTime(2023, 05, 25);
            Actividad actividad21 = new Actividad_Tercerizada("Surf", "Clases de surf", fecha21, 11, 18,
                "Actividad_Tercerizada", _proveedores[3], true, fechaConfirmacion21, 500);
            AgregarActividad(actividad21);
            //12
            DateTime fecha22 = new DateTime(2023, 06, 22);
            DateTime fechaConfirmacion22 = new DateTime(2023, 05, 25);
            Actividad actividad22 = new Actividad_Tercerizada("Futvoley", "Clases de futvoley", fecha22, 11, 18,
                "Actividad_Tercerizada", _proveedores[3], true, fechaConfirmacion22, 700);
            AgregarActividad(actividad22);
            //13
            DateTime fecha23 = new DateTime(2023, 06, 23);
            DateTime fechaConfirmacion23 = new DateTime(2023, 05, 25);
            Actividad actividad23 = new Actividad_Tercerizada("Trekking", "Senderismo por el cerro de la buena vista", fecha23, 11, 18,
                "Actividad_Tercerizada", _proveedores[4], true, fechaConfirmacion23, 500);
            AgregarActividad(actividad23);
            //14
            DateTime fecha24 = new DateTime(2023, 06, 24);
            DateTime fechaConfirmacion24 = new DateTime(2023, 05, 25);
            Actividad actividad24 = new Actividad_Tercerizada("Escalada", "Escalada al Pan de Azucar", fecha24, 11, 18,
                "Actividad_Tercerizada", _proveedores[4], true, fechaConfirmacion24, 700);
            AgregarActividad(actividad24);
            //15
            DateTime fecha25 = new DateTime(2023, 06, 25);
            DateTime fechaConfirmacion25 = new DateTime(2023, 05, 25);
            Actividad actividad25 = new Actividad_Tercerizada("Buceo", "Buceo en la playa sur", fecha25, 11, 18,
                "Actividad_Tercerizada", _proveedores[4], true, fechaConfirmacion25);
            AgregarActividad(actividad25);
        }

        //Metodo para agregar Actividad, validando que sea única y asegurándose que no sea nula.
        private void AgregarActividad(Actividad actividad)
        {
            if (actividad == null)
            {
                throw new Exception("La actividad recibida no es vàlida.");
            }
            if (_actividades.Contains(actividad)) // Validación unicidad ID Actividad utilizando el Equals definido en Actividad
            {
                throw new Exception($"La actividad con id: {actividad._id} ya esta registrada."); 
            }
            actividad.Validar();
            _actividades.Add(actividad);
        }

        // Metodo para precargar Agenda
        private void PrecargarAgenda()
        {
            Usuario usuario = _usuarios[0];
            if (usuario is Huesped)
            {
                Huesped huesped = (Huesped)usuario;
                Agenda agenda1 = new Agenda(huesped, _actividades[0], "confirmada");
                AgregarAgenda(agenda1);
            }

            Usuario usuario2 = _usuarios[1];
            if (usuario2 is Huesped)
            {
                Huesped huesped2 = (Huesped)usuario2;
                Agenda agenda2 = new Agenda(huesped2, _actividades[1], "pendiente");
                AgregarAgenda(agenda2);
            }
        }

        //Método para agregar Agenda, previa validación
        private void AgregarAgenda(Agenda agenda)
        {
            if (agenda == null)
            {
                throw new Exception("La informacion recibida no es vàlida.");
            }
            if (_agenda.Contains(agenda))
            {
                throw new Exception($"La actividad ya esta agendada");
            }
            agenda.Validar();
            _agenda.Add(agenda);
        }

        // Método para obtener huesped por cédula
        public Huesped? ObtenerHuespedPorCedula(string cedula)
        {
            foreach (Usuario item in _usuarios)
            {
                if (item is Huesped)
                {
                    Huesped huesped = (Huesped)item;

                    if (huesped.NumeroDocumento == cedula)
                    {
                        return huesped;
                    }
                }
            }
            return null;
        }

        //Método para obener Actividad por ID
        public Actividad? ObtenerActividadPorId(int id)
        {
            foreach (Actividad item in _actividades)
            {
                if (item._id == id)
                {
                    return item;
                }
            }
            return null;
        }

        // Método para usar en segunda parte
        public decimal CalcularCostoActividad(string numeroDocumento, int id) 
        {

            Actividad actividad = ObtenerActividadPorId(id);

            decimal costoFinalActividad = actividad.Costo;

            Huesped huesped = ObtenerHuespedPorCedula(numeroDocumento);

            int fidelizacion = int.Parse(huesped.Fidelizacion);

            switch (fidelizacion)
            {
                case 2:
                    costoFinalActividad = Math.Round(actividad.Costo * 0, 9);
                    break;
                case 3:
                    costoFinalActividad = Math.Round(actividad.Costo * 0, 85);
                    break;
                case 4:
                    costoFinalActividad = Math.Round(actividad.Costo * 0, 8);
                    break;
            }
            return costoFinalActividad;
        }

        //Metodo para listar y ordenar Proveedores utilizando el Compare de Proveedor
        public IEnumerable<Proveedor> ProveedoresOrdenados()
        {
            List<Proveedor> aux = new List<Proveedor>();
            foreach (Proveedor item in _proveedores)
            {
                aux.Add(item);
            }
            aux.Sort();
            return aux;
        }

        //Metodo para obtener Proveedor por ID
        public Proveedor? ObtenerProveedorPorId(int id)
        {
            foreach (Proveedor item in _proveedores)
            {
                if (item._id == id)
                {
                    return item;
                }
            }
            return null;
        }
        
        //Metodo para listar y ordenar Actividades por fecha y costo.
        public IEnumerable<Actividad> ListarActividadesFechaCosto(DateTime fecha1, DateTime fecha2, decimal costoPedido)
        {
            List<Actividad> aux = new List<Actividad>();
            foreach (Actividad item in _actividades)
            {

                if (item.FechaActividad >= fecha1 && item.FechaActividad <= fecha2 && item.Costo > costoPedido)
                {
                    aux.Add(item);
                }
            }
            aux.Sort();
            return aux;
        }

        //Para generar una lista auxiliar solo con Huéspedes.
        public IEnumerable<Huesped> ListaHuespedes()
        {
            List<Huesped> aux = new List<Huesped>();
            foreach (Usuario item in _usuarios)
            {
                if (item is Huesped)
                {
                    Huesped huesped = (Huesped)item;
                    aux.Add(huesped);
                }  
            }
            return aux;
        }
    }
}