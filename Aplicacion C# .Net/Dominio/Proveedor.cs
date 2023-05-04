using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Dominio
{
    //Creación de la clase Proveedor, con Ivalidable para garantizar que tenga el método Validar, IComparable para ordenarlos por nombre e IEquatable para definir el Contains por Nombre
    public class Proveedor : IValidable, IComparable<Proveedor>, IEquatable<Proveedor>
    {

        public int _id;
        public string Nombre { get; set; }
        public string NumeroContacto { get; set; }
        public string Direccion { get; set; }
        public string Descuento { get; set; }
        
        public static int ultIdProveedor;

        //Constructor
        public Proveedor(string nombre, string numeroContacto, string direccion, string descuento)
        {
            Nombre = nombre;
            NumeroContacto = numeroContacto;
            Direccion = direccion;
            Descuento = descuento;
            _id= ++ultIdProveedor;
        }

        //Método Validar
        public void Validar()
        {   
            ValidarDireccion();
            ValidarNombre();
            ValidarNumeroContacto();
            ValidarDescuento();
        }
        public override string ToString()
        {
            string respuesta = string.Empty;
            respuesta += $"Nombre: {Nombre}\n";
            respuesta += $"Numero de Contacto: {NumeroContacto}\n";
            respuesta += $"Dirección: {Direccion}\n";
            respuesta += $"Descuento actividades promocionales: {Descuento}\n";
            respuesta += $"ID: {_id}\n";
            return respuesta;
        }

        //Método para validar que el nombre del Proveedor no sea vacío o nulo
        public void ValidarNombre()
        {
            if (string.IsNullOrEmpty(Nombre))
        { throw new Exception("Debe completar todos los campos"); }
        }

        //Método para validar que la dirección del Proveedor no sea vacía o nula
        public void ValidarDireccion()
            {
                if (string.IsNullOrEmpty(Direccion))
                { throw new Exception("Debe completar todos los campos"); }
            }

        //Método para validar que el número de contacto no sea vacío o nulo
        public void ValidarNumeroContacto()
        {
            if (string.IsNullOrEmpty(NumeroContacto))
            { throw new Exception("Debe completar todos los campos"); }

        }

        //Método para validar que el descuento de proveedor no sea vacío o nulo
        public void ValidarDescuento()
        {
            if (string.IsNullOrEmpty(Descuento))
            { throw new Exception("Debe completar todos los campos"); }
        }

        //Para ordenar los proveedores por Nombre
        public int CompareTo(Proveedor? other) 
        {
            if (other == null)
                return 0;
            return Nombre.CompareTo(other.Nombre);
        }

        //Definición del Contains por unicidad de Nombre
        public bool Equals(Proveedor? other) 
        {           
            return other != null && Nombre == other.Nombre;
        }
    }

    }

