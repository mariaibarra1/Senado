using Modelos.modelos;
using CatalogosNegocio;
using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace CatalogosService.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    [ApiController]
    public class EspacioController : ControllerBase
    {
        #region Instancias
        private tbl_ca_espacio_negocio _Negocio = new tbl_ca_espacio_negocio();
        private tbl_ca_espacio entidad = new tbl_ca_espacio();
        #endregion

        [HttpGet]
        //public ActionResult<List<tbl_ca_espacio>> Get()
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
        //public ActionResult<List<tbl_ca_espacio>> Get(int id)
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
        //public ActionResult<tbl_ca_espacio> Post([FromBody] tbl_ca_espacio entidad)
        //{
        //    entidad.tipoOperacion = 2;
        //    var resultado =  _Negocio.Consultar(entidad);
        //    return resultado.Response[0];
        //}
        public IActionResult Post([FromBody] tbl_ca_espacio entidad)
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
        //public void Put([FromBody] tbl_ca_espacio entidad)
        //{
        //    entidad.tipoOperacion = 3;
        //    _Negocio.Consultar(entidad);
        //}
        public IActionResult Put([FromBody] tbl_ca_espacio entidad)
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
        //    entidad = new tbl_ca_espacio();
        //    entidad.tipoOperacion = 4;
        //    entidad.id = id;
        //    _Negocio.Consultar(entidad);
        //}
        public IActionResult Delete(int id)
        {
            try
            {
                entidad = new tbl_ca_espacio();
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