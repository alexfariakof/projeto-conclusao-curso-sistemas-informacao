using backend.Business.Generic;
using backend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DespesaController : Controller
    {
        private IBusiness<Despesa> _despesaBusiness;

        public DespesaController(IBusiness<Despesa> despesaBusiness)
        {
            _despesaBusiness = despesaBusiness;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_despesaBusiness.FindAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                Despesa _despesa = _despesaBusiness.FindById(id);

                if (_despesa == null)
                    return Ok( new { message = "Nenhuma despesa foi encontrada."});

                return new ObjectResult(new { message = true, despesa = _despesa });
            }
            catch
            {
                return BadRequest(new { message = "Não foi possível realizar a consulta da despesa." });
            }
        }

        //[Authorize("Bearer")]
        [HttpPost]        
        public IActionResult Post([FromBody] Despesa despesa)
        {
            if (despesa == null)
                return BadRequest();
            try
            {
                return new ObjectResult(new { message = true, despesa = _despesaBusiness.Create(despesa) });
            }
            catch
            {
                return BadRequest(new { message = "Não foi possível realizar o cadastro da despesa."});
            }
        }

        //[Authorize("Bearer")]
        [HttpPut]        
        public IActionResult Put([FromBody] Despesa despesa)
        {
            if (despesa == null)
                return BadRequest();

            Despesa updateDespesa = _despesaBusiness.Update(despesa);
            if (updateDespesa == null)
                return BadRequest(new { message = "Não foi possível atualizar o cadastro da despesa." });

            return new ObjectResult(new { message = true, despesa = updateDespesa });
        }

        //[Authorize("Bearer")]
        [HttpDelete("{id}")]        
        public IActionResult Delete(int id)
        {
            _despesaBusiness.Delete(id);
            return NoContent();
        }
    }
}
