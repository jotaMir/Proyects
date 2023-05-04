using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio
{

    //Creación de la clase Actividad_Tercerizada, con herencia de la clase Actividad, y la interfaz IValidable para garantizar la existencia del método Validar.
    public class Actividad_Tercerizada : Actividad, IValidable
    {
        public Proveedor Proveedor { get; set; }
        public bool ActividadConfirmada { get; set; }
        public DateTime FechaDeConfirmacion { get; set; }

        //Constructor
        public Actividad_Tercerizada(string nombreActividad, string descripcion,
            DateTime fechaActividad, int cantidadMaximaParticipantes,
            int edadMinima, string tipoDeActividad, Proveedor proveedor,
            bool actividadConfirmada, DateTime fechaConfirmacion, decimal costo = 0) :base(nombreActividad, descripcion, 
            fechaActividad, cantidadMaximaParticipantes, edadMinima, tipoDeActividad, costo)
        {
            Proveedor = proveedor;
            ActividadConfirmada = actividadConfirmada;
            FechaDeConfirmacion = fechaConfirmacion;
        }

        //Método Validar
        public void Validar()
        {
            ValidarFechaConfirmacion();
        }

        //Validar que fecha de confirmacion no sea nula
        public void ValidarFechaConfirmacion()
        {
            if (FechaDeConfirmacion==null)
            {
                throw new Exception("La fecha de confirmacion no puede ser vacia");
            }
        }

        //ToString para mostrar la actividad de acuerdo con los requerimientos.
        public override string ToString()
        {
            string respuesta = string.Empty;
            respuesta += $"ID actividad: {_id}\n";
            respuesta += $"Nombre de Actividad: {NombreActividad}\n";
            respuesta += $"Descripcion: {Descripcion}\n";
            respuesta += $"Fecha de la actividad: {FechaActividad}\n";
            respuesta += $"Cantidad Máxima de Participantes: {CantidadMaximaParticipantes}\n";
            respuesta += $"Edad Mínima para participar: {EdadMinima}\n";
            respuesta += $"Proveedor: {Proveedor.Nombre}\n";
            respuesta += $"Costo: {Costo}\n";
            return respuesta;
        }
    }
}
