using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CatalogosNegocio;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Modelos.modelos;
using Microsoft.AspNetCore.Cors;

namespace CatalogosService.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/Servicios")]
    [Produces("application/json")]
    [ApiController]
    public class ServiciosController : Controller
    {
        #region Instancias
        private tbl_ca_servicio_negocio _Negocio = new tbl_ca_servicio_negocio();
        private tbl_ca_servicio entidad = new tbl_ca_servicio();
        #endregion

        [HttpGet]
        public ActionResult<List<tbl_ca_servicio>> Get()
        {
            entidad.tipoOperacion = 1;
            var resultado = _Negocio.Consultar(entidad).Response;
            return resultado;
        }


        [HttpGet("{id}")]
        public ActionResult<List<tbl_ca_servicio>> Get(int id)
        {
            entidad.tipoOperacion = 1;
            entidad.id = id;
            var resultado = _Negocio.Consultar(entidad).Response;
            return resultado;
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