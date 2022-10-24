using backend.Model.Base;
using System;

namespace backend.Model
{
    public class Lancamento : BaseEntity
    {
        public int IdUsuario { get; set; }
        public String Tipo { get; set; }
        public int IdDespesa { get; set; }
        public int IdReceita { get; set; }
        public Decimal Valor { get; set; }
        public DateTime Data { get; set; }
        public String Descricao { get; set; }
        public String Categoria { get; set; }

    }
}
