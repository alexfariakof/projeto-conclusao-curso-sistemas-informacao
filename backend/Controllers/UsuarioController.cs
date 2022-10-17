using backend.Business.Generic;
using backend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : Controller
    {
        private IBusiness<Usuario> _usuarioBusiness;

        public UsuarioController(IBusiness<Usuario> usuarioBusiness)
        {
            _usuarioBusiness = usuarioBusiness;            
        }

        [HttpGet]
        public IActionResult Get()
        {
           return Ok(_usuarioBusiness.FindAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Usuario _usuario = _usuarioBusiness.FindById(id);

            if (_usuario == null)
                return NotFound();

            return Ok(_usuario);
        }

        //[Authorize("Bearer")]
        [HttpPost]        
        public IActionResult Post([FromBody] Usuario usuario)
        {
            if (usuario == null)
                return BadRequest();
            return new ObjectResult(_usuarioBusiness.Create(usuario));
        }

        //[Authorize("Bearer")]
        [HttpPut]        
        public IActionResult Put([FromBody] Usuario usuario)
        {
            if (usuario == null)
                return BadRequest();

            Usuario updateUsuario = _usuarioBusiness.Update(usuario);
            if (updateUsuario == null)
                return NoContent();

            return new ObjectResult(updateUsuario);
        }

        //[Authorize("Bearer")]
        [HttpDelete("{id}")]        
        public IActionResult Delete(int id)
        {
            _usuarioBusiness.Delete(id);
            return NoContent();
        }
    }
}
