using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Http.Controllers;

using System.Net.Http.Formatting;
using System.Net.Http;
using System.Web.Http;
using TimeAtt.Models;
using TimeAtt;
using System.Threading.Tasks;
using System.Web.Security;
using TimeAtt.Model.Security;
using Newtonsoft.Json;
using Resources;
using TimeAtt.DBContext;

namespace TimeAtt.Security
{
    public class CustomAuthorizeAttribute : System.Web.Http.AuthorizeAttribute
    {

        private UsersRepository UserContext = new UsersRepository();

        public string GroupNo { get; set; }
        public string PermissionName { get; set; }
        public bool ValidateUserAndPassword { get; set; }
        public bool ValidateToken { get; set; }
        public int TokenDuration { get; set; }
        protected CustomPrincipal CurrentUser
        {
            get { return Thread.CurrentPrincipal as CustomPrincipal; }
            set { Thread.CurrentPrincipal = value as CustomPrincipal; }
        }

        void validateToken(System.Web.Http.Controllers.HttpActionContext actionContext)
        {

            if (!ValidateToken) return;
            string msg = "";
            string user = "";
            try
            {

                string Token = "";
                string dt = "";
                AuthenticationHeaderValue authValue;
                authValue = actionContext.Request.Headers.Authorization;
                //if (authValue == null || String.IsNullOrWhiteSpace(authValue.Parameter))
                //{
                //    var usernametoken = GetEncryptLoginName();
                //    authValue = new AuthenticationHeaderValue("SAPTCO", usernametoken);

                //}


                if (authValue != null && !String.IsNullOrWhiteSpace(authValue.Parameter) && authValue.Scheme== "alkhorayef")
                {
                    Token = authValue.Parameter;
                    string dec = Common.Decrypt(Token);
                    user = dec.Split('|')[0].ToString().ToLower();
                    dt = dec.Split('|')[1].ToString();
                    if (TokenDuration > 0)
                    {
                        DateTime tokendate;
                        tokendate = DateTime.ParseExact(dt, "yyyy-MM-dd H:mm:ss", new System.Globalization.CultureInfo("en-US"));


                        TimeSpan duration = DateTime.Now - tokendate;
                        if (duration.TotalMinutes > TokenDuration)
                        {
                            msg = ResHelper.Get("SessionTimeOutMsg");
                        }
                    }
                    if (HttpContext.Current.User != null && HttpContext.Current.User.Identity.IsAuthenticated)
                    {
                        if (string.IsNullOrEmpty(((CustomPrincipal)HttpContext.Current.User).UserName ))
                        {
                            SetUser(user);
                        }
                        return;
                    }
                    SetUser(user);
                }
                else
                {
                    msg = ResHelper.Get("TokenMustProvidedMsg");
                }

            }
            catch (Exception)
            {

                msg = ResHelper.Get("InvalidTokenMsg");
            }
            if (!string.IsNullOrEmpty(msg))
            {
                var challengeMessage = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized, new ResponseResult<string>("0",(  !string.IsNullOrEmpty(user)?(msg+ "||" + user): msg), null));
                actionContext.Response = challengeMessage;
            }


        }

        void validateUserAndPassword(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            if (!ValidateUserAndPassword) return;

            //AuthenticationHeaderValue authValue = actionContext.Request.Headers.Authorization;
            string msg = "";

            var str = actionContext.Request.Headers.ToList().Where(f => f.Key.ToString() == "Authorization").SingleOrDefault();
            if (str.Value != null)
            {
                var authValue = str.Value.ToArray()[0];
                if (!String.IsNullOrWhiteSpace(authValue))
                {
                    var ApiCredinial = Common.GetApiCredentials();
                    if (authValue.Split(':').Count() != 2)
                    {
                        msg = Resources.Resources.UserNameAndPasswordMustProvidedMsg;
                    }
                    else if (authValue.Split(':')[0] != ApiCredinial.Username || authValue.Split(':')[1] != ApiCredinial.Password)
                    {
                        msg = Resources.Resources.InvalidUsernameorPasswordMsg;
                    }

                }
            }

            else
            {
                msg = Resources.Resources.UserNameAndPasswordMustProvidedMsg;
            }
            if (!string.IsNullOrEmpty(msg))
            {
                var challengeMessage = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized, new ResponseResult<object>("0", msg, null));
                actionContext.Response = challengeMessage;
            }


        }

        protected override void HandleUnauthorizedRequest(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            var challengeMessage = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized, new ResponseResult<object>("0", Resources.Resources.RequestUnauthorizedMsg, null));
            actionContext.Response = challengeMessage;
        }
        private static bool SkipAuthorization(HttpActionContext actionContext)
        {
            if (actionContext != null)

                return actionContext.ActionDescriptor.GetCustomAttributes<AllowAnonymousAttribute>().Any()
                       || actionContext.ControllerContext.ControllerDescriptor.GetCustomAttributes<AllowAnonymousAttribute>().Any();
            else
                return false;
        }
        private bool Authorize(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            try
            {

                var UserData = actionContext.RequestContext.Principal as CustomPrincipal;

                if (UserData == null)
                    return false;
                if (UserData.MustChangePassword == true && UserData.AuthType != "W")
                    return false;
                if (UserData.UserPer == 3 && (string.IsNullOrEmpty(GroupNo) || string.IsNullOrEmpty(PermissionName)))
                    return false;
                if (GroupNo == "0" && PermissionName == "Admin")
                {
                    return UserData.UserPer == 1;
                }
                if (string.IsNullOrEmpty(GroupNo) || string.IsNullOrEmpty(PermissionName))
                    return true;

                return UserContext.IfUserHasPermssion(UserData.UserId, GroupNo.ToInt(), PermissionName);
            }
            catch (Exception)
            {
                return false;
            }
        }

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            try
            {
                if (SkipAuthorization(actionContext))
                {
                    return;
                }

                if (actionContext.RequestContext.Principal.Identity.IsAuthenticated)
                {
                    if (Authorize(actionContext))
                    {
                        return;
                    }
                    HandleUnauthorizedRequest(actionContext);
                }


                AuthenticationHeaderValue authValue = actionContext.Request.Headers.Authorization;
                Credentials parsedCredentials = Common.GetCurrentCredentials(authValue);

                if (parsedCredentials != null)
                {
                    var password = Common.Encrype(parsedCredentials.Password, parsedCredentials.Username);
                    var user = UserContext.Login(parsedCredentials.Username, password);
                    if (user != null)
                    {
                        if (Authorize(actionContext))
                        {
                            return;
                        }
                        HandleUnauthorizedRequest(actionContext);
                    }
                    else
                    {
                        HandleUnauthorizedRequest(actionContext);
                        return;
                    }
                }
                else
                {
                    if (ValidateUserAndPassword)
                    {
                        validateUserAndPassword(actionContext);
                        return;
                    }
                    if (ValidateToken)
                    {
                        validateToken(actionContext);
                        return;
                    }
                    HandleUnauthorizedRequest(actionContext);
                    return;
                }
            }
            catch (Exception)
            {
                HandleUnauthorizedRequest(actionContext);
                return;
            }
        }

        void SetUser(string user)
        {
            UserInfo userinfo = null;
            using (WorkFlowDB ContextDb = new WorkFlowDB())
            {

                var result = ContextDb.ExecuteToDataTable<UserInfo>("GetCurrentUserInfo", new System.Data.SqlClient.SqlParameter[] { new System.Data.SqlClient.SqlParameter("@Username", user) });

                if (result != null && result.Count > 0)
                {
                    userinfo = result.SingleOrDefault();
                    CustomPrincipal newUser = new CustomPrincipal(user);
                    newUser.EmployeeNumber = userinfo.EmpNO;
                    newUser.EmployeeName = userinfo.EmpName;
                    newUser.EmployeeNameEN = userinfo.EmpNameEN;
                    newUser.UserName = userinfo.user_name;
                    newUser.Email = userinfo.user_email;
                    HttpContext.Current.User = newUser;
                }
            }
        }

    }
}