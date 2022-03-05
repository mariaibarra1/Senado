using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Modelos.modelos;
using CatalogosNegocio;
using Newtonsoft.Json;

namespace SampleService.Controllers
{
    [Route("api/Espacio")]
    [Produces("application/json")]
    [ApiController]
    public class EspacioController : ControllerBase
    {
        #region Instancias
        private tbl_ca_espacio_negocio _Negocio = new tbl_ca_espacio_negocio();
        private tbl_ca_espacio entidad = new tbl_ca_espacio();
        #endregion

        [HttpGet]
        [Route("Consultar")]
        public ActionResult<string> Get()
        {
            entidad.tipoOperacion = 1;
            var resultado = _Negocio.Consultar(entidad);
            return JsonConvert.SerializeObject(resultado);
        }


        [HttpGet("{id}")]
        [Route("Consultar/id")]
        public ActionResult<string> Get(int id)
        {
            entidad.tipoOperacion = 1;
            entidad.id = id;
            var resultado = _Negocio.Consultar(entidad);
            return JsonConvert.SerializeObject(resultado);
        }


        [HttpPost]
        public void Post([FromBody] tbl_ca_espacio entidad)
        {
            entidad.tipoOperacion = 2;
            _Negocio.Consultar(entidad);
        }


        [HttpPut("{id}")]
        public void Put(int id, [FromBody] tbl_ca_espacio entidad)
        {
            entidad.id = id;
            entidad.tipoOperacion = 3;
            _Negocio.Consultar(entidad);
        }


        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            entidad = new tbl_ca_espacio();
            entidad.id = id;
            entidad.tipoOperacion = 4;
            _Negocio.Consultar(entidad);
        }
    }
}