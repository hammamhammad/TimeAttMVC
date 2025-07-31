using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Security;
using TimeAtt.Models;
using TimeAtt.Security;

namespace TimeAtt.Model.Security
{
    public static class MyIdentity
    {

        private static CustomPrincipalSerializeModel Create(string userName, string password, bool IsHash, string AuthType)
        {
            if (AuthType == "W")
            {
                password = "P@ss0wrd";
                IsHash = false;
            }
            CustomPrincipalSerializeModel userData = null;
            var Pass = IsHash ? password : Common.Encrype(password, userName);
            using (UsersRepository UserContext = new UsersRepository())
            {
                var user = AuthType == "W" ? UserContext.WindowsLogin(userName) : UserContext.Login(userName, Pass);
                if (user != null)
                {
                    userData = new CustomPrincipalSerializeModel();
                    userData.UserId = user.user_id;
                    userData.UserName = user.user_name;
                    userData.Email = user.user_email;
                    userData.UserPer = user.user_per;
                    userData.IsActive = user.user_active;
                    userData.PasswordHash = Pass;
                    userData.UserEmpID = user.user_empid;
                    userData.EmployeeName = user.EmpName;
                    userData.EmployeeNameEN = user.EmpNameEN;

                    userData.PolicyURLAR = user.PolicyURLAR;
                    userData.PolicyURLEN = user.PolicyURLEN;
                    userData.HeaderIMGURL = user.HeaderIMGURL;
                    userData.TimeAttPolicyURLAR = user.TimeAttPolicyURLAR;
                    userData.TimeAttPolicyURLEN = user.TimeAttPolicyURLEN;
                    userData.reg_id = user.reg_id;

                    userData.EmployeeNumber = user.EmpNO;
                    userData.Created = DateTime.Now;
                    userData.AuthType = AuthType;
                    userData.MustChangePassword = user.user_mustchangepassword;

                    return userData;
                }
            }
            return userData;
        }

        public static string GetUserCookieAsJson(CustomPrincipalSerializeModel data)
        {
            CustomPrincipalSerializeModel u = new CustomPrincipalSerializeModel
            {
                UserId = data.UserId,
                UserName = data.UserName,
                UserPer = data.UserPer,
                UserEmpID = data.UserEmpID,
                IsActive = data.IsActive,
                Email = data.Email,
                PasswordHash = data.PasswordHash,
                EmployeeName = data.EmployeeName,
                EmployeeNameEN = data.EmployeeNameEN,

                PolicyURLAR = data.PolicyURLAR,
                PolicyURLEN = data.PolicyURLEN,
                HeaderIMGURL = data.HeaderIMGURL,
                TimeAttPolicyURLAR = data.TimeAttPolicyURLAR,
            TimeAttPolicyURLEN = data.TimeAttPolicyURLEN,
            reg_id=data.reg_id,

            EmployeeNumber = data.EmployeeNumber,
                Created = data.Created,
                AuthType = data.AuthType,
                MustChangePassword = data.MustChangePassword

            };
            var json = new JavaScriptSerializer().Serialize(u);
            return Convert.ToBase64String(Encoding.UTF8.GetBytes(json));
        }
        public static bool Authenticate(string userName, string password, bool RemberMe, bool IsHash, string AuthType)
        {
            if (string.IsNullOrEmpty(userName))
                return false;
            userName = userName.Contains(@"\") ? userName.Split('\\')[1] : userName;

            HttpCookie authCookie = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName];
            if (authCookie != null && !string.IsNullOrEmpty(authCookie.Value))
            {
                FormsAuthenticationTicket authTicket = FormsAuthentication.Decrypt(authCookie.Value);
                CustomPrincipalSerializeModel serializeModel = JsonConvert.DeserializeObject<CustomPrincipalSerializeModel>(authTicket.UserData);
                if (!string.IsNullOrEmpty(userName) && userName.ToLower() != serializeModel.UserName.ToLower())
                {
                    return false;
                }
                if (authTicket.Expired && AuthType != "W")
                    return false;
                else
                {
                    CustomPrincipalSerializeModel UserData;

                    if ((DateTime.Now - serializeModel.Created).Duration().TotalMinutes > 5)
                    {
                        UserData = Create(serializeModel.UserName, serializeModel.PasswordHash, true, serializeModel.AuthType);
                        if (UserData == null)
                            return false;

                    }
                    else
                    {
                        UserData = serializeModel;
                    }
                    FormsAuthenticationTicket NewauthTicket = new FormsAuthenticationTicket(
                   1,
                   authTicket.Name,
                   DateTime.Now,
                   authTicket.IsPersistent ? DateTime.Now.AddDays(90.0) : DateTime.Now.AddMinutes(20.0),
                   authTicket.IsPersistent,
                   JsonConvert.SerializeObject(UserData));

                    string encTicket = FormsAuthentication.Encrypt(NewauthTicket);
                    HttpCookie faCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encTicket);
                    HttpCookie UCookie = new HttpCookie("UserInfo", GetUserCookieAsJson(UserData));
                    faCookie.Domain = Common.GetDomain(); ;
                    UCookie.Domain = Common.GetDomain(); ;
                    HttpContext.Current.Response.Cookies.Add(faCookie);
                    HttpContext.Current.Response.Cookies.Add(UCookie);
                    CustomPrincipal newUser = new CustomPrincipal(authTicket.Name);
                    newUser.UserId = UserData.UserId;
                    newUser.UserName = UserData.UserName;
                    newUser.UserPer = UserData.UserPer;
                    newUser.UserEmpID = UserData.UserEmpID;
                    newUser.Email = UserData.Email;
                    newUser.IsActive = UserData.IsActive;
                    newUser.PasswordHash = UserData.PasswordHash;
                    newUser.EmployeeName = UserData.EmployeeName;
                    newUser.EmployeeNameEN = UserData.EmployeeNameEN;

                    newUser.PolicyURLAR = UserData.PolicyURLAR;
                    newUser.PolicyURLEN = UserData.PolicyURLEN;
                    newUser.HeaderIMGURL = UserData.HeaderIMGURL;
                    newUser.TimeAttPolicyURLAR = UserData.TimeAttPolicyURLAR;
                    newUser.TimeAttPolicyURLEN = UserData.TimeAttPolicyURLEN;
newUser.reg_id = UserData.reg_id;
                    newUser.EmployeeNumber = UserData.EmployeeNumber;
                    newUser.AuthType = UserData.AuthType;
                    newUser.Created = UserData.Created;
                    newUser.MustChangePassword = UserData.MustChangePassword;
                    HttpContext.Current.User = newUser;
                    return true;
                }
            }
            else
            {
                CustomPrincipalSerializeModel UserData = Create(userName, password, IsHash, AuthType);
                if (UserData == null)
                    return false;
                FormsAuthenticationTicket authTicket = new FormsAuthenticationTicket(
                   1,
                  userName,
                   DateTime.Now,
                   RemberMe ? DateTime.Now.AddDays(90.0) : DateTime.Now.AddMinutes(20),
                   RemberMe, //pass here true, if you want to implement remember me functionality
                   JsonConvert.SerializeObject(UserData));

                string encTicket = FormsAuthentication.Encrypt(authTicket);
                HttpCookie faCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encTicket);
                HttpCookie UCookie = new HttpCookie("UserInfo", GetUserCookieAsJson(UserData));
                faCookie.Domain = Common.GetDomain(); ;
                UCookie.Domain = Common.GetDomain(); ;
                HttpContext.Current.Response.Cookies.Add(faCookie);
                HttpContext.Current.Response.Cookies.Add(UCookie);
                CustomPrincipal newUser = new CustomPrincipal(authTicket.Name);
                newUser.UserId = UserData.UserId;
                newUser.UserName = UserData.UserName;
                newUser.UserPer = UserData.UserPer;
                newUser.UserEmpID = UserData.UserEmpID;
                newUser.Email = UserData.Email;
                newUser.IsActive = UserData.IsActive;
                newUser.PasswordHash = UserData.PasswordHash;
                newUser.EmployeeName = UserData.EmployeeName;
                newUser.EmployeeNameEN = UserData.EmployeeNameEN;

                newUser.PolicyURLAR = UserData.PolicyURLAR;
                newUser.PolicyURLEN = UserData.PolicyURLEN;
                newUser.HeaderIMGURL = UserData.HeaderIMGURL;
                newUser.TimeAttPolicyURLAR = UserData.TimeAttPolicyURLAR;
                newUser.TimeAttPolicyURLEN = UserData.TimeAttPolicyURLEN;
 newUser.reg_id = UserData.reg_id;
                newUser.EmployeeNumber = UserData.EmployeeNumber;
                newUser.AuthType = UserData.AuthType;
                newUser.Created = UserData.Created;
                newUser.MustChangePassword = UserData.MustChangePassword;
                HttpContext.Current.User = newUser;
                return true;
            }
        }
        public static CustomPrincipalSerializeModel GetUserFromToken(string Token)
        {
            try
            {
                FormsAuthenticationTicket authTicketFromToken = FormsAuthentication.Decrypt(Token);
                CustomPrincipalSerializeModel serializeModel = JsonConvert.DeserializeObject<CustomPrincipalSerializeModel>(authTicketFromToken.UserData);
                if (authTicketFromToken.Expired && serializeModel.AuthType != "W")
                    return null;
                return serializeModel;
            }
            catch (Exception)
            {

                return null;
            }



        }
        public static HttpCookie GetAuthCookie()
        {
            try
            {
                return HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName];
            }
            catch (Exception)
            {

                return new HttpCookie(FormsAuthentication.FormsCookieName);
            }


        }
        public static void ClearAuthCookie()
        {
            HttpCookie authCookie = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName];
            if (authCookie != null)
            {
                HttpContext.Current.Response.Cookies.Remove(FormsAuthentication.FormsCookieName);
                authCookie.Expires = DateTime.Now.AddDays(-10);
                authCookie.Value = null;
                HttpContext.Current.Response.SetCookie(authCookie);


            }

            HttpCookie UCookie = HttpContext.Current.Request.Cookies["UserInfo"];
            if (UCookie != null)
            {
                HttpContext.Current.Response.Cookies.Remove("UserInfo");
                UCookie.Expires = DateTime.Now.AddDays(-10);
                UCookie.Domain = Common.GetDomain();
                HttpContext.Current.Response.SetCookie(UCookie);

            }
            FormsAuthentication.SignOut();

        }
    }
}
