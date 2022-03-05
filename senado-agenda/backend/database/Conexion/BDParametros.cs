using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Conexion
{
    public class BDParametros
    {
        public EntidadModelado<SqlParameter> ParametrosSqlServer(List<EntidadParametro> ListParam, string Query)
        {
            EntidadModelado<SqlParameter> parametrosSqlServer = new EntidadModelado<SqlParameter>();

            parametrosSqlServer.Query = "EXEC " + Query + " ";
            
            int count = 0;
            
            foreach (var item in ListParam)
            {
                SqlParameter Parametro = new SqlParameter();
                
                if (item.Valor.Equals("NULL"))
                {
                    if (count == 0)
                    {
                        parametrosSqlServer.Query += "NULL";
                    }
                    else
                    {
                        parametrosSqlServer.Query += ",NULL";
                    }
                }
                else
                {
                    parametrosSqlServer.Query += count == 0 ? "" + "@" + item.Nombre : "," + "@" + item.Nombre;
                    Parametro.ParameterName = item.Nombre;
                    Parametro.SqlDbType = TipoDato(item.Tipo);
                    Parametro.Value = item.Valor;
                    parametrosSqlServer.ListaParametros.Add(Parametro);
                }

                count++;
            }

            return parametrosSqlServer;
        }

        public SqlDbType TipoDato(String Tipo)
        {
            switch (Tipo)
            {
                case "String":
                    return SqlDbType.NChar;
                case "Int":
                    return SqlDbType.Int;
                case "Boolean":
                    return SqlDbType.Bit;
                case "Decimal":
                    return SqlDbType.Decimal;
                case "DateTime":
                    return SqlDbType.DateTime;
                default:
                    return SqlDbType.NChar;
            }
        }
    }

    public class EntidadModelado<T>
    {
        public EntidadModelado()
        {
            ListaParametros = new List<T>();
        }

        public string Query { get; set; }
        public List<T> ListaParametros { get; set; }
    }

    public class EntidadParametro
    {
        public string Nombre { get; set; }
        public string Valor { get; set; }
        public string Tipo { get; set; }
    }
}