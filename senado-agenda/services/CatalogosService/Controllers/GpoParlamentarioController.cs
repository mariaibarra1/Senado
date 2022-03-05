using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Modelos.modelos;
using Newtonsoft.Json;
using CatalogosNegocio;
using Microsoft.AspNetCore.Cors;

namespace CatalogosService.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    [ApiController]
    public class GpoParlamentarioController : ControllerBase
    {
        #region Instancias
        private tbl_ca_gpo_parlamentario_negocio _Negocio = new tbl_ca_gpo_parlamentario_negocio();
        private tbl_ca_gpo_parlamentario entidad = new tbl_ca_gpo_parlamentario();
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

        [HttpPost]
        public IActionResult Post([FromBody] tbl_ca_gpo_parlamentario grupo)
        {
            try
            {
                grupo.tipoOperacion = 2;
                var resultado =_Negocio.Consultar(grupo);
                if (resultado.Status == Modelos.respuestas.ResponseStatus.Success)
                {
                    return Ok(resultado.Response.FirstOrDefault());
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
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] tbl_ca_gpo_parlamentario grupo)
        {
            try
            {                
                grupo.tipoOperacion = 3;
                grupo.id = id;
                var resultado = _Negocio.Consultar(grupo);
                if (resultado.Status == Modelos.respuestas.ResponseStatus.Success)
                {
                    return Ok(resultado.Response.FirstOrDefault());
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

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                entidad = new tbl_ca_gpo_parlamentario();
                entidad.tipoOperacion = 4;
                entidad.id = id;
                var resultado = _Negocio.Consultar(entidad);
                if (resultado.Status == Modelos.respuestas.ResponseStatus.Success)
                {
                    return Ok(resultado.Response.FirstOrDefault());
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

    }
}