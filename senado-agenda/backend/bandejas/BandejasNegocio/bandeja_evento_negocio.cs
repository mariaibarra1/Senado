using BandejasDatos;
using Modelos.interfaces;
using Modelos.modelos;
using Modelos.respuestas;
using System;
using System.Collections.Generic;

namespace BandejasNegocio
{
    public class bandeja_evento_negocio : CRUD<bandeja_evento>
    {
        private bandeja_evento_datos _AccesoDatos = new bandeja_evento_datos();
        public ResponseGeneric<List<bandeja_evento>> Consultar(bandeja_evento entidad)
        {
            try
            {
                return _AccesoDatos.Consultar(entidad);
            }
            catch (Exception ex)
            {

                return new ResponseGeneric<List<bandeja_evento>>(ex);
            }
        }

        public Response Eliminar(bandeja_evento entidad)
        {
            throw new NotImplementedException();
        }

        public Response Guardar(bandeja_evento entidad)
        {
            throw new NotImplementedException();
        }

        public Response Modificar(bandeja_evento entidad)
        {
            throw new NotImplementedException();
        }
    }
}
