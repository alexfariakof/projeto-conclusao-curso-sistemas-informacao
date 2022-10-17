using backend.Model.Base;
using System;

namespace backend.Model
{
    public class Relatotio : BaseEntity
    {
        public string Mes { get; set; }
        public int? DespesaMes { get; set; }
        public Decimal? DespesaValor { get; set; }
        public int? DeceitaMes { get; set; }
        public Decimal? ReceitaValor { get; set; }
    }
}
