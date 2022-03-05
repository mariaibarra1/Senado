using Modelos.interfaces;
using Modelos.modelos;
using System;
using System.Collections.Generic;
using System.Text;
using CatalogosDatos;
using Modelos.respuestas;

namespace CatalogosNegocio
{
    public class tbl_ca_espacio_negocio : CRUD<tbl_ca_espacio>
    {
        private tbl_ca_espacio_datos _AccesoDatos = new tbl_ca_espacio_datos();
        public ResponseGeneric<List<tbl_ca_espacio>> Consultar(tbl_ca_espacio entidad)
        {
            try
            {
                return _AccesoDatos.Consultar(entidad);
            }
            catch (Exception ex)
            {

                return new ResponseGeneric<List<tbl_ca_espacio>>(ex);
            }
        }

        public Response Eliminar(tbl_ca_espacio entidad)
        {
            throw new NotImplementedException();
        }

        public Response Guardar(tbl_ca_espacio entidad)
        {
            throw new NotImplementedException();
        }

        public Response Modificar(tbl_ca_espacio entidad)
        {
            throw new NotImplementedException();
        }
    }
}
