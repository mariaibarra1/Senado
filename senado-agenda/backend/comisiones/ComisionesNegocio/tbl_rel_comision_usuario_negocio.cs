using System;
using System.Collections.Generic;
using System.Text;
using ComisionesDatos;
using Modelos.interfaces;
using Modelos.modelos;
using Modelos.respuestas;

namespace ComisionesNegocio
{
    public class tbl_rel_comision_usuario_negocio:CRUD<tbl_rel_comision_usuario>
    {
        private tbl_rel_comision_usuario_datos _AccesoDatos = new tbl_rel_comision_usuario_datos();
        public ResponseGeneric<List<tbl_rel_comision_usuario>> Consultar(tbl_rel_comision_usuario entidad) {
            try
            {
                return _AccesoDatos.Consultar(entidad);
            }
            catch (Exception ex) {
                return new ResponseGeneric<List<tbl_rel_comision_usuario>>(ex);
            }
        }

        public Response Guardar(tbl_rel_comision_usuario entidad) {
            throw new NotImplementedException();
        }
        public Response Modificar(tbl_rel_comision_usuario entidad) {
            try
            {
                return _AccesoDatos.Modificar(entidad);
            }
            catch (Exception ex) {
                return new ResponseGeneric<List<tbl_rel_comision_usuario>>(ex);
            }
        }
        public Response Eliminar(tbl_rel_comision_usuario entidad) {
            try
            {
                return _AccesoDatos.Eliminar(entidad);
            }
            catch (Exception ex)
            {
                return new ResponseGeneric<List<tbl_rel_comision_usuario>>(ex);
            }
        }

    }
}
