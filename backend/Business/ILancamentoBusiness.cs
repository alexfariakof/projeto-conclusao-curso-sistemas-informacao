using System;
using System.Collections.Generic;
using backend.Data.VO;

namespace backend.Business
{
    public interface ILancamentoBusiness
    {
        List<LancamentoVO> FindByMesAno(DateTime data, int idUsuario);
        decimal GetSaldo(int idUsuario);
    }
}
