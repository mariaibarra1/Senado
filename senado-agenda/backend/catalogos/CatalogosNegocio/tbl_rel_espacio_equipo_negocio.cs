using CatalogosDatos;
using Modelos.interfaces;
using Modelos.modelos;
using Modelos.respuestas;
using System;
using System.Collections.Generic;

namespace CatalogosNegocio
{
    public class tbl_rel_espacio_equipo_negocio : CRUD<tbl_rel_espacio_equipo>
    {
        private tbl_rel_espacio_equipo_datos _AccesoDatos = new tbl_rel_espacio_equipo_datos();
        public ResponseGeneric<List<tbl_rel_espacio_equipo>> Consultar(tbl_rel_espacio_equipo entidad)
        {
            try
            {
                return _AccesoDatos.Consultar(entidad);
            }
            catch (Exception ex)
            {

                return new ResponseGeneric<List<tbl_rel_espacio_equipo>>(ex);
            }
        }

        public Response Eliminar(tbl_rel_espacio_equipo entidad)
        {
            throw new NotImplementedException();
        }

        public Response Guardar(tbl_rel_espacio_equipo entidad)
        {
            throw new NotImplementedException();
        }

        public Response Modificar(tbl_rel_espacio_equipo entidad)
        {
            throw new NotImplementedException();
        }
    }
}
