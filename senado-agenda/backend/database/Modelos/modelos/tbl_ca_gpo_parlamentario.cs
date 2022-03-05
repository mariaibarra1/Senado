using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace Modelos.modelos
{
   public class tbl_ca_gpo_parlamentario
    {
        public Int64? id { get; set; }
        public string nombre { get; set; }
        public string nombre_partido { get; set; }
        public bool? activo { get; set; }
        public Int64? id_legislatura { get; set; }
        public string nombre_legislatura { get; set; }

        [NotMapped]
        public int tipoOperacion { get; set; }
                     
    }
}
