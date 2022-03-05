using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Modelos.modelos;
using CatalogosNegocio;
using Newtonsoft.Json;

namespace SampleService.Controllers
{
    [Route("api/tipoevento")]
    [Produces("application/json")]
    [ApiController]
    public class tbl_ca_tipo_eventoController : Controller
    {
        #region Instancias
        private tbl_ca_tipo_evento_negocio _Negocio = new tbl_ca_tipo_evento_negocio();
        private tbl_ca_tipo_evento entidad;
        #endregion

        [HttpGet]
        public ActionResult<string> Get()
        {
            entidad.tipoOperacion = 1;
            var resultado=_Negocio.Consultar(entidad);
            return JsonConvert.SerializeObject(resultado);
        }


        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            entidad.tipoOperacion = 1;
            entidad.id = id;
            var resultado = _Negocio.Consultar(entidad);
            return JsonConvert.SerializeObject(resultado);
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