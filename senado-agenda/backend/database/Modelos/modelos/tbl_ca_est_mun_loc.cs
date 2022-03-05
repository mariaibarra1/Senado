using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace Modelos.modelos
{
    public class tbl_ca_est_mun_loc
    {
        public Int64? id { get; set; }
        public string nombre { get; set; }
        public int? codigo_postal { get; set; }
        public Int64? id_estado { get; set; }
        public Int64? id_municipio { get; set; }
        [NotMapped] public int tipoOperacion { get; set; }
    }
}
