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
    public interface IEmployeesRepository : IGenericRepository<EmployeeInfo>
    {

        EmployeeInfo GetSingle(int emp_Id);
    }
    public class EmployeesRepository : GenericRepository<TimeAttDBModel, EmployeeInfo>, IEmployeesRepository
    {
        public bool IsValid(EmployeeInfo EmpInfo, out string msg)
        {
            msg = "";
            if (EmpInfo.emp_section == 0)
            {
                msg = Resources.Resources.ChooseSectionForEmpMsg;

                return false;

            }
            if (EmpInfo.emp_region == 0)
            {
                msg = Resources.Resources.ChooseBranchForEmpMsg;

                return false;
            }
            if (string.IsNullOrWhiteSpace(EmpInfo.emp_no))
            {
                msg = Resources.Resources.WriteEmpNoMsg;

                return false;
            }
            if (!EmpInfo.emp_no.IsLong())
            {
                msg = Resources.Resources.EmpNoMustBeNumberMsg;

                return false;
            }
            if (string.IsNullOrWhiteSpace(EmpInfo.emp_name))
            {
                msg = Resources.Resources.WriteEmpNameMsg;

                return false;
            }
            if (EmpInfo.emp_sch == 0)
            {
                msg = Resources.Resources.ChooseScheduleForEmpMsg;

                return false;

            }
            if (EmpInfo.emp_jointype == "")
            {
                msg = Resources.Resources.ChooseEmpTypeMsg;
                return false;
            }
            return true;
        }
        public EmployeeInfo GetSingle(int emp_ID)
        {
            //GetSectionByID
            var result = Context.ExecuteToDataTable<EmployeeInfo>("spGetEmployeeByID", (new SqlParameter[] { new SqlParameter("@emp_ID", emp_ID) }));
            return result.SingleOrDefault();
            //var query = Context.Sections.FirstOrDefault(x => x.sec_ID == sec_Id);
            //return query;
        }
        public EmployeeInfo GetSingle(string emp_no)
        {

            var result = Context.ExecuteToDataTable<EmployeeInfo>("spGetEmployeeByEmpNO", (new SqlParameter[] { new SqlParameter("@emp_no", emp_no) }));
            return result.SingleOrDefault();
        }
        public IEnumerable<Constant> GetEmployeeType()
        {
            var result = Context.ExecuteCommandToDataTable<Constant>("SELECT * FROM [Constant] where ConstantType='EJT' and show=1 order by ConstantCode");
            return result;
        }
        public IEnumerable<EmployeeInfo> GetAll(string userName, int Sec_ID = 0, int Reg_ID = 0)
        {
            //"spGetEmployeeBySec"
            string sql = "spGetEmployeeBySec";
            List<System.Data.SqlClient.SqlParameter> para = new List<System.Data.SqlClient.SqlParameter>();

            para.Add(new System.Data.SqlClient.SqlParameter("@sec_id", Sec_ID));
            para.Add(new System.Data.SqlClient.SqlParameter("@username", userName));
            if (Reg_ID > 0)
            {
                para.Add(new System.Data.SqlClient.SqlParameter("@reg_id", Reg_ID));
            }
            var result = Context.ExecuteToDataTable<EmployeeInfo>(sql, para.ToArray());
            return result;
        }
        public IEnumerable<Locations> GetEmployeesLocations()
        {
            //"spGetEmployeeBySec"
            string sql = "spGetEmployeesLocations";

            var result = Context.ExecuteToDataTable<Locations>(sql, null);
            return result;
        }
        public IEnumerable<EmployeeInfo> GetReport(string userName, int? Sec_ID, string Lang)
        {
            string sql = "Report_tb_Employee";
            List<System.Data.SqlClient.SqlParameter> para = new List<System.Data.SqlClient.SqlParameter>();


            para.Add(new System.Data.SqlClient.SqlParameter("@username", userName));
            if (Sec_ID.HasValue && Sec_ID > 0)
            {
                para.Add(new System.Data.SqlClient.SqlParameter("@secID", Sec_ID));
            }
            para.Add(new System.Data.SqlClient.SqlParameter("@Lang", Lang));
            var result = Context.ExecuteToDataTable<EmployeeInfo>(sql, para.ToArray());
            return result;
        }

        public DataTableData<EmployeeInfo> GetAllPaging(string userName, int Sec_ID, long? Reg_ID, Dictionary<string, string> QueryString)
        {
            DataTableParameters DTPara = DataTableParameters.SET(QueryString);
            string sql = "spGetEmployeeBySec";
            var para = new SqlParameter[]
            {

                new SqlParameter("@sec_id", Sec_ID),
                new SqlParameter("@reg_id",Reg_ID > 0? Reg_ID:null ),
                new SqlParameter("@username", userName),
                new SqlParameter("@RowFilter", string.IsNullOrWhiteSpace(DTPara.search)?null:DTPara.search ),
                new SqlParameter("@DisplayLength", DTPara.length==-1?null:DTPara.length),
                new SqlParameter("@DisplayStart", DTPara.start),
                new SqlParameter("@OrderBy", DTPara.sortColumnName ),
                new SqlParameter("@OrderDir", DTPara.sortDirection ),
             };

            var result = Context.ExecuteToDataTable<EmployeeInfo>(sql, para.ToArray());
            int totalrecords = 0;
            if (result != null && result.Count > 0)
                totalrecords = result.First().TotalRecord;

            DataTableData<EmployeeInfo> ReturnList = new DataTableData<EmployeeInfo>
            {
                draw = DTPara.draw,
                recordsTotal = totalrecords,
                recordsFiltered = totalrecords,
                data = result

            };
            return ReturnList;
        }
        public int CheckEmployeeExists(EmployeeInfo EmpInfo)
        {
            EmpInfo.emp_card = EmpInfo.emp_no.ToBigInt();
            string sql = "spCheckEmpExists";
            int? empid = EmpInfo.emp_id;
            var ret = Context.ExecuteNonQuery(sql, new SqlParameter[] {
                new SqlParameter("@emp_no", EmpInfo.emp_no.ToTrim()),
                new SqlParameter("@emp_card",EmpInfo.emp_card),
                new SqlParameter("@empID",empid==0?null:empid)
            }, true).ToInt();

            return ret;
        }
        public int Add(string username, EmployeeInfo EmpInfo)
        {
            try
            {
                var result = Context.ExecuteNonQuery("spinsertemployee", new SqlParameter[] {
                    new SqlParameter("@emp_no", EmpInfo.emp_no.ToTrim ()),
                    new SqlParameter("@emp_card", EmpInfo.emp_card),
                    new SqlParameter("@emp_section",EmpInfo.emp_section),
                    new SqlParameter("@emp_name", EmpInfo.emp_name.ToTrim()),
                    new SqlParameter("@emp_sch", EmpInfo.emp_sch),
                    new SqlParameter("@emp_PersonalID", EmpInfo.emp_PersonalID.ToTrim()),
                    new SqlParameter("@emp_JobTitle", EmpInfo.emp_JobTitle.ToTrim()),
                    new SqlParameter("@emp_JobID", "0"),
                    new SqlParameter("@emp_Grade", "0"),
                    new SqlParameter("@emp_HiringDate", DateTime.Now.Date),
                    new SqlParameter("@emp_UserName", ""),
                    new SqlParameter("@emp_deleted", false),
                    new SqlParameter("@emp_jointype", EmpInfo.emp_jointype),
                    new SqlParameter("@emp_violatedException", EmpInfo.emp_violatedException),
                    new SqlParameter("@emp_ExceptionFromViolation", EmpInfo.emp_ExceptionViolation),
                    new SqlParameter("@UserName", username),
                    new SqlParameter("@emp_region", EmpInfo.emp_region),
                    new SqlParameter("@emp_sendnotif", EmpInfo.emp_sendnotif)}, true).ToInt();
                return result;

            }
            catch (Exception)
            {

                throw;
            }
        }

        public int Update(string username, EmployeeInfo EmpInfo)
        {
            try
            {
                var result = Context.ExecuteNonQuery("spupdateemployeeW", new SqlParameter[] {
                    new SqlParameter("@emp_id", EmpInfo.emp_id),
                    new SqlParameter("@emp_no", EmpInfo.emp_no.ToTrim ()),
                    new SqlParameter("@emp_card", EmpInfo.emp_card),
                    new SqlParameter("@emp_section",EmpInfo.emp_section),
                    new SqlParameter("@emp_name", EmpInfo.emp_name.ToTrim()),
                    new SqlParameter("@emp_sch", EmpInfo.emp_sch),
                    new SqlParameter("@emp_PersonalID", EmpInfo.emp_PersonalID.ToTrim()),
                    new SqlParameter("@emp_JobTitle", EmpInfo.emp_JobTitle.ToTrim()),
                    new SqlParameter("@emp_JobID", "0"),
                    new SqlParameter("@emp_Grade", "0"),
                    new SqlParameter("@emp_HiringDate", DateTime.Now.Date),
                    new SqlParameter("@emp_UserName", ""),
                    new SqlParameter("@emp_deleted", false),
                    new SqlParameter("@emp_jointype", EmpInfo.emp_jointype),
                    new SqlParameter("@emp_violatedException", EmpInfo.emp_violatedException),
                    new SqlParameter("@emp_ExceptionFromViolation", EmpInfo.emp_ExceptionViolation),
                    new SqlParameter("@UserName", username),
                    new SqlParameter("@emp_region", EmpInfo.emp_region),
                    new SqlParameter("@ex_FromDate", EmpInfo.ex_FromDate),
                    new SqlParameter("@ex_ToDate", EmpInfo.ex_ToDate),
                    new SqlParameter("@emp_sendnotif", EmpInfo.emp_sendnotif)}, false).ToInt();
                return result;

            }
            catch (Exception)
            {

                throw;
            }
        }

        public int Delete(string user, int emp_id, bool deleteolddata)
        {
            try
            {
                string username = (deleteolddata ? "" : user);
                var result = Context.ExecuteNonQuery("spdeleteemployee", new SqlParameter[] {
                      new SqlParameter("@emp_id", emp_id),
                      new SqlParameter("@UserName", username),
                      new SqlParameter("@deleteOldData", deleteolddata)
                 }, true).ToInt();
                return result;

            }
            catch (Exception)
            {

                throw;
            }
        }


    }
}
