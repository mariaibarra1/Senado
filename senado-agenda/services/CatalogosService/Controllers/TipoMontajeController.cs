using CatalogosNegocio;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Modelos.modelos;
using System;
using System.Collections.Generic;

namespace CatalogosService.Controllers
{
    [Route("api/tipoMontaje")]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    [ApiController]
    public class TipoMontajeController : Controller
    {
        #region Instancias
        private tbl_ca_tipo_montaje_negocio _Negocio = new tbl_ca_tipo_montaje_negocio();
        private tbl_ca_tipo_montaje entidad = new tbl_ca_tipo_montaje();
        #endregion

        [HttpGet]
        public ActionResult<List<tbl_ca_tipo_montaje>> Get()
        {
            entidad.tipoOperacion = 1;
            var resultado = _Negocio.Consultar(entidad).Response;
            return resultado;
        }
        [HttpGet("{id}")]
        public ActionResult<List<tbl_ca_tipo_montaje>> Get(int id)
        {
            entidad.tipoOperacion = 1;
            entidad.id = id;
            var resultado = _Negocio.Consultar(entidad).Response;
            return resultado;
        }
        [HttpPost]
        public IActionResult Post([FromBody] tbl_ca_tipo_montaje entidad)
        {
            try
            {
                entidad.tipoOperacion = 2;
                var result = _Negocio.Consultar(entidad);
                if (result.Status == Modelos.respuestas.ResponseStatus.Success)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest(result.CurrentException);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id)
        {
            try
            {
                entidad.tipoOperacion = 3;
                entidad.id = id;
                var rsp = _Negocio.Modificar(entidad);
                if (rsp.Status == Modelos.respuestas.ResponseStatus.Success)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest(rsp.CurrentException);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                entidad.tipoOperacion = 4;
                entidad.id = id;
                var rsp = _Negocio.Eliminar(entidad);
                if (rsp.Status == Modelos.respuestas.ResponseStatus.Success)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest(rsp.CurrentException);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}