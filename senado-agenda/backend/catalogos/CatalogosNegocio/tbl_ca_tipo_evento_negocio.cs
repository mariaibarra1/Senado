using Modelos.interfaces;
using Modelos.modelos;
using System;
using System.Collections.Generic;
using System.Text;
using CatalogosDatos;
using Modelos.respuestas;

namespace CatalogosNegocio
{
    public class tbl_ca_tipo_evento_negocio : CRUD<tbl_ca_tipo_evento>
    {
        private tbl_ca_tipo_evento_datos _AccesoDatos = new tbl_ca_tipo_evento_datos();
        public ResponseGeneric<List<tbl_ca_tipo_evento>> Consultar(tbl_ca_tipo_evento entidad)
        {
            try
            {
                return _AccesoDatos.Consultar(entidad);
            }
            catch (Exception ex)
            {

                return new ResponseGeneric<List<tbl_ca_tipo_evento>>(ex);
            }
        }

        public Response Eliminar(tbl_ca_tipo_evento entidad)
        {
            throw new NotImplementedException();
        }

        public Response Guardar(tbl_ca_tipo_evento entidad)
        {
            throw new NotImplementedException();
        }

        public Response Modificar(tbl_ca_tipo_evento entidad)
        {
            throw new NotImplementedException();
        }
    }
}
