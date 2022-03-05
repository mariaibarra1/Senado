using Modelos.modelos;
using CatalogosNegocio;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using System.Collections.Generic;
using System;

namespace CatalogosService.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    [ApiController]
    public class EstadoMunLocalidadController : ControllerBase
    {
        #region Instancias
        private tbl_ca_est_mun_loc_negocio _Negocio = new tbl_ca_est_mun_loc_negocio();
        private tbl_ca_est_mun_loc entidad = new tbl_ca_est_mun_loc();
        #endregion

        [HttpGet]
        public ActionResult<List<tbl_ca_est_mun_loc>> Get()
        {
            entidad.tipoOperacion = 1;
            var resultado = _Negocio.Consultar(entidad).Response;
            return resultado;
        }

        [HttpGet("{id}")]
        [Route("Municipio/{id}")]
        public ActionResult<List<tbl_ca_est_mun_loc>> Get(Int16 id)
        {
            entidad = new tbl_ca_est_mun_loc();
            entidad.tipoOperacion = 2;
            entidad.id = id;
            var resultado = _Negocio.Consultar(entidad).Response;
            return resultado;
        }

        [HttpGet("{id}")]
        [Route("Localidad/{id}")]
        public ActionResult<List<tbl_ca_est_mun_loc>> Get(int id)
        {
            entidad = new tbl_ca_est_mun_loc();
            entidad.tipoOperacion = 3;
            entidad.id = id;
            var resultado = _Negocio.Consultar(entidad).Response;
            return resultado;
        }

        [HttpGet("{id}")]
        [Route("Codigopostal/{id}")]
        public ActionResult<List<tbl_ca_est_mun_loc>> Get(Int64 id)
        {
            entidad = new tbl_ca_est_mun_loc();
            entidad.tipoOperacion = 4;
            entidad.codigo_postal = Convert.ToInt32(id);
            var resultado = _Negocio.Consultar(entidad).Response;
            return resultado;
        }
    }
}