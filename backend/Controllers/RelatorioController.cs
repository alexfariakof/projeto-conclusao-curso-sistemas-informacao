using backend.Business;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RelatorioController : Controller
    {
        private IRelatorioBusiness _relatorioBusiness;
        public RelatorioController(IRelatorioBusiness relatorioBusiness)
        {
            _relatorioBusiness = relatorioBusiness;
        }

        //[Authorize("Bearer")]
        [HttpGet("{idUsuario}/{ano}")]        
        public IActionResult Get(int idUsuario, int ano)
        {
            
            var saldoDespesa = _relatorioBusiness.GetTotalDespesaUsuarioByAno(idUsuario, ano);
            var saldoReceita = _relatorioBusiness.GetTotalReceitaUsaurioByAno(idUsuario, ano);
            var list = _relatorioBusiness.GetRelatorioUsuarioByAno(idUsuario, ano);

            if (list == null || list.Count == 0)
                return NotFound();

            return new ObjectResult(new { saldoDespesa = saldoDespesa, saldoReceita = saldoReceita , relatorio = list });
        }
    }
}