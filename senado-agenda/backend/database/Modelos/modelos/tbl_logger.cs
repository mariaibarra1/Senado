using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Modelos.modelos
{
  public class tbl_logger
    {
        public Int64 Id { get; set; }
        public int id_modulo_aplicacion { get; set; }
        public int id_operacion { get; set; }
        public string fecha { get; set; }
        public string mensaje { get; set; }

        [NotMapped] public int tipoOperacion { get; set; }

    }
}
