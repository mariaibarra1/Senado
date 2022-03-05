using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Modelos.modelos
{

   public class tbl_evento
    {

        public Int64? id { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }

        public Int64? id_tipo_evento { get; set; }
        public Int64? id_espacio { get; set; }
        public Int64? id_solicitante { get; set; }
        public Int64? id_comision { get; set; }

        public string fecha_inicio { get; set; }
        public string hora_inicio { get; set; }
        public string fecha_fin { get; set; }
        public string hora_fin { get; set; }
        public bool privado { get; set; }
        public bool? aprobado { get; set; }

        [NotMapped] public int tipoOperacion { get; set; }

    }
}
