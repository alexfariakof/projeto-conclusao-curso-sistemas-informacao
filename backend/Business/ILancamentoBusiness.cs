using backend.Data.VO;
using System;
using System.Collections.Generic;

namespace backend.Business
{
    public interface ILancamentoBusiness
    {
        List<LancamentoVO> FindByMesAno(DateTime data, int idUsuario);
        decimal GetSaldo(int idUsuario);
    }
}
