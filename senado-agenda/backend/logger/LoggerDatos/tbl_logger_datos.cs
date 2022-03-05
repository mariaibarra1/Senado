using System;
using System.Collections.Generic;
using System.Text;
using Conexion;
using Microsoft.EntityFrameworkCore;
using Modelos.interfaces;
using Modelos.modelos;
using Modelos.respuestas;
using System.Data.SqlClient;
using System.Data;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace LoggerDatos
{
  public class tbl_logger_datos : CRUD<tbl_logger>
    {
        private BDParametros GeneracionParametros = new BDParametros();
        public IConfiguration Configuration = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: false).Build();
        private string StoreProcedure = "sp_crud_logger";

        public ResponseGeneric<List<tbl_logger>> Consultar(tbl_logger entidad)
        {
            try
            {
                List<tbl_logger> Lista = new List<tbl_logger>();
                #region Parametros
                List<EntidadParametro> ListaEnvioParam = new List<EntidadParametro>();
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_modulo", Tipo = "Int", Valor = entidad.id_modulo_aplicacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_tipo_operacion", Tipo = "String", Valor = entidad.id_operacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "fecha", Tipo = "String", Valor = entidad.fecha == null ? "NULL" : entidad.fecha.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "error", Tipo = "Boolean", Valor = entidad.mensaje == null ? "NULL" : entidad.mensaje.ToString() });

                #endregion
                #region ConexionBD
                using (Contexto conexion = new Contexto())
                {
                    var resultSQL = GeneracionParametros.ParametrosSqlServer(ListaEnvioParam, StoreProcedure);
                    Lista = conexion.Query<tbl_logger>().FromSql<tbl_logger>(resultSQL.Query, resultSQL.ListaParametros.ToArray()).ToListAsync().Result;
                }
                #endregion
                return new ResponseGeneric<List<tbl_logger>>(Lista);
            }
            catch (Exception ex)
            {

                return new ResponseGeneric<List<tbl_logger>>(ex);
            }
        }

        public Response Eliminar(tbl_logger entidad)
        {
            throw new NotImplementedException();
        }
        public Response Modificar(tbl_logger entidad)
        {
            throw new NotImplementedException();
        }
        public Response Guardar(tbl_logger entidad)
        {
            throw new NotImplementedException();
        }

    }
}
