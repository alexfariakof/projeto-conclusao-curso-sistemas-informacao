using backend.Model;
using System;
using System.Collections.Generic;

namespace backend.Repositorio
{
    public interface IRelatorioRepositorio
    {
        decimal GetTotalDespesaUsuarioByAno(int idUsuario, int ano);
        decimal GetTotalReceitaUsaurioByAno(int idUsuario, int ano);
        List<Relatotio> GetRelatorioUsuarioByAno(int idUsuario, int ano);
    }
}
