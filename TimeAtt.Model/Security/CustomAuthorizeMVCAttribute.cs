using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using TimeAtt.Models;

namespace TimeAtt.Security
{
    [AttributeUsageAttribute(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = true)]
    public class CustomAuthorizeMVCAttribute : AuthorizeAttribute
    {
        //Custom named parameters for annotation
        public string GroupNo { get; set; }
        public string PermissionName { get; set; }
        private UsersRepository UserContext = new UsersRepository();

        //Called when access is denied
        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            //User isn't logged in
            if (!filterContext.HttpContext.User.Identity.IsAuthenticated)
            {
                filterContext.Result = new RedirectToRouteResult(
                        new RouteValueDictionary(new { controller = "Account", action = "Login", returnUrl = filterContext.HttpContext.Request.Url.PathAndQuery })
                );
            }
            //User is logged in but has no access
            else
            {
                filterContext.Result = new RedirectToRouteResult(
                        new RouteValueDictionary(new { controller = "Account", action = "NotAuthorized" })
                );
            }
        }

        //Core authentication, called before each action
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {



            try
            {
                var user = httpContext.User;
                var IsAuthenticated = user != null && user.Identity.IsAuthenticated;
                if (!IsAuthenticated) return false;

                var UserData = user as CustomPrincipal;
                if (UserData == null)
                    return false;
                if (UserData.MustChangePassword == true && UserData.AuthType!="W")
                    return false;
                if (UserData.UserPer == 3 && (string.IsNullOrEmpty(GroupNo) || string.IsNullOrEmpty(PermissionName)))
                    return false;

                if (string.IsNullOrEmpty(GroupNo) || string.IsNullOrEmpty(PermissionName))
                    return true;
                if (GroupNo == "0" && PermissionName == "Admin")
                    return UserData.UserPer == 1;
                return UserContext.IfUserHasPermssion(UserData.UserId, GroupNo.ToInt(), PermissionName);
            }
            catch (Exception)
            {
                return false;
            }




        }
        public override void OnAuthorization(AuthorizationContext filterContext)
        {

            base.OnAuthorization(filterContext);
        }
    }

}
