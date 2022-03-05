using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;

namespace Modelos.modelos
{
  public class tbl_rel_grupo_partido
    {
        public Int64? id_partido_politico { get; set; }
        public string nombre_partido { get; set; }       
        public Int64? id_gpo_parlamentario { get; set; }
        public string nombre_grupo { get; set; }
        [NotMapped] public int tipoOperacion { get; set; }

    }
}
