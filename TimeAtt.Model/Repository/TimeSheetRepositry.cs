using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeAtt.DBContext;
using TimeAtt.Model.Models;
using TimeAtt.Models;
namespace TimeAtt.Models
{
    public interface ITimeSheetRepositry : IGenericRepository<DailyTimeSheet>
    {

        DailyTimeSheet GetSingle(int m_date, int emp_id, string lang);
    }
    public class TimeSheetRepositry : GenericRepository<TimeAttDBModel, DailyTimeSheet>, ITimeSheetRepositry
    {


        public DailyTimeSheet GetSingle(int m_date, int emp_id, string lang)
        {
            try
            {
                string sql = "Repotr_DailyTimeSheet_ByDate";
                var para = new SqlParameter[]
            {
                new SqlParameter("@m_date", m_date),
                new SqlParameter("@emp_id", emp_id),
                new SqlParameter("@Lang", lang ),
             };
                var result = Context.ExecuteToDataTable<DailyTimeSheet>(sql, para);
                return result.SingleOrDefault();
            }
            catch (Exception)
            {

                throw;
            }
        }
        public IEnumerable<DailyTimeSheet> GetDailyTimeSheet(int m_date, int emp_id, string lang)
        {
            try
            {
                string sql = "Repotr_DailyTimeSheet_ByDate";
                var para = new SqlParameter[]
            {
                new SqlParameter("@m_date", m_date),
                new SqlParameter("@emp_id", emp_id),
                new SqlParameter("@Lang", lang ),
             };
                var result = Context.ExecuteToDataTable<DailyTimeSheet>(sql, para);
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public IEnumerable<DailyTimeSheet> GetDailyTimeSheet(int m_date, string lang)
        {
            try
            {
                string sql = "Repotr_DailyTimeSheetMT_ByDate";
                var para = new SqlParameter[]
            {
                new SqlParameter("@m_date", m_date),
                new SqlParameter("@Lang", lang ),
             };
                var result = Context.ExecuteToDataTable<DailyTimeSheet>(sql, para);
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public DataTableData<DailyTimeSheet> GetDailyTimeSheet(string Username, int f_date, int t_date, int? empID, int? secID, long? reg_id, string RowFilter, string lang, Dictionary<string, string> QueryString)//,string emp_Loc =null)
        {
            DataTableParameters DTPara = DataTableParameters.SET(QueryString);
            string sql = "Repotr_DailyTimeSheet_Paging";
            SqlParameter Count = new SqlParameter("@Count", System.Data.SqlDbType.Int);
            Count.Direction = System.Data.ParameterDirection.Output;
            var para = new SqlParameter[]
            {
                new SqlParameter("@f_date", f_date),
                new SqlParameter("@t_date", t_date),
                new SqlParameter("@secID", secID>0?secID:null),
                new SqlParameter("@empID", empID>0?empID:null),
                new SqlParameter("@reg_id",reg_id > 0? reg_id:null ),
                //new SqlParameter("@emp_Loc",string.IsNullOrEmpty(emp_Loc ) ? null:emp_Loc ),
                new SqlParameter("@username", Username),
                new SqlParameter("@RowFilter", string.IsNullOrWhiteSpace(RowFilter)?null:RowFilter ),
                new SqlParameter("@DisplayLength", DTPara.length==-1?null:DTPara.length),
                new SqlParameter("@DisplayStart", DTPara.start),
                new SqlParameter("@OrderBy", DTPara.sortColumnName ),
                new SqlParameter("@OrderDir", DTPara.sortDirection ),
                new SqlParameter("@Lang", lang ),
                Count
             };
            var result = Context.ExecuteToDataTable<DailyTimeSheet>(sql, para);
            int totalrecords = 0;
            if (result != null && result.Count > 0)
                totalrecords = Count.Value.ToInt();

            DataTableData<DailyTimeSheet> ReturnList = new DataTableData<DailyTimeSheet>
            {
                draw = DTPara.draw,
                recordsTotal = totalrecords,
                recordsFiltered = totalrecords,
                data = result

            };
            return ReturnList;
        }
        public IEnumerable<DailyTimeSheet> GetDailyTimeSheet(string Username, FormParameters searchDailyParameter, string lang)
        {
            string sql = "Repotr_DailyTimeSheet_WithOutPaging";
            var para = new SqlParameter[]
            {
                new SqlParameter("@f_date", searchDailyParameter.FromDate ),
                new SqlParameter("@t_date", searchDailyParameter.ToDate),
                new SqlParameter("@secID", searchDailyParameter.Sec_ID>0?searchDailyParameter.Sec_ID:null),
                new SqlParameter("@empID", searchDailyParameter.Emp_ID>0?searchDailyParameter.Emp_ID :null),
                new SqlParameter("@reg_id",searchDailyParameter.Reg_ID > 0? searchDailyParameter.Reg_ID :null ),
                new SqlParameter("@username", Username),
                new SqlParameter("@RowFilter", string.IsNullOrWhiteSpace(searchDailyParameter.RowFilter)?null:searchDailyParameter.RowFilter ),
                new SqlParameter("@Lang", lang )
             };
            var result = Context.ExecuteToDataTable<DailyTimeSheet>(sql, para);
            return result;
        }
        public IEnumerable<Transactions> GetTransactions(int dateno, int emp_id, string lang)
        {
            try
            {

                string sql = "TimeAtt_GetTransDetails";
                var para = new SqlParameter[]
            {
                new SqlParameter("@m_date", dateno),
                new SqlParameter("@emp_id", emp_id),
                new SqlParameter("@Lang", lang ),
             };
                var result = Context.ExecuteToDataTable<Transactions>(sql, para);
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public Transactions GetTransactionByID(long TransID, string lang)
        {
            try
            {

                string sql = "TimeAtt_GetTransactionByID";
                var para = new SqlParameter[]
            {
                new SqlParameter("@TransID", TransID),
                new SqlParameter("@Lang", lang ),
             };
                var result = Context.ExecuteToDataTable<Transactions>(sql, para);
                return result.SingleOrDefault();
            }
            catch (Exception)
            {

                throw;
            }

        }


        public long AddTransactions(Transactions Trans, string Username)
        {
            try
            {
                string sql = "spinserttrans";
                var para = new SqlParameter[]
            {
                new SqlParameter("@m_date", Trans.DateNo ),
                new SqlParameter("@emp_id", Trans.emp_id),
                new SqlParameter("@m_time", Trans.m_time ),
                new SqlParameter("@m_mode", Trans.m_mode ),
                new SqlParameter("@m_transtype", Trans.m_transtype ),
                new SqlParameter("@ModifiedReasonID", Trans.ModifiedReasonID ),
                new SqlParameter("@CV_Code", Trans.CV_CODE ),
                new SqlParameter("@Acc_Date", Trans.acc_date ),
                new SqlParameter("@UserName", Username ),
             };
                var result = Context.ExecuteNonQuery(sql, para, true);
                return result.ToLong();
            }
            catch (Exception)
            {

                throw;
            }
        }
        public int UpdateTransactions(Transactions Trans, string Username)
        {
            try
            {
                string sql = "spupdatetrans";
                var para = new SqlParameter[]
            {
                new SqlParameter("@trans_id", Trans.trans_id ),
                new SqlParameter("@m_time", Trans.m_time ),
                new SqlParameter("@m_transtype", Trans.m_transtype ),
                new SqlParameter("@ModifiedReasonID", Trans.ModifiedReasonID ),
                new SqlParameter("@CV_Code", Trans.CV_CODE ),
                new SqlParameter("@Acc_Date", Trans.acc_date ),
                new SqlParameter("@UserName", Username ),
             };
                var result = Context.ExecuteNonQuery(sql, para);
                return result.ToInt();
            }
            catch (Exception)
            {

                throw;
            }
        }
        public int DeleteTransactions(long TransID, string user)
        {
            try
            {

                string sql = "spdeletetrans";
                var para = new SqlParameter[]
            {
                new SqlParameter("@trans_id", TransID),
                new SqlParameter("@UserName", user ),
             };
                var result = Context.ExecuteNonQuery(sql, para);
                return result.ToInt();
            }
            catch (Exception)
            {

                throw;
            }

        }





        public int UpdateShift(int EmpID, int mDate, int newShiftID, string user)
        {
            try
            {
                string sql = "spupdate_empschedual";
                var para = new SqlParameter[]
            {
                new SqlParameter("@emp_id", EmpID),
                new SqlParameter("@m_date", mDate),
                new SqlParameter("@newshiftid", newShiftID),
                new SqlParameter("@UserName", user ),
             };
                var result = Context.ExecuteNonQuery(sql, para);
                return result.ToInt();
            }
            catch (Exception)
            {

                throw;
            }
        }
        public DataTableData<MonthlyTimeSheet> GetMonthlyTimeSheet(string Username, int f_date, int t_date, int? empID, int? secID, string emp_loc, long? reg_id, string RowFilter, string lang, Dictionary<string, string> QueryString)
        {
            DataTableParameters DTPara = DataTableParameters.SET(QueryString);
            string sql = "Report_GetTimeSheetSummry_Paging";
            SqlParameter Count = new SqlParameter("@Count", System.Data.SqlDbType.Int);
            Count.Direction = System.Data.ParameterDirection.Output;
            var para = new SqlParameter[]
            {

                new SqlParameter("@f_date", f_date),
                new SqlParameter("@t_date", t_date),
                new SqlParameter("@secid", secID>0?secID:null),
                new SqlParameter("@emp_loc", emp_loc=="0"?null:emp_loc),
                new SqlParameter("@empID", empID>0?empID:null),
                new SqlParameter("@reg_id",reg_id > 0? reg_id:null ),
                new SqlParameter("@username", Username),
                new SqlParameter("@DisplayLength", DTPara.length==-1?null:DTPara.length),
                new SqlParameter("@DisplayStart", DTPara.start),
                new SqlParameter("@OrderBy", DTPara.sortColumnName ),
                new SqlParameter("@OrderDir", DTPara.sortDirection ),
                new SqlParameter("@Lang", lang ),
                new SqlParameter("@RowFilter", RowFilter ),
                Count
             };
            var result = Context.ExecuteToDataTable<MonthlyTimeSheet>(sql, para);
            int totalrecords = 0;
            if (result != null && result.Count > 0)
                totalrecords = Count.Value.ToInt();

            DataTableData<MonthlyTimeSheet> ReturnList = new DataTableData<MonthlyTimeSheet>
            {
                draw = DTPara.draw,
                recordsTotal = totalrecords,
                recordsFiltered = totalrecords,
                data = result

            };
            return ReturnList;
        }
        public IEnumerable<MonthlyTimeSheet> GetMonthlyTimeSheet(string Username, string Lang, FormParameters searchMonthlyParameter)
        {
            string sql = "Report_GetTimeSheetSummry_WithOutPaging";
            var para = new SqlParameter[]
            {
                new SqlParameter("@f_date", searchMonthlyParameter.FromDate ),
                new SqlParameter("@t_date", searchMonthlyParameter.ToDate),
                new SqlParameter("@secid", searchMonthlyParameter.Sec_ID>0?searchMonthlyParameter.Sec_ID:null),
                new SqlParameter("@emp_loc", searchMonthlyParameter.Emp_Loc!="0"?searchMonthlyParameter.Emp_Loc:null),
                new SqlParameter("@empID", searchMonthlyParameter.Emp_ID>0?searchMonthlyParameter.Emp_ID :null),
                new SqlParameter("@reg_id",searchMonthlyParameter.Reg_ID > 0? searchMonthlyParameter.Reg_ID :null ),
                new SqlParameter("@username", Username),
                new SqlParameter("@RowFilter", string.IsNullOrWhiteSpace(searchMonthlyParameter.RowFilter)?null:searchMonthlyParameter.RowFilter ),
                new SqlParameter("@Lang", Lang ),
                new SqlParameter("@OrderBy", string.IsNullOrWhiteSpace(searchMonthlyParameter.OrderBy)?null:searchMonthlyParameter.OrderBy ),
                new SqlParameter("@OrderDir",string.IsNullOrWhiteSpace(searchMonthlyParameter.OrderDirection)?null:searchMonthlyParameter.OrderDirection ),
             };
            var result = Context.ExecuteToDataTable<MonthlyTimeSheet>(sql, para);
            return result;
        }
        public List<MonthlyTimeSheet> GetMonthlyTimeSheetSummary(string Username, int f_date, int t_date, int empID, string lang)
        {

            string sql = "Report_GetTimeSheetSummry_WithOutPaging";
            var para = new SqlParameter[]
            {
                new SqlParameter("@f_date", f_date),
                new SqlParameter("@t_date", t_date),
                new SqlParameter("@empID", empID),
                new SqlParameter("@username", Username),
                new SqlParameter("@Lang", lang ),
             };
            var result = Context.ExecuteToDataTable<MonthlyTimeSheet>(sql, para);
            return result;
        }

        public List<ExemptionsTimeSheet> GetExemptionsTimeSheet(string Username, string lang, int? Sec_ID, int? Emp_ID, long? Company)
        {
            List<ExemptionsTimeSheet> result = null;
            try
            {
                string sql = "Report_GetExemptionsTimeSheet";
                var para = new SqlParameter[]
                {
                new SqlParameter("@username", Username),
                new SqlParameter("@Lang", lang ),
                new SqlParameter("@secid", Sec_ID>0?Sec_ID:null),
                new SqlParameter("@emp_Company", Company>0?Company:null),
                new SqlParameter("@empID", Emp_ID>0?Emp_ID :null),
                 };
                result = Context.ExecuteToDataTable<ExemptionsTimeSheet>(sql, para);
            }
            catch (Exception ex)
            {
                throw;
            }
            return result;
        }

        //public List<ExemptionsTimeSheet> GetExemptionsTimeSheetFiltered(string Username, string lang, FormParameters searchParameters)
        //{
        //    List<ExemptionsTimeSheet> result = null;
        //    try
        //    {
        //        string sql = "Report_GetExemptionsTimeSheet";
        //        var para = new SqlParameter[]
        //        {
        //        new SqlParameter("@username", Username),
        //        new SqlParameter("@Lang", lang ),
        //        new SqlParameter("@secid", searchParameters.Sec_ID>0?searchParameters.Sec_ID:null),
        //        new SqlParameter("@emp_Company", searchParameters.Company>0?searchParameters.Company:null),
        //        new SqlParameter("@empID", searchParameters.Emp_ID>0?searchParameters.Emp_ID :null),
        //         };
        //        result = Context.ExecuteToDataTable<ExemptionsTimeSheet>(sql, para);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw;
        //    }
        //    return result;
        //}

        public DataSet GetMothlyTimeSheetDetailsSF(string Username, int f_date, int t_date, int empID, string lang)
        {
            try
            {

                return Context.ExecuteToDataSet("TimeAtt_GetTimeSheetMonthlyDetailsForEmployee", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@fm_date", f_date),
                     new System.Data.SqlClient.SqlParameter("@tm_date", t_date),
                    new System.Data.SqlClient.SqlParameter("@username", Username)
                });
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<DailyTimeSheet> GetMothlyTimeSheetDetails(string Username, int f_date, int t_date, int empID, string lang)
        {
            string sql = "Repotr_DailyTimeSheet_WithOutPaging";

            var para = new SqlParameter[]
            {
                new SqlParameter("@f_date", f_date),
                new SqlParameter("@t_date", t_date),
                new SqlParameter("@empID", empID),
                new SqlParameter("@username", Username),
                new SqlParameter("@Lang", lang ),
             };
            var result = Context.ExecuteToDataTable<DailyTimeSheet>(sql, para);
            return result;
        }
        public IEnumerable<Devices> GetDevices()
        {
            try
            {
                string sql = "TimeAtt_GetDevices";
                var result = Context.ExecuteToDataTable<Devices>(sql);
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }
        private string GetTrasnsactionFilter(string RowFilter)
        {
            string filter = "";
            if (RowFilter == "0")
            {
                filter = "m_status=0";
            }
            else if (RowFilter == "1")
            {
                filter = "m_status=1";
            }
            else if (RowFilter == "m")
            {
                filter = "m_manual=1";
            }
            else if (RowFilter == "i")
            {
                filter = "m_manual=1  and isnull(m_unitid,0)=0";
            }
            else if (RowFilter == "n")
            {
                filter = "m_deleted=1";
            }
            else if (RowFilter == "e")
            {
                filter = "m_deleted=0";
            }
            else
                filter = "";
            return filter;
        }
        public DataTableData<Transactions> GetAllTransDetails(string Username, int f_date, int t_date, int? empID, int? secID, long? reg_id, int? DeviceId, string RowFilter, string lang, Dictionary<string, string> QueryString)
        {
            var filter = GetTrasnsactionFilter(RowFilter);
            DataTableParameters DTPara = DataTableParameters.SET(QueryString);
            string sql = "TimeAtt_GetTransDetails_Paging";
            SqlParameter Count = new SqlParameter("@Count", System.Data.SqlDbType.Int);
            Count.Direction = System.Data.ParameterDirection.Output;
            var para = new SqlParameter[]
            {

                new SqlParameter("@f_date", f_date),
                new SqlParameter("@t_date", t_date),
                new SqlParameter("@secID", secID>0?secID:null),
                new SqlParameter("@emp_id", empID>0?empID:null),
                new SqlParameter("@reg_id",reg_id > 0? reg_id:null ),
                new SqlParameter("@username", Username),
                new SqlParameter("@DisplayLength", DTPara.length==-1?null:DTPara.length),
                new SqlParameter("@DisplayStart", DTPara.start),
                new SqlParameter("@OrderBy", DTPara.sortColumnName ),
                new SqlParameter("@OrderDir", DTPara.sortDirection ),
                new SqlParameter("@Lang", lang ),
                new SqlParameter("@RowFilter", (filter==""?null:filter) ),
                new SqlParameter("@DeviceId", DeviceId !=0 ? DeviceId : null ),
                Count
             };
            var result = Context.ExecuteToDataTable<Transactions>(sql, para);
            int totalrecords = 0;
            if (result != null && result.Count > 0)
                totalrecords = Count.Value.ToInt();

            DataTableData<Transactions> ReturnList = new DataTableData<Transactions>
            {
                draw = DTPara.draw,
                recordsTotal = totalrecords,
                recordsFiltered = totalrecords,
                data = result

            };
            return ReturnList;
        }



        public IEnumerable<Transactions> GetAllTransDetails(string Username, FormParameters searchTransactionsParameter, string lang)
        {
            var filter = GetTrasnsactionFilter(searchTransactionsParameter.RowFilter);
            string sql = "TimeAtt_GetTransDetails_WithoutPaging";
            var para = new SqlParameter[]
            {
                new SqlParameter("@f_date", searchTransactionsParameter.FromDate),
                new SqlParameter("@t_date",searchTransactionsParameter.ToDate),
                new SqlParameter("@secID", searchTransactionsParameter.Sec_ID>0?searchTransactionsParameter.Sec_ID:null),
                new SqlParameter("@emp_id", searchTransactionsParameter.Emp_ID>0?searchTransactionsParameter.Emp_ID:null),
                new SqlParameter("@reg_id",searchTransactionsParameter.Reg_ID > 0? searchTransactionsParameter.Reg_ID:null ),
                new SqlParameter("@username", Username),
                new SqlParameter("@Lang", lang ),
                new SqlParameter("@RowFilter", (filter==""?null:filter) ),
                new SqlParameter("@DeviceId", searchTransactionsParameter.Device_ID>0?searchTransactionsParameter.Device_ID:null ),
             };
            var result = Context.ExecuteToDataTable<Transactions>(sql, para);
            return result;
        }

        public long AddUpdateTransactionsMT(TransactionsMT trans, string username)
        {
            try
            {
                string sql = "spinserttransMT";
                var para = new SqlParameter[]
            {
                new SqlParameter("@TRANSID", trans.TRANSID ),
                new SqlParameter("@EMPNO", trans.EMPNO ),
                new SqlParameter("@MDate", trans.TRANSDATE),
                new SqlParameter("@TransTime", trans.TRANSTIME ),
                new SqlParameter("@Acc_Date", trans.TRANSACTUALDATE ),
                new SqlParameter("@UserName", username ),

             };
                var result = Context.ExecuteNonQuery(sql, para, true);
                return result.ToLong();
            }
            catch (Exception)
            {

                throw;
            }

        }

        public int UpdateShiftMT(long empNO, int mDate, int newShiftID, string username)
        {
            try
            {
                string sql = "spupdate_empschedualMT";
                var para = new SqlParameter[]
            {
                new SqlParameter("@emp_no", empNO),
                new SqlParameter("@m_date", mDate),
                new SqlParameter("@newshiftid", newShiftID),
                new SqlParameter("@UserName", username ),
             };
                var result = Context.ExecuteNonQuery(sql, para);
                return result.ToInt();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public ResponseStatus CanAddTransaction(string username, int trs_date, string trs_time, int trs_type)
        {
            try
            {
                var result = Context.ExecuteToDataTable<ResponseStatus>("TimeAtt_CanAddTransaction", new SqlParameter[]
            {
                new SqlParameter("@UserName", username),new SqlParameter("@TransType", trs_type),new SqlParameter("@MDate", trs_date),
                new SqlParameter("@TransTime", trs_time)
            });
                return result.SingleOrDefault();
            }
            catch (Exception)
            {

                throw;
            }
        }
        public ResponseStatus CanManagerAddTransaction(string username, int emp_id, int trs_date, string trs_time, int trs_type)
        {
            try
            {
                var result = Context.ExecuteToDataTable<ResponseStatus>("TimeAtt_CanManagerAddTransaction", new SqlParameter[]
                {
                    new SqlParameter("@emp_id", emp_id),
                    new SqlParameter("@UserName", username),
                    new SqlParameter("@TransType", trs_type),
                    new SqlParameter("@MDate", trs_date),
                    new SqlParameter("@TransTime", trs_time)
                });
                return result.SingleOrDefault();
            }
            catch (Exception)
            {

                throw;
            }
        }
        public long AddTransactionsByEmp(Transactions Trans, string Username)
        {
            try
            {
                string sql = "TimeAtt_AddTransaction";
                var para = new SqlParameter[]
            {
                new SqlParameter("@UserName",  Username ),
                    new SqlParameter("@MDate", Trans.DateNo),
                    new SqlParameter("@TransType", Trans.m_transtype ),
                    new SqlParameter("@TransTime", Trans.m_time),
                    new SqlParameter("@ReasonID", Trans.ModifiedReasonID),
                    new SqlParameter("@Note", Trans.Note)
             };
                var result = Context.ExecuteNonQuery(sql, para, true);
                return result.ToLong();
            }
            catch (Exception)
            {

                throw;
            }
        }
        public long ManagerAddTransactionsByEmp(Transactions Trans, string Username)
        {
            try
            {
                string sql = "TimeAtt_ManagerAddTransaction";
                var para = new SqlParameter[]
                {
                    new SqlParameter("@emp_id",  Trans.emp_id ),
                    new SqlParameter("@UserName",  Username ),
                    new SqlParameter("@MDate", Trans.DateNo),
                    new SqlParameter("@TransType", Trans.m_transtype ),
                    new SqlParameter("@TransTime", Trans.m_time),
                    new SqlParameter("@ReasonID", Trans.ModifiedReasonID),
                    new SqlParameter("@Note", Trans.Note)
                };
                var result = Context.ExecuteNonQuery(sql, para, true);
                return result.ToLong();
            }
            catch (Exception)
            {
                throw;
            }
        }
        public DataSet GetTransDetailsForEmployee(int empid, int date, string user)
        {
            try
            {

                return Context.ExecuteToDataSet("TimeAtt_GetTransactionForEmployee", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@f_date", date),
                    new System.Data.SqlClient.SqlParameter("@emp_id ", empid),
                    new System.Data.SqlClient.SqlParameter("@username", user)
                });
            }
            catch (Exception)
            {

                throw;
            }
        }

        public DataSet GetDailyTimeSheetForManager(string username, int empid, int fdate, int tdate)
        {
            try
            {

                return Context.ExecuteToDataSet("TimeAtt_spGetDailyTimeSheetForManager_Portal", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@fm_date", fdate),
                    new System.Data.SqlClient.SqlParameter("@tm_date", tdate),
                    new System.Data.SqlClient.SqlParameter("@empid", empid),
                   // new System.Data.SqlClient.SqlParameter("@secid", secid),
                    new System.Data.SqlClient.SqlParameter("@username", username)
                });
            }
            catch (Exception)
            {

                throw;
            }
        }

        public DataSet GetMonthlySummaryTimeSheetForManager(string username, int empid, int fdate, int tdate)
        {
            try
            {

                return Context.ExecuteToDataSet("TimeAtt__MonthlySummaryTimeSheet_Portal", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@fm_date", fdate),
                    new System.Data.SqlClient.SqlParameter("@tm_date", tdate),
                    new System.Data.SqlClient.SqlParameter("@emp_id", empid),
                    //new System.Data.SqlClient.SqlParameter("@secid", secid),
                    new System.Data.SqlClient.SqlParameter("@username", username)
                });
            }
            catch (Exception)
            {

                throw;
            }
        }

        public DataSet GetTimeSheetMonthlyDetailsForManager(int empid, int fdate, int tdate, string username)
        {
            try
            {

                return Context.ExecuteToDataSet("TimeAtt_GetTimeSheetMonthlyDetails_Portal", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@fm_date", fdate),
                     new System.Data.SqlClient.SqlParameter("@tm_date", tdate),
                    new System.Data.SqlClient.SqlParameter("@emp_id ", empid),
                    new System.Data.SqlClient.SqlParameter("@username", username)
                });
            }
            catch (Exception)
            {

                throw;
            }
        }

        public DataTable GetMonthlySummaryTimeSheetForManagerEX(int empid, int fdateno, int tdateno, string user)
        {
            try
            {

                return Context.ExecuteToDataSet("TimeAtt__MonthlySummaryTimeSheet_Portal", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@fm_date", fdateno),
                    new System.Data.SqlClient.SqlParameter("@tm_date", tdateno),
                    new System.Data.SqlClient.SqlParameter("@emp_id", empid),
                    //new System.Data.SqlClient.SqlParameter("@secid", secid),
                    new System.Data.SqlClient.SqlParameter("@username", user)
                })?.Tables[0];
            }
            catch (Exception)
            {

                throw;
            }
        }
        public DataSet GetTransDetailsForManager(int empid, int date, string username)
        {
            try
            {

                return Context.ExecuteToDataSet("TimeAtt_GetTransaction", new System.Data.SqlClient.SqlParameter[] {
                    new System.Data.SqlClient.SqlParameter("@f_date", date),
                    new System.Data.SqlClient.SqlParameter("@emp_id ", empid),
                    new System.Data.SqlClient.SqlParameter("@username", username)
                });
            }
            catch (Exception)
            {

                throw;
            }
        }

        public int UpdateFingerprintReqStatus(long refID, short wFStatus, string userName, out string outpara)
        {
            try
            {
                SqlParameter outparasql = new SqlParameter("@Response", SqlDbType.NVarChar, 1000);
                var sql = "TimeAtt_UpdateTransactionFromWorkFlow";
                SqlParameter[] para = new SqlParameter[]{
                  new SqlParameter("@RefID", refID),
                  new SqlParameter("@WFStatus", wFStatus),
                  new SqlParameter("@UserName", userName),
                 outparasql
              };
                var result = Context.ExecuteNonQuery(sql, para, true).ToInt();
                outpara = outparasql.Value.ToString();
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public bool IsManager(string username)
        {
            try
            {
                return Context.ExecuteScaler("select dbo.IsManager(N'" + username + "')").ToBoolean();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<EmployeeInfo> GetEmployeesByManager(int mgrID)
        {
            try
            {
                return Context.ExecuteToDataTable<EmployeeInfo>("TimeAtt_GetEmployeesByManagerID", new SqlParameter[] { new SqlParameter("@mgrID", mgrID) });
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<ViolationsYears> GetViolationsYears()
        {
            try
            {
                return Context.ExecuteToDataTable<ViolationsYears>("Report_GetViolationsYears_SP", null);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public List<ViolationsMonths> GetViolationsMonths()
        {
            try
            {
                return Context.ExecuteToDataTable<ViolationsMonths>("Report_GetViolationsMonth_SP", null);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<Violations> GetViolations(int year, int month, long company, string username)
        {
            try
            {
                //DataTableParameters DTPara = DataTableParameters.SET(QueryString);
                string sql = "Report_GetViolationsByMonthandCompany_SP";
                //SqlParameter Count = new SqlParameter("@Count", System.Data.SqlDbType.Int);
                //Count.Direction = System.Data.ParameterDirection.Output;
                var para = new SqlParameter[]
                {

                new SqlParameter("@Year", year),
                new SqlParameter("@Month", month),
                new SqlParameter("@Company", company),
                new SqlParameter("@user", username)
                 };
                return Context.ExecuteToDataTable<Violations>(sql, para);
                //int totalrecords = 0;
                //if (result != null && result.Count > 0)
                //    totalrecords = result.Count;

                //DataTableData<Violations> ReturnList = new DataTableData<Violations>
                //{
                //    draw = DTPara.draw,
                //    recordsTotal = totalrecords,
                //    recordsFiltered = totalrecords,
                //    data = result

                //};
                //return ReturnList;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public DataSet GetViolationDetails(Violations param)
        {
            try
            {
                string sql = "Report_GetEmpViolationDetails_SP";

                var para = new SqlParameter[]
                {

                new SqlParameter("@EmpNo", param.empNO),
                new SqlParameter("@UploadRef", param.UploadRef)
                 };
                return Context.ExecuteToDataSet(sql, para);
            }
            catch (Exception)
            {

                throw;
            }
        }


        #region Fingerprint requests Manage

        public IEnumerable<TransInfo> GetAllFingerPrint(string username, TransBody transSearch, string lang)
        {

            try
            {
                var result = Context.ExecuteToDataTable<TransInfo>("spsearchFingerPrint", new SqlParameter[] {
                    new SqlParameter("@username",username),
                    new SqlParameter("@trans_fdate",transSearch.trans_fdate),
                    new SqlParameter("@trans_tdate",transSearch.trans_tdate),
                    new SqlParameter("@trans_reason",transSearch.trans_reason==0 ? null:transSearch.trans_reason),
                    new SqlParameter("@trans_empid ",transSearch.trans_empid==0 ? null:transSearch.trans_empid),
                    new SqlParameter("@trans_secid",transSearch.trans_secid==0 ? null:transSearch.trans_secid),
                    new SqlParameter("@trans_RegID ",transSearch.trans_RegID==0 ? null:transSearch.trans_RegID),
                    new SqlParameter("@Lang ",lang)
            });
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public TransInfo GetTransRequestByID(string username, int transID)
        {

            try
            {
                var result = Context.ExecuteToDataTable<TransInfo>("spgetFingerPrintRequest", new SqlParameter[] {
                    new SqlParameter("@trans_id",transID),
                    new SqlParameter("@username",username)
                });
                return result.SingleOrDefault();
            }
            catch (Exception)
            {
                throw;
            }
        }


        public int UpdateFingerPrintRequest(Transactions Trans, string Username)
        {
            try
            {
                string sql = "spUpdateFingerPrint";
                var para = new SqlParameter[]
            {
                new SqlParameter("@ID", Trans.trans_id ),
                new SqlParameter("@MDate", Trans.acc_date ),
                new SqlParameter("@TransType", Trans.m_transtype ),
                new SqlParameter("@transTime", Trans.m_time ),
                new SqlParameter("@ReasonID", Trans.ModifiedReasonID ),
                new SqlParameter("@Note", Trans.Note ),
                new SqlParameter("@UserName", Username ),
                new SqlParameter("@Status", Trans.m_status ),
             };
                var result = Context.ExecuteNonQuery(sql, para);
                return result.ToInt();
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region Work Remotely
        public ResponseStatus CanAddExcuse(ExecuseInfo ExcInfo, string user)
        {

            try
            {

                SqlParameter[] para = new SqlParameter[] {
                    new SqlParameter ("@exc_date", ExcInfo.exc_date),
                    new SqlParameter ("@exc_ftime", ExcInfo.exc_ftime),
                    new SqlParameter ("@exc_ttime", ExcInfo.exc_ttime),
                    new SqlParameter ("@UserName", user),
                    new SqlParameter ("@exc_todate", ExcInfo.exc_todate),
                    new SqlParameter ("@exc_type", ExcInfo.exc_type)
                };
                return Context.ExecuteToDataTable <ResponseStatus>("[TimeAtt_spCanEmployeeAddExecuse]", para).SingleOrDefault();
                //return await Context.ExecuteToDataSet("[TimeAtt_spCanEmployeeAddExecuseV2]", para);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public ResponseStatus CanManagerAddExecuse(ExecuseInfo ExcInfo, string username) //, int emp_id, int exc_date, string exc_ftime, string exc_ttime, int exc_type)
        {
            try
            {
                var para = new SqlParameter[] {
                    new SqlParameter ("@emp_id", ExcInfo.exc_empid),
                    new SqlParameter ("@exc_date", ExcInfo.exc_date),
                    new SqlParameter ("@exc_ftime", ExcInfo.exc_ftime),
                    new SqlParameter ("@exc_ttime", ExcInfo.exc_ttime),
                    new SqlParameter ("@exc_type", ExcInfo.exc_type),
                    new SqlParameter ("@exc_todate", ExcInfo.exc_todate),
                    new SqlParameter ("@UserName", username)
                };
                return Context.ExecuteToDataTable<ResponseStatus>("[TimeAtt_spCanManagerAddExecuse]", para).SingleOrDefault();

                //return await Context.ExecuteToDataSet("TimeAtt_spCanManagerAddExecuseV2", para);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public  void DeleteFaieldExecuse(int execID)
        {
            int res = (int) Context.ExecuteNonQuery("TimeAtt_spDeleteFaieldexecuse", new System.Data.SqlClient.SqlParameter[] {
                new System.Data.SqlClient.SqlParameter ("@exc_id", execID),
            });

        }

        #endregion

    }
}
