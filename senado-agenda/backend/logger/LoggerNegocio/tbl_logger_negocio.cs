using System;
using System.Collections.Generic;
using System.Text;
using Modelos.interfaces;
using Modelos.modelos;
using Modelos.respuestas;
using LoggerDatos;

namespace LoggerNegocio
{
  public class tbl_logger_negocio : CRUD<tbl_logger>
    {
        private tbl_logger_datos _AccesoDatos = new tbl_logger_datos();
        public ResponseGeneric<List<tbl_logger>> Consultar(tbl_logger entidad)
        {
            try
            {
                return _AccesoDatos.Consultar(entidad);
            }
            catch (Exception ex)
            {
                return new ResponseGeneric<List<tbl_logger>>(ex);
            }
        }
        public Response Eliminar(tbl_logger entidad)
        {
            throw new NotImplementedException();
        }
        public Response Guardar(tbl_logger entidad)
        {
            try
            {
                return _AccesoDatos.Consultar(entidad);

            }
            catch (Exception ex)
            {

                return new Response(ex);
            }
        }

        public Response Modificar(tbl_logger entidad)
        {
            throw new NotImplementedException();
        }
    }
}
