using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TimeAtt;
using TimeAtt.Security;
using TimeAttMVC.Helpper;

namespace TimeAttMVC.Controllers
{
    [CustomAuthorizeMVCAttribute]
    public class HomeController : BaseController
    {

        public ActionResult Index()
        {
            return View();
        }
        [AllowAnonymous]
        public ActionResult Error(string errorMsg=null)
        {
           ViewBag.errorMessage  = errorMsg;
            return View();
        }
        [AllowAnonymous]
        public ActionResult SetCulture(string returnUrl)
        {

            // Save culture in a cookie
            HttpCookie cookie = Request.Cookies["_culture"];
            if (cookie != null)
            {
                var culture = cookie.Value == "ar" ? "en" : "ar";
                // Validate input
                culture = CultureHelper.GetImplementedCulture(culture);
                cookie.Value = culture;   // update cookie value
            }

            else
            {
                cookie = new HttpCookie("_culture");
                cookie.Value = "ar";
                cookie.Expires = DateTime.Now.AddYears(1);
            }
            cookie.Domain = Common.GetDomain();
            Response.Cookies.Add(cookie);

            return RedirectToLocal(returnUrl);
        }
    }
}