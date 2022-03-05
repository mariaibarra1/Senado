using Modelos.interfaces;
using Modelos.modelos;
using System;
using System.Collections.Generic;
using System.Text;
using CatalogosDatos;
using Modelos.respuestas;


namespace CatalogosNegocio
{

    public class tbl_ca_servicio_negocio : CRUD<tbl_ca_servicio>
    {
        private tbl_ca_servicio_datos _AccesoDatos = new tbl_ca_servicio_datos();

        public ResponseGeneric<List<tbl_ca_servicio>> Consultar(tbl_ca_servicio entidad)
        {
            try
            {
                return _AccesoDatos.Consultar(entidad);
            }
            catch (Exception ex)
            {

                return new ResponseGeneric<List<tbl_ca_servicio>>(ex);
            }
        }

        public Response Eliminar(tbl_ca_servicio entidad)
        {
            throw new NotImplementedException();
        }

        public Response Guardar(tbl_ca_servicio entidad)
        {
            throw new NotImplementedException();
        }

        public Response Modificar(tbl_ca_servicio entidad)
        {
            throw new NotImplementedException();
        }
    }
}
