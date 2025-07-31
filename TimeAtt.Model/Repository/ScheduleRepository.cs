using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeAtt.DBContext;
using TimeAtt.Models;
using System.Data.SqlClient;
namespace TimeAtt.Models
{
    public interface IScheduleRepository : IGenericRepository<ScheduleInfo>
    {

        ScheduleInfo GetSingle(int sch_id);
    }
    public class ScheduleRepository : GenericRepository<TimeAttDBModel, ScheduleInfo>, IScheduleRepository
    {
        public bool IsValid(ScheduleInfo scheduleinfo, out string msg)
        {
            msg = "";
            if (string.IsNullOrWhiteSpace(scheduleinfo.sch_name))
            {
                msg = Resources.Resources.ScheduleNameIsRequired;
                return false;
            }
            if ((!scheduleinfo.sch_1.HasValue || scheduleinfo.sch_1 == 0) || (!scheduleinfo.sch_2.HasValue || scheduleinfo.sch_2 == 0) || (!scheduleinfo.sch_3.HasValue || scheduleinfo.sch_3 == 0) || (!scheduleinfo.sch_4.HasValue || scheduleinfo.sch_4 == 0) || (!scheduleinfo.sch_5.HasValue || scheduleinfo.sch_5 == 0) || (!scheduleinfo.sch_6.HasValue || scheduleinfo.sch_6 == 0) || (!scheduleinfo.sch_7.HasValue || scheduleinfo.sch_7 == 0))
            {

                msg = Resources.Resources.YouMustSelectAllDaysOfSchedule;
                return false;
            }
            return true;
        }
        #region ISectionsRepository Members

        public ScheduleInfo GetSingle(int sch_id)
        {

            //var result = Context.Database.SqlQuery<ScheduleInfo>("GetSectionByID {0}", sec_Id);
            //return result.Single();
            var query = Context.ExecuteCommandToDataTable<ScheduleInfo>(string.Format("SELECT * FROM [tb_schedule] WHERE sch_id={0}", sch_id));
            return query.SingleOrDefault();
        }
        public override IEnumerable<ScheduleInfo> GetAll()
        {
            //GetSectionByAll
            var result = Context.ExecuteCommandToDataTable<ScheduleInfo>("SELECT * FROM [tb_schedule] WHERE ([sch_delete]=0)");
            return result;
        }

        #endregion

        public int Add(string username, ScheduleInfo ScheduletInfo)
        {
            try
            {
                var para = new SqlParameter[]{
                        new SqlParameter("@sch_name", ScheduletInfo.sch_name.ToTrim()),
                        new SqlParameter("@sch_oneshift", true),
                        new SqlParameter("@sch_desc", ScheduletInfo.sch_desc.ToTrim()),
                        new SqlParameter("@sch_1", ScheduletInfo.sch_1 ),
                        new SqlParameter("@sch_2", ScheduletInfo.sch_2),
                        new SqlParameter("@sch_3", ScheduletInfo.sch_3),
                        new SqlParameter("@sch_4", ScheduletInfo.sch_4),
                        new SqlParameter("@sch_5", ScheduletInfo.sch_5),
                        new SqlParameter("@sch_6",ScheduletInfo.sch_6),
                        new SqlParameter("@sch_7", ScheduletInfo.sch_7),
                        new SqlParameter("@sch_delete", false),
                        new SqlParameter("@UserName", username)
            };
                var result = Context.ExecuteNonQuery("spinsertschedule", para, true).ToInt();

                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public int Update(string username, ScheduleInfo ScheduletInfo)
        {
            try
            {
                var para = new SqlParameter[]{
                        new SqlParameter("@sch_id", ScheduletInfo.sch_id ),
                        new SqlParameter("@sch_name", ScheduletInfo.sch_name.ToTrim()),
                        new SqlParameter("@sch_oneshift", true),
                        new SqlParameter("@sch_desc", ScheduletInfo.sch_desc.ToTrim()),
                        new SqlParameter("@sch_1", ScheduletInfo.sch_1 ),
                        new SqlParameter("@sch_2", ScheduletInfo.sch_2),
                        new SqlParameter("@sch_3", ScheduletInfo.sch_3),
                        new SqlParameter("@sch_4", ScheduletInfo.sch_4),
                        new SqlParameter("@sch_5", ScheduletInfo.sch_5),
                        new SqlParameter("@sch_6",ScheduletInfo.sch_6),
                        new SqlParameter("@sch_7", ScheduletInfo.sch_7),
                        new SqlParameter("@sch_delete", false),
                        new SqlParameter("@UserName", username)
            };
                var result = Context.ExecuteNonQuery("spupdateschedule", para).ToInt();

                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public int Delete(string username, int id)
        {
            try
            {
                var para = new SqlParameter[]{
                        new SqlParameter("@sch_id", id),
                        new SqlParameter("@UserName", username)
                            };

                var result = Context.ExecuteNonQuery("spscheduledelete", para, true).ToInt();

                return result;

            }
            catch (Exception)
            {

                throw;
            }
            //

        }
        public int Change(string username, int Sch_ID, bool ByAllEmployees, int BySection, long ByRegion)
        {
            try
            {
                var para = new SqlParameter[]{
                        new SqlParameter("@sch_id", Sch_ID),
                        new SqlParameter("@ByAllEmployees", ByAllEmployees),
                        new SqlParameter("@BySection", BySection),
                        new SqlParameter("@ByRegion", ByRegion),
                        new SqlParameter("@Username", username)
                            };

                var result = Context.ExecuteScaler("ChangeSchedule", para).ToInt();

                return result;

            }
            catch (Exception)
            {

                throw;
            }
            //

        }

    }


}
