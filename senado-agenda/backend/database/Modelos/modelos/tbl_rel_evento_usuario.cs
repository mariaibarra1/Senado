using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Modelos.modelos
{
    public class tbl_rel_evento_usuario
    {
        public Int64? id_evento { get; set; }
        public Int64? id_usuario { get; set; }

        [NotMapped] public int tipoOperacion { get; set; }

    }
}
