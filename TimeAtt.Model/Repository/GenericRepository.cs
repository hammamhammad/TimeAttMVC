using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace TimeAtt.Models
{
    public interface IGenericRepository<T> where T : class
    {

        IEnumerable<T> GetAll();
        IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate);
        void Add(T entity);
        void Delete(T entity);
        void Edit(T entity);
        void Save();
    }
    public abstract class GenericRepository<C, T> :
    IGenericRepository<T>, IDisposable
        where T : class
        where C : DbContext,new()
    {


        private C _entities= new C();
        public C Context
        {

            get { return _entities; }
            set { _entities = value; }
        }

        public virtual IEnumerable<T> GetAll()
        {

            IEnumerable<T> query = _entities.Set<T>();
            return query.ToList();
        }

        public virtual IEnumerable<T> FindBy(System.Linq.Expressions.Expression<Func<T, bool>> predicate)
        {

            IEnumerable<T> query = _entities.Set<T>().Where(predicate);
            return query.ToList();
        }

        public virtual void Add(T entity)
        {
            _entities.Set<T>().Add(entity);
        }

        public virtual void Delete(T entity)
        {
            _entities.Set<T>().Remove(entity);
        }

        public virtual void Edit(T entity)
        {
            _entities.Entry(entity).State = EntityState.Modified;
        }

        public virtual void Save()
        {
            _entities.SaveChanges();
        }
        private bool disposed=false ;
        public virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    _entities.Dispose();
                    _entities = null;
                }
            }
            disposed = true;
        }


        #region IDisposable Members

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        #endregion
    }
}