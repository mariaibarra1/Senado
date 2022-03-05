using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Modelos.modelos
{
    public class tbl_comision
    {
        public Int64? id { get; set; }

        [StringLength(200, ErrorMessage = "El nombre no debe ser mayor a 200 Caracteres")]
        public string nombre { get; set; }

        [StringLength(100, ErrorMessage = "El nombre del micrositio no debe ser mayor a 100 Caracteres")]
        public string micrositio { get; set; }

        [StringLength(100, ErrorMessage = "El correo electrónico no debe ser mayor a 100 Caracteres")]
        public string correo_electronico { get; set; }

        public Int64? id_ubicacion { get; set; }
        public bool? activo { get; set; }
        public Int64? id_legislatura { get; set; }
        public Int64? id_tipo_comision { get; set; }
        public string nombreUbicacion { get; set; }
        public string nombreLegislatura { get; set; }
        public string descripcionLegislatura { get; set; }
        public string nombreTipo { get; set; }
        public string descripcionTipo { get; set; }
        [NotMapped]
        public int tipoOperacion { get; set; }

    }
}
