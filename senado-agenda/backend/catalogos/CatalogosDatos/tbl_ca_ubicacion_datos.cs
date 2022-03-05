using Conexion;
using Microsoft.EntityFrameworkCore;
using Modelos.interfaces;
using Modelos.modelos;
using Modelos.respuestas;
using System;
using System.Collections.Generic;

namespace CatalogosDatos
{
    public class tbl_ca_ubicacion_datos: CRUD<tbl_ca_ubicacion>
    {
        private BDParametros GeneracionParametros = new BDParametros();
        private string StoreProcedure = "sp_crud_ubicaciones";
        public ResponseGeneric<List<tbl_ca_ubicacion>> Consultar(tbl_ca_ubicacion entidad)
        {
            try
            {
                List<tbl_ca_ubicacion> Lista = new List<tbl_ca_ubicacion>();
                #region Parametros
                List<EntidadParametro> ListaEnvioParam = new List<EntidadParametro>();
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id", Tipo = "Int", Valor = entidad.id == null ? "NULL" : entidad.id.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "calle", Tipo = "String", Valor = entidad.calle == null ? "NULL" : entidad.calle.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_estado", Tipo = "Int", Valor = entidad.id_estado == null ? "NULL" : entidad.id_estado.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_municipio", Tipo = "Int", Valor = entidad.id_municipio == null ? "NULL" : entidad.id_municipio.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id_localidad", Tipo = "Int", Valor = entidad.id_localidad == null ? "NULL" : entidad.id_localidad.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "activo", Tipo = "bit", Valor = entidad.activo == false ? "0" : "1" });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "edificio", Tipo = "String", Valor = entidad.edificio == null ? "NULL" : entidad.edificio.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "piso", Tipo = "Int", Valor = entidad.piso == null ? "NULL" : entidad.piso.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "oficina", Tipo = "String", Valor = entidad.oficina == null ? "NULL" : entidad.oficina.ToString() });
              
                #endregion
                #region ConexionBD
                using (Contexto conexion = new Contexto())
                {
                    var resultSQL = GeneracionParametros.ParametrosSqlServer(ListaEnvioParam, StoreProcedure);
                    Lista = conexion.Query<tbl_ca_ubicacion>().FromSql<tbl_ca_ubicacion>(resultSQL.Query, resultSQL.ListaParametros.ToArray()).ToListAsync().Result;
                }
                #endregion
                return new ResponseGeneric<List<tbl_ca_ubicacion>>(Lista);
            }
            catch (Exception ex)
            {

                return new ResponseGeneric<List<tbl_ca_ubicacion>>(ex);
            }
        }

        public Response Eliminar(tbl_ca_ubicacion entidad)
        {
            throw new NotImplementedException();
        }

        public Response Guardar(tbl_ca_ubicacion entidad)
        {
            throw new NotImplementedException();
        }

        public Response Modificar(tbl_ca_ubicacion entidad)
        {
            throw new NotImplementedException();
        }
    }
}
