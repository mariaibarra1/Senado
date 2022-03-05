using EventosDatos;
using Modelos.interfaces;
using Modelos.modelos;
using Modelos.respuestas;
using System;
using System.Collections.Generic;
using System.Text;

namespace EventosNegocio
{
    public class tbl_rel_evento_invitado_negocio : CRUD<tbl_rel_evento_invitado>
    {
        private tbl_rel_evento_invitado_datos _AccesoDatos = new tbl_rel_evento_invitado_datos();
        public ResponseGeneric<List<tbl_rel_evento_invitado>> Consultar(tbl_rel_evento_invitado entidad)
        {
            try
            {
                return _AccesoDatos.Consultar(entidad);
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
                return _AccesoDatos.Eliminar(entidad);
            }
            catch (Exception ex)
            {
                return new Response(ex);
            }
        }
        public Response Guardar(tbl_rel_evento_invitado entidad)
        {
            throw new NotImplementedException();
        }

        public Response Modificar(tbl_rel_evento_invitado entidad)
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
