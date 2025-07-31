using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Helpers;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;
using Newtonsoft.Json;
using TimeAtt.Security;
using TimeAttMVC.Helpper;
using TimeAtt.Models;
using TimeAtt;
using TimeAtt.Model.Security;
using System.Configuration;

namespace TimeAttMVC
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            //AntiForgeryConfig.UniqueClaimTypeIdentifier = ClaimTypes.NameIdentifier;
        }
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
            //if (Request.Headers.AllKeys.Contains("Origin") && Request.HttpMethod == "OPTIONS")
            //{
            //    Response.Flush();
            //}
        }
        protected void  WindowsAuthentication_OnAuthenticate(object sender, WindowsAuthenticationEventArgs e)
        {
            if (e.Identity != null && e.Identity.IsAuthenticated)
            {
                MyIdentity.Authenticate(e.Identity.Name, "", true, false, "W");
            }


        }
        protected void Application_PostAuthenticateRequest(Object sender, EventArgs e)
        {
            var IsAuthenticated = MyIdentity.Authenticate(HttpContext.Current.User != null && HttpContext.Current.User.Identity.IsAuthenticated ? HttpContext.Current.User.Identity.Name : "", "", true, false, "F");

        }
        public override string GetVaryByCustomString(HttpContext context, string custom)
        {
            if (custom == "culture") // culture name (e.g. "en-US") is what should vary caching
            {
                string cultureName = null;

                // Attempt to read the culture cookie from Request
                HttpCookie cultureCookie = Request.Cookies["_culture"];
                if (cultureCookie != null)
                {
                    cultureName = cultureCookie.Value;
                }
                else
                {
                    cultureName = Request.UserLanguages != null
                    && Request.UserLanguages.Length > 0 ?
                    Request.UserLanguages[0] : null; // obtain it from HTTP header AcceptLanguages
                }

                // Validate culture name
                cultureName = CultureHelper.GetImplementedCulture(cultureName);
                return cultureName.ToLower(); // use culture name as the cache key, "es", "en-us", "es-cl", etc.
            }
            
            return base.GetVaryByCustomString(context, custom);
        }
    }
}
