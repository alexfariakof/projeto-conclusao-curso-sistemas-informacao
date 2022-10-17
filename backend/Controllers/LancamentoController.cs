using backend.Business;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LancamentoController : Controller
    {
        private ILancamentoBusiness _lancamentoBusiness;
        public LancamentoController(ILancamentoBusiness lancamentoBusiness)
        {
            _lancamentoBusiness = lancamentoBusiness;
        }
                
        //[Authorize("Bearer")]
        [HttpGet("{mesAno}/{idUsuario}")]
        public IActionResult Get(DateTime mesAno, int idUsuario)
        {
            var list = _lancamentoBusiness.FindByMesAno(mesAno, idUsuario);

            if (list == null || list.Count == 0)
                return NotFound();

            return Ok(list);
        }

        //[Authorize("Bearer")]
        [HttpGet("Saldo/{idUsuario}")]
        public IActionResult Get(int idUsuario)
        {
            var saldo = _lancamentoBusiness.GetSaldo(idUsuario);
                        
            return Ok(saldo.ToString("N2")); 
        }
    }
}