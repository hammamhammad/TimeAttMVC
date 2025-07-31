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
    public interface IRegionsRepository : IGenericRepository<RegionsInfo>
    {

        RegionsInfo GetSingle(long reg_Id);
    }
    public class RegionsRepository : GenericRepository<TimeAttDBModel, RegionsInfo>, IRegionsRepository
    {
        public RegionsInfo GetSingle(long reg_Id)
        {
            var result = Context.ExecuteCommandToDataTable<RegionsInfo>(string.Format("select * from tb_Regions where reg_id={0}", reg_Id));
            return result.SingleOrDefault();
        }
        public IEnumerable<RegionsInfo> GetAll(string username)
        {
            
            var result = Context.ExecuteToDataTable<RegionsInfo>("spGetAllRegions", new SqlParameter[] { new SqlParameter("@username", username) });
            return result;
        }
        public int Add(string username, RegionsInfo region)
        {
            try
            {
                var result = Context.ExecuteNonQuery("spinsertRegions", new SqlParameter[] { 
                 new SqlParameter("@reg_id",region.reg_id),
                 new SqlParameter("@reg_name", region.reg_name.ToTrim()),
                 new SqlParameter("@UserName",username)
                 }, true).ToInt();
                if (result == -2)
                {
                    //msg = "رقم الفرع موجود يجب كتابة رقم آخر لتنفيذ العملية";
                    return -2;
                }
                if (result > 0)
                {
                    //msg = "تم إضافة معلومات الفرع بنجاح";
                    return result;
                }
                //msg = "حدث خطأ أثناء حفظ البيانات";
                return 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public int Update(string username, long CurrentID, RegionsInfo region)
        {
            try
            {
                var result = Context.ExecuteNonQuery("spupdateRegions", new SqlParameter[] { 
                 new SqlParameter("@reg_id",region.reg_id),
                 new SqlParameter("@reg_name", region.reg_name.ToTrim()),
                 new SqlParameter("@currentid ", CurrentID),
                 new SqlParameter("@UserName ", username)
                 }, true).ToInt();
                if (result == -2)
                {
                    //msg = "رقم الفرع موجود يجب كتابة رقم آخر لتنفيذ العملية";
                    return -2;
                }
                if (result > 0)
                {
                    // msg = "تم تعديل معلومات الفرع بنجاح";
                    return result;
                }
                //msg = "حدث خطأ أثناء حفظ البيانات";
                return 0;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public int Delete(string username, long reg_ID)
        {
            try
            {

                var result = Context.ExecuteNonQuery("spdeleteRegions", new SqlParameter[] { new SqlParameter("@reg_id", reg_ID) }, true).ToInt();

                if (result == 0)
                {
                    //  msg = "لا يمكن حذف الفرع لإرتباطه بمعلومات الموظفين";
                    return -2;
                }
                if (result < 0)
                    // msg = "حدث خطأ أثناء حذف بيانات الفرع";
                    return 0;
                // msg = "تمت عملية حذف معلومات الفرع بنجاح";
                return result;
            }
            catch (Exception)
            {

                throw;
            }

        }

    }
}
