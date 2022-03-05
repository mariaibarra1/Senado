using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Modelos.modelos;
using Newtonsoft.Json;
using CatalogosNegocio;

namespace SampleService.Controllers
{
    [Route("api/gpoparlamentario")]
    [ApiController]
    public class GpoParlamentarioController : ControllerBase
    {
        #region Instancias
        private tbl_ca_gpo_parlamentario_negocio _Negocio = new tbl_ca_gpo_parlamentario_negocio();
        private tbl_ca_gpo_parlamentario entidad;
        #endregion
        [HttpGet]
        public ActionResult<string> Get()
        {
            try
            {
                entidad.tipoOperacion = 1;
                var resultado = _Negocio.Consultar(entidad);
                return JsonConvert.SerializeObject(resultado);
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject(ex);
            }
        }

        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            try
            {
                entidad.tipoOperacion = 1;
                entidad.id = id;
                var resultado = _Negocio.Consultar(entidad);
                return JsonConvert.SerializeObject(resultado);
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject(ex);
            }
        }

        [HttpPost]
        public void Post([FromBody] tbl_ca_gpo_parlamentario web)
        {
            try
            {
                web.tipoOperacion = 2;
                _Negocio.Guardar(web);
            }
            catch (Exception ex)
            {

            }
        }
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] tbl_ca_gpo_parlamentario web)
        {
            try
            {
                web.tipoOperacion = 3;
                web.id = id;
                _Negocio.Modificar(web);
            }
            catch (Exception ex)
            {

            }
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            try
            {
                entidad = new tbl_ca_gpo_parlamentario();
                entidad.tipoOperacion = 4;
                entidad.id = id;
                _Negocio.Eliminar(entidad);
            }
            catch (Exception ex)
            {

            }
        }




    }
}
