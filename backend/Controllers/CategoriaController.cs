using backend.Business.Generic;
using backend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Internal;
using System.Linq;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : Controller
    {
        private IBusiness<Categoria> _categoriaBusiness;

        public CategoriaController(IBusiness<Categoria> categoriaBusiness)
        {
            _categoriaBusiness = categoriaBusiness;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_categoriaBusiness.FindAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Categoria _categoria = _categoriaBusiness.FindById(id);

            if (_categoria == null)
                return NotFound();

            return Ok(_categoria);
        }

        [HttpGet("byIdUsuario/{idUsuario}")]
        public IActionResult GetByIdUsuario([FromRoute] int idUsuario)
        {
            var list = _categoriaBusiness.FindAll();
            var result = list.Where(item => item.IdUsuario.Equals(idUsuario));
            return Ok(result);
        }


        [HttpGet("byTipoCategoria/{idUsuario}/{idTipoCategoria}")]
        public IActionResult GetByTipoCategoria([FromRoute] int idUsuario, [FromRoute] int idTipoCategoria)
        {
            var _categoria = _categoriaBusiness.FindAll()
                .FindAll(prop => prop.IdTipoCategoria.Equals(idTipoCategoria) &&
                                (prop.IdUsuario.Equals(idUsuario) ||
                                 prop.IdUsuario == null ||
                                 prop.IdUsuario.Equals(0)));

            if (_categoria == null)
                return NotFound();

            return Ok(_categoria);
        }

        //[Authorize("Bearer")]
        [HttpPost]        
        public IActionResult Post([FromBody] Categoria categoria)
        {
            if (categoria == null)
                return BadRequest();

            try
            {
                return new ObjectResult(new { message = true, categoria = _categoriaBusiness.Create(categoria) });
            }
            catch
            {
                return BadRequest(new { message = "Não foi possível realizar o cadastro de uma nova categoria, tente mais tarde ou entre em contato com o suporte." });
            }
        }

        //[Authorize("Bearer")]
        [HttpPut]        
        public IActionResult Put([FromBody] Categoria categoria)
        {
            if (categoria == null)
                return BadRequest();

            Categoria updateCategoria = _categoriaBusiness.Update(categoria);
            if (updateCategoria == null)
                return NoContent();

            return new ObjectResult(updateCategoria);
        }

        //[Authorize("Bearer")]
        [HttpDelete("{id}")]        
        public IActionResult Delete(int id)
        {
            _categoriaBusiness.Delete(id);
            return new ObjectResult(new { message = true });
            //return NoContent();
        }
    }
}
