using CatalogosDatos;
using Modelos.interfaces;
using Modelos.modelos;
using Modelos.respuestas;
using System;
using System.Collections.Generic;

namespace CatalogosNegocio
{
    public class tbl_ca_est_mun_loc_negocio : CRUD<tbl_ca_est_mun_loc>
    {
        private tbl_ca_est_mun_loc_datos _AccesoDatos = new tbl_ca_est_mun_loc_datos();
        public ResponseGeneric<List<tbl_ca_est_mun_loc>> Consultar(tbl_ca_est_mun_loc entidad)
        {
            try
            {
                return _AccesoDatos.Consultar(entidad);
            }
            catch (Exception ex)
            {

                return new ResponseGeneric<List<tbl_ca_est_mun_loc>>(ex);
            }
        }

        public Response Eliminar(tbl_ca_est_mun_loc entidad)
        {
            throw new NotImplementedException();
        }

        public Response Guardar(tbl_ca_est_mun_loc entidad)
        {
            throw new NotImplementedException();
        }

        public Response Modificar(tbl_ca_est_mun_loc entidad)
        {
            throw new NotImplementedException();
        }
    }
}
