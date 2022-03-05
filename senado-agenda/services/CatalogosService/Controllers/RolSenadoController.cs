using CatalogosNegocio;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Modelos.modelos;
using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;

namespace CatalogosService.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    [ApiController]
    public class RolSenadoController : Controller
    {
        #region Instancias
        private tbl_ca_rol_senado_negocio _Negocio = new tbl_ca_rol_senado_negocio();
        private tbl_ca_rol_senado entidad = new tbl_ca_rol_senado(); 
        private readonly IConfiguration _configuration;
        private string _Logger = "";
        #endregion

        public RolSenadoController(IConfiguration configuration)
        {
            _configuration = configuration;
            this._Logger = _configuration.GetValue<string>("LoggerController");
        }

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
                return BadRequest();
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] tbl_ca_rol_senado senado)
        {
            try
            {
                senado.tipoOperacion = 2;
                var resultado = _Negocio.Consultar(senado);
                if (resultado.Status == Modelos.respuestas.ResponseStatus.Success)
                {
                    return Ok(resultado.Response.FirstOrDefault());
                }
                else
                {
                    LoggerAsync(new tbl_logger() { id_operacion = 1,id_modulo_aplicacion=1, mensaje = resultado.CurrentException });
                    return BadRequest(resultado.CurrentException);
                }
            }
            catch (Exception ex)
            {
                LoggerAsync(new tbl_logger() { id_operacion = 1, id_modulo_aplicacion = 1, mensaje = ex.Message });
                return BadRequest(ex.ToString());
            }
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] tbl_ca_rol_senado senado)
        {
            try
            {
                senado.tipoOperacion = 3;
                senado.id = id;
                var resultado = _Negocio.Consultar(senado);
                if (resultado.Status == Modelos.respuestas.ResponseStatus.Success)
                {
                    return Ok();
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
                entidad = new tbl_ca_rol_senado();
                entidad.tipoOperacion = 4;
                entidad.id = id;
                var resultado = _Negocio.Consultar(entidad);
                if (resultado.Status == Modelos.respuestas.ResponseStatus.Success)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest(resultado.CurrentException);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        public async Task LoggerAsync(tbl_logger entidad)
        {
            using (var client = new HttpClient())
            {
                var log = new tbl_logger()
                {
                    mensaje = entidad.mensaje,
                    id_modulo_aplicacion=entidad.id_modulo_aplicacion,
                    id_operacion= entidad.id_operacion
                };

                HttpResponseMessage response = await client.PostAsJsonAsync(_Logger + "/api/logger/", log);

                response.EnsureSuccessStatusCode();
            }
        }

    }
}
  