using backend.Model.Base;

namespace backend.Model
{
    public class Categoria : BaseEntity
    {
        public int IdTipoCategoria { get; set; }
        public string Descricao { get; set; }
        public int? IdUsuario { get; set; }
    }
}
