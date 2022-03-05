using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Modelos.modelos
{
    public class tbl_ca_estatus_equipo
    {
        public Int64? id { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }

        public bool activo { get; set; }
        [NotMapped] public int tipoOperacion { get; set; }
    }
}
