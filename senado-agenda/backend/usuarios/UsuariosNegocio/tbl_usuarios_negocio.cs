using Modelos.interfaces;
using Modelos.modelos;
using Modelos.respuestas;
using System;
using System.Collections.Generic;
using System.Text;
using UsuariosDatos;

namespace UsuariosNegocio
{
    public class tbl_usuarios_negocio :CRUD<tbl_usuario>
    {
        private tbl_usuarios_datos _AccesoDatos = new tbl_usuarios_datos();

        public ResponseGeneric<List<tbl_usuario>> Consultar(tbl_usuario entidad)
        {
            try
            {
                return _AccesoDatos.Consultar(entidad);
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
                return _AccesoDatos.Eliminar(entidad);
            }
            catch (Exception ex)
            {
                return new Response(ex);
            }
        }
        public Response Guardar(tbl_usuario entidad)
        {
            throw new NotImplementedException();
        }

        public Response Modificar(tbl_usuario entidad)
        {
            try
            {
                return _AccesoDatos.Modificar(entidad);
            }
            catch (Exception ex)
            {
                return new Response(ex);
            }

        }
    }
}
