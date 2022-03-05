using System;
using System.Collections.Generic;
using System.Text;
using Modelos.modelos;
using Modelos.interfaces;
using Modelos.respuestas;
using Conexion;
using Microsoft.EntityFrameworkCore;


namespace UsuariosDatos
{
    public class tbl_ca_rol_web_datos : CRUD<tbl_ca_rol_web>
    {
        private BDParametros GeneracionParametros = new BDParametros();
        private string StoreProcedure = "sp_crud_rol_web";
        public ResponseGeneric<List<tbl_ca_rol_web>> Consultar(tbl_ca_rol_web entidad)
        {
            try
            {
                List<tbl_ca_rol_web> Lista = new List<tbl_ca_rol_web>();
                #region Parametros
                List<EntidadParametro> ListaParametros = new List<EntidadParametro>();
                ListaParametros.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaParametros.Add(new EntidadParametro { Nombre = "id", Tipo = "Int", Valor = entidad.id == null ? "NULL" : entidad.id.ToString() });
                ListaParametros.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaParametros.Add(new EntidadParametro { Nombre = "descripcion", Tipo = "String", Valor = entidad.descripcion == null ? "NULL" : entidad.descripcion.ToString() });
                ListaParametros.Add(new EntidadParametro { Nombre = "activo", Tipo = "Boolean", Valor = entidad.activo == null ? "NULL" : entidad.activo.ToString() });

                #endregion
                #region Conexion
                using (Contexto conexion = new Contexto())
                {
                    var resultSQL = GeneracionParametros.ParametrosSqlServer(ListaParametros, StoreProcedure);
                    Lista = conexion.Query<tbl_ca_rol_web>().FromSql<tbl_ca_rol_web>(resultSQL.Query, resultSQL.ListaParametros.ToArray()).ToListAsync().Result;
                }
                return new ResponseGeneric<List<tbl_ca_rol_web>>(Lista);
                #endregion
            }
            catch (Exception ex)
            {
                return new ResponseGeneric<List<tbl_ca_rol_web>>(ex);
            }
        }

        public Response Guardar(tbl_ca_rol_web entidad)
        {
            #region operacion
            /*
            try
            {
                #region Parametros
                List<EntidadParametro> ListaParametros = new List<EntidadParametro>();
                ListaParametros.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = "2" });
                ListaParametros.Add(new EntidadParametro { Nombre = "id", Tipo = "Int", Valor = entidad.id == null ? "NULL" : entidad.id.ToString() });
                ListaParametros.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaParametros.Add(new EntidadParametro { Nombre = "descripcion", Tipo = "String", Valor = entidad.descripcion == null ? "NULL" : entidad.descripcion.ToString() });
                ListaParametros.Add(new EntidadParametro { Nombre = "activo", Tipo = "Boolean", Valor = entidad.activo == null ? "NULL" : entidad.activo.ToString() });
                int result = 0;
                #endregion
                #region Conexion
                using (Contexto conexion = new Contexto())
                {
                    var resultSQL = GeneracionParametros.ParametrosSqlServer(ListaParametros, StoreProcedure);
                    result = conexion.Database.ExecuteSqlCommand(resultSQL.Query, resultSQL.ListaParametros.ToArray());
                }
                #endregion
                #region Resultado
                if (result == 1)
                {
                    return new Response();
                }
                else
                {
                    return new Response("Error en la Petición");
                }
                #endregion
            }
            catch (Exception ex)
            {
                return new Response(ex);
            }
            */
            #endregion
            throw new NotImplementedException();
        }
        public Response Modificar(tbl_ca_rol_web entidad)
        {
            #region operacion
            try
            {
                #region Parametros
                List<EntidadParametro> ListaParametros = new List<EntidadParametro>();
                ListaParametros.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaParametros.Add(new EntidadParametro { Nombre = "id", Tipo = "Int", Valor = entidad.id == null ? "NULL" : entidad.id.ToString() });
                ListaParametros.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaParametros.Add(new EntidadParametro { Nombre = "descripcion", Tipo = "String", Valor = entidad.descripcion == null ? "NULL" : entidad.descripcion.ToString() });
                ListaParametros.Add(new EntidadParametro { Nombre = "activo", Tipo = "Boolean", Valor = entidad.activo == null ? "NULL" : entidad.activo.ToString() });
                int resultado = 0;
                #endregion
                #region Conexion
                using (Contexto conexion = new Contexto())
                {
                    var resultSQL = GeneracionParametros.ParametrosSqlServer(ListaParametros, StoreProcedure);
                    resultado = conexion.Database.ExecuteSqlCommand(resultSQL.Query, resultSQL.ListaParametros.ToArray());
                }
                #endregion
                #region Response
                if (resultado == 1)
                {
                    return new Response();
                }
                else
                {
                    return new Response("Error en la petición");
                }
                #endregion
            }
            catch (Exception ex)
            {
                return new Response(ex.ToString());
            }
            #endregion
        }
        public Response Eliminar(tbl_ca_rol_web entidad)
        {
            #region operacion
            try
            {
                #region Parametros
                List<EntidadParametro> ListaParametros = new List<EntidadParametro>();
                ListaParametros.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaParametros.Add(new EntidadParametro { Nombre = "id", Tipo = "Int", Valor = entidad.id == null ? "NULL" : entidad.id.ToString() });
                ListaParametros.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaParametros.Add(new EntidadParametro { Nombre = "descripcion", Tipo = "String", Valor = entidad.descripcion == null ? "NULL" : entidad.descripcion.ToString() });
                ListaParametros.Add(new EntidadParametro { Nombre = "activo", Tipo = "Boolean", Valor = entidad.activo == null ? "NULL" : entidad.activo.ToString() });
                int resultado = 0;
                #endregion
                #region Conexion
                using (Contexto conexion = new Contexto())
                {
                    var resultSQL = GeneracionParametros.ParametrosSqlServer(ListaParametros, StoreProcedure);
                    resultado = conexion.Database.ExecuteSqlCommand(resultSQL.Query, resultSQL.ListaParametros.ToArray());
                }
                #endregion
                #region Response
                if (resultado == 1)
                {
                    return new Response();
                }
                else
                {
                    return new Response("Error en la petición");
                }
                #endregion
            }
            catch (Exception ex)
            {
                return new Response(ex.ToString());
            }
            #endregion
        }

    }
}
