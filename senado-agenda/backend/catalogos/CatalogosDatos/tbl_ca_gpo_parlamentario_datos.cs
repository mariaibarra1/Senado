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
   public class tbl_ca_gpo_parlamentario_datos : CRUD<tbl_ca_gpo_parlamentario>
    {
        private BDParametros GeneracionParametros = new BDParametros();
        private string StoreProcedure = "sp_crud_gpo_parlamentario";
        public ResponseGeneric<List<tbl_ca_gpo_parlamentario>> Consultar(tbl_ca_gpo_parlamentario entidad)
        {
           
            try
            {
                #region Parametros
                List<tbl_ca_gpo_parlamentario> Lista = new List<tbl_ca_gpo_parlamentario>();
                List<EntidadParametro> ListaEnvioParam = new List<EntidadParametro>();

                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id", Tipo = "Int", Valor = entidad.id == null ? "0" : entidad.id.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "activo", Tipo = "Boolean", Valor = entidad.activo == null ? "NULL" : entidad.activo.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_legislatura", Tipo = "Int", Valor = entidad.id_legislatura == null ? "0": entidad.id_legislatura.ToString() });
                #endregion
                #region Conexion
                using (Contexto conexion = new Contexto())
                {
                    var resultSQL = GeneracionParametros.ParametrosSqlServer(ListaEnvioParam, StoreProcedure);
                    Lista = conexion.Query<tbl_ca_gpo_parlamentario>().FromSql<tbl_ca_gpo_parlamentario>(resultSQL.Query, resultSQL.ListaParametros.ToArray()).ToListAsync().Result;
                }
                #endregion
                return new ResponseGeneric<List<tbl_ca_gpo_parlamentario>>(Lista);
            }
            catch (Exception ex)
            {
                return new ResponseGeneric<List<tbl_ca_gpo_parlamentario>>(ex);
            }
        }

        public Response Eliminar(tbl_ca_gpo_parlamentario entidad)
        {
            throw new NotImplementedException();
        }
        public Response Modificar(tbl_ca_gpo_parlamentario entidad)
        {
            throw new NotImplementedException();
        }
        public Response Guardar(tbl_ca_gpo_parlamentario entidad)
        {
            throw new NotImplementedException();
        }


    }
}
