using backend.Model;
using System.Collections.Generic;

namespace backend.Business
{
    public interface IRelatorioBusiness
    {
        decimal GetTotalDespesaUsuarioByAno(int idUsuario, int ano);
        decimal GetTotalReceitaUsaurioByAno(int idUsuario, int ano);
        List<Relatotio> GetRelatorioUsuarioByAno(int idUsuario, int ano);
    }
}
