using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Modelos.modelos
{
   public class tbl_rel_evento_invitado
    {
        public Int64? id_evento { get; set; }
        public string nombre { get; set; }
        public string correo_electronico { get; set; }

        [NotMapped] public int tipoOperacion { get; set; }
    }
}
