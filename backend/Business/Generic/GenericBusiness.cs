using backend.Model.Base;
using backend.Repositorio.Generic;
using System.Collections.Generic;

namespace backend.Business.Generic
{
    public class GenericBusiness<T> : IBusiness<T> where T : BaseEntity
    {
        private readonly IRepositorio<T> _repositorio;

        public GenericBusiness(IRepositorio<T> repositorio)
        {
            _repositorio = repositorio;
        }
        public T Create(T obj)
        {
            return _repositorio.Create(obj);
        }

        public List<T> FindAll()
        {
            return _repositorio.FindAll();
        }

        public T FindById(int id)
        {
            return _repositorio.FindById(id);
        }

        public T Update(T obj)
        {
            return _repositorio.Update(obj);
        }

        public void Delete(int id)
        {
            _repositorio.Delete(id);
        }
    }
}
