using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeAtt.DBContext;
using TimeAtt.Models;

namespace TimeAtt.Models
{
    public interface ITransReasonRepository : IGenericRepository<TransReason>
    {

        TransReason GetSingle(int Id);
    }
    public class TransReasonRepository : GenericRepository<TimeAttDBModel, TransReason>, ITransReasonRepository
    {
        #region ITransReasonRepository Members

        public TransReason GetSingle(int Id)
        {
            var result = Context.ExecuteToDataTable<TransReason>("uptTransReason_GetByID",new SqlParameter[] { new SqlParameter("@uptTransReason_id", Id) });
            return result.SingleOrDefault();
        }

        public IEnumerable<TransReason> GetAll()
        {
            var result = Context.ExecuteToDataTable<TransReason>("uptTransReason_GetAll");
            return result;
        }
        public int Add(string username, TransReason Reason)
        {
            try
            {
                var result = Context.ExecuteNonQuery("spinsertuptTransReason", new SqlParameter[] { 
                new SqlParameter("@uptTransReason_name", Reason.uptTransReason_name.ToTrim ()),
                 new SqlParameter("@uptTransReason_nameEN", Reason.uptTransReason_nameEN.ToTrim ()),
                new SqlParameter("@UserName", username),
                }, true).ToInt();
                return result;

            }
            catch (Exception)
            {

                throw;
            }
        }
        public int Update(string username, TransReason Reason)
        {
            try
            {
                var result = Context.ExecuteNonQuery("spupdateuptTransReason", new SqlParameter[] { 
                new SqlParameter("@uptTransReason_id", Reason.uptTransReason_id),
                new SqlParameter("@uptTransReason_name", Reason.uptTransReason_name.ToTrim ()),
                new SqlParameter("@uptTransReason_nameEN", Reason.uptTransReason_nameEN.ToTrim ()),
                new SqlParameter("@UserName", username),
                }, true).ToInt();
                return result;

            }
            catch (Exception)
            {

                throw;
            }
        }
        public int Delete(string username, int Reason_id)
        {
            try
            {
                var result = Context.ExecuteNonQuery("spdeleteuptTransReason", new SqlParameter[] { 
                new SqlParameter("@uptTransReason_id", Reason_id),
                new SqlParameter("@UserName", username),
                }, true).ToInt();
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion
    }
}
