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
    public class tbl_comision_datos:CRUD<tbl_comision>
    {
        private BDParametros GeneracionParametros = new BDParametros();
        private string StoreProcedure = "sp_crud_comision";
        public ResponseGeneric<List<tbl_comision>> Consultar(tbl_comision entidad) {
            try {
                #region Parametros
                List<tbl_comision> Lista = new List<tbl_comision>();
                List<EntidadParametro> ListaEnvioParametro = new List<EntidadParametro>();
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "id", Tipo = "Int", Valor = entidad.id == null ? "NULL" : entidad.id.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "micrositio", Tipo = "String", Valor = entidad.micrositio == null ? "NULL" : entidad.micrositio.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "correo_electronico", Tipo = "String", Valor = entidad.correo_electronico == null ? "NULL" : entidad.correo_electronico.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "id_ubicacion", Tipo = "Int", Valor = entidad.id_ubicacion == null ? "NULL" : entidad.id_ubicacion.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "activo", Tipo = "Boolean", Valor = entidad.activo == null ? "NULL" : entidad.activo.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "id_legislatura", Tipo = "Int", Valor = entidad.id_legislatura == null ? "NULL" : entidad.id_legislatura.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "id_tipo_comision", Tipo = "Int", Valor = entidad.id_tipo_comision == null ? "NULL" : entidad.id_tipo_comision.ToString() });
                #endregion
                #region Conexion
                using (Contexto conexion = new Contexto()) {
                    var resultSQL = GeneracionParametros.ParametrosSqlServer(ListaEnvioParametro, StoreProcedure);
                    Lista = conexion.Query<tbl_comision>().FromSql<tbl_comision>(resultSQL.Query, resultSQL.ListaParametros.ToArray()).ToListAsync().Result;

                }
                #endregion
                return new ResponseGeneric<List<tbl_comision>>(Lista);
            }
            catch (Exception ex) {
                return new ResponseGeneric<List<tbl_comision>>(ex);
            }
        }

        public Response Guardar(tbl_comision entidad) {
            throw new NotImplementedException();
        }
        public Response Modificar(tbl_comision entidad) {
            try
            {
                #region Parametros
                int response = 0;
                List<EntidadParametro> ListaEnvioParametro = new List<EntidadParametro>();
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "id", Tipo = "Int", Valor = entidad.id == null ? "NULL" : entidad.id.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "micrositio", Tipo = "String", Valor = entidad.micrositio == null ? "NULL" : entidad.micrositio.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "correo_electronico", Tipo = "String", Valor = entidad.correo_electronico == null ? "NULL" : entidad.correo_electronico.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "id_ubicacion", Tipo = "Int", Valor = entidad.id_ubicacion == null ? "NULL" : entidad.id_ubicacion.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "activo", Tipo = "Boolean", Valor = entidad.activo == null ? "NULL" : entidad.activo.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "id_legislatura", Tipo = "Int", Valor = entidad.id_legislatura == null ? "NULL" : entidad.id_legislatura.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "id_tipo_comision", Tipo = "Int", Valor = entidad.id_tipo_comision == null ? "NULL" : entidad.id_tipo_comision.ToString() });

                #endregion
                #region Conexion
                using (Contexto conexion = new Contexto()) {
                    var resultSQL = GeneracionParametros.ParametrosSqlServer(ListaEnvioParametro, StoreProcedure);
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
        public Response Eliminar(tbl_comision entidad) {
            try
            {
                #region Parametros
                int response = 0;
                List<EntidadParametro> ListaEnvioParametro = new List<EntidadParametro>();
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "id", Tipo = "Int", Valor = entidad.id == null ? "NULL" : entidad.id.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "micrositio", Tipo = "String", Valor = entidad.micrositio == null ? "NULL" : entidad.micrositio.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "correo_electronico", Tipo = "String", Valor = entidad.correo_electronico == null ? "NULL" : entidad.correo_electronico.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "id_ubicacion", Tipo = "Int", Valor = entidad.id_ubicacion == null ? "NULL" : entidad.id_ubicacion.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "activo", Tipo = "Boolean", Valor = entidad.activo == null ? "NULL" : entidad.activo.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "id_legislatura", Tipo = "Int", Valor = entidad.id_legislatura == null ? "NULL" : entidad.id_legislatura.ToString() });
                ListaEnvioParametro.Add(new EntidadParametro { Nombre = "id_tipo_comision", Tipo = "Int", Valor = entidad.id_tipo_comision == null ? "NULL" : entidad.id_tipo_comision.ToString() });

                #endregion
                #region Conexion
                using (Contexto conexion = new Contexto())
                {
                    var resultSQL = GeneracionParametros.ParametrosSqlServer(ListaEnvioParametro, StoreProcedure);
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
            catch (Exception ex) {
                return new Response(ex.ToString());
            }
        }
       
    }
}
