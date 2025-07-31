using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeAtt.DBContext;

namespace TimeAtt.Models
{

    public interface ISceduleGroupRepository : IGenericRepository<SchedulGroupInfo>
    {

        SchedulGroupInfo GetSingle(int sch_id);
    }
    public class SceduleGroupRepository : GenericRepository<TimeAttDBModel, SchedulGroupInfo>, ISceduleGroupRepository
    {

        #region ISceduleGroupRepository Members

        public SchedulGroupInfo GetSingle(int schGroup_id)
        {

            //var result = Context.Database.SqlQuery<ScheduleInfo>("GetSectionByID {0}", sec_Id);
            //return result.Single();
            var query = Context.ExecuteToDataTable<SchedulGroupInfo>("schGroupGetByID", new SqlParameter[] { new SqlParameter("@schGroup_id", schGroup_id) });
            var Employee = Context.ExecuteToDataTable<SchedulGroupEmployees>("schGroupGetEmployee", new SqlParameter[] { new SqlParameter("@schGroup_id", schGroup_id) });
            var item = query.SingleOrDefault();
            if (item != null)
            {
                if (Employee == null)
                    Employee = new List<SchedulGroupEmployees>();
                item.scheduleGroupEmployees = Employee;
                return item;
            }
            return null;
        }
        public override IEnumerable<SchedulGroupInfo> GetAll()
        {
            //GetSectionByAll
            var result = Context.ExecuteCommandToDataTable<SchedulGroupInfo>("SELECT * FROM [tb_schGroup] WHERE ([schGroup_deleted]=0)");
            return result;
        }
        public IEnumerable<SchedulGroupInfo> GetAll(string username)
        {
            //GetSectionByAll
            var result = Context.ExecuteToDataTable<SchedulGroupInfo>("schGroupGetAll", new SqlParameter[] { new SqlParameter("@username", username) });
            return result;
        }
        public IEnumerable<SchedulGroupInfo> GetAll(string username, int EmpID)
        {
            //GetSectionByAll
            var result = Context.ExecuteToDataTable<SchedulGroupInfo>("schGroupByEmpID", new SqlParameter[] { new SqlParameter("@username", username)
                , new SqlParameter("@EmpID", EmpID)});
            return result;
        }
        #endregion
        private bool CheckIsEmployeeInGroup(SchedulGroupInfo ScheduleGrouptInfo)
        {
            var employees = ScheduleGrouptInfo.scheduleGroupEmployees == null ? "" : string.Join(", ", from item in ScheduleGrouptInfo.scheduleGroupEmployees select item.emp_id);

            string sql = "CheckIsEmployeeInGroup";
            int result = Context.ExecuteNonQuery(sql, new SqlParameter[] { new SqlParameter("@schGroup_id", ScheduleGrouptInfo.schGroup_id), new SqlParameter("@schEmployees", employees) }, true).ToInt();
            return result != 0;
        }
        public bool IsValid(SchedulGroupInfo ScheduleGrouptInfo, out string msg)
        {
            msg = "";
            if (ScheduleGrouptInfo.sch_id == 0)
            {
                msg = Resources.Resources.PleaseSelectScheduleForGroupMsg;
                return false;
            }
            if (CheckIsEmployeeInGroup(ScheduleGrouptInfo))
            {
                msg = Resources.Resources.OneOrMoreEmployeeExixtsInGroup;
                return false;
            }


            return true;

        }

        public int Add(string username, SchedulGroupInfo ScheduleGrouptInfo)
        {
            try
            {
                var para = new SqlParameter[]{
                new SqlParameter("@schGroup_name", ScheduleGrouptInfo.schGroup_name.ToTrim()),
                new SqlParameter("@sch_id", ScheduleGrouptInfo.sch_id ),
                new SqlParameter("@schEmployees",ScheduleGrouptInfo.scheduleGroupEmployees == null ? "" : string.Join(", ", from item in ScheduleGrouptInfo.scheduleGroupEmployees select item.emp_id)),
                new SqlParameter("@UserName", username),
                new SqlParameter("@schGroup_deleted", false),
                new SqlParameter("@sch_startdate",ScheduleGrouptInfo.sch_startdate),
                new SqlParameter("@sch_enddate", ScheduleGrouptInfo.sch_enddate),        
            };
                var result = Context.ExecuteNonQuery("spinsertschGroup", para, true).ToInt();

                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public int Update(string username, SchedulGroupInfo ScheduleGrouptInfo)
        {
            try
            {
                var para = new SqlParameter[]{
                new SqlParameter("@schGroup_id", ScheduleGrouptInfo.schGroup_id),
                new SqlParameter("@schGroup_name", ScheduleGrouptInfo.schGroup_name.ToTrim()),
                new SqlParameter("@sch_id", ScheduleGrouptInfo.sch_id ),
                new SqlParameter("@schEmployees",ScheduleGrouptInfo.scheduleGroupEmployees == null ? "" : string.Join(", ", from item in ScheduleGrouptInfo.scheduleGroupEmployees select item.emp_id)),
                new SqlParameter("@UserName", username),
                new SqlParameter("@schGroup_deleted", false),
                new SqlParameter("@sch_startdate",ScheduleGrouptInfo.sch_startdate),
                new SqlParameter("@sch_enddate", ScheduleGrouptInfo.sch_enddate),        
            };
                var result = Context.ExecuteNonQuery("spupdateschGroup", para, false ).ToInt();

                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public int Delete(string username, int schGroup_id)
        {
            try
            {
                var para = new SqlParameter[]{
                new SqlParameter("@schGroup_id",schGroup_id),
                new SqlParameter("@schGroup_name", string.Empty),
                new SqlParameter("@sch_id", -1 ),
                new SqlParameter("@schEmployees",string.Empty),
                new SqlParameter("@UserName", username),
                new SqlParameter("@schGroup_deleted", true),      
            };
                var result = Context.ExecuteNonQuery("spupdateschGroup", para, true).ToInt();

                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
