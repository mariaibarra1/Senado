using Conexion;
using Microsoft.EntityFrameworkCore;
using Modelos.interfaces;
using Modelos.modelos;
using Modelos.respuestas;
using System;
using System.Collections.Generic;

namespace CatalogosDatos
{
    public class tbl_rel_espacio_equipo_datos : CRUD<tbl_rel_espacio_equipo>
    {
        private BDParametros GeneracionParametros = new BDParametros();
        private string StoreProcedure = "sp_crud_espacio_equipo";
        public ResponseGeneric<List<tbl_rel_espacio_equipo>> Consultar(tbl_rel_espacio_equipo entidad)
        {
            try
            {
                List<tbl_rel_espacio_equipo> Lista = new List<tbl_rel_espacio_equipo>();
                #region Parametros
                List<EntidadParametro> ListaEnvioParam = new List<EntidadParametro>();
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_espacio", Tipo = "Int", Valor = entidad.id_espacio == null ? "NULL" : entidad.id_espacio.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_equipo", Tipo = "Int", Valor = entidad.id_equipo == null ? "NULL" : entidad.id_equipo.ToString() });
                #endregion
                #region ConexionBD
                using (Contexto conexion = new Contexto())
                {
                    var resultSQL = GeneracionParametros.ParametrosSqlServer(ListaEnvioParam, StoreProcedure);
                    Lista = conexion.Query<tbl_rel_espacio_equipo>().FromSql<tbl_rel_espacio_equipo>(resultSQL.Query, resultSQL.ListaParametros.ToArray()).ToListAsync().Result;
                }
                #endregion
                return new ResponseGeneric<List<tbl_rel_espacio_equipo>>(Lista);
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
