using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Modelos.modelos
{
    public class tbl_ca_ubicacion
    {
        public Int64? id { get; set; }
        public string nombre { get; set; }
        public string calle { get; set; }
        public Int64? id_estado { get; set; }
        public Int64? id_municipio { get; set; }
        public Int64? id_localidad { get; set; }
        public string nombreEstado { get; set; }
        public string nombreMunicipio { get; set; }
        public string nombreLocalidad { get; set; }
        public bool activo { get; set; }
        public string edificio { get; set; }
        public int? piso { get; set; }
        public string oficina { get; set; }
        public int? codigo_postal { get; set; }
        [NotMapped] public int tipoOperacion { get; set; }
    }
}
