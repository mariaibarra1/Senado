using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Modelos.modelos
{
    public class tbl_usuario
    {
        public Int64? id { get; set; }
        public string nombre { get; set; }
        public string apellido_paterno { get; set; }

        public string apellido_materno { get; set; }

        public Int64? id_rol_web { get; set; }
        public string correo_electronico { get; set; }

        public Int64? id_gpo_parlamentario { get; set; }
        public DateTime fecha_actualizacion { get; set; }
        public DateTime fecha_creacion { get; set; }
        public bool activo { get; set; }
        public int? telefono { get; set; }
        public string extension { get; set; }

        public string gpopar { get; set; }
        [NotMapped] public int tipoOperacion { get; set; }
    }
}
