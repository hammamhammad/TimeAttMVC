using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeAtt.DBContext;

namespace TimeAtt.Models
{
    public interface IShiftRepository : IGenericRepository<ShiftInfo>
    {

        ShiftInfo GetSingle(int shift_id);
    }
    public class ShiftRepository : GenericRepository<TimeAttDBModel, ShiftInfo>, IShiftRepository
    {
        public bool IsValid(ShiftInfo shiftinfo, out string msg)
        {
            msg = "";
            var off = shiftinfo.shift_fin.getTimeInt() == 0 && shiftinfo.shift_fout.getTimeInt() == 0;
            var twoshifts = shiftinfo.shift_sin.getTimeInt() > 0 && shiftinfo.shift_sout.getTimeInt() > 0;
            if (shiftinfo.shift_fout.getTimeInt() < shiftinfo.shift_fin.getTimeInt() && !shiftinfo.shift_isnight.ToBoolean())
            {
                msg = Resources.Resources.ShiftINMustBeLessThanSiftOUTMsg;
                return false;
            }
            if (off && shiftinfo.shift_isnight.ToBoolean())
            {
                msg = Resources.Resources.YouCannotApplyNightyWhileShiftIsOFFMsg;
                return false;
            }
            if (off && shiftinfo.IsOpenHours.ToBoolean())
            {
                msg = Resources.Resources.YouCannotApplyOpenHourWhileShiftIsOFFMsg;
                return false;
            }
            if (off && shiftinfo.IsFH.ToBoolean())
            {
                msg = Resources.Resources.YouCannotApplyFHWhileShiftIsOFFMsg;
                return false;
            }
            TimeSpan time1 = TimeSpan.Parse(shiftinfo.shift_FH_from);
            TimeSpan time2 = TimeSpan.Parse(shiftinfo.shift_FH_to);

            TimeSpan difference = time2 - time1;

            int hours = difference.Hours;
            int minutes = difference.Minutes;
            if ((hours <= 0 && minutes <= 0) && shiftinfo.IsFH.ToBoolean())
            {
                msg = Resources.Resources.PleaseCheckDataShiftForFHMsg;
                return false;
            }
            if ((hours > 2 || (hours == 2 && minutes > 0)) && shiftinfo.IsFH.ToBoolean())
            {
                msg = Resources.Resources.FHCannotBeGrateThan2HoursMaximumMsg;
                return false;
            }
            if (shiftinfo.IsFH.ToBoolean() && shiftinfo.shift_isnight.ToBoolean())
            {
                msg = Resources.Resources.YouCannotApplyFHWhileShiftIsNightyMsg;
                return false;
            }
            if (twoshifts)
            {
                if (shiftinfo.shift_sout.getTimeInt() < shiftinfo.shift_sin.getTimeInt() && !shiftinfo.shift_isnight.ToBoolean())
                {
                    msg = Resources.Resources.Shift2notvalidMSG;
                    return false;
                }
                if (!shiftinfo.shift_isnight.ToBoolean())
                {
                    if (shiftinfo.shift_sin.getTimeInt() <= shiftinfo.shift_fout.getTimeInt())
                    {
                        msg = Resources.Resources.Shift2notvalidMSG;
                        return false;
                    }
                }
            }
            return true;
        }

        public ShiftInfo GetByEmpNoAndDate(int empID, DateTime date)
        {
            var para = new SqlParameter[]{
                new System.Data.SqlClient.SqlParameter("@emp_id", empID),
               new System.Data.SqlClient.SqlParameter("@date", date.GetNumberFromDate())};
            return Context.ExecuteToDataTable<ShiftInfo>("TimeAtt_spGetShiftInfoByEmpAndDate", para).FirstOrDefault();
        }

        #region IShiftRepository Members

        public ShiftInfo GetSingle(int shift_id)
        {

            //var result = Context.Database.SqlQuery<ScheduleInfo>("GetSectionByID {0}", sec_Id);
            //return result.Single();
            var query = Context.ExecuteCommandToDataTable<ShiftInfo>(string.Format("SELECT * FROM [tb_shift] WHERE shift_id={0}", shift_id));
            return query.SingleOrDefault();
        }

        public override IEnumerable<ShiftInfo> GetAll()
        {
            var result = Context.ExecuteToDataTable<ShiftInfo>("spGetallShifts");
            return result;
        }

        public int Update(string username, ShiftInfo shift)
        {
            try
            {
                var off = (shift.shift_fin == "00:00") && (shift.shift_fout == "00:00");
                var shift_twoshifts = (shift.shift_sin != "--:--") && (shift.shift_sout != "--:--");
                var para = new SqlParameter[]{
                        new SqlParameter("@shift_id", shift.shift_id),
                        new SqlParameter("@shift_name", shift.shift_name.ToTrim()),
                        new SqlParameter("@shift_fin", shift.shift_fin),
                        new SqlParameter("@shift_fout", shift.shift_fout),
                        new SqlParameter("@shift_sin", shift.shift_sin),
                        new SqlParameter("@shift_sout", shift.shift_sout),
                        new SqlParameter("@shift_off", off),
                        new SqlParameter("@shift_deleted", false),
                        new SqlParameter("@shift_allow", shift.shift_allow),
                        new SqlParameter("@shift_allow_out", shift.shift_allow_out),
                        new SqlParameter("@shift_isnight", shift.shift_isnight),
                        new SqlParameter("@shift_twoshifts", shift_twoshifts),
                        new SqlParameter("@IsOpenHours", shift.IsOpenHours),
                        new SqlParameter("@IsFH", shift.IsFH),
                        new SqlParameter("@UserName", username),
                        new SqlParameter("@shift_FH_from", shift.shift_FH_from),
                        new SqlParameter("@shift_FH_to", shift.shift_FH_to),
                        new SqlParameter("@auto_trans", shift.auto_trans)
            };
                var result = Context.ExecuteNonQuery("spupdateshift", para).ToInt();

                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public int UpdateMT(string username, ShiftInfo shift)
        {
            try
            {
                var off = (shift.shift_fin == "00:00") && (shift.shift_fout == "00:00");
                var para = new SqlParameter[]{
                        new SqlParameter("@shift_id", shift.shift_id),
                        new SqlParameter("@shift_name", shift.shift_name.ToTrim()),
                        new SqlParameter("@shift_fin", shift.shift_fin),
                        new SqlParameter("@shift_fout", shift.shift_fout),
                        new SqlParameter("@shift_off", off),
                        new SqlParameter("@shift_deleted", true),
                        new SqlParameter("@shift_allow", shift.shift_allow),
                        new SqlParameter("@shift_allow_out", shift.shift_allow_out),
                        new SqlParameter("@shift_isnight", shift.shift_isnight),
                        new SqlParameter("@IsOpenHours", shift.IsOpenHours),
                        new SqlParameter("@IsFH", shift.IsFH),
                        new SqlParameter("@UserName", username),
                        new SqlParameter("@shift_FH_from", shift.shift_FH_from),
                        new SqlParameter("@shift_FH_to", shift.shift_FH_to)
            };
                var result = Context.ExecuteNonQuery("spupdateshift", para).ToInt();

                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public int Add(string username, ShiftInfo shift)
        {
            try
            {
                var off = (shift.shift_fin == "00:00") && (shift.shift_fout == "00:00");
                var shift_twoshifts = (shift.shift_sin != "--:--") && (shift.shift_sout != "--:--");
                var para = new SqlParameter[]{
                        new SqlParameter("@shift_name", shift.shift_name),
                        new SqlParameter("@shift_fin", shift.shift_fin),
                        new SqlParameter("@shift_fout", shift.shift_fout),
                        new SqlParameter("@shift_sin", shift.shift_sin),
                        new SqlParameter("@shift_sout", shift.shift_sout),
                        new SqlParameter("@shift_off", off),
                        new SqlParameter("@shift_deleted", false),
                        new SqlParameter("@shift_allow", shift.shift_allow),
                        new SqlParameter("@shift_allow_out", shift.shift_allow_out),
                        new SqlParameter("@shift_isnight", shift.shift_isnight),
                        new SqlParameter("@shift_twoshifts", shift_twoshifts),
                        new SqlParameter("@IsOpenHours", shift.IsOpenHours),
                        new SqlParameter("@IsFH", shift.IsFH),
                        new SqlParameter("@UserName", username),
                        new SqlParameter("@shift_FH_from", shift.shift_FH_from),
                        new SqlParameter("@shift_FH_to", shift.shift_FH_to),
                        new SqlParameter("@auto_trans", shift.auto_trans)
            };
                var result = Context.ExecuteNonQuery("spinsertshift", para, true).ToInt();

                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public int AddMT(string username, ShiftInfo shift)
        {
            try
            {
                var off = (shift.shift_fin == "00:00") && (shift.shift_fout == "00:00");
                var para = new SqlParameter[]{
                        new SqlParameter("@shift_name", shift.shift_name),
                        new SqlParameter("@shift_fin", shift.shift_fin),
                        new SqlParameter("@shift_fout", shift.shift_fout),
                        new SqlParameter("@shift_off", off),
                        new SqlParameter("@shift_deleted", true),
                        new SqlParameter("@shift_allow", shift.shift_allow),
                        new SqlParameter("@shift_allow_out", shift.shift_allow_out),
                        new SqlParameter("@shift_isnight", shift.shift_isnight),
                        new SqlParameter("@IsOpenHours", shift.IsOpenHours),
                        new SqlParameter("@IsFH", shift.IsFH),
                        new SqlParameter("@UserName", username),
                        new SqlParameter("@shift_FH_from", shift.shift_FH_from),
                        new SqlParameter("@shift_FH_to", shift.shift_FH_to)
            };
                var result = Context.ExecuteNonQuery("spinsertshift", para, true).ToInt();

                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public int Delete(string username, int shift_ID)
        {
            try
            {

                var para = new SqlParameter[]{
                new System.Data.SqlClient.SqlParameter("@shift_id", shift_ID),
               new System.Data.SqlClient.SqlParameter("@UserName", username)};
                var result = Context.ExecuteNonQuery("spshiftdelete", para, true).ToInt();
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        #endregion


    }
}
