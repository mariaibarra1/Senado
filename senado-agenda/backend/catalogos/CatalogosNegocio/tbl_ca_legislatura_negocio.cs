using CatalogosDatos;
using Modelos.interfaces;
using Modelos.modelos;
using Modelos.respuestas;
using System;
using System.Collections.Generic;
using System.Text;

namespace CatalogosNegocio
{
    public class tbl_ca_legislatura_negocio : CRUD<tbl_ca_legislatura>
    {
        private tbl_ca_legislatura_datos _AccesoDatos = new tbl_ca_legislatura_datos();
        public ResponseGeneric<List<tbl_ca_legislatura>> Consultar(tbl_ca_legislatura entidad)
        {
            try
            {
                return _AccesoDatos.Consultar(entidad);
            }
            catch (Exception ex)
            {

                return new ResponseGeneric<List<tbl_ca_legislatura>>(ex);
            }
        }

        public Response Eliminar(tbl_ca_legislatura entidad)
        {
            throw new NotImplementedException();
        }

        public Response Guardar(tbl_ca_legislatura entidad)
        {
            throw new NotImplementedException();
        }

        public Response Modificar(tbl_ca_legislatura entidad)
        {
            throw new NotImplementedException();
        }
    }
}
