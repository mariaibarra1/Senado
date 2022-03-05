using System;
using System.Collections.Generic;
using System.Text;
using CatalogosDatos;
using Modelos.interfaces;
using Modelos.modelos;
using Modelos.respuestas;


namespace CatalogosNegocio
{
    public class tbl_ca_partido_politico_negocio: CRUD<tbl_ca_partido_politico>
    {
        private tbl_ca_partido_politico_datos _AccesoDatos = new tbl_ca_partido_politico_datos();
        public ResponseGeneric<List<tbl_ca_partido_politico>> Consultar(tbl_ca_partido_politico entidad) {
            try
            {
                return _AccesoDatos.Consultar(entidad);
            }
            catch(Exception ex) {
                return new ResponseGeneric<List<tbl_ca_partido_politico>>(ex);
            }
        }
        public Response Eliminar(tbl_ca_partido_politico entidad) {
            try
            {
                return _AccesoDatos.Eliminar(entidad);
            }
            catch (Exception ex) {
                return new Response(ex);
            }
        }
        public Response Guardar(tbl_ca_partido_politico entidad) {
            throw new NotImplementedException();
        }

        public Response Modificar(tbl_ca_partido_politico entidad) {
            try
            {
                return _AccesoDatos.Modificar(entidad);
            }
            catch (Exception ex) {
                return new Response(ex);
            }

        }

    }
}
