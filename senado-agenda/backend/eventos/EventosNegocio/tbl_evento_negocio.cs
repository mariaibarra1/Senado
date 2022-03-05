using EventosDatos;
using Modelos.interfaces;
using Modelos.modelos;
using Modelos.respuestas;
using System;
using System.Collections.Generic;
using System.Text;

namespace EventosNegocio
{
    public class tbl_evento_negocio : CRUD<tbl_evento>
    {
        private tbl_evento_datos _AccesoDatos = new tbl_evento_datos();
        public ResponseGeneric<List<tbl_evento>> Consultar(tbl_evento entidad)
        {
            try
            {
                return _AccesoDatos.Consultar(entidad);
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
                return _AccesoDatos.Eliminar(entidad);
            }
            catch (Exception ex)
            {
                return new Response(ex);
            }
        }
        public Response Guardar(tbl_evento entidad)
        {
            throw new NotImplementedException();
        }

        public Response Modificar(tbl_evento entidad)
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
