using System.Collections.Generic;
using Modelos.respuestas;

namespace Modelos.interfaces
{
    public interface CRUD<T>
    {
        Response Guardar(T entidad);
        Response Modificar(T entidad);
        Response Eliminar(T entidad);
        ResponseGeneric<List<T>> Consultar(T entidad);
    }
}