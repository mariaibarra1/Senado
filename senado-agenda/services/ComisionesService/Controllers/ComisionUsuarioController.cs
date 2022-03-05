using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Modelos.modelos;
using ComisionesNegocio;
using Microsoft.AspNetCore.Cors;
using Modelos.respuestas;
using System.Threading;
using System.Net.Http;

namespace ComisionesService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    [EnableCors("CorsPolicy")]
    public class ComisionUsuarioController : ControllerBase
    {
        #region Instancias
        private tbl_rel_comision_usuario_negocio _Negocio = new tbl_rel_comision_usuario_negocio();
        private tbl_rel_comision_usuario entidad = new tbl_rel_comision_usuario();
        #endregion

        [HttpGet]
        public IActionResult Get() {
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
            catch (Exception ex) {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id) {
            try
            {
                entidad.tipoOperacion = 1;
                entidad.id_comision = id;
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
            catch (Exception ex) {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] tbl_rel_comision_usuario comision) {
            try
            {
                comision.tipoOperacion = 2;
                var result = _Negocio.Consultar(comision);
                if (result.Status == Modelos.respuestas.ResponseStatus.Success)
                {
                    return Ok(result.Response.FirstOrDefault());
                }
                else
                {
                    return BadRequest(result.CurrentException);
                }
            }
            catch (Exception ex) {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPut("{idcomision}/{idusuario}")]
        public IActionResult Put(int idcomision,int idusuario, [FromBody] tbl_rel_comision_usuario comision) {
            try
            {
                comision.tipoOperacion = 3;
                comision.id_comision = idcomision;
                comision.id_usuario = idusuario;
                var rsp = _Negocio.Modificar(comision);
                if (rsp.Status == Modelos.respuestas.ResponseStatus.Success)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest(rsp.CurrentException);
                }
            }
            catch (Exception ex) {
                return BadRequest(ex.ToString());
            }
        }

        [HttpDelete("{idcomision}/{idusuario}")]
        public IActionResult Delete(int idcomision,int idusuario) {
            try
            {
                entidad = new tbl_rel_comision_usuario();
                entidad.tipoOperacion = 4;
                entidad.id_comision = idcomision;
                entidad.id_usuario = idusuario;
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
            catch (Exception ex) {
                return BadRequest(ex.ToString());
            }
        }
    }
}