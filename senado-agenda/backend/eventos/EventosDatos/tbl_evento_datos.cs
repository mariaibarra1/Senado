using Conexion;
using Microsoft.EntityFrameworkCore;
using Modelos.interfaces;
using Modelos.modelos;
using Modelos.respuestas;
using System;
using System.Collections.Generic;
using System.Text;

namespace EventosDatos
{
    public class tbl_evento_datos: CRUD<tbl_evento>
    {
        private BDParametros GeneracionParametros = new BDParametros();
        private string StoreProcedure = " sp_crud_evento ";
        public ResponseGeneric<List<tbl_evento>> Consultar(tbl_evento entidad)
        {
            try
            {



                List<tbl_evento> Lista = new List<tbl_evento>();
                #region Parametros
                List<EntidadParametro> ListaEnvioParam = new List<EntidadParametro>();
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id", Tipo = "Int", Valor = entidad.id == null ? "NULL" : entidad.id.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "descricion", Tipo = "String", Valor = entidad.descripcion == null ? "NULL" : entidad.descripcion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_tipo_evento", Tipo = "Int", Valor = entidad.id_tipo_evento == null ? "NULL" : entidad.id_tipo_evento.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_espacio", Tipo = "Int", Valor = entidad.id_espacio == null ? "NULL" : entidad.id_espacio.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_solicitante", Tipo = "Int", Valor = entidad.id_solicitante == null ? "NULL" : entidad.id_solicitante.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_comision", Tipo = "Int", Valor = entidad.id_comision == null ? "NULL" : entidad.id_comision.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "fecha_inicio", Tipo = "String", Valor = entidad.fecha_inicio ?? "NULL" });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "hora_inicio", Tipo = "String", Valor = entidad.hora_inicio ?? "NULL" });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "fecha_fin", Tipo = "String", Valor = entidad.fecha_fin ?? "NULL" });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "hora_fin", Tipo = "String", Valor = entidad.hora_fin ?? "NULL" });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "privado", Tipo = "bit", Valor = entidad.privado == false ? "NULL" : "1" });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "aprobado", Tipo = "bit", Valor = entidad.aprobado == false ? "NULL" : "1" });
                #endregion
                #region ConexionBD
                using (Contexto conexion = new Contexto())  
                {
                    var resultSQL = GeneracionParametros.ParametrosSqlServer(ListaEnvioParam, StoreProcedure);
                    Lista = conexion.Query<tbl_evento>().FromSql<tbl_evento>(resultSQL.Query, resultSQL.ListaParametros.ToArray()).ToListAsync().Result;
                }
                #endregion
                return new ResponseGeneric<List<tbl_evento>>(Lista);
            }
            catch (Exception ex)
            {

                return new ResponseGeneric<List<tbl_evento>>(ex);
            }

        }

        public Response Eliminar(tbl_evento entidad)
        {
            try
            {
                List<tbl_evento> Lista = new List<tbl_evento>();
                #region Parametros
                int response;
                List<EntidadParametro> ListaEnvioParam = new List<EntidadParametro>();
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id", Tipo = "Int", Valor = entidad.id == null ? "NULL" : entidad.id.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "descricion", Tipo = "String", Valor = entidad.descripcion == null ? "NULL" : entidad.descripcion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_tipo_evento", Tipo = "Int", Valor = entidad.id_tipo_evento == null ? "NULL" : entidad.id_tipo_evento.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_espacio", Tipo = "Int", Valor = entidad.id_espacio == null ? "NULL" : entidad.id_espacio.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_solicitante", Tipo = "Int", Valor = entidad.id_solicitante == null ? "NULL" : entidad.id_solicitante.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_comision", Tipo = "Int", Valor = entidad.id_comision == null ? "NULL" : entidad.id_comision.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "fecha_inicio", Tipo = "String", Valor = entidad.fecha_inicio ?? "NULL" });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "hora_inicio", Tipo = "String", Valor = entidad.hora_inicio ?? "NULL" });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "fecha_fin", Tipo = "String", Valor = entidad.fecha_fin ?? "NULL" });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "hora_fin", Tipo = "String", Valor = entidad.hora_fin ?? "NULL" });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "privado", Tipo = "bit", Valor = entidad.privado == false ? "NULL" : "1" });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "aprobado", Tipo = "bit", Valor = entidad.aprobado == false ? "NULL" : "1" });
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
        public Response Modificar(tbl_evento entidad)
        {
            try
            {
                #region Parametros
                int response;
                List<EntidadParametro> ListaEnvioParam = new List<EntidadParametro>();
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id", Tipo = "Int", Valor = entidad.id == null ? "NULL" : entidad.id.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "descricion", Tipo = "String", Valor = entidad.descripcion == null ? "NULL" : entidad.descripcion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_tipo_evento", Tipo = "Int", Valor = entidad.id_tipo_evento == null ? "NULL" : entidad.id_tipo_evento.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_espacio", Tipo = "Int", Valor = entidad.id_espacio == null ? "NULL" : entidad.id_espacio.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_solicitante", Tipo = "Int", Valor = entidad.id_solicitante == null ? "NULL" : entidad.id_solicitante.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_comision", Tipo = "Int", Valor = entidad.id_comision == null ? "NULL" : entidad.id_comision.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "fecha_inicio", Tipo = "String", Valor = entidad.fecha_inicio ?? "NULL" });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "hora_inicio", Tipo = "String", Valor = entidad.hora_inicio ?? "NULL" });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "fecha_fin", Tipo = "String", Valor = entidad.fecha_fin ?? "NULL" });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "hora_fin", Tipo = "String", Valor = entidad.hora_fin ?? "NULL" });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "privado", Tipo = "bit", Valor = entidad.privado == false ? "NULL" : "1" });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "aprobado", Tipo = "bit", Valor = entidad.aprobado == false ? "NULL" : "1" });
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
        public Response Guardar(tbl_evento entidad)
        {
            throw new NotImplementedException();
        }
    }
}
