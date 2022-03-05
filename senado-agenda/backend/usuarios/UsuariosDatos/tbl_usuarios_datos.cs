using Conexion;
using Microsoft.EntityFrameworkCore;
using Modelos.interfaces;
using Modelos.modelos;
using Modelos.respuestas;
using System;
using System.Collections.Generic;
using System.Text;

namespace UsuariosDatos
{
    public class tbl_usuarios_datos : CRUD<tbl_usuario>
    {


        private BDParametros GeneracionParametros = new BDParametros();
        private string StoreProcedure = " sp_crud_usuarios ";


        public ResponseGeneric<List<tbl_usuario>> Consultar(tbl_usuario entidad)
        {
            try
            {
                List<tbl_usuario> Lista = new List<tbl_usuario>();
                #region Parametros



                List<EntidadParametro> ListaEnvioParam = new List<EntidadParametro>();
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id", Tipo = "Int", Valor = entidad.id == null? "NULL": entidad.id.ToString()});
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "apellido_paterno", Tipo = "String", Valor = entidad.apellido_paterno == null ? "NULL" : entidad.apellido_paterno });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "apellido_materno", Tipo = "String", Valor = entidad.apellido_materno == null ? "NULL" : entidad.apellido_materno });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_rol_web", Tipo = "int", Valor = entidad.id_rol_web == null? "NULL" : entidad.id_rol_web.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "correo_electronico", Tipo = "String", Valor = entidad.correo_electronico == null ? "NULL" : entidad.correo_electronico });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_gpo_parlamentario", Tipo = "int", Valor = entidad.id_gpo_parlamentario == null ? "NULL" : entidad.id_gpo_parlamentario.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "activo", Tipo = "bit", Valor = entidad.activo == false ? "NULL" : "1" });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "telefono", Tipo = "int", Valor = entidad.telefono == null ? "NULL" : entidad.telefono.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "extension", Tipo = "String", Valor = entidad.extension == null ? "NULL" : entidad.extension.ToString() });
                #endregion
                #region ConexionBD
                using (Contexto conexion = new Contexto())
                {
                    var resultSQL = GeneracionParametros.ParametrosSqlServer(ListaEnvioParam, StoreProcedure);
                    Lista = conexion.Query<tbl_usuario>().FromSql<tbl_usuario>(resultSQL.Query, resultSQL.ListaParametros.ToArray()).ToListAsync().Result;
                    }
                #endregion
                return new ResponseGeneric<List<tbl_usuario>>(Lista);
            }
            catch (Exception ex)
            {

                return new ResponseGeneric<List<tbl_usuario>>(ex);
            }
        }

        public Response Eliminar(tbl_usuario entidad)
        {
            try
            {
                List<tbl_usuario> Lista = new List<tbl_usuario>();
                #region Parametros

                int response;

                List<EntidadParametro> ListaEnvioParam = new List<EntidadParametro>();
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id", Tipo = "Int", Valor = entidad.id == null ? "NULL" : entidad.id.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "apellido_paterno", Tipo = "String", Valor = entidad.apellido_paterno == null ? "NULL" : entidad.apellido_paterno });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "apellido_materno", Tipo = "String", Valor = entidad.apellido_materno == null ? "NULL" : entidad.apellido_materno });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_rol_web", Tipo = "int", Valor = entidad.id_rol_web == null ? "NULL" : entidad.id_rol_web.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "correo_electronico", Tipo = "String", Valor = entidad.correo_electronico == null ? "NULL" : entidad.correo_electronico });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_gpo_parlamentario", Tipo = "int", Valor = entidad.id_gpo_parlamentario == null ? "NULL" : entidad.id_gpo_parlamentario.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "activo", Tipo = "bit", Valor = entidad.activo == false ? "NULL" : "1" });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "telefono", Tipo = "int", Valor = entidad.telefono == null ? "NULL" : entidad.telefono.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "extension", Tipo = "String", Valor = entidad.extension == null ? "NULL" : entidad.extension.ToString() });
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
        public Response Modificar(tbl_usuario entidad)
        {
            try
            {
                List<tbl_usuario> Lista = new List<tbl_usuario>();
                #region Parametros

                int response;

                List<EntidadParametro> ListaEnvioParam = new List<EntidadParametro>();
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id", Tipo = "Int", Valor = entidad.id == null ? "NULL" : entidad.id.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "apellido_paterno", Tipo = "String", Valor = entidad.apellido_paterno == null ? "NULL" : entidad.apellido_paterno });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "apellido_materno", Tipo = "String", Valor = entidad.apellido_materno == null ? "NULL" : entidad.apellido_materno });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_rol_web", Tipo = "int", Valor = entidad.id_rol_web == null ? "NULL" : entidad.id_rol_web.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "correo_electronico", Tipo = "String", Valor = entidad.correo_electronico == null ? "NULL" : entidad.correo_electronico });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_gpo_parlamentario", Tipo = "int", Valor = entidad.id_gpo_parlamentario == null ? "NULL" : entidad.id_gpo_parlamentario.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "activo", Tipo = "bit", Valor = entidad.activo == false ? "NULL" : "1" });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "telefono", Tipo = "int", Valor = entidad.telefono == null ? "NULL" : entidad.telefono.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "extension", Tipo = "String", Valor = entidad.extension == null ? "NULL" : entidad.extension.ToString() });
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
        public Response Guardar(tbl_usuario entidad)
        {
            throw new NotImplementedException();
        }

    }
}
