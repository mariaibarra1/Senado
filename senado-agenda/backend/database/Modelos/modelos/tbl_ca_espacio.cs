using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace Modelos.modelos
{
    public class tbl_ca_espacio
    {
        public Int64? id { get; set; }
        public string nombre { get; set; }
        public Int64? id_ubicacion { get; set; }
        public int? capacidad { get; set; }
        public int? activo { get; set; }
        public string nombre_ubicacion { get; set; }
        public string calle_ubicacion { get; set; }
        public string nombre_estado { get; set; }
        public string nombre_municipio { get; set; }
        public string nombre_localidad { get; set; }
        public int en_uso { get; set; }
        [NotMapped] public int tipoOperacion { get; set; }
    }
}
