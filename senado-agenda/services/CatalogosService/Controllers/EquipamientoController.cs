using CatalogosNegocio;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Modelos.modelos;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CatalogosService.Controllers
{

    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    [ApiController]
    public class EquipamientoController : ControllerBase
    { 
        #region Instancias
        private tbl_ca_equipo_negocio _Negocio = new tbl_ca_equipo_negocio();
        private tbl_ca_equipo entidad= new tbl_ca_equipo();
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
        public IActionResult Post([FromBody] tbl_ca_equipo web)
        {
            try
            {
                web.tipoOperacion = 2;
                var result = _Negocio.Consultar(web);
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
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] tbl_ca_equipo web)
        {
            try
            {
                web.tipoOperacion = 3;
                web.id = id;
                var rsp = _Negocio.Modificar(web);
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
                entidad = new tbl_ca_equipo();
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
