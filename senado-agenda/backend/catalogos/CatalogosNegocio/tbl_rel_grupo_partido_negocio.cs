using System;
using System.Collections.Generic;
using System.Text;
using CatalogosDatos;
using Modelos.modelos;
using Modelos.interfaces;
using Modelos.respuestas;

namespace CatalogosNegocio
{
   public  class tbl_rel_grupo_partido_negocio: CRUD<tbl_rel_grupo_partido>
    {
        private tbl_rel_grupo_partido_datos _AccesoDatos = new tbl_rel_grupo_partido_datos();

        public ResponseGeneric<List<tbl_rel_grupo_partido>>Consultar (tbl_rel_grupo_partido entidad)
        {
            try
            {
                return _AccesoDatos.Consultar(entidad);
            }
            catch (Exception ex)
            {

                return new ResponseGeneric<List<tbl_rel_grupo_partido>>(ex);
            }
        }

        public Response Eliminar(tbl_rel_grupo_partido entidad)
        {
            throw new NotImplementedException();
        }

        public Response Guardar(tbl_rel_grupo_partido entidad)
        {
            throw new NotImplementedException();
        }

        public Response Modificar(tbl_rel_grupo_partido entidad)
        {
            throw new NotImplementedException();
        }
    }
}
