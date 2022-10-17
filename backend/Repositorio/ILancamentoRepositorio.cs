using backend.Model;
using System;
using System.Collections.Generic;

namespace backend.Repositorio
{
    public interface ILancamentoRepositorio
    {
        List<Lancamento> FindByMesAno(DateTime data, int idUsuario);
        decimal GetSaldo(int idUsuario);
    }
}
