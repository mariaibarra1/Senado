using CatalogosDatos;
using Modelos.interfaces;
using Modelos.modelos;
using Modelos.respuestas;
using System;
using System.Collections.Generic;
using System.Text;
namespace CatalogosNegocio
{
    public class tbl_ca_estatus_equipo_negocio : CRUD<tbl_ca_estatus_equipo>
    {
        private tbl_ca_estatus_equipo_datos _AccesoDatos = new tbl_ca_estatus_equipo_datos();

        public ResponseGeneric<List<tbl_ca_estatus_equipo>> Consultar(tbl_ca_estatus_equipo entidad)
        {
            try
            {
                return _AccesoDatos.Consultar(entidad);
            }
            catch (Exception ex)
            {

                return new ResponseGeneric<List<tbl_ca_estatus_equipo>>(ex);
            }
        }

        public Response Eliminar(tbl_ca_estatus_equipo entidad)
        {
            throw new NotImplementedException();
        }

        public Response Guardar(tbl_ca_estatus_equipo entidad)
        {
            throw new NotImplementedException();
        }

        public Response Modificar(tbl_ca_estatus_equipo entidad)
        {
            throw new NotImplementedException();
        }
    }
}
