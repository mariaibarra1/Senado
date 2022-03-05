using Modelos.interfaces;
using System;
using System.Collections.Generic;
using Modelos.modelos;
using Modelos.respuestas;
using Conexion;
using Microsoft.EntityFrameworkCore;

namespace CatalogosDatos
{
    public class tbl_ca_est_mun_loc_datos : CRUD<tbl_ca_est_mun_loc>
    {
        private BDParametros GeneracionParametros = new BDParametros();
        private string StoreProcedure = "sp_estados_municipios";
        public ResponseGeneric<List<tbl_ca_est_mun_loc>> Consultar(tbl_ca_est_mun_loc entidad)
        {
            try
            {
                List<tbl_ca_est_mun_loc> Lista = new List<tbl_ca_est_mun_loc>();
                #region Parametros
                List<EntidadParametro> ListaEnvioParam = new List<EntidadParametro>();
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id", Tipo = "Int", Valor = entidad.id == null ? "NULL" : entidad.id.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "codigoPostal", Tipo = "Int", Valor = entidad.codigo_postal == null ? "NULL" : entidad.codigo_postal.ToString() });

                #endregion
                #region ConexionBD
                using (Contexto conexion = new Contexto())
                {
                    var resultSQL = GeneracionParametros.ParametrosSqlServer(ListaEnvioParam, StoreProcedure);
                    Lista = conexion.Query<tbl_ca_est_mun_loc>().FromSql<tbl_ca_est_mun_loc>(resultSQL.Query, resultSQL.ListaParametros.ToArray()).ToListAsync().Result;
                }
                #endregion
                return new ResponseGeneric<List<tbl_ca_est_mun_loc>>(Lista);
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
