using Modelos.interfaces;
using System;
using System.Collections.Generic;
using Modelos.modelos;
using Modelos.respuestas;
using Conexion;
using Microsoft.EntityFrameworkCore;

namespace BandejasDatos
{
    public class bandeja_evento_datos : CRUD<bandeja_evento>
    {
        private BDParametros GeneracionParametros = new BDParametros();
        private string StoreProcedure = "sp_bandeja_evento";
        public ResponseGeneric<List<bandeja_evento>> Consultar(bandeja_evento entidad)
        {
            try
            {
                List<bandeja_evento> Lista = new List<bandeja_evento>();
                #region Parametros
                List<EntidadParametro> ListaEnvioParam = new List<EntidadParametro>();
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id", Tipo = "Int", Valor = entidad.id == null ? "NULL" : entidad.id.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "aprobado", Tipo = "bit", Valor = entidad.aprobado == false ? "NULL" : "1" });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "comentario", Tipo = "String", Valor = entidad.descripcion == null ? "NULL" : entidad.descripcion.ToString() });

                #endregion
                #region ConexionBD
                using (Contexto conexion = new Contexto())
                {
                    var resultSQL = GeneracionParametros.ParametrosSqlServer(ListaEnvioParam, StoreProcedure);
                    Lista = conexion.Query<bandeja_evento>().FromSql<bandeja_evento>(resultSQL.Query, resultSQL.ListaParametros.ToArray()).ToListAsync().Result;
                }
                #endregion
                return new ResponseGeneric<List<bandeja_evento>>(Lista);
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
