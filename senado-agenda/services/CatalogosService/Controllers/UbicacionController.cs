using Modelos.modelos;
using CatalogosNegocio;
using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using System.Collections.Generic;

namespace CatalogosService.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    [ApiController]
    public class UbicacionController : ControllerBase
    {
        #region Instancias
        private tbl_ca_ubicacion_negocio _Negocio = new tbl_ca_ubicacion_negocio();
        private tbl_ca_ubicacion entidad = new tbl_ca_ubicacion();
        #endregion

        [HttpGet]
        //public ActionResult<List<tbl_ca_ubicacion>> Get()
        //{
        //    entidad.tipoOperacion = 1;
        //    var resultado = _Negocio.Consultar(entidad).Response;
        //    return resultado;
        //}
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
        [Route("Consultar/id")]
        //public ActionResult<List<tbl_ca_ubicacion>> Get(int id)
        //{
        //    entidad.tipoOperacion = 1;
        //    entidad.id = id;
        //    var resultado = _Negocio.Consultar(entidad).Response;
        //    return resultado;
        //}
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
        //public void Post([FromBody] tbl_ca_ubicacion entidad)
        //{
        //    entidad.tipoOperacion = 2;
        //    _Negocio.Consultar(entidad);
        //}
        public IActionResult Post([FromBody] tbl_ca_ubicacion entidad)
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

        [HttpPut("{id}")]
        //public void Put(int id, [FromBody] tbl_ca_ubicacion entidad)
        //{
        //    entidad.tipoOperacion = 3;
        //    entidad.id = id;
        //    _Negocio.Consultar(entidad);
        //}
        public IActionResult Put(int id, [FromBody] tbl_ca_ubicacion entidad)
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
        //public void Delete(int id)
        //{
        //    entidad = new tbl_ca_ubicacion();
        //    entidad.tipoOperacion = 4;
        //    entidad.id = id;
        //    _Negocio.Consultar(entidad);
        //}
        public IActionResult Delete(int id)
        {
            try
            {
                entidad = new tbl_ca_ubicacion();
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