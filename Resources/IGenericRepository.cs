using System;

using System.Data.Entity;

namespace Resources
{
  
    public abstract class GenericRepository<C> :IDisposable
       
        where C : DbContext, new()
    {


        private C _entities = new C();
        public C Context
        {

            get { return _entities; }
            set { _entities = value; }
        }

      
        private bool disposed = false;
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
