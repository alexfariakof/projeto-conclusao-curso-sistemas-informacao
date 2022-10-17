using System;
using System.Collections.Generic;
using backend.Data.Implementations;
using backend.Data.VO;
using backend.Repositorio;

namespace backend.Business.Implementations
{
    public class LancamentoBusinessImpl : ILancamentoBusiness
    {
        private readonly ILancamentoRepositorio _repositorio;

        private readonly LancamentoConverter _converter;

        public LancamentoBusinessImpl(ILancamentoRepositorio repositorio)
        {
            _repositorio = repositorio;
            _converter = new LancamentoConverter();
        }

        public List<LancamentoVO> FindByMesAno(DateTime data, int idUsuario)
        {
           return  _converter.ParseList(_repositorio.FindByMesAno(data, idUsuario));
        }

        public decimal GetSaldo(int idUsuario)
        {
            return _repositorio.GetSaldo(idUsuario);
        }
    }
}
