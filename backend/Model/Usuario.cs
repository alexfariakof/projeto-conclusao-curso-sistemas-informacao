using backend.Model.Base;

namespace backend.Model
{
    public class Usuario : BaseEntity
    {
        public string Nome { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
    }
}
