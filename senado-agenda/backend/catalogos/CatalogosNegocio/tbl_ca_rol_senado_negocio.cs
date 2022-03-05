using Modelos.interfaces;
using Modelos.modelos;
using System;
using System.Collections.Generic;
using System.Text;
using CatalogosDatos;
using Modelos.respuestas;

namespace CatalogosNegocio
{
    public class tbl_ca_rol_senado_negocio : CRUD<tbl_ca_rol_senado>
    {
        private tbl_ca_rol_senado_datos _AccesoDatos = new tbl_ca_rol_senado_datos();
        public ResponseGeneric<List<tbl_ca_rol_senado>> Consultar(tbl_ca_rol_senado entidad)
        {
            try
            {
                return _AccesoDatos.Consultar(entidad);
            }
            catch (Exception ex)
            {

                return new ResponseGeneric<List<tbl_ca_rol_senado>>(ex);
            }
        }

        public Response Eliminar(tbl_ca_rol_senado entidad)
        {
            throw new NotImplementedException();
        }
        public Response Guardar(tbl_ca_rol_senado entidad)
        {
            throw new NotImplementedException();
        }

        public Response Modificar(tbl_ca_rol_senado entidad)
        {
            throw new NotImplementedException();
        }

    }
}
