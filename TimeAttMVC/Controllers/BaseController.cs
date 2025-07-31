using CrystalDecisions.CrystalReports.Engine;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using TimeAtt.Security;
using TimeAttMVC.Helpper;
using ExtensionMethods;
using Resource = Resources.Resources;
using TimeAtt;

namespace TimeAttMVC.Controllers
{
    public class BaseController : Controller
    {
        protected virtual new CustomPrincipal User
        {
            get { return HttpContext.User as CustomPrincipal; }
        }
        protected virtual string WebApiUrl
        {
            get { return System.Configuration.ConfigurationManager.AppSettings["WebApiUrl"]; }
        }
        protected ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index");
        }
        protected FileStreamResult ReturnReport(string fileType, ReportDocument rd, string name)
        {
            Stream stream = null;
            try
            {

                LoclizeReport(rd);
                if (string.IsNullOrEmpty(fileType))
                {
                    fileType = "";
                }
                Response.Buffer = false;
                Response.ClearContent();
                Response.ClearHeaders();
                switch (fileType.ToLower())
                {
                    case "pdf":
                        {
                            stream = rd.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
                            stream.Seek(0, SeekOrigin.Begin);
                            Response.AppendHeader("Content-Disposition", "attachment; filename=" + name + ".pdf");
                            return File(stream, "application/pdf");


                        }
                    case "excel":
                        {
                            stream = rd.ExportToStream(CrystalDecisions.Shared.ExportFormatType.Excel);

                            stream.Seek(0, SeekOrigin.Begin);
                            Response.AppendHeader("Content-Disposition", "attachment; filename=" + name + ".xls");
                            return File(stream, "application/ms-excel");

                        }
                    case "exceldataonly":
                        {
                            stream = rd.ExportToStream(CrystalDecisions.Shared.ExportFormatType.ExcelRecord);

                            stream.Seek(0, SeekOrigin.Begin);
                            Response.AppendHeader("Content-Disposition", "attachment; filename=" + name + ".xls");
                            return File(stream, "application/ms-excel");

                        }
                    case "word":
                        {
                            stream = rd.ExportToStream(CrystalDecisions.Shared.ExportFormatType.WordForWindows);

                            stream.Seek(0, SeekOrigin.Begin);
                            Response.AppendHeader("Content-Disposition", "attachment; filename=" + name + ".doc");
                            return File(stream, "application/msword");

                        }
                    default:
                        {
                            stream = rd.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);

                            stream.Seek(0, SeekOrigin.Begin);
                            Response.AppendHeader("Content-Disposition", "inline; filename=" + name + ".pdf");
                            return File(stream, "application/pdf");
                        }

                }
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {

                if (rd != null)
                {
                    rd.Close();
                    rd.Dispose();
                    rd = null;

                }


            }
        }
        Dictionary<string, string> GetResource()
        {
            //return typeof(Resource)
            //    .GetProperties()
            //    .Where(p => !p.Name.IsLikeAny("ResourceManager", "Culture")) // Skip the properties you don't need on the client side.
            //    .ToDictionary(p => p.Name, p => p.GetValue(null) as string);
            var lang = Common.GetCurrentLanguage();
            return Resources.ResHelper.GetCurrentResources("TimeAtt", true).ToDictionary(p => p.RName, p => lang == "ar" ? p.RValueAR : p.RValueEN);
        }
        void LoclizeReport(CrystalDecisions.CrystalReports.Engine.ReportDocument rep)
        {
            Dictionary<string, string> Res = GetResource();

            foreach (CrystalDecisions.CrystalReports.Engine.ReportObject obj in rep.ReportDefinition.ReportObjects)
            {
                if (obj.GetType().ToString() == "CrystalDecisions.CrystalReports.Engine.TextObject" | obj.GetType().ToString() == "CrystalDecisions.CrystalReports.Engine.FieldHeadingObject")
                {
                    string txt = Res.ContainsKey(obj.Name) ? Res[obj.Name] : "";

                    if (txt.Length > 0 & !(obj as CrystalDecisions.CrystalReports.Engine.TextObject).Text.Contains("?"))
                    {
                        (obj as CrystalDecisions.CrystalReports.Engine.TextObject).Text = txt;
                    }
                }
            }


        }

        protected override IAsyncResult BeginExecuteCore(AsyncCallback callback, object state)
        {
            string cultureName = null;

            // Attempt to read the culture cookie from Request
            HttpCookie cultureCookie = Request.Cookies["_culture"];
            if (cultureCookie != null)
                cultureName = cultureCookie.Value;
            else
            {
                var cookie = new HttpCookie("_culture");
                cookie.Value = "ar";
                cookie.Expires = DateTime.Now.AddYears(1);
                cultureName = "ar";
                cookie.Domain = Common.GetDomain();
                Response.Cookies.Add(cookie);
            }
              //Request.UserLanguages != null && Request.UserLanguages.Length > 0 ? Request.UserLanguages[0] : null; // obtain it from HTTP header AcceptLanguages

            // Validate culture name
            cultureName = CultureHelper.GetImplementedCulture(cultureName); // This is safe


            // Modify current thread's cultures            
            Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo(cultureName);
            Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;


            return base.BeginExecuteCore(callback, state);
        }
    }
}