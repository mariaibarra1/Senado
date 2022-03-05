﻿using Conexion;
using Microsoft.EntityFrameworkCore;
using Modelos.interfaces;
using Modelos.modelos;
using Modelos.respuestas;
using System;
using System.Collections.Generic;
using System.Text;

namespace CatalogosDatos
{
    public class tbl_ca_estatus_equipo_datos : CRUD<tbl_ca_estatus_equipo>
    {
        private BDParametros GeneracionParametros = new BDParametros();
        private string StoreProcedure = " sp_crud_estatus_equipo ";
        public ResponseGeneric<List<tbl_ca_estatus_equipo>> Consultar(tbl_ca_estatus_equipo entidad)
        {
            try
            {
                List<tbl_ca_estatus_equipo> Lista = new List<tbl_ca_estatus_equipo>();
                #region Parametros
                List<EntidadParametro> ListaEnvioParam = new List<EntidadParametro>();
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "tipo", Tipo = "Int", Valor = entidad.tipoOperacion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "id", Tipo = "Int", Valor = entidad.id == null ? "NULL" : entidad.id.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "nombre", Tipo = "String", Valor = entidad.nombre == null ? "NULL" : entidad.nombre.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "descricion", Tipo = "String", Valor = entidad.descripcion == null ? "NULL" : entidad.descripcion.ToString() });
                ListaEnvioParam.Add(new EntidadParametro { Nombre = "activo", Tipo = "bit", Valor = entidad.activo == false ? "NULL" : "1" });
                #endregion
                #region ConexionBD
                using (Contexto conexion = new Contexto())
                {
                    var resultSQL = GeneracionParametros.ParametrosSqlServer(ListaEnvioParam, StoreProcedure);
                    Lista = conexion.Query<tbl_ca_estatus_equipo>().FromSql<tbl_ca_estatus_equipo>(resultSQL.Query, resultSQL.ListaParametros.ToArray()).ToListAsync().Result;
                }
                #endregion
                return new ResponseGeneric<List<tbl_ca_estatus_equipo>>(Lista);
            }
            catch (Exception ex)
            {

                return new ResponseGeneric<List<tbl_ca_estatus_equipo>>(ex);
            }
        }

        public Response Eliminar(tbl_ca_estatus_equipo entidad)
        {
            throw new NotImplementedException();
        }

        public Response Guardar(tbl_ca_estatus_equipo entidad)
        {
            throw new NotImplementedException();
        }

        public Response Modificar(tbl_ca_estatus_equipo entidad)
        {
            throw new NotImplementedException();
        }
    }
}
