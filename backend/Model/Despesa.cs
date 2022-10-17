using backend.Model.Base;
using System;

namespace backend.Model
{
    public class Despesa : BaseEntity
    {
        public int IdUsuario { get; set; }
        public int IdCategoria { get; set; }
        public DateTime Data { get; set; }
        public String Descricao { get; set; }
        public Decimal Valor { get; set; }
        public DateTime DataVencimento { get; set; }
    }
}
