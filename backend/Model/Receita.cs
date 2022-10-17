using backend.Model.Base;
using System;

namespace backend.Model
{
    public class Receita : BaseEntity
    {
        public int IdUsuario { get; set; }
        public int IdCategoria { get; set; }
        public DateTime data { get; set; }
        public String Descricao { get; set; }
        public Decimal Valor { get; set; }
    }
}
