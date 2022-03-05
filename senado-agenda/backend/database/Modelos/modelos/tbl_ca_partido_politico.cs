using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Modelos.modelos
{
    public class tbl_ca_partido_politico
    {
        public Int64? id { get; set; }
        public string nombre { get; set; }
        [StringLength(5, ErrorMessage = "Siglas cannot be longer than 5 characters.")]
        public string siglas { get; set; }
        public bool? activo { get; set; }

        public Int64? id_legislatura { get; set; }
        public string legislatura_nombre { get; set; }
        public string legislatura_descripcion { get; set; }
        [NotMapped]
        public int tipoOperacion { get; set; }
    }
}
