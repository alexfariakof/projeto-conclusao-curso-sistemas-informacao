using backend.Model.Base;
using backend.Model.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace backend.Repositorio.Generic
{
    public class GenericRepositorio<T> : IRepositorio<T> where T : BaseEntity
    {
        private readonly MySQLContext _context;
        private DbSet<T> dataSet;

        public GenericRepositorio(MySQLContext context)
        {
            _context = context;
            dataSet = context.Set<T>();
        }

        public T Create(T item)
        {
            try
            {
                dataSet.Add(item);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return item;
        }

        public List<T> FindAll()
        {
            try
            {
                return dataSet.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public T FindById(int id)
        {
            return dataSet.SingleOrDefault(prop => prop.Id.Equals(id));
        }

        public T Update(T obj)
        {
            if (!Exists(obj.Id))
                return null;

            T result = dataSet.SingleOrDefault(prop => prop.Id.Equals(obj.Id));
            try
            {
                _context.Entry(result).CurrentValues.SetValues(obj);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return obj;

        }

        public void Delete(int id)
        {
            T result = dataSet.SingleOrDefault(prop => prop.Id.Equals(id));
            try 
            {
                if (result != null)
                    _context.Remove(result);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public bool Exists(int? id)
        {
            return dataSet.Any(prop => prop.Id.Equals(id));
        }

    }
}
