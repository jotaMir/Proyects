using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Dominio

{

    //Creación de la clase Actividad, con la interfaz IValidable para garantizar la existencia del metodo Validar(), la interfaz IEquatable para definir el Contain por ID, e Icomparable para ordenarlas por Costo, en forma descendente
    public abstract class Actividad : IValidable, IEquatable<Actividad>, IComparable<Actividad>
    {
        public int _id;
        public string NombreActividad { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaActividad { get; set; }
        public int CantidadMaximaParticipantes { get; set; }
        public int EdadMinima { get; set; }
       
        public string TipoDeActividad { get; set; }

        public static int ultIdActividad;
        public decimal Costo { get; set; }


        //Constructor
        public Actividad(string nombreActividad, string descripcion, DateTime fechaActividad, int cantidadMaximaParticipantes, int edadMinima, string tipoDeActividad, decimal costo)
        {
            NombreActividad = nombreActividad;
            Descripcion = descripcion;
            FechaActividad = fechaActividad;
            CantidadMaximaParticipantes = cantidadMaximaParticipantes;
            EdadMinima = edadMinima;  
            TipoDeActividad = tipoDeActividad;
            Costo = costo;
            _id = ++ultIdActividad; //ID autogenerado
        }

        //Método Validar
        public void Validar()
        {
            ValidarFechaActividad();
            ValidarNombreActividad();
            ValidarDescripcionActividad();
            ValidarCostoActividad();
        }

        //Método para validar nombre de la Actividad según los requerimientos
        public void ValidarNombreActividad()
        {
            if (string.IsNullOrEmpty(NombreActividad))
            {
                throw new Exception("El Nombre de la actividad no puede ser vacìo");
            }

            else if (NombreActividad.Length > 25)
            {
                throw new Exception("El Nombre no puede tener mas de 25 caracteres");
            }
        }

        //Método para validar que la descripción de la actividad no sea nula o vacía.
        public void ValidarDescripcionActividad()
        {
            if (string.IsNullOrEmpty(Descripcion))
            {
                throw new Exception("La descripción de la actividad no puede ser vacìa");
            }
        }

        //Método para validar que la fecha de la actividad no sea menor que la fecha actual
        public void ValidarFechaActividad()
        {
            if (FechaActividad < DateTime.Now)
            {
                throw new Exception("La fecha de la actividad no puede ser menor a la fecha actual");
            }
        }

        //Método para garantizar que sino recibe costo, el mismo sea 0.
        public void ValidarCostoActividad()
        {
            if (Costo == null) Costo = 0;
        }

        // Definición del Contains por ID
        public bool Equals(Actividad? other) 
        {
            return other != null && _id == other._id;
        }

        //Ordena las actividades en orden descendente
        public int CompareTo(Actividad? other) 
        {
            if (other == null)
                return 0;
            return -1 * Costo.CompareTo(other.Costo);
        }

    }
}
