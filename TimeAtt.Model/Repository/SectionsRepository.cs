using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using TimeAtt.DBContext;
namespace TimeAtt.Models
{
    public interface ISectionsRepository : IGenericRepository<SectionsInfo>
    {

        SectionsInfo GetSingle(int sec_Id);
    }
    public class SectionsRepository : GenericRepository<TimeAttDBModel, SectionsInfo>, ISectionsRepository
    {
       
        public SectionsInfo GetSingle(int sec_Id)
        {
            //GetSectionByID
            var result = Context.ExecuteToDataTable<SectionsInfo>("GetSectionByID", (new SqlParameter[] { new SqlParameter("@Sec_ID", sec_Id) }));
            return result.SingleOrDefault();
            //var query = Context.Sections.FirstOrDefault(x => x.sec_ID == sec_Id);
            //return query;
        }
        public override IEnumerable<SectionsInfo> GetAll()
        {
            //GetSectionByAll
            //var result = Context.Database.SqlQuery<SectionsInfo>("GetSectionByAll");
            var result = Context.ExecuteToDataTable<SectionsInfo>("GetSectionByAll");
            return result;
        }
        public  IEnumerable<SectionsInfo> GetAllAsTree()
        {
            //GetSectionByAll
            //var result = Context.Database.SqlQuery<SectionsInfo>("GetSectionByAll");
            var result = Context.ExecuteToDataTable<SectionsInfo>("Report_tb_Section_Tree");
            return result;
        }
        public int Add(string username, SectionsInfo section)
        {
            try
            {
               
                List<SqlParameter> para = new List<SqlParameter>();
                para.Add(new SqlParameter("@sec_No", section.sec_No.ToTrim()));
                para.Add(new SqlParameter("@sec_Name", section.sec_Name.ToTrim()));
                para.Add(new SqlParameter("@sec_Location", section.sec_Location.ToTrim()));
                para.Add(new SqlParameter("@sec_manager", !section.sec_manager.HasValue ? 0 : section.sec_manager.ToInt()));
                para.Add(new SqlParameter("@sec_secondmanager", !section.sec_secondmanager.HasValue ? 0 : section.sec_secondmanager.ToInt()));
                para.Add(new SqlParameter("@sec_sch", !section.sec_sch.HasValue ? 0 : section.sec_sch.ToInt()));
                para.Add(new SqlParameter("@UserName", username));
                para.Add(new SqlParameter("@sec_sendnotif", !section.sec_sendnotif.HasValue ? 0 : section.sec_sendnotif.ToInt()));
                para.Add(new System.Data.SqlClient.SqlParameter("@sec_Parent", section.sec_Parent.ToInt()));

                var result = Context.ExecuteNonQuery("spinsertsection", para.ToArray(), true).ToInt();

                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        public int Update(string username, SectionsInfo section)
        {
            try
            {
               
                List<SqlParameter> para = new List<SqlParameter>();
                para.Add(new SqlParameter("@sec_No", section.sec_No.ToTrim()));
                para.Add(new SqlParameter("@sec_Name", section.sec_Name.ToTrim()));
                para.Add(new SqlParameter("@sec_Location", section.sec_Location.ToTrim()));
                para.Add(new SqlParameter("@sec_manager", !section.sec_manager.HasValue ? 0 : section.sec_manager.ToInt()));
                para.Add(new SqlParameter("@sec_secondmanager", !section.sec_secondmanager.HasValue ? 0 : section.sec_secondmanager.ToInt()));
                para.Add(new SqlParameter("@sec_sch", !section.sec_sch.HasValue ? 0 : section.sec_sch.ToInt()));
                para.Add(new SqlParameter("@UserName", username));
                para.Add(new SqlParameter("@sec_sendnotif", !section.sec_sendnotif.HasValue ? 0 : section.sec_sendnotif.ToInt()));
                para.Add(new System.Data.SqlClient.SqlParameter("@sec_Parent", section.sec_ID == 1 ? 0 : (section.sec_Parent.HasValue ? section.sec_Parent.ToInt() : 0)));
                para.Add(new System.Data.SqlClient.SqlParameter("@sec_id", section.sec_ID.ToInt()));

                var result = Context.ExecuteNonQuery("spupdatesection", para.ToArray()).ToInt();

                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public int Delete(string username, int sec_ID)
        {
            try
            {
               
                List<SqlParameter> para = new List<SqlParameter>();
                para.Add(new System.Data.SqlClient.SqlParameter("@sec_id", sec_ID));
                para.Add(new System.Data.SqlClient.SqlParameter("@UserName", username));
                var result = Context.ExecuteNonQuery("spdeletesection", para.ToArray(), true).ToInt();
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public int Move(string username, SectionsInfo secinfo, int Parent)
        {
            try
            {
                string sql = "spmovesection";
                List<System.Data.SqlClient.SqlParameter> para = new List<System.Data.SqlClient.SqlParameter>();
                para.Add(new System.Data.SqlClient.SqlParameter("@sec_id", secinfo.sec_ID));
                para.Add(new System.Data.SqlClient.SqlParameter("@sec_Parent", Parent));
                para.Add(new System.Data.SqlClient.SqlParameter("@sec_Name", secinfo.sec_Name));
                para.Add(new System.Data.SqlClient.SqlParameter("@UserName", username));
                var result = Context.ExecuteNonQuery(sql, para.ToArray(), false).ToInt();
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }





    }
}