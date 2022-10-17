using backend.Business.Generic;
using backend.Model;
using backend.Repositorio.Generic;
using System.Collections.Generic;

namespace backend.Business.Implementations
{
    public class CategoriaBusinessImpl : IBusiness<Categoria>
    {
        private readonly IRepositorio<Categoria> _repositorio;

        public CategoriaBusinessImpl(IRepositorio<Categoria> repositorio)
        {
            _repositorio = repositorio;
        }
        public Categoria Create(Categoria obj)
        {
            return _repositorio.Create(obj);
        }

        public List<Categoria> FindAll()
        {
            return _repositorio.FindAll();
        }      

        public Categoria FindById(int id)
        {
            return _repositorio.FindById(id);
        }

        public Categoria Update(Categoria obj)
        {           

            return _repositorio.Update(obj);
        }

        public void Delete(int id)
        {
            _repositorio.Delete(id);
        }

    }
}
