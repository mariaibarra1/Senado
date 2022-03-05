using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Configuration;
using System.IO;
using LoggerNegocio;
using Modelos.modelos;
using System.Collections.Generic;

namespace LoggerService.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    [ApiController]
    public class LoggerController : ControllerBase
    {

        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(LoggerController));
        IConfiguration Configuration = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: false).Build();
        private tbl_logger_negocio _Negocio = new tbl_logger_negocio();
        private tbl_logger entidad = new tbl_logger();


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


        [HttpPost]
        public IActionResult Post([FromBody] tbl_logger logger)
        {
            try
            {

                logger.fecha = DateTime.Now.ToString();
                logger.tipoOperacion = 2;
                var resultado = _Negocio.Consultar(logger);
                if (resultado.Status == Modelos.respuestas.ResponseStatus.Success)
                {
                    return Ok(resultado.Response);
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
