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
    public interface IExcusesRepository : IGenericRepository<ExecuseInfo>
    {

        ExecuseInfo GetSingle(int exc_Id);
    }
    public class ExcusesRepository : GenericRepository<TimeAttDBModel, ExecuseInfo>, IExcusesRepository
    {

        public IEnumerable<ExecuseReasonInfo> GetAllReasons()
        {
            try
            {
                var result = Context.ExecuteToDataTable<ExecuseReasonInfo>("TimeAtt_GetExecuseReason");
                return result;
            }
            catch (Exception)
            {

                throw;
            }

        }
        public ExecuseReasonInfo GetReasonByID(int ID)
        {
            try
            {
                var result = Context.ExecuteCommandToDataTable<ExecuseReasonInfo>(string.Format("select * from tb_execuseReason where execuseReason_id={0}", ID));
                return result.SingleOrDefault();
            }
            catch (Exception)
            {

                throw;
            }

        }
        public int AddExcuseReason(ExecuseReasonInfo ExcReasonInfo, string user)
        {
            try
            {
                SqlParameter[] para = new SqlParameter[]{
                    new SqlParameter("@execuseReason_name", ExcReasonInfo.execuseReason_name),
                    new SqlParameter("@execuseReason_nameEn", ExcReasonInfo.execuseReason_nameEN),
                    new SqlParameter("@exc_type", ExcReasonInfo.exc_type),
                    new SqlParameter("@UserName", user),
                  };
                var result = Context.ExecuteNonQuery("spinsertexecuseReason", para, true).ToInt();
                return result;

            }
            catch (Exception)
            {

                throw;
            }
        }
        public int UpdateExcuseReason(ExecuseReasonInfo ExcReasonInfo, string user)
        {
            try
            {
                SqlParameter[] para = new SqlParameter[]{
                    new SqlParameter("@execuseReason_id", ExcReasonInfo.execuseReason_id),
                    new SqlParameter("@execuseReason_name", ExcReasonInfo.execuseReason_name),
                    new SqlParameter("@execuseReason_nameEn", ExcReasonInfo.execuseReason_nameEN),
                    new SqlParameter("@exc_type", ExcReasonInfo.exc_type),
                    new SqlParameter("@UserName", user),
                  };
                var result = Context.ExecuteNonQuery("spupdateexecuseReason", para, true).ToInt();
                return result;

            }
            catch (Exception)
            {

                throw;
            }
        }
        public int DeleteExcuseReason(int execuseReason_id, string user)
        {
            try
            {
                SqlParameter[] para = new SqlParameter[]{
                    new SqlParameter("@execuseReason_id", execuseReason_id),
                    new SqlParameter("@UserName", user)
                  };
                var result = Context.ExecuteNonQuery("spdeleteexecuseReason", para, true).ToInt();
                return result;

            }
            catch (Exception)
            {

                throw;
            }
        }
        public ExecuseInfo GetSingle(int exc_Id)
        {
            try
            {
                var result = Context.ExecuteToDataTable<ExecuseInfo>("TimeAtt_GetExcuseByID", new SqlParameter[] { new SqlParameter("@exc_ID", exc_Id) });
                return result.SingleOrDefault();
            }
            catch (Exception)
            {

                throw;
            }

        }
        public int AddExcuse(ExecuseInfo ExcInfo, string user)
        {
            try
            {

                SqlParameter[] para = new SqlParameter[]{
                     new SqlParameter("@exc_empid", ExcInfo.exc_empid ),
                     new SqlParameter("@exc_date", ExcInfo.exc_date),
                    new SqlParameter("@exc_todate", ExcInfo.exc_todate),
                     new SqlParameter("@exc_ftime", ExcInfo.exc_ftime),
                     new SqlParameter("@exc_ttime", ExcInfo.exc_ttime),
                     new SqlParameter("@exc_reason", string.IsNullOrEmpty(ExcInfo.exc_reason)?"":ExcInfo.exc_reason),
                     new SqlParameter("@execuseReason_id",ExcInfo.execuseReason_ID),
                     new SqlParameter("@exc_status", ExcInfo.exc_status),
                     new SqlParameter("@exc_deleted", false),
                     new SqlParameter("@UserName", user),
                     new SqlParameter("@exc_type", ExcInfo.exc_type),
                };
                var result = Context.ExecuteToDataTable<ExcuseBody>("spinsertexecuseV2", para);
                return result.Count;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public int UpdateExcuse(ExecuseInfo ExcInfo, string user)
        {
            try
            {
                SqlParameter[] para = new SqlParameter[] {
                    new SqlParameter("@exc_id", ExcInfo.exc_id ),
                     new SqlParameter("@exc_date", ExcInfo.exc_date),
                     new SqlParameter("@exc_ftime", ExcInfo.exc_ftime),
                     new SqlParameter("@exc_ttime", ExcInfo.exc_ttime),
                     new SqlParameter("@exc_reason", string.IsNullOrEmpty(ExcInfo.exc_reason)?"":ExcInfo.exc_reason),
                     new SqlParameter("@exc_status", ExcInfo.exc_status),
                     new SqlParameter("@execuseReason_id",ExcInfo.execuseReason_ID),
                     new SqlParameter("@UserName", user),
                     new SqlParameter("@exc_type", ExcInfo.exc_type),
                };
                var result = Context.ExecuteNonQuery("spupdateexecuse", para, true).ToInt();
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public DataSet CanAddExcuse(ExecuseInfo ExcInfo, string user)
        {
            try
            {

                SqlParameter[] para = new SqlParameter[]{
                     new SqlParameter("@exc_date", ExcInfo.exc_date ),
                     new SqlParameter("@exc_ftime", ExcInfo.exc_ftime),
                     new SqlParameter("@exc_ttime", ExcInfo.exc_ttime),
                     new SqlParameter("@UserName", user),
                     new SqlParameter("@exc_type", ExcInfo.exc_type)
                };
                //return Context.ExecuteToDataTable <ResponseStatus>("[TimeAtt_spCanEmployeeAddExecuse]", para).SingleOrDefault();
                return Context.ExecuteToDataSet("[TimeAtt_spCanEmployeeAddExecuse]", para);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public DataSet CanManagerAddExecuse(ExecuseInfo ExcInfo,string username)//, int emp_id, int exc_date, string exc_ftime, string exc_ttime, int exc_type)
        {
            try
            {
                var para = new SqlParameter[]
                {
                    new SqlParameter("@emp_id", ExcInfo.exc_empid),
                    new SqlParameter("@exc_date", ExcInfo.exc_date),
                    new SqlParameter("@exc_ftime", ExcInfo.exc_ftime),
                    new SqlParameter("@exc_ttime", ExcInfo.exc_ttime),
                    new SqlParameter("@exc_type", ExcInfo.exc_type),
                    new SqlParameter("@UserName", username)
                };

                return Context.ExecuteToDataSet("TimeAtt_spCanManagerAddExecuse", para);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public int AddExcuseByEmp(ExecuseInfo ExcInfo, string user)
        {
            try
            {

                return Context.ExecuteNonQuery("TimeAtt_spinsertexecuseFromEmployee", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@exc_date", ExcInfo.exc_date),
                    new System.Data.SqlClient.SqlParameter("@exc_ftime", ExcInfo.exc_ftime),
                    new System.Data.SqlClient.SqlParameter("@exc_ttime", ExcInfo.exc_ttime),
                    new System.Data.SqlClient.SqlParameter("@exc_reason", string.IsNullOrEmpty(ExcInfo.exc_reason)?"":ExcInfo.exc_reason),
                    new System.Data.SqlClient.SqlParameter("@UserName", user),
                    new System.Data.SqlClient.SqlParameter("@execuseReason_ID", ExcInfo.execuseReason_ID),
                    new System.Data.SqlClient.SqlParameter("@exc_type", ExcInfo.exc_type)

        }, true).ToInt();


            }
            catch (Exception)
            {

                throw;
            }
        }
        public List<ExecuseInfo> AddExcuseByEmpV2(ExecuseInfo ExcInfo, string user)
        {
            try
            {

                var res = Context.ExecuteToDataTable<ExecuseInfo>("TimeAtt_spinsertexecuseFromEmployeeV2", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@exc_date", ExcInfo.exc_date),
                    new System.Data.SqlClient.SqlParameter("@exc_ftime", ExcInfo.exc_ftime),
                    new System.Data.SqlClient.SqlParameter("@exc_ttime", ExcInfo.exc_ttime),
                    new System.Data.SqlClient.SqlParameter("@exc_reason", string.IsNullOrEmpty(ExcInfo.exc_reason)?"":ExcInfo.exc_reason),
                    new System.Data.SqlClient.SqlParameter("@UserName", user),
                    new System.Data.SqlClient.SqlParameter("@execuseReason_ID", ExcInfo.execuseReason_ID),
                    new System.Data.SqlClient.SqlParameter("@exc_type", ExcInfo.exc_type),
                    new SqlParameter ("@exc_todate", ExcInfo.exc_todate)

                   });
                return res;


            }
            catch (Exception)
            {

                throw;
            }
        }
        public List<ExecuseInfo> ManagerAddExecuseV2(ExecuseInfo ExcInfo, string user)
        {
           
                try
                {
                    var result = Context.ExecuteToDataTable<ExecuseInfo>("TimeAtt_spinsertexecuseFromManagerV2", new SqlParameter[] {
                    new SqlParameter ("@exc_empid", ExcInfo.exc_empid),
                        new SqlParameter ("@exc_date", ExcInfo.exc_date),
                        new SqlParameter ("@exc_ftime", ExcInfo.exc_ftime),
                        new SqlParameter ("@exc_ttime", ExcInfo.exc_ttime),
                        new SqlParameter ("@exc_reason", ExcInfo.exc_reason),
                        new SqlParameter ("@exc_type", ExcInfo.exc_type),
                        new SqlParameter ("@execuseReason_ID", ExcInfo.execuseReason_ID),
                        new SqlParameter ("@UserName", user),
                        new SqlParameter ("@exc_todate", ExcInfo.exc_todate)
                });
                    return result;

                }
                catch (Exception)
                {

                    throw;
                }
            }
            
        public int ManagerAddExecuse(ExecuseInfo ExcInfo, string user)
        {
            try
            {
                return Context.ExecuteNonQuery("TimeAtt_spinsertexecuseFromManager", new SqlParameter[]
                {
                    new SqlParameter("@exc_empid", ExcInfo.exc_empid ),
                    new SqlParameter("@exc_date", ExcInfo.exc_date),
                    new SqlParameter("@exc_ftime", ExcInfo.exc_ftime),
                    new SqlParameter("@exc_ttime", ExcInfo.exc_ttime),
                    new SqlParameter("@exc_reason", ExcInfo.exc_reason),
                    new SqlParameter("@exc_type", ExcInfo.exc_type),
                    new SqlParameter("@execuseReason_ID", ExcInfo.execuseReason_ID),
                    new SqlParameter("@UserName", user)
                }, true).ToInt();


            }
            catch (Exception)
            {

                throw;
            }
        }
        public ShiftInfo GetShiftInfo(int empNo, int mDate)
        {
            try
            {
                var result =  Context.ExecuteToDataTable<ShiftInfo>("TimeAtt_GetShiftInfoByEmpAndDate", new SqlParameter[] {
                    new SqlParameter ("@Empno", empNo), new SqlParameter ("@Mdate", mDate)
                });
                return result.SingleOrDefault();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<ExecuseInfo> GetAll(string username, ExcuseBody excuseSearch)
        {

            try
            {
                var result = Context.ExecuteToDataTable<ExecuseInfo>("spsearchExecuse", new SqlParameter[] {
                new SqlParameter("@username",username),
                new SqlParameter("@exc_fdate",excuseSearch.exc_fdate),
                new SqlParameter("@exc_tdate",excuseSearch.exc_tdate),
                new SqlParameter("@exc_type",excuseSearch.exc_type==0 ? null:excuseSearch.exc_type),
                new SqlParameter("@exc_empid ",excuseSearch.exc_empid==0 ? null:excuseSearch.exc_empid),
                new SqlParameter("@exc_secid",excuseSearch.exc_secid==0 ? null:excuseSearch.exc_secid),
                new SqlParameter("@exc_RegID ",excuseSearch.exc_RegID==0 ? null:excuseSearch.exc_RegID)

            });
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public int Delete(string username, int ID)
        {
            try
            {
                var result = Context.ExecuteNonQuery("spdeleteexecuse", new SqlParameter[] {
                new SqlParameter("@exc_id", ID ),
                new SqlParameter("@UserName",username),


            }, false).ToInt();
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteFaieldExecuse(int execID)
        {
            Context.ExecuteNonQuery("TimeAtt_spDeleteFaieldexecuse", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@exc_id", execID),
            });

        }
        public int UpdateExecuseTaskID(int exc_id, long taskID)
        {
            try
            {
                string sql = "TimeAtt_UpdateExecuseTaskID";
                var para = new SqlParameter[]
                {
                    new SqlParameter("@exc_id",  exc_id ),
                    new SqlParameter("@TaskID",  taskID )
                };
                var result =  Context.ExecuteNonQuery(sql, para, true);
                return result.ToInt();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateEmpExecuse(int refID, short wFStatus, string currentUser, out string response)
        {
            try
            {
                response = "";
                SqlParameter outpara = new SqlParameter("@Response", SqlDbType.NVarChar, 1000);
                outpara.Direction = ParameterDirection.Output;
                object data = Context.ExecuteNonQuery("TimeAtt_UpdateEmpExecuseFromWorkFlow", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@exc_id", refID),
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
    }
}
