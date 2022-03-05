using System;
using System.Collections.Generic;
using System.Text;
using Conexion;
using Microsoft.EntityFrameworkCore;
using Modelos.interfaces;
using Modelos.modelos;
using Modelos.respuestas;

namespace ComisionesDatos
{
    public class tbl_rel_comision_usuario_datos : CRUD<tbl_rel_comision_usuario>
    {
        private BDParametros GeneracionParametros = new BDParametros();
        private string StoreProcedure = "sp_crud_comision_usuario";
        public ResponseGeneric<List<tbl_rel_comision_usuario>> Consultar(tbl_rel_comision_usuario entidad) {
            try
            {
                #region Parametros
                List<tbl_rel_comision_usuario> Lista = new List<tbl_rel_comision_usuario>();
                List<EntidadParametro> ListaEnvioParametro = new List<EntidadParametro>();
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "id_comision", Tipo = "Int", Valor = entidad.id_comision == null ? "NULL" : entidad.id_comision.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "id_usuario", Tipo = "Int", Valor = entidad.id_usuario == null ? "NULL" : entidad.id_usuario.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "id_rol_senado", Tipo = "Int", Valor = entidad.id_rol_senado == null ? "NULL" : entidad.id_rol_senado.ToString() });
                #endregion
                #region Conexion
                using (Contexto conexion = new Contexto()) {
                    var resultSQL = GeneracionParametros.ParametrosSqlServer(ListaEnvioParametro, StoreProcedure);
                    Lista = conexion.Query<tbl_rel_comision_usuario>().FromSql<tbl_rel_comision_usuario>(resultSQL.Query, resultSQL.ListaParametros.ToArray()).ToListAsync().Result;

                }
                #endregion
                return new ResponseGeneric<List<tbl_rel_comision_usuario>>(Lista);
            }
            catch (Exception ex) {
                return new ResponseGeneric<List<tbl_rel_comision_usuario>>(ex);
            }
        }

        public Response Guardar(tbl_rel_comision_usuario entidad) {
            throw new NotImplementedException();
        }
        public Response Modificar(tbl_rel_comision_usuario entidad) {
            try
            {
                #region Parametros
                int resultado = 0;
                List<EntidadParametro> ListaEnvioParametro = new List<EntidadParametro>();
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "id_comision", Tipo = "Int", Valor = entidad.id_comision == null ? "NULL" : entidad.id_comision.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "id_usuario", Tipo = "Int", Valor = entidad.id_usuario == null ? "NULL" : entidad.id_usuario.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "id_rol_senado", Tipo = "Int", Valor = entidad.id_rol_senado == null ? "NULL" : entidad.id_rol_senado.ToString() });
                #endregion
                #region Conexion
                using (Contexto conexion = new Contexto())
                {
                    var resultSQL = GeneracionParametros.ParametrosSqlServer(ListaEnvioParametro, StoreProcedure);
                    resultado = conexion.Database.ExecuteSqlCommand(resultSQL.Query, resultSQL.ListaParametros.ToArray());
                }
                #endregion
                if (resultado == 1)
                {
                    return new Response();
                }
                else {
                    return new Response("Error en la petición");
                }
            }
            catch (Exception ex) {
                return new Response(ex.ToString());
            }
        }
        public Response Eliminar(tbl_rel_comision_usuario entidad) {
            try
            {
                #region Parametros
                int resultado = 0;
                List<EntidadParametro> ListaEnvioParametro = new List<EntidadParametro>();
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "id_comision", Tipo = "Int", Valor = entidad.id_comision == null ? "NULL" : entidad.id_comision.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "id_usuario", Tipo = "Int", Valor = entidad.id_usuario == null ? "NULL" : entidad.id_usuario.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "id_rol_senado", Tipo = "Int", Valor = entidad.id_rol_senado == null ? "NULL" : entidad.id_rol_senado.ToString() });
                #endregion
                #region Conexion
                using (Contexto conexion = new Contexto())
                {
                    var resultSQL = GeneracionParametros.ParametrosSqlServer(ListaEnvioParametro, StoreProcedure);
                    resultado = conexion.Database.ExecuteSqlCommand(resultSQL.Query, resultSQL.ListaParametros.ToArray());
                }
                #endregion
                if (resultado == 1)
                {
                    return new Response();
                }
                else
                {
                    return new Response("Error en la petición");
                }
            }
            catch (Exception ex)
            {
                return new Response(ex.ToString());
            }
        }
    }
}
