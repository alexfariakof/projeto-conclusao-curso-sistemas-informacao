using backend.Model.Base;
using System.Collections.Generic;

namespace backend.Repositorio.Generic
{
    public interface IRepositorio<T> where T : BaseEntity
    {
        T Create(T item);
        T FindById(int id);
        List<T> FindAll();
        T Update(T item);
        void Delete(int id);

        bool Exists(int? id);
    }
}
