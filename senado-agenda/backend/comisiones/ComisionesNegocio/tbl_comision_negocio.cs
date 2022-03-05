using System;
using System.Collections.Generic;
using System.Text;
using ComisionesDatos;
using Modelos.interfaces;
using Modelos.modelos;
using Modelos.respuestas;

namespace ComisionesNegocio
{
    public class tbl_comision_negocio:CRUD<tbl_comision>
    {
        private tbl_comision_datos _AccesoDatos = new tbl_comision_datos();
        public ResponseGeneric<List<tbl_comision>> Consultar(tbl_comision entidad) {
            try
            {
                return _AccesoDatos.Consultar(entidad);
            }
            catch (Exception ex) {
                return new ResponseGeneric<List<tbl_comision>>(ex);
            }
        }
        public Response Eliminar(tbl_comision entidad) {
            try
            {
                return _AccesoDatos.Eliminar(entidad);
            }
            catch (Exception ex) {
                return new Response(ex);
            }
        }
        public Response Modificar(tbl_comision entidad) {
            try
            {
                return _AccesoDatos.Modificar(entidad);
            }
            catch (Exception ex) {
                return new Response(ex);
            }
        }
        public Response Guardar(tbl_comision entidad) {
            throw new NotImplementedException();
        }

    }
}
