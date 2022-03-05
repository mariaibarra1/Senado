using Modelos.modelos;
using CatalogosNegocio;
using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace CatalogosService.Controllers
{
    [Route("api/tipoComision")]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    [ApiController]
    public class TipoComisionController : Controller
    {
        #region Instancias
        private tbl_ca_tipo_comision_negocio _Negocio = new tbl_ca_tipo_comision_negocio();
        private tbl_ca_tipo_comision entidad = new tbl_ca_tipo_comision();
        #endregion

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                entidad.tipoOperacion = 1;
                var resultado = _Negocio.Consultar(entidad);
                if (resultado.Status == Modelos.respuestas.ResponseStatus.Success)
                {
                    if (resultado.Response.Count > 0)
                    {
                        return Ok(resultado.Response);
                    }
                    else
                    {
                        return NoContent();
                    }
                }
                else
                {
                    return BadRequest(resultado.CurrentException);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                entidad.tipoOperacion = 1;
                entidad.id = id;
                var resultado = _Negocio.Consultar(entidad);
                if (resultado.Status == Modelos.respuestas.ResponseStatus.Success)
                {
                    if (resultado.Response.Count > 0)
                    {
                        return Ok(resultado.Response);
                    }
                    else
                    {
                        return NotFound();
                    }
                }
                else
                {
                    return BadRequest(resultado.CurrentException);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] tbl_ca_tipo_comision entidad)
        {
            try
            {
                entidad.tipoOperacion = 2;
                var result = _Negocio.Consultar(entidad);
                if (result.Status == Modelos.respuestas.ResponseStatus.Success)
                {
                    return Ok(result.Response.FirstOrDefault());
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

        [HttpPut]
        public IActionResult Put([FromBody] tbl_ca_tipo_comision entidad)
        {
            try
            {
                entidad.tipoOperacion = 3;
                var rsp = _Negocio.Consultar(entidad);
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
                var rsp = _Negocio.Consultar(entidad);
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