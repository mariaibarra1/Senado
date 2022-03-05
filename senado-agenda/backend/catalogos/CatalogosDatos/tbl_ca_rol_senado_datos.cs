using Modelos.interfaces;
using System;
using System.Collections.Generic;
using Modelos.modelos;
using Modelos.respuestas;
using Conexion;
using Microsoft.EntityFrameworkCore;

namespace CatalogosDatos
{
    public class tbl_ca_rol_senado_datos : CRUD<tbl_ca_rol_senado>
    {
        private BDParametros GeneracionParametros = new BDParametros();
        private string StoreProcedure = "sp_crud_rol_senado";
        public ResponseGeneric<List<tbl_ca_rol_senado>> Consultar(tbl_ca_rol_senado entidad)
        {
            try
            {
                List<tbl_ca_rol_senado> Lista = new List<tbl_ca_rol_senado>();
                #region Parametros
                List<EntidadParametro> ListaEnvioParam = new List<EntidadParametro>();
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id", Tipo = "Int", Valor = entidad.id == null ? "NULL" : entidad.id.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "descripcion", Tipo = "String", Valor = entidad.descripcion == null ? "NULL" : entidad.descripcion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "activo", Tipo = "Boolean", Valor = entidad.activo == null ?  "NULL": entidad.activo.ToString()});

                #endregion
                #region ConexionBD
                using (Contexto conexion = new Contexto())
                {
                    var resultSQL = GeneracionParametros.ParametrosSqlServer(ListaEnvioParam, StoreProcedure);
                    Lista = conexion.Query<tbl_ca_rol_senado>().FromSql<tbl_ca_rol_senado>(resultSQL.Query, resultSQL.ListaParametros.ToArray()).ToListAsync().Result;
                }
                #endregion
                return new ResponseGeneric<List<tbl_ca_rol_senado>>(Lista);
            }
            catch (Exception ex)
            {

                return new ResponseGeneric<List<tbl_ca_rol_senado>>(ex);
            }
        }

        public Response Eliminar(tbl_ca_rol_senado entidad)
        {
            throw new NotImplementedException();
        }
        public Response Modificar(tbl_ca_rol_senado entidad)
        {
            throw new NotImplementedException();
        }
        public Response Guardar(tbl_ca_rol_senado entidad)
        {
            throw new NotImplementedException();
        }
    }
}
