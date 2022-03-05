using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CatalogosNegocio;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Modelos.modelos;
namespace SampleService.Controllers
{
    public class tbl_ca_servicioController : Controller
    {
        #region Instancias
        private tbl_ca_servicio_negocio _Negocio = new tbl_ca_servicio_negocio();
        private tbl_ca_servicio entidad;
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
        public void Post([FromBody] tbl_ca_servicio entidad)
        {
            entidad.tipoOperacion = 2;
            _Negocio.Consultar(entidad);
        }


        [HttpPut("{id}")]
        public void Put(int id, [FromBody] tbl_ca_servicio entidad)
        {
            entidad.id = id;
            entidad.tipoOperacion = 3;
            _Negocio.Consultar(entidad);
        }


        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            entidad = new tbl_ca_servicio();
            entidad.id = id;
            entidad.tipoOperacion = 4;
            _Negocio.Consultar(entidad);
        }
    }
}