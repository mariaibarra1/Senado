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
    public class tbl_rel_evento_invitado_datos : CRUD<tbl_rel_evento_invitado>
    {
        private BDParametros GeneracionParametros = new BDParametros();
        private string StoreProcedure = " sp_crud_evento_invitado ";
        public ResponseGeneric<List<tbl_rel_evento_invitado>> Consultar(tbl_rel_evento_invitado entidad)
        {


            try
            {
                List<tbl_rel_evento_invitado> Lista = new List<tbl_rel_evento_invitado>();
                #region Parametros
                List<EntidadParametro> ListaEnvioParam = new List<EntidadParametro>();
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_evento", Tipo = "Int", Valor = entidad.id_evento == null ? "NULL" : entidad.id_evento.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "correo_electronico", Tipo = "String", Valor = entidad.correo_electronico == null ? "NULL" : entidad.correo_electronico.ToString() });
                #endregion
                #region ConexionBD
                using (Contexto conexion = new Contexto())
                {
                    var resultSQL = GeneracionParametros.ParametrosSqlServer(ListaEnvioParam, StoreProcedure);
                    Lista = conexion.Query<tbl_rel_evento_invitado>().FromSql<tbl_rel_evento_invitado>(resultSQL.Query, resultSQL.ListaParametros.ToArray()).ToListAsync().Result;
                }
                #endregion
                return new ResponseGeneric<List<tbl_rel_evento_invitado>>(Lista);
            }
            catch (Exception ex)
            {

                return new ResponseGeneric<List<tbl_rel_evento_invitado>>(ex);
            }







        }

        public Response Eliminar(tbl_rel_evento_invitado entidad)
        {
            try
            {
                List<tbl_rel_evento_invitado> Lista = new List<tbl_rel_evento_invitado>();
                #region Parametros
                int response;
                List<EntidadParametro> ListaEnvioParam = new List<EntidadParametro>();
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_evento", Tipo = "Int", Valor = entidad.id_evento == null ? "NULL" : entidad.id_evento.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "correo_electronico", Tipo = "String", Valor = entidad.correo_electronico == null ? "NULL" : entidad.correo_electronico.ToString() });
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
        public Response Modificar(tbl_rel_evento_invitado entidad)
        {
            try
            {
                #region Parametros
                int response;
                List<EntidadParametro> ListaEnvioParam = new List<EntidadParametro>();
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_evento", Tipo = "Int", Valor = entidad.id_evento == null ? "NULL" : entidad.id_evento.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "correo_electronico", Tipo = "String", Valor = entidad.correo_electronico == null ? "NULL" : entidad.correo_electronico.ToString() });
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
        public Response Guardar(tbl_rel_evento_invitado entidad)
        {
            throw new NotImplementedException();
        }

    }
}
