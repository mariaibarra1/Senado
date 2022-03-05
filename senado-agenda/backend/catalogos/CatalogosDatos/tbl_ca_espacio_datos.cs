using Modelos.interfaces;
using System;
using System.Collections.Generic;
using Modelos.modelos;
using Modelos.respuestas;
using Conexion;
using Microsoft.EntityFrameworkCore;

namespace CatalogosDatos
{
    public class tbl_ca_espacio_datos : CRUD<tbl_ca_espacio>
    {
        private BDParametros GeneracionParametros = new BDParametros();
        private string StoreProcedure = "sp_crud_espacios";
        public ResponseGeneric<List<tbl_ca_espacio>> Consultar(tbl_ca_espacio entidad)
        {
            try
            {
                List<tbl_ca_espacio> Lista = new List<tbl_ca_espacio>();
                #region Parametros
                List<EntidadParametro> ListaEnvioParam = new List<EntidadParametro>();
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id", Tipo = "Int", Valor = entidad.id == null ? "NULL" : entidad.id.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_ubicacion", Tipo = "Int", Valor = entidad.id_ubicacion == null ? "NULL" : entidad.id_ubicacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "capacidad", Tipo = "Int", Valor = entidad.capacidad == null ? "NULL" : entidad.capacidad.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "activo", Tipo = "Int", Valor = entidad.activo == null ? "NULL" : entidad.activo.ToString() });
                #endregion
                #region ConexionBD
                using (Contexto conexion = new Contexto())
                {
                    var resultSQL = GeneracionParametros.ParametrosSqlServer(ListaEnvioParam, StoreProcedure);
                    Lista = conexion.Query<tbl_ca_espacio>().FromSql<tbl_ca_espacio>(resultSQL.Query, resultSQL.ListaParametros.ToArray()).ToListAsync().Result;
                }
                #endregion
                return new ResponseGeneric<List<tbl_ca_espacio>>(Lista);
            }
            catch (Exception ex)
            {

                return new ResponseGeneric<List<tbl_ca_espacio>>(ex);
            }
        }

        public Response Eliminar(tbl_ca_espacio entidad)
        {
            throw new NotImplementedException();
        }

        public Response Guardar(tbl_ca_espacio entidad)
        {
            throw new NotImplementedException();
        }

        public Response Modificar(tbl_ca_espacio entidad)
        {
            throw new NotImplementedException();
        }
    }
}
