using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Modelos.modelos
{
    public class tbl_rel_comision_usuario
    {
        public Int64? id_comision { get; set; }
        public Int64? id_usuario { get; set; }
        public Int64? id_rol_senado { get; set; }

        public string nombreComision { get; set; }
        public string nombreUsuario { get; set; }
        public string aPaternoUsuario { get; set; }
        public string aMaternoUsuario { get; set; }
        public string rol { get; set; }
        public string correo { get; set; }

        [NotMapped]
        public int tipoOperacion { get; set; }

    }
}
