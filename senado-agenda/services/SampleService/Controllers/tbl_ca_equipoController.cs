using CatalogosNegocio;
using Microsoft.AspNetCore.Mvc;
using Modelos.modelos;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleService.Controllers
{

    [Route("api/equipo")]
    [Produces("application/json")]
    [ApiController]
    public class tbl_ca_equipoController : Controller
    { 
        #region Instancias
        private tbl_ca_equipo_negocio _Negocio = new tbl_ca_equipo_negocio();
        private tbl_ca_equipo entidad= new tbl_ca_equipo();
        #endregion

        [HttpGet]
        public ActionResult<string> Get()
        {
            entidad.tipoOperacion = 1;
            var resultado = _Negocio.Consultar(entidad);
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
        public void Post([FromBody] tbl_ca_equipo entidad)
        {
            entidad.tipoOperacion = 2;
            _Negocio.Consultar(entidad);
        }


        [HttpPut("{id}")]
        public void Put(int id, [FromBody] tbl_ca_equipo entidad)
        {
            entidad.id = id;
            entidad.tipoOperacion = 3;
            _Negocio.Consultar(entidad);
        }


        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            entidad = new tbl_ca_equipo();
            entidad.id = id;
            entidad.tipoOperacion = 4;
            _Negocio.Consultar(entidad);
        }
    }


}
