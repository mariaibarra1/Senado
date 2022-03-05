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
    [Route("api/rolsenado")]
    [Produces("application/json")]
    [ApiController]
    public class RolSenadoController : Controller
    {
        #region Instancias
        private tbl_ca_rol_senado_negocio _Negocio = new tbl_ca_rol_senado_negocio();
        private tbl_ca_rol_senado entidad = new tbl_ca_rol_senado();
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
        public void Post([FromBody] tbl_ca_rol_senado entidad)
        {
            entidad.tipoOperacion = 2;
            _Negocio.Consultar(entidad);
        }


        [HttpPut("{id}")]
        public void Put(int id, [FromBody] tbl_ca_rol_senado entidad)
        {
            entidad.id = id;
            entidad.tipoOperacion = 3;
            _Negocio.Consultar(entidad);
        }


        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            entidad = new tbl_ca_rol_senado();
            entidad.id = id;
            entidad.tipoOperacion = 4;
            _Negocio.Consultar(entidad);
        }
    }
}
