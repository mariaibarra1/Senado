using System;
using System.Collections.Generic;
using System.Text;
using Conexion;
using Microsoft.EntityFrameworkCore;
using Modelos.interfaces;
using Modelos.modelos;
using Modelos.respuestas;


namespace CatalogosDatos
{
    public class tbl_ca_partido_politico_datos : CRUD<tbl_ca_partido_politico>
    {
        private BDParametros GeneracionParametros = new BDParametros();
        private string StoreProcedure = "sp_crud_partido_politico";
        public ResponseGeneric<List<tbl_ca_partido_politico>> Consultar(tbl_ca_partido_politico entidad) {
            try
            {
                #region Parametros
                List<tbl_ca_partido_politico> Lista = new List<tbl_ca_partido_politico>();
                List<EntidadParametro> ListaEnvioParam = new List<EntidadParametro>();
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id", Tipo = "Int", Valor = entidad.id == null ? "NULL" : entidad.id.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "siglas", Tipo = "String", Valor = entidad.siglas == null ? "NULL" : entidad.siglas.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "activo", Tipo = "Boolean", Valor = entidad.activo == null ? "NULL" : entidad.activo.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_legislatura", Tipo = "Int", Valor = entidad.id_legislatura == null ? "NULL" : entidad.id_legislatura.ToString() });
                #endregion
                #region Conexion
                using (Contexto conexion = new Contexto()) {
                    var resultSQL = GeneracionParametros.ParametrosSqlServer(ListaEnvioParam, StoreProcedure);
                    Lista = conexion.Query<tbl_ca_partido_politico>().FromSql<tbl_ca_partido_politico>(resultSQL.Query, resultSQL.ListaParametros.ToArray()).ToListAsync().Result;
                }
                #endregion
                return new ResponseGeneric<List<tbl_ca_partido_politico>>(Lista);
            }
            catch (Exception ex) {
                return new ResponseGeneric<List<tbl_ca_partido_politico>>(ex);
            }
        }

        public Response Eliminar(tbl_ca_partido_politico entidad) {
            try
            {
                #region Parametros
                int response;
                List<EntidadParametro> ListaEnvioParam = new List<EntidadParametro>();
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id", Tipo = "Int", Valor = entidad.id == null ? "NULL" : entidad.id.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "siglas", Tipo = "String", Valor = entidad.siglas == null ? "NULL" : entidad.siglas.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "activo", Tipo = "Boolean", Valor = entidad.activo == null ? "NULL" : entidad.activo.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_legislatura", Tipo = "Int", Valor = entidad.id_legislatura == null ? "NULL" : entidad.id_legislatura.ToString() });
                #endregion
                #region Conexion
                using (Contexto conexion = new Contexto())
                {
                    var resultSQL = GeneracionParametros.ParametrosSqlServer(ListaEnvioParam, StoreProcedure);
                    response = conexion.Database.ExecuteSqlCommand(resultSQL.Query, resultSQL.ListaParametros.ToArray());
                }
                #endregion
                if (response == 1)
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
        public Response Modificar(tbl_ca_partido_politico entidad) {
            try
            {
                #region Parametros
                int response;
                List<EntidadParametro> ListaEnvioParam = new List<EntidadParametro>();
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id", Tipo = "Int", Valor = entidad.id == null ? "NULL" : entidad.id.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "siglas", Tipo = "String", Valor = entidad.siglas == null ? "NULL" : entidad.siglas.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "activo", Tipo = "Boolean", Valor = entidad.activo == null ? "NULL" : entidad.activo.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_legislatura", Tipo = "Int", Valor = entidad.id_legislatura == null ? "NULL" : entidad.id_legislatura.ToString() });
                #endregion
                #region Conexion
                using (Contexto conexion = new Contexto()) {
                    var resultSQL = GeneracionParametros.ParametrosSqlServer(ListaEnvioParam,StoreProcedure);
                    response = conexion.Database.ExecuteSqlCommand(resultSQL.Query, resultSQL.ListaParametros.ToArray());
                }
                #endregion
                if (response == 1)
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
        public Response Guardar(tbl_ca_partido_politico entidad) {
            throw new NotImplementedException();
        }


    }
}
