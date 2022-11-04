using backend.Business.Generic;
using backend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;

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

        [HttpPut("Upload")]
        public async Task<IActionResult> Put(int idUsuario, IFormFile image)
        {

            Usuario usuario = new Usuario();
            using (var ms = new MemoryStream())
            {
                image.CopyTo(ms);
                var fileBytes = ms.ToArray();
                usuario.Id = idUsuario;
                usuario.FotoPerfil = fileBytes;
            };

            if (usuario == null)
                return BadRequest();

            try
            {
                return new ObjectResult(new { message = true, usuarioImage = _usuarioBusiness.Update(usuario) });
            }
            catch
            {
                return BadRequest(new { message = "Não foi possível realizar o upload da imagem, tente mais tarde ou entre em contato com o suporte." });
            }
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
