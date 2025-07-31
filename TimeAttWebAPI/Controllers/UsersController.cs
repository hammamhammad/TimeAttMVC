using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using TimeAtt;
using TimeAtt.Models;
using TimeAtt.Security;

namespace TimeAttWebAPI.Controllers
{
    [RoutePrefix("Users")]
    [CustomAuthorize(GroupNo = "0", PermissionName = "Admin")]
    public class UsersController : ApiController
    {
        private UsersRepository usersRepository;
        public UsersController()
        {
            this.usersRepository = new UsersRepository();
        }

        public UsersController(UsersRepository usersRepository)
        {
            this.usersRepository = usersRepository;
        }

        #region Groups
        [HttpGet]
        [Route("Groups/GetAll")]
        [ResponseType(typeof(ResponseResult<IEnumerable<PermissionGroups>>))]
        public HttpResponseMessage GetAllPermissionGroups()
        {
            HttpResponseMessage response = null;
            try
            {
                //var UserData = RequestContext.Principal as CustomPrincipal;
                var result = usersRepository.GetAllPermissionGroups();
                var responeResult = new ResponseResult<IEnumerable<PermissionGroups>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.RequestUnauthorizedMsg, Exception.Message + Environment.NewLine + Exception.InnerException == null ? "" : Exception.InnerException.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }
        [HttpGet]
        [Route("Groups/GetByID/{ID}")]
        [ResponseType(typeof(ResponseResult<PermissionGroups>))]
        public HttpResponseMessage GetGroupByID(int ID)
        {
            HttpResponseMessage response = null;
            try
            {
                //var UserData = RequestContext.Principal as CustomPrincipal;
                var result = usersRepository.GetGroupByID(ID);
                var responeResult = new ResponseResult<PermissionGroups>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.RequestUnauthorizedMsg, Exception.Message + Environment.NewLine + Exception.InnerException == null ? "" : Exception.InnerException.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }
        [HttpGet]
        [Route("Groups/GetModules")]
        [ResponseType(typeof(ResponseResult<IEnumerable<PermissionModules>>))]
        public HttpResponseMessage GetModules()
        {
            HttpResponseMessage response = null;
            try
            {
                //var UserData = RequestContext.Principal as CustomPrincipal;
                var result = usersRepository.GetModules();
                var responeResult = new ResponseResult<IEnumerable<PermissionModules>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.RequestUnauthorizedMsg, Exception.Message + Environment.NewLine + Exception.InnerException == null ? "" : Exception.InnerException.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }
        [HttpGet]
        [Route("Groups/GetPermissions/{GroupID}")]
        [ResponseType(typeof(ResponseResult<IEnumerable<Permissions>>))]
        public HttpResponseMessage GetPermissions(int GroupID)
        {
            HttpResponseMessage response = null;
            try
            {
                //var UserData = RequestContext.Principal as CustomPrincipal;
                var result = usersRepository.GetPermissions(GroupID);
                var responeResult = new ResponseResult<IEnumerable<Permissions>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.RequestUnauthorizedMsg, Exception.Message + Environment.NewLine + Exception.InnerException == null ? "" : Exception.InnerException.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }


        [HttpPost]
        [Route("Groups/Add")]
        [ResponseType(typeof(ResponseResult<PermissionGroups>))]
        public HttpResponseMessage AddGroup([FromBody] PermissionGroups Group)
        {
            HttpResponseMessage response = null;
            try
            {
                var UserData = RequestContext.Principal as CustomPrincipal;
                var result = usersRepository.AddGroup(UserData.UserName, Group);
                if (result > 0)
                {
                    Group = usersRepository.GetGroupByID(result);
                    var responeResult = new ResponseResult<PermissionGroups>("1", Resources.Resources.SuccessAddDataMsg, Group);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<PermissionGroups>("0", Resources.Resources.AddUserGroupErrorMsg, Group);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.AddUserGroupErrorMsg, Exception.Message + Environment.NewLine + Exception.InnerException == null ? "" : Exception.InnerException.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }
        [HttpPost]
        [Route("Groups/Update")]
        [ResponseType(typeof(ResponseResult<PermissionGroups>))]
        public HttpResponseMessage UpdateGroup([FromBody] PermissionGroups Group)
        {
            HttpResponseMessage response = null;
            try
            {
                var UserData = RequestContext.Principal as CustomPrincipal;
                var result = usersRepository.UpdateGroup(UserData.UserName, Group);
                if (result > 0)
                {
                    Group = usersRepository.GetGroupByID(Group.GroupID);
                    var responeResult = new ResponseResult<PermissionGroups>("1", Resources.Resources.SuccessSaveDataMsg, Group);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<PermissionGroups>("0", Resources.Resources.SaveUserGroupErrorMsg, Group);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.SaveUserGroupErrorMsg, Exception.Message + Environment.NewLine + Exception.InnerException == null ? "" : Exception.InnerException.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }
        [HttpPost]
        [Route("Groups/Delete/{ID}")]
        [ResponseType(typeof(ResponseResult<PermissionGroups>))]
        public HttpResponseMessage DeleteGroup(int ID)
        {
            HttpResponseMessage response = null;
            try
            {
                var UserData = RequestContext.Principal as CustomPrincipal;
                PermissionGroups Group = usersRepository.GetGroupByID(ID);
                var ReturnValue = usersRepository.DeleteGroup(UserData.UserName, ID);
                if (ReturnValue > 0)
                {
                    var responeResult = new ResponseResult<PermissionGroups>("1", Resources.Resources.SuccessDeleteMsg, Group);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {

                    var responeResult = new ResponseResult<PermissionGroups>("0", Resources.Resources.YouCannotDeleteUserGroupRelatedUser, Group);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.DeleteUserGroupErrorMsg + ":" + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }
        #endregion

        #region Users

        [HttpGet]
        [Route("HasPermission/{GroupNo}/{PermissionName}")]
        [ResponseType(typeof(ResponseResult<bool?>))]
        [AllowAnonymous]
        public HttpResponseMessage HasPermission(int GroupNo, string PermissionName)
        {
            //var responeResult2 = new ResponseResult<bool?>("1", Resources.Resources.SuccessRetrievedDataMsg, true );
            //return Request.CreateResponse(HttpStatusCode.OK, responeResult2);

            HttpResponseMessage response = null;
            try
            {
                var UserData = RequestContext.Principal as CustomPrincipal;
                if (UserData ==null)
                {
                    var responeResult = new ResponseResult<bool?>("0", Resources.Resources.RequestUnauthorizedMsg, false);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                var result = usersRepository.IfUserHasPermssion(UserData.UserId, GroupNo, PermissionName);
                if (result)
                {
                    var responeResult = new ResponseResult<bool?>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<bool?>("0", Resources.Resources.RequestUnauthorizedMsg, result);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.RequestUnauthorizedMsg, Exception.Message + Environment.NewLine + Exception.InnerException == null ? "" : Exception.InnerException.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }

        [HttpGet]
        [Route("GetCurrent")]
        [ResponseType(typeof(ResponseResult<CustomPrincipal>))]
      
        public HttpResponseMessage GetCurrent()
        {
            HttpResponseMessage response = null;
            try
            {
                var UserData = RequestContext.Principal as CustomPrincipal;
                var responeResult = new ResponseResult<CustomPrincipal>("1", Resources.Resources.SuccessRetrievedDataMsg, UserData);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.RequestUnauthorizedMsg, Exception.Message + Environment.NewLine + Exception.InnerException == null ? "" : Exception.InnerException.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }
        [HttpGet]
        [Route("GetAll/{UserType}")]
        [ResponseType(typeof(ResponseResult<IEnumerable<UserInfo>>))]
        public HttpResponseMessage GetAllUsers(int UserType)
        {
            HttpResponseMessage response = null;
            try
            {
                var UserData = RequestContext.Principal as CustomPrincipal;
                var result = usersRepository.GetAllUsers(UserType);
                var responeResult = new ResponseResult<IEnumerable<UserInfo>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.RequestUnauthorizedMsg, Exception.Message + Environment.NewLine + Exception.InnerException == null ? "" : Exception.InnerException.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }

        [HttpGet]
        [Route("GetByID/{ID}")]
        [ResponseType(typeof(ResponseResult<UserInfo>))]
        public HttpResponseMessage GetByID(int ID)
        {
            HttpResponseMessage response = null;
            try
            {
                var result = usersRepository.GetSingle(ID);
                var responeResult = new ResponseResult<UserInfo>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.RequestUnauthorizedMsg, Exception.Message + Environment.NewLine + Exception.InnerException == null ? "" : Exception.InnerException.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }
        [HttpPost]
        [Route("Add")]
        [ResponseType(typeof(ResponseResult<UserInfo>))]
        public HttpResponseMessage AddUser([FromBody] UserInfo User)
        {
            HttpResponseMessage response = null;
            try
            {
                var pass = Common.Encrype(User.user_pass, User.user_name);
                User.user_pass = pass;
                var UserData = RequestContext.Principal as CustomPrincipal;
                var result = usersRepository.AddUser(UserData.UserName, User);
                if (result > 0)
                {
                    User = usersRepository.GetSingle(result);
                    var responeResult = new ResponseResult<UserInfo>("1", Resources.Resources.SuccessAddDataMsg, User);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else if (result == -2)
                {
                    var responeResult = new ResponseResult<UserInfo>("0", Resources.Resources.AddUserErrorMsg + Environment.NewLine + Resources.Resources.EmpNameLinkedToAnotherUser, User);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else if (result == -3)
                {
                    var responeResult = new ResponseResult<UserInfo>("0", Resources.Resources.AddUserErrorMsg + Environment.NewLine + Resources.Resources.UsernameAlreadyExistsMsg, User);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<UserInfo>("0", Resources.Resources.AddUserErrorMsg, User);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.AddUserErrorMsg, Exception.Message + Environment.NewLine + Exception.InnerException == null ? "" : Exception.InnerException.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }
        [HttpPost]
        [Route("Update")]
        [ResponseType(typeof(ResponseResult<UserInfo>))]
        public HttpResponseMessage UpdateUser([FromBody] UserInfo User)
        {
            HttpResponseMessage response = null;
            try
            {
                var cUser = usersRepository.GetSingle(User.user_id);
                if (cUser.user_pass != User.user_pass)
                {
                    var pass = Common.Encrype(User.user_pass, User.user_name);
                    User.user_pass = pass;
                }
                var UserData = RequestContext.Principal as CustomPrincipal;
                var result = usersRepository.UpdateUser(UserData.UserName, User);
                if (result > 0)
                {
                    User = usersRepository.GetSingle(User.user_id);
                    var responeResult = new ResponseResult<UserInfo>("1", Resources.Resources.SuccessSaveDataMsg, User);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else if (result == -2)
                {
                    var responeResult = new ResponseResult<UserInfo>("0", Resources.Resources.SaveUserErrorMsg + Environment.NewLine + Resources.Resources.EmpNameLinkedToAnotherUser, User);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else if (result == -3)
                {
                    var responeResult = new ResponseResult<UserInfo>("0", Resources.Resources.SaveUserErrorMsg + Environment.NewLine + Resources.Resources.UsernameAlreadyExistsMsg, User);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<UserInfo>("0", Resources.Resources.SaveUserErrorMsg, User);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.SaveUserErrorMsg, Exception.Message + Environment.NewLine + Exception.InnerException == null ? "" : Exception.InnerException.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }
        [HttpPost]
        [AllowAnonymous]
        [Route("ChangePassword")]
        [ResponseType(typeof(ResponseResult<UserInfo>))]
        public HttpResponseMessage ChangePassword([FromBody] UserInfo User)
        {
            HttpResponseMessage response = null;
            try
            {
                string currentPassword = "";
                string newPassword = "";

                var UserData = RequestContext.Principal as CustomPrincipal;
                if (UserData.UserName.ToLower() != User.user_name.ToLower())
                {
                    var responeResult = new ResponseResult<UserInfo>("0", Resources.Resources.ChangePasswordErrorMsg, User);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    return response;
                }
                if (UserData.MustChangePassword == false)
                    currentPassword = Common.Encrype(User.user_pass, User.user_name);
                else
                    currentPassword = UserData.PasswordHash;
                if (currentPassword!=UserData.PasswordHash)
                {
                    var responeResult = new ResponseResult<UserInfo>("0", Resources.Resources.CurrentPasswordNotValidMsg, User);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    return response;
                }

                newPassword = Common.Encrype(User.NewPassword, User.user_name);

                var result = usersRepository.ChangePassword(User.user_name, currentPassword, newPassword);
                if (result > 0)
                {
                    User = usersRepository.GetSingle(User.user_id);
                    var responeResult = new ResponseResult<UserInfo>("1", Resources.Resources.ChangePasswordSuccessMsg, User);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<UserInfo>("0", Resources.Resources.ChangePasswordErrorMsg, User);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.ChangePasswordErrorMsg, Exception.Message + Environment.NewLine + Exception.InnerException == null ? "" : Exception.InnerException.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }
        #endregion
        protected override void Dispose(bool disposing)
        {
            usersRepository.Dispose();
            base.Dispose(disposing);
        }
    }
}
