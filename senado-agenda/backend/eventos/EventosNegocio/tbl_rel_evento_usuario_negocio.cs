using EventosDatos;
using Modelos.interfaces;
using Modelos.modelos;
using Modelos.respuestas;
using System;
using System.Collections.Generic;
using System.Text;

namespace EventosNegocio
{
   public class tbl_rel_evento_usuario_negocio :CRUD<tbl_rel_evento_usuario>
    {
        private tbl_rel_evento_usuario_datos _AccesoDatos = new tbl_rel_evento_usuario_datos();
        public ResponseGeneric<List<tbl_rel_evento_usuario>> Consultar(tbl_rel_evento_usuario entidad)
        {
            try
            {
                return _AccesoDatos.Consultar(entidad);
            }
            catch (Exception ex)
            {
                return new ResponseGeneric<List<tbl_rel_evento_usuario>>(ex);
            }
        }
        public Response Eliminar(tbl_rel_evento_usuario entidad)
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
        public Response Guardar(tbl_rel_evento_usuario entidad)
        {
            throw new NotImplementedException();
        }

        public Response Modificar(tbl_rel_evento_usuario entidad)
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
