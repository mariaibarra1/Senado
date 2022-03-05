using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Modelos.modelos;
using CatalogosNegocio;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Cors;

namespace CatalogosService.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class TipoEventoController : Controller
    {
        #region Instancias
        private tbl_ca_tipo_evento_negocio _Negocio = new tbl_ca_tipo_evento_negocio();
        private tbl_ca_tipo_evento entidad= new  tbl_ca_tipo_evento();
        #endregion

        [HttpGet]
        public ActionResult<List<tbl_ca_tipo_evento>> Get()
        {
            entidad.tipoOperacion = 1;
            var resultado=_Negocio.Consultar(entidad).Response;
            return resultado;
        }


        [HttpGet("{id}")]
        public ActionResult<List<tbl_ca_tipo_evento>> Get(int id)
        {
            entidad.tipoOperacion = 1;
            entidad.id = id;
            var resultado = _Negocio.Consultar(entidad).Response;
            return resultado;
        }


        [HttpPost]
        public void Post([FromBody] tbl_ca_tipo_evento entidad)
        {
            entidad.tipoOperacion = 2;
            _Negocio.Consultar(entidad);
        }

 
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] tbl_ca_tipo_evento entidad)
        {
            entidad.id = id;
            entidad.tipoOperacion = 3;
            _Negocio.Consultar(entidad);
        }

       
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            entidad = new tbl_ca_tipo_evento();
            entidad.id = id;
            entidad.tipoOperacion = 4;
            _Negocio.Consultar(entidad);
        }
    }
}