using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Modelos.modelos
{
    public class tbl_ca_rol_usuarios
    {
        public int id { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public string activo { get; set; }


        [NotMapped] public int tipoOperacion { get; set; }
    }
}
