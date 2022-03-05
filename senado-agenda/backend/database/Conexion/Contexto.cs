using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Modelos.modelos;
namespace Conexion
{
    public class Contexto : DbContext
    {

        public DbQuery<tbl_ca_tipo_evento> tbl_ca_tipo_evento { get; set; }
        public DbQuery<tbl_ca_servicio> tbl_ca_servicio { get; set; }
        public DbQuery<tbl_ca_rol_web> tbl_ca_rol_web { get; set; }
        public DbQuery<tbl_ca_rol_usuarios> tbl_ca_rol_usuarios { get; set; }
        public DbQuery<tbl_ca_espacio> tbl_ca_espacio { get; set; }
        public DbQuery<tbl_ca_ubicacion> tbl_ca_ubicacion { get; set; }
        public DbQuery<tbl_ca_equipo> tbl_ca_equipo { get; set; }
        public DbQuery<tbl_usuario> tbl_usuarios { get; set; }
        public DbQuery<tbl_ca_rol_senado> tbl_ca_rol_senado { get; set; }
        public DbQuery<tbl_ca_partido_politico> tbl_ca_partido_politico { get; set; }

        public DbQuery<tbl_ca_gpo_parlamentario> tbl_ca_gpo_parlamentario { get; set; }        
        public DbQuery<tbl_rel_grupo_partido> tbl_rel_grupo_partido { get; set; }
        public DbQuery<tbl_ca_est_mun_loc> tbl_ca_est_mun_loc { get; set; }
        public DbQuery<tbl_rel_espacio_equipo> tbl_rel_espacio_equipo { get; set; }
        public DbQuery<tbl_comision> tbl_comision { get; set; }
        public DbQuery<tbl_rel_comision_usuario> tbl_rel_comision_usuario { get; set; }
        public DbQuery<tbl_evento> tbl_evento { get; set; }

        public DbQuery<tbl_rel_evento_invitado> tbl_rel_evento_invitado { get; set; }
        public DbQuery<tbl_rel_evento_servicio> tbl_rel_evento_servicio { get; set; }
        public DbQuery<tbl_rel_evento_usuario> tbl_rel_evento_usuario { get; set; }

        public DbQuery<bandeja_evento> bandeja_evento { get; set; }

        public DbQuery<tbl_logger> tbl_logger { get; set; }
        public DbQuery<tbl_ca_estatus_equipo> tbl_ca_estatus_equipo { get; set; }
        public DbQuery<tbl_ca_legislatura> tbl_ca_legislatura { get; set; }
        public DbQuery<tbl_ca_tipo_comision> tbl_ca_tipo_comision { get; set; }
        public DbQuery<tbl_ca_tipo_equipamento> tbl_ca_tipo_equipamento { get; set; }
        public DbQuery<tbl_ca_tipo_montaje> tbl_ca_tipo_montaje { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionBuilder)
        {
            IConfiguration Configuration = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false).Build();
            
            int TipoBase = int.Parse(Configuration["TipoBase"].ToString());
            
            switch (TipoBase)
            {
                //Conexion SQL Server
                case 1:
                    optionBuilder.UseSqlServer(Configuration.GetConnectionString("ConnectionDBSQLServer"));
                    break;
            }
        }
    }
}