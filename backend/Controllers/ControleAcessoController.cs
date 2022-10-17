using backend.Business;
using backend.Model;
using backend.Data.VO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ControleAcessoController : Controller
    {
        private IControleAcessoBusiness _controleAcessoBusiness;

        public ControleAcessoController(IControleAcessoBusiness controleAcessoBusiness)
        {
            _controleAcessoBusiness = controleAcessoBusiness;
        }
        
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Post([FromBody] ControleAcessoVO controleAcessoVO)
        {
            if (controleAcessoVO == null)
                return BadRequest();

            var result = _controleAcessoBusiness.Create(controleAcessoVO);

            if (result)
                return  Ok(new { message = result });
            else
                return BadRequest(new { message = "Não foi possível realizar o cadastro" });
        }
        
        [AllowAnonymous]        
        [HttpPost("SignIn")]
        [HttpGet("SignIn/{email}/{senha}")]
        public IActionResult Get([FromRoute] string email, [FromRoute] string senha)
        {
            var controleAcesso = new ControleAcesso{ Login = email, Senha = senha };
            var result = new ObjectResult(_controleAcessoBusiness.FindByLogin(controleAcesso));
            if (controleAcesso == null)
                return BadRequest();            

            return result;
        }

        [AllowAnonymous]
        [HttpPost("RecoveryPassword")]
        public IActionResult RecoveryPassword([FromBody]  string email)
        {
            if (!string.IsNullOrWhiteSpace(email) && !string.IsNullOrEmpty(email))
                if (_controleAcessoBusiness.RecoveryPassword(email))
                    return Ok(new { message = true });
                else
                    return Ok(new { message = "Email não pode ser enviado, tente novamente mais tarde."});

            return BadRequest(new { message = "Não foi possível enviar o email, tente novamente mis tarde ou entre em contato com nosso suporte." });
        }

    }
}

