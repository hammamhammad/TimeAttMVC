using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;
using System.Web.Security;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using TimeAtt.Security;
using System.Net.Http.Headers;
using TimeAtt;
using TimeAtt.Models;
using TimeAtt.Model.Security;
using System.Configuration;

namespace TimeAttWebAPI
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_BeginRequest()
        {
            if (Request.Headers.AllKeys.Contains("Origin") && Request.HttpMethod == "OPTIONS")
            {
                var origin = ConfigurationManager.AppSettings["tsurl"];
                Response.Headers.Add("Access-Control-Allow-Origin", origin);
                Response.Headers.Add("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
                Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
                Response.Headers.Add("Access-Control-Allow-Credentials", "true");
                Response.Headers.Add("Access-Control-Max-Age", "1728000");
                Response.End();
            }
        }
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);



        }
        protected void WindowsAuthentication_OnAuthenticate(object sender, WindowsAuthenticationEventArgs e)
        {
            if (e.Identity != null && e.Identity.IsAuthenticated)
            {
                MyIdentity.Authenticate(e.Identity.Name, "", true, false, "W");
            }


        }
        protected void Application_PostAuthenticateRequest(Object sender, EventArgs e)
        {

            var IsAuthenticated = MyIdentity.Authenticate(HttpContext.Current.User != null && HttpContext.Current.User.Identity.IsAuthenticated ? HttpContext.Current.User.Identity.Name : "", "", true, false, "F");

            if (IsAuthenticated)
            {
            }
            else
            {


                var haveToken = HttpContext.Current.Request.Headers.AllKeys.Contains("Token");
                if (haveToken)
                {
                    var Token = HttpContext.Current.Request.Headers["Token"];
                    CustomPrincipalSerializeModel UserToken = MyIdentity.GetUserFromToken(Token);
                    if (UserToken == null)
                        return;
                    CustomPrincipal newUser = new CustomPrincipal(UserToken.UserName);
                    newUser.UserId = UserToken.UserId;
                    newUser.UserName = UserToken.UserName;
                    newUser.UserPer = UserToken.UserPer;
                    newUser.UserEmpID = UserToken.UserEmpID;
                    newUser.Email = UserToken.Email;
                    newUser.IsActive = UserToken.IsActive;
                    newUser.PasswordHash = UserToken.PasswordHash;
                    newUser.EmployeeName = UserToken.EmployeeName;
                    newUser.EmployeeNumber = UserToken.EmployeeNumber;
                    HttpContext.Current.User = newUser;
                    return;
                }

                if (string.IsNullOrEmpty(Request.Headers["Authorization"]))
                    return;
                AuthenticationHeaderValue authValue = null;
                if (Request.Headers["Authorization"].Contains(":"))
                {
                    authValue = new AuthenticationHeaderValue("Basic", Request.Headers["Authorization"]);
                   

                }
                else

                authValue = AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]);


                Credentials parsedCredentials = Common.GetCurrentCredentials(authValue);
                if (parsedCredentials != null)
                {
                    var password = Common.Encrype(parsedCredentials.Password, parsedCredentials.Username);

                    using (var UserContext = new UsersRepository())
                    {
                        var user = UserContext.Login(parsedCredentials.Username, password);
                        //if (user == null)
                        //{
                        //    var ApiCredinial = Common.GetApiCredentials();
                        //    if (parsedCredentials.Username == ApiCredinial.Username && parsedCredentials.Password == ApiCredinial.Password)
                        //        user = new UserInfo() { user_name = ApiCredinial.Username, user_id = 0, user_empid = 0, user_active = true, user_per = 1, user_email = "" };
                        //}
                        if (user != null)
                        {

                            CustomPrincipal newUser = new CustomPrincipal(user.user_name);
                            newUser.UserId = user.user_id;
                            newUser.UserName = user.user_name;
                            newUser.UserPer = user.user_per;
                            newUser.UserEmpID = user.user_empid;
                            newUser.Email = user.user_email;
                            newUser.IsActive = user.user_active;
                            newUser.PasswordHash = password;
                            newUser.EmployeeName = user.EmpName;
                            newUser.EmployeeNumber = user.EmpNO;
                            HttpContext.Current.User = newUser;
                        }
                    }

                }
            }

        }
    }
}
