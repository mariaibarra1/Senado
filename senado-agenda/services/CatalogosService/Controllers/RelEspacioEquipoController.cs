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
    public class RelEspacioEquipoController : ControllerBase
    {
        #region Instancias
        private tbl_rel_espacio_equipo_negocio _Negocio = new tbl_rel_espacio_equipo_negocio();
        private tbl_rel_espacio_equipo entidad = new tbl_rel_espacio_equipo();
        #endregion


        [HttpGet("{id}")]
        //public ActionResult<List<tbl_rel_espacio_equipo>> Get(int id)
        //{
        //    entidad.tipoOperacion = 1;
        //    entidad.id_espacio = id;
        //    var resultado = _Negocio.Consultar(entidad).Response;
        //    return resultado;
        //}
        public IActionResult Get(int id)
        {
            try
            {
                entidad.tipoOperacion = 1;
                entidad.id_espacio = id;
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
        //public void Post([FromBody] tbl_rel_espacio_equipo entidad)
        //{
        //    entidad.tipoOperacion = 2;
        //    _Negocio.Consultar(entidad);
        //}
        public IActionResult Post([FromBody] tbl_rel_espacio_equipo entidad)
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
        //public void Put([FromBody] tbl_rel_espacio_equipo entidad)
        //{
        //    entidad.tipoOperacion = 3;
        //    _Negocio.Consultar(entidad);
        //} 
        public IActionResult Put([FromBody] tbl_rel_espacio_equipo entidad)
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
    }
}