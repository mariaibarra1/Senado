using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Modelos.modelos
{
    public class tbl_rel_espacio_equipo
    {
        public Int64? id_equipo { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public Boolean activo { get; set; }
        public int? exist { get; set; }
        public int? id_espacio { get; set; }
        [NotMapped] public int tipoOperacion { get; set; }
    }
}
