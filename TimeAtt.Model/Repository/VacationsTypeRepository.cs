using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeAtt.DBContext;
using TimeAtt.Models;

namespace TimeAtt.Model
{
    public interface IVacationsTypeRepository : IGenericRepository<VacationType>
    {
        VacationType GetSingle(int vtype_id);
    }
    public class VacationsTypeRepository : GenericRepository<TimeAttDBModel, VacationType>, IVacationsTypeRepository
    {
        public VacationType GetSingle(int vtype_id)
        {
            var result = Context.ExecuteCommandToDataTable<VacationType>(string.Format("SELECT * FROM [tb_vacationtype] where vtype_id={0}", vtype_id));
            return result.SingleOrDefault();
        }
        public override IEnumerable<VacationType> GetAll()
        {
            var result = Context.ExecuteCommandToDataTable<VacationType>("SELECT * FROM [tb_vacationtype]");
            return result;
        }
        public int Add(string username, VacationType vacationType)
        {
            try
            {
                var result = Context.ExecuteNonQuery("spinsertvacationtype", new SqlParameter[] { 
                 new SqlParameter("@vtype_name",vacationType.vtype_name),
                 new SqlParameter("@istrip",vacationType.istrip),
                 new SqlParameter("@UserName",username)
                 }, true).ToInt();

                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public int Update(string username, VacationType vacationType)
        {
            try
            {
                var result = Context.ExecuteNonQuery("spupdatevacationtype", new SqlParameter[] { 
                 new SqlParameter("@vtype_id",vacationType.vtype_id),
                  new SqlParameter("@vtype_name",vacationType.vtype_name),
                  new SqlParameter("@istrip",vacationType.istrip),
                 new SqlParameter("@UserName",username)
                 }, true).ToInt();

                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public int Delete(string username, int vtype_id)
        {
            try
            {

                var result = Context.ExecuteNonQuery("spdeletevacationtype", new SqlParameter[] {  
                    new SqlParameter("@vtype_id",vtype_id),
                    new SqlParameter("@UserName",username) }, true).ToInt();
                //if (result == 0)
                //{
                //   // msg = "لا يمكن حذف نوع الإجازة لإرتباطها بإجازات";
                //    return false;
                //}
                //if (retvalue < 0)
                //    return false;
                return result;
            }
            catch (Exception)
            {

                throw;
            }

        }

    }
}
