using backend.Model.Base;
using System.Collections.Generic;

namespace backend.Business.Generic
{
    public interface IBusiness<T> where T : BaseEntity
    {
        T Create(T obj);
        T FindById(int id);
        List<T> FindAll();
        T Update(T obj);
        void Delete(int id);
    }
}
