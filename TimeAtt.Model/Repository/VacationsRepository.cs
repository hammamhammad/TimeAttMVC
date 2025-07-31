using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeAtt.DBContext;
using TimeAtt.Models;

namespace TimeAtt.Model
{
    public interface IVacationsRepository : IGenericRepository<VacationsInfo>
    {
        VacationsInfo GetSingle(int vtype_id);
    }
    public class VacationsRepository : GenericRepository<TimeAttDBModel, VacationsInfo>, IVacationsRepository
    {
        public VacationsInfo GetSingle(int vac_id)
        {
            var result = Context.ExecuteToDataTable<VacationsInfo>("spGetVacationByID", new SqlParameter[] { new SqlParameter("@vac_id", vac_id) });
            return result.SingleOrDefault();
        }
        public IEnumerable<VacationsInfo> GetAll(string username, VacationBody searchBody)
        {
            try
            {
                var result = Context.ExecuteToDataTable<VacationsInfo>("spsearchVacations", new SqlParameter[] {
                new SqlParameter("@UserName",username),
                new SqlParameter("@vac_fdate",searchBody.vac_fdate),
                new SqlParameter("@vac_tdate",searchBody.vac_tdate),
                new SqlParameter("@vac_type",searchBody.vac_type==0 ? null:searchBody.vac_type),
                new SqlParameter("@vac_empid",searchBody.vac_empid==0 ? null:searchBody.vac_empid),
                new SqlParameter("@vac_secid",searchBody.vac_secid==0 ? null:searchBody.vac_secid),
                new SqlParameter("@vac_RegID",searchBody.vac_RegID==0 ? null:searchBody.vac_RegID)

            });
                return result;
            }
            catch (Exception)
            {

                throw;
            }

        }
        public int Add(string username, VacationBody vacation)
        {
            try
            {
                if (vacation.vac_fdate == 0 || vacation.vac_tdate == 0)
                    return -1;
                if (vacation.vac_fdate > vacation.vac_tdate)
                    return -1;
                if (vacation.vac_type <= 0)
                    return -1;
                var result = Context.ExecuteNonQuery("TimeAtt_spinsertvacation", new SqlParameter[] {
                new SqlParameter("@username",username),
                new SqlParameter("@vac_fdate",vacation.vac_fdate),
                new SqlParameter("@vac_tdate",vacation.vac_tdate),
                new SqlParameter("@vac_type",vacation.vac_type==0 ? null:vacation.vac_type),
                new SqlParameter("@vac_deleted",vacation.vac_deleted==null ?false:vacation.vac_deleted),
                new SqlParameter("@vac_status",vacation.vac_status==null ? false:vacation.vac_status),
                new SqlParameter("@empid",vacation.vac_empid==0 ? null:vacation.vac_empid),
                new SqlParameter("@secid",vacation.vac_secid==0 ? null:vacation.vac_secid),
                new SqlParameter("@regid",vacation.vac_RegID==0 ? null:vacation.vac_RegID)
                 }, true).ToInt();

                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public int Update(string username, VacationBody vacation)
        {
            try
            {
                var result = Context.ExecuteNonQuery("spupdatevacation", new SqlParameter[] {
                new SqlParameter("@username",username),
                new SqlParameter("@vac_id",vacation.vac_id),
                new SqlParameter("@vac_fdate",vacation.vac_fdate),
                new SqlParameter("@vac_tdate",vacation.vac_tdate),
                new SqlParameter("@vac_type",vacation.vac_type==0 ? null:vacation.vac_type),
                new SqlParameter("@vac_status",vacation.vac_status==null ? false:vacation.vac_status),
                 }).ToInt();

                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public int Delete(string username, int vac_id)
        {
            try
            {

                var result = Context.ExecuteNonQuery("spdeletevacation", new SqlParameter[] {
                     new SqlParameter("@username",username),
                     new SqlParameter("@vac_id",vac_id)}, true).ToInt();
                return result;
            }
            catch (Exception)
            {

                throw;
            }

        }

        public void DeleteFaieldVacation(int vac_id)
        {
            Context.ExecuteNonQuery("TimeAtt_spDeleteFaieldVacation", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@vac_id", vac_id),
            });
        }

        public int AddByEmp(string username, VacationBody vacation)
        {
            try
            {
                if (vacation.vac_fdate == 0 || vacation.vac_tdate == 0)
                    return -1;
                if (vacation.vac_fdate > vacation.vac_tdate)
                    return -1;
                if (vacation.vac_type <= 0)
                    return -1;
                var result = Context.ExecuteNonQuery("TimeAtt_spinsertVacationFromEmployee", new SqlParameter[] {
                    new SqlParameter("@vac_type",vacation.vac_type==0 ? null:vacation.vac_type),
                    new SqlParameter("@vac_fdate",vacation.vac_fdate),
                    new SqlParameter("@vac_tdate",vacation.vac_tdate),
                    new SqlParameter("@vac_status",vacation.vac_status==null ? false:vacation.vac_status),
                    new SqlParameter("@vac_deleted",vacation.vac_deleted==null ?false:vacation.vac_deleted),
                    new SqlParameter("@username",username),
                }, true).ToInt();

                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public int UpdateEmpVacation(int refID, short wFStatus, string currentUser, out string response)
        {
            try
            {
                response = "";
                SqlParameter outpara = new SqlParameter("@Response", SqlDbType.NVarChar, 1000);
                outpara.Direction = ParameterDirection.Output;
                object data = Context.ExecuteNonQuery("TimeAtt_UpdateEmpVacationFromWorkFlow", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@Vac_id", refID),
                    new System.Data.SqlClient.SqlParameter("@WFStatus", wFStatus),
                    new System.Data.SqlClient.SqlParameter("@UserName", currentUser),outpara

                }, true);
                response = outpara.Value.ToString();
                return data.ToInt();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public DataSet CanAddVacation(VacationBody vacation, string username)
        {
            try
            {

                SqlParameter[] para = new SqlParameter[]{
                     new SqlParameter("@vac_type", vacation.vac_type ),
                     new SqlParameter("@vac_fdate", vacation.vac_fdate),
                     new SqlParameter("@vac_tdate", vacation.vac_tdate),
                     new SqlParameter("@UserName", username),
                     
                };
                //return Context.ExecuteToDataTable <ResponseStatus>("[TimeAtt_spCanEmployeeAddExecuse]", para).SingleOrDefault();
                return Context.ExecuteToDataSet("[TimeAtt_spCanEmployeeAddVacation]", para);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
