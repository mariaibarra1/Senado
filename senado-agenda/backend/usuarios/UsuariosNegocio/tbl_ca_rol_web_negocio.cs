using System;
using System.Collections.Generic;
using System.Text;
using Modelos.modelos;
using UsuariosDatos;
using Modelos.respuestas;
using Modelos.interfaces;


namespace UsuariosNegocio
{
    public class tbl_ca_rol_web_negocio : CRUD<tbl_ca_rol_web>
    {
        private tbl_ca_rol_web_datos _AccesoDatos = new tbl_ca_rol_web_datos();
        public ResponseGeneric<List<tbl_ca_rol_web>> Consultar(tbl_ca_rol_web entidad)
        {
            try
            {
                return _AccesoDatos.Consultar(entidad);
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
                return _AccesoDatos.Guardar(entidad);
            }
            catch (Exception ex)
            {
                return new Response(ex);
            }*/
            #endregion

            throw new NotImplementedException();
        }
        public Response Eliminar(tbl_ca_rol_web entidad)
        {
            #region operacion
            try
            {
                return _AccesoDatos.Eliminar(entidad);
            }
            catch (Exception ex)
            {
                return new Response(ex);
            }
            #endregion
        }
        public Response Modificar(tbl_ca_rol_web entidad)
        {
            #region operacion
            try
            {
                return _AccesoDatos.Modificar(entidad);
            }
            catch (Exception ex)
            {
                return new Response(ex);
            }
            #endregion
        }


    }
}
