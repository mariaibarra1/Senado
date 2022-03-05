using Conexion;
using Microsoft.EntityFrameworkCore;
using Modelos.interfaces;
using Modelos.modelos;
using Modelos.respuestas;
using System;
using System.Collections.Generic;
using System.Text;

namespace CatalogosDatos
{
    public class tbl_ca_equipo_datos:CRUD<tbl_ca_equipo>
    {
        private BDParametros GeneracionParametros = new BDParametros();
        private string StoreProcedure = " sp_crud_equipos ";
        public ResponseGeneric<List<tbl_ca_equipo>> Consultar(tbl_ca_equipo entidad)
       {
            try
            {
                List<tbl_ca_equipo> Lista = new List<tbl_ca_equipo>();
                #region Parametros
                List<EntidadParametro> ListaEnvioParam = new List<EntidadParametro>();
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id", Tipo = "Int", Valor = entidad.id == null ? "NULL" : entidad.id.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "descricion", Tipo = "String", Valor = entidad.descripcion == null ? "NULL" : entidad.descripcion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "activo", Tipo = "bit", Valor = entidad.activo == false ? "NULL" :"1"});
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_tipo", Tipo = "Int", Valor = entidad.id_tipo == null ? "NULL" : entidad.id_tipo.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_estatus", Tipo = "Int", Valor = entidad.id_estatus == null ? "NULL" : entidad.id_estatus.ToString() });

                ListaEnvioParam.Add(new EntidadParametro { Nombre = "estatus_nombre", Tipo = "String", Valor = entidad.estatus_nombre == null ? "NULL" : entidad.estatus_nombre });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo_nombre", Tipo = "String", Valor = entidad.tipo_nombre == null ? "NULL" : entidad.tipo_nombre });
                #endregion
                #region ConexionBD
                using (Contexto conexion = new Contexto())
                {
                    var resultSQL = GeneracionParametros.ParametrosSqlServer(ListaEnvioParam, StoreProcedure);
                    Lista = conexion.Query<tbl_ca_equipo>().FromSql<tbl_ca_equipo>(resultSQL.Query, resultSQL.ListaParametros.ToArray()).ToListAsync().Result;
                }
                #endregion
                return new ResponseGeneric<List<tbl_ca_equipo>>(Lista);
            }
            catch (Exception ex)
             {

                return new ResponseGeneric<List<tbl_ca_equipo>>(ex);
            }
        }

        public Response Eliminar(tbl_ca_equipo entidad)
        {
            try
            {
                List<tbl_ca_equipo> Lista = new List<tbl_ca_equipo>();
                #region Parametros
                int response;
                List<EntidadParametro> ListaEnvioParam = new List<EntidadParametro>();
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id", Tipo = "Int", Valor = entidad.id == null ? "NULL" : entidad.id.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "descricion", Tipo = "String", Valor = entidad.descripcion == null ? "NULL" : entidad.descripcion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "activo", Tipo = "bit", Valor = entidad.activo == false ? "NULL" : "1" });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_tipo", Tipo = "Int", Valor = entidad.id_tipo == null ? "NULL" : entidad.id_tipo.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_estatus", Tipo = "Int", Valor = entidad.id_estatus == null ? "NULL" : entidad.id_estatus.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "estatus_nombre", Tipo = "String", Valor = entidad.estatus_nombre == null ? "NULL" : entidad.estatus_nombre });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo_nombre", Tipo = "String", Valor = entidad.tipo_nombre == null ? "NULL" : entidad.tipo_nombre });
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
        public Response Modificar(tbl_ca_equipo entidad)
        {
            try
            {
                List<tbl_ca_equipo> Lista = new List<tbl_ca_equipo>();
                #region Parametros
                int response;
                List<EntidadParametro> ListaEnvioParam = new List<EntidadParametro>();
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id", Tipo = "Int", Valor = entidad.id == null ? "NULL" : entidad.id.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "descricion", Tipo = "String", Valor = entidad.descripcion == null ? "NULL" : entidad.descripcion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "activo", Tipo = "bit", Valor = entidad.activo == false ? "NULL" : "1" });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_tipo", Tipo = "Int", Valor = entidad.id_tipo == null ? "NULL" : entidad.id_tipo.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_estatus", Tipo = "Int", Valor = entidad.id_estatus == null ? "NULL" : entidad.id_estatus.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "estatus_nombre", Tipo = "String", Valor = entidad.estatus_nombre == null ? "NULL" : entidad.estatus_nombre });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo_nombre", Tipo = "String", Valor = entidad.tipo_nombre == null ? "NULL" : entidad.tipo_nombre });
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
        public Response Guardar(tbl_ca_equipo entidad)
        {
            throw new NotImplementedException();
        }
    }
}
