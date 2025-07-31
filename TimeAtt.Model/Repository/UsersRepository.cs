using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using TimeAtt.DBContext;
using TimeAtt.Security;

namespace TimeAtt.Models
{
    public interface IusersRepository : IGenericRepository<UserInfo>
    {

        UserInfo GetSingle(int user_Id);
    }
    public class UsersRepository : GenericRepository<TimeAttDBModel, UserInfo>, IusersRepository
    {

        #region IusersRepository Members

        public UserInfo GetSingle(int user_Id)
        {
            var query = Context.ExecuteToDataTable<UserInfo>("TimeAtt_GetUserInfoByID", new SqlParameter[] { new SqlParameter("@user_Id", user_Id) });
            return query.SingleOrDefault();
        }
        public UserInfo Login(string user_Name, string Password)
        {
            var query = Context.ExecuteToDataTable<UserInfo>("spdologin_Ext", new SqlParameter[] { new SqlParameter("@user_name", user_Name), new SqlParameter("@user_pass", Password) });
            return query.SingleOrDefault();
        }
        public UserInfo WindowsLogin(string user_Name)
        {
            var query = Context.ExecuteToDataTable<UserInfo>("spdoWindlogin_Ext", new SqlParameter[] { new SqlParameter("@user_name", user_Name) });
            return query.SingleOrDefault();
        }

        public bool IfUserHasPermssion(int UserID, int gno, string prev_name)
        {
            try
            {

                if (UserID == 0)
                    return false;
                using (var Context = new TimeAttDBModel())
                {
                    var HasPermssion = Context.ExecuteScaler("IfHasPermssion", new SqlParameter[]{
                new SqlParameter("@userID",UserID),new SqlParameter("@group_no",gno),new SqlParameter("@prev_name",prev_name )
            }).ToBoolean();
                    return HasPermssion;
                }

            }
            catch (Exception)
            {

                return false;
            }
        }


        #endregion

        #region Groups

        public IEnumerable<PermissionGroups> GetAllPermissionGroups()
        {
            try
            {


                var result = Context.ExecuteToDataTable<PermissionGroups>("TimeAtt_GetPermissionGroups");
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public IEnumerable<PermissionModules> GetModules()
        {
            try
            {
                var result = Context.ExecuteToDataTable<PermissionModules>("TimeAtt_GetModules");
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public IEnumerable<Permissions> GetPermissions(int GroupID)
        {
            try
            {
                var result = Context.ExecuteToDataTable<Permissions>("TimeAtt_GetPrivileges", new SqlParameter[] { new SqlParameter("@GroupID", GroupID) });
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public PermissionGroups GetGroupByID(int GroupID)
        {
            try
            {
                var result = Context.ExecuteToDataTable<PermissionGroups>("TimeAtt_PermissionGroupsGetByID", new SqlParameter[] { new SqlParameter("@GroupID", GroupID) }).SingleOrDefault();
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public int AddGroup(string username,PermissionGroups Group)
        {
            try
            {
                var result = Context.ExecuteNonQuery("TimeAtt_PermissionGroupsInsert", new SqlParameter[] { 
                 new SqlParameter("@GroupName",Group.GroupName),
                 new SqlParameter("@Per", Group.Permissions) ,
                 new SqlParameter("@UserName", username)
               
                 }, true).ToInt();
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public int UpdateGroup(string username,PermissionGroups Group)
        {
            try
            {
                var result = Context.ExecuteNonQuery("TimeAtt_PermissionGroupsUpdate", new SqlParameter[] { 
                    new SqlParameter("@GroupID",Group.GroupID),
                    new SqlParameter("@GroupName",Group.GroupName),
                    new SqlParameter("@Per", Group.Permissions),
                    new SqlParameter("@UserName", username)
               
                 }, true).ToInt();
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public int DeleteGroup(string username, int ID)
        {
            try
            {
                var result = Context.ExecuteNonQuery("TimeAtt_PermissionGroupsDelete", new SqlParameter[] { 
                    new SqlParameter("@GroupID",ID),
                    new SqlParameter("@UserName", username)
                 }, true).ToInt();
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region Users
        public IEnumerable<UserInfo> GetAllUsers(int UserType)
        {
            try
            {


                var result = Context.ExecuteToDataTable<UserInfo>("TimeAtt_GetAllUsers", new SqlParameter[] { new SqlParameter("@UserType", UserType) });
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public int AddUser(string username, UserInfo User)
        {
            try
            {
                var result = Context.ExecuteNonQuery("TimeAtt_UsersInsert", new SqlParameter[] { 
                    new SqlParameter("@user_name",User.user_name),
                    new SqlParameter("@user_pass", User.user_pass),
                    new SqlParameter("@user_empid",User.user_empid),
                    new SqlParameter("@UserName",username),
                    new SqlParameter("@user_per", User.user_per),
                    new SqlParameter("@user_active",User.user_active),
                    new SqlParameter("@user_email",string.IsNullOrEmpty(User.user_email)? null:User.user_email ),
                    new SqlParameter("@UserBranches", string.IsNullOrEmpty(User.UserBranches)? null:User.UserBranches),
                    new SqlParameter("@user_Group", User.user_Group==0?null:User.user_Group)
               
                 }, true).ToInt();
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public int UpdateUser(string username, UserInfo User)
        {

            try
            {
                var result = Context.ExecuteNonQuery("TimeAtt_UsersUpdate", new SqlParameter[] { 
                    new SqlParameter("@user_id",User.user_id),
                    new SqlParameter("@user_name",User.user_name),
                    new SqlParameter("@user_pass", User.user_pass),
                    new SqlParameter("@user_empid",User.user_empid),
                    new SqlParameter("@UserName",username),
                    new SqlParameter("@user_per", User.user_per),
                    new SqlParameter("@user_active",User.user_active),
                    new SqlParameter("@user_email",string.IsNullOrEmpty(User.user_email)? null:User.user_email ),
                    new SqlParameter("@UserBranches", string.IsNullOrEmpty(User.UserBranches)? null:User.UserBranches),
                    new SqlParameter("@user_Group", User.user_Group==0?null:User.user_Group)
               
                 }, true).ToInt();
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion








        public int ChangePassword(string username, string currentPassword, string newPassword)
        {
            try
            {
                var result = Context.ExecuteNonQuery("TimeAtt_ChangePassword", new SqlParameter[] { 
                    new SqlParameter("@UserName",username),
                    new SqlParameter("@CurrentPassword", currentPassword),
                    new SqlParameter("@NewPassword",newPassword),
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