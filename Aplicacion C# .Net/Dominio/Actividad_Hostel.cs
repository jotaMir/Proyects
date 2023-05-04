using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Dominio
{

    //Creación de la clase Actividad_Hostel, con herencia de la clase Actividad, y la interfaz IValidable para garantizar la existencia del método Validar.
    public class Actividad_Hostel : Actividad, IValidable   
    {
        public string ResponsableActividad { get; set; }
        public string LugarDentroHostal { get; set; }
        public bool AireLibre { get; set; }

        //Constructor con herencia
        public Actividad_Hostel(string nombreActividad, string descripcion, DateTime fechaActividad,
            int cantidadMaximaParticipantes, int edadMinima, string tipoDeActividad,
            string responsableActividad, string lugarDentroHostal, bool aireLibre, decimal costo = 0)
            :base(nombreActividad, descripcion, fechaActividad, cantidadMaximaParticipantes, edadMinima, 
            tipoDeActividad, costo)
        {
            ResponsableActividad = responsableActividad;
            LugarDentroHostal = lugarDentroHostal;
            AireLibre = aireLibre;
        }

        //Método Validar
        public void Validar()
        {
            ValidarResponsable();
            ValidarLugar();
        }

        //Método para validar que el responsable no sea nulo o vacio
        public void ValidarResponsable()
        {
            if (string.IsNullOrEmpty(ResponsableActividad))
            {
                throw new Exception("El Nombre del responsable de la actividad no puede ser vacìo");
            }
        }

        //Método para validar que el Lugar no sea nulo o vacio
        public void ValidarLugar()
        {
            if (string.IsNullOrEmpty(LugarDentroHostal))
            {
                throw new Exception("El Nombre del responsable de la actividad no puede ser vacìo");
            }
        }

        //Sobreescritura del método ToString() para mostrar la información según los requerimientos.
        public override string ToString()
        {
            string respuesta = string.Empty;
            respuesta += $"ID actividad: {_id}\n";
            respuesta += $"Nombre de Actividad: {NombreActividad}\n";
            respuesta += $"Descripcion: {Descripcion}\n";
            respuesta += $"Fecha de la actividad: {FechaActividad}\n";
            respuesta += $"Cantidad Máxima de Participantes: {CantidadMaximaParticipantes}\n";
            respuesta += $"Edad Mínima para participar: {EdadMinima}\n";
            respuesta += $"Responsable: {ResponsableActividad}\n";
            respuesta += $"Costo: {Costo}\n";
            return respuesta;

        }
    }
}