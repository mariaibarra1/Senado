using System;
using System.Collections.Generic;
using System.Text;
using Conexion;
using Microsoft.EntityFrameworkCore;
using Modelos.interfaces;
using Modelos.modelos;
using Modelos.respuestas;

namespace CatalogosDatos
{
  public  class tbl_rel_grupo_partido_datos : CRUD<tbl_rel_grupo_partido>
    {
        private BDParametros GeneracionParametros = new BDParametros();
        private string StoreProcedure = "sp_crud_gpo_partido";
        public ResponseGeneric<List<tbl_rel_grupo_partido>> Consultar(tbl_rel_grupo_partido entidad)
        {
            try
            {
                List<tbl_rel_grupo_partido> Lista = new List<tbl_rel_grupo_partido>();
                #region Parametros
                List<EntidadParametro> ListaEnvioParam = new List<EntidadParametro>();
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_gpo_parlamentario", Tipo = "Int", Valor = entidad.id_gpo_parlamentario == null ? "0" : entidad.id_gpo_parlamentario.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_partido_politico", Tipo = "Int", Valor = entidad.id_partido_politico == null ? "0" : entidad.id_partido_politico.ToString() });
                #endregion
                #region ConexionBD
                using (Contexto conexion = new Contexto())
                {
                    var resultSQL = GeneracionParametros.ParametrosSqlServer(ListaEnvioParam, StoreProcedure);
                    Lista = conexion.Query<tbl_rel_grupo_partido>().FromSql<tbl_rel_grupo_partido>(resultSQL.Query, resultSQL.ListaParametros.ToArray()).ToListAsync().Result;
                }
                #endregion
                return new ResponseGeneric<List<tbl_rel_grupo_partido>>(Lista);
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
