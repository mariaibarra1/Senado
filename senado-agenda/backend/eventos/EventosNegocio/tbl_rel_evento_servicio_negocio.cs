using EventosDatos;
using Modelos.interfaces;
using Modelos.modelos;
using Modelos.respuestas;
using System;
using System.Collections.Generic;
using System.Text;

namespace EventosNegocio
{
    public class tbl_rel_evento_servicio_negocio: CRUD<tbl_rel_evento_servicio>
    {
        private tbl_rel_evento_servicio_datos _AccesoDatos = new tbl_rel_evento_servicio_datos();

        public ResponseGeneric<List<tbl_rel_evento_servicio>> Consultar(tbl_rel_evento_servicio entidad)
        {
            try
            {
                return _AccesoDatos.Consultar(entidad);
            }
            catch (Exception ex)
            {
                return new ResponseGeneric<List<tbl_rel_evento_servicio>>(ex);
            }
        }
        public Response Eliminar(tbl_rel_evento_servicio entidad)
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
        public Response Guardar(tbl_rel_evento_servicio entidad)
        {
            throw new NotImplementedException();
        }

        public Response Modificar(tbl_rel_evento_servicio entidad)
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
