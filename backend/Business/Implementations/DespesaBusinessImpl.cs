using backend.Business.Generic;
using backend.Model;
using backend.Repositorio.Generic;
using System.Collections.Generic;

namespace backend.Business.Implementations
{
    public class DespesaBusinessImpl : IBusiness<Despesa>
    {
        private readonly IRepositorio<Despesa> _repositorio;

        public DespesaBusinessImpl(IRepositorio<Despesa> repositorio)
        {
            _repositorio = repositorio;
        }
        public Despesa Create(Despesa obj)
        {
            return _repositorio.Create(obj);
        }

        public List<Despesa> FindAll()
        {
            return _repositorio.FindAll();
        }      

        public Despesa FindById(int id)
        {
            return _repositorio.FindById(id);
        }

        public Despesa Update(Despesa obj)
        {           

            return _repositorio.Update(obj);
        }

        public void Delete(int id)
        {
            _repositorio.Delete(id);
        }

    }
}
