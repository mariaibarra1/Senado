using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Modelos.modelos
{
    public class bandeja_evento
    {
        public Int64? id { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public Int64? id_tipo_evento { get; set; }
        public string tipoEventoNombre { get; set; }
        public string tipoEventoDescripcion { get; set; }
        public Int64? id_espacio { get; set; }
        public string espacioNombre { get; set; }
        public int? espacioCapacidad { get; set; }
        public string ubicacionNombre { get; set; }
        public string ubicacionCalle { get; set; }
        public string localidadNombre { get; set; }
        public Int64? id_solicitante { get; set; }
        public string solicitanteNombre { get; set; }
        public string solicitanteApat { get; set; }
        public string solicitanteAmat { get; set; }
        public int? solicitanteTelefono { get; set; }
        public string solicitanteExtension { get; set; }
        public string solicitanteCorreo { get; set; }
        public string grupoParlamentarioNombre { get; set; }
        public string partidoPoliticoNombre { get; set; }
        public Int64? id_comision { get; set; }
        public string comisionNombre { get; set; }
        public string comisionMicrositio { get; set; }
        public string comisionCorreo { get; set; }
        public string fecha_inicio { get; set; }
        public string hora_inicio { get; set; }
        public string fecha_fin { get; set; }
        public string hora_fin { get; set; }
        public bool privado { get; set; }
        public bool? aprobado { get; set; }
        public string comentario { get; set; }
        public string fecha_sugerida { get; set; }
        public string hora_sugerida { get; set; }
        public int duracion_sugerida { get; set; }

[NotMapped] public int tipoOperacion { get; set; }
    }
}
