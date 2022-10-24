using backend.Business.Generic;
using backend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace apiReceitasPessoais.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceitaController : Controller
    {
        private IBusiness<Receita> _receitaBusiness;

        public ReceitaController(IBusiness<Receita> receitaBusiness)
        {
            _receitaBusiness = receitaBusiness;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_receitaBusiness.FindAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                Receita _receita = _receitaBusiness.FindById(id);

                if (_receita == null)
                    return Ok(new { message = "Nenhuma receita foi encontrada." });

                return new ObjectResult(new { message = true, receita = _receita });
            }
            catch
            {
                return BadRequest(new { message = "Não foi possível realizar a consulta da receita." });
            }
        }

        [Authorize("Bearer")]
        [HttpPost]        
        public IActionResult Post([FromBody] Receita receita)
        {
            if (receita == null)
                return BadRequest();

            try
            {
                return new ObjectResult(new { message = true, receita = _receitaBusiness.Create(receita) });
            }
            catch
            {
                return BadRequest(new { message = "Não foi possível realizar o cadastro" });
            }            
        }

        //[Authorize("Bearer")]
        [HttpPut]        
        public IActionResult Put([FromBody] Receita receita)
        {
            if (receita == null)
                return BadRequest();

            Receita updateReceita = _receitaBusiness.Update(receita);

            if (updateReceita == null)
                return BadRequest(new { message = "Não foi possível atualizar o cadastro da receita." });

            return new ObjectResult(new { message = true, receita = updateReceita });
        }

        //[Authorize("Bearer")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _receitaBusiness.Delete(id);
            return new ObjectResult(new { message = true });
        }
    }
}
