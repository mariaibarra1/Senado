using CatalogosDatos;
using Modelos.interfaces;
using Modelos.modelos;
using Modelos.respuestas;
using System;
using System.Collections.Generic;
using System.Text;
namespace CatalogosNegocio
{
    public class tbl_ca_tipo_comision_negocio : CRUD<tbl_ca_tipo_comision>
    {
        private tbl_ca_tipo_comision_datos _AccesoDatos = new tbl_ca_tipo_comision_datos();

        public ResponseGeneric<List<tbl_ca_tipo_comision>> Consultar(tbl_ca_tipo_comision entidad)
        {
            try
            {
                return _AccesoDatos.Consultar(entidad);
            }
            catch (Exception ex)
            {

                return new ResponseGeneric<List<tbl_ca_tipo_comision>>(ex);
            }
        }

        public Response Eliminar(tbl_ca_tipo_comision entidad)
        {
            throw new NotImplementedException();
        }

        public Response Guardar(tbl_ca_tipo_comision entidad)
        {
            throw new NotImplementedException();
        }

        public Response Modificar(tbl_ca_tipo_comision entidad)
        {
            throw new NotImplementedException();
        }
    }
}
