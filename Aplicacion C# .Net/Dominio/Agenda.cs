using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Dominio
{

    //Creación de la clase Agenda, con la interfaz IValidable para garantizar la existencia del método Validar().
    public class Agenda: IValidable
    {
        public Huesped Huesped { get; set; }
        public Actividad Actividad { get; set; }
        public string EstadoAgenda { get; set; }

        //Constructor
        public Agenda(Huesped huesped, Actividad actividad, string estadoAgenda)
        {
            Huesped = huesped;
            Actividad = actividad;
            EstadoAgenda = estadoAgenda;
        }

        public void Validar()
        {
        }

        //ToString() para mostrar la agenda.
        public override string ToString()
        {
            string respuesta = string.Empty;
            respuesta += $"Nombre Huésped: {Huesped.Nombre} {Huesped.Apellido} \n";
            respuesta += $"Nombre Actividad:  {Actividad.NombreActividad}\n";
            respuesta += $"Fecha Actividad:  {Actividad.FechaActividad}\n";
            respuesta += $"Estado: {EstadoAgenda}\n";
            return respuesta;
        }      
    }
}
