using CrystalDecisions.CrystalReports.Engine;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TimeAtt.Models;
using TimeAtt.Security;
using TimeAttMVC.Helpper;
using TimeAtt;

namespace TimeAttMVC.Controllers
{
    [RoutePrefix("Excuses")]
     [CustomAuthorizeMVC(GroupNo = "7", PermissionName = "exc-view")]
    public class ExcusesController : BaseController
    {
        // GET: Excuses
        public ActionResult Index()
        {
            return View();
        }
        private ReportDocument GetReportDocument(FormParameters Para)
        {
            var cult = CultureHelper.GetCurrentCulture();
            CultureInfo Culture = new CultureInfo(cult);
            Culture.DateTimeFormat.Calendar = new GregorianCalendar();

            var RESTServiceForExcuses = new RESTService<ResponseResult<IEnumerable<ExecuseInfo>>>(WebApiUrl + "Excuses/GetAll");
            var RESTServiceForCompany = new RESTService<ResponseResult<IEnumerable<CompanyInfo>>>(WebApiUrl + "Company/GetWithLogo");
            var dataForExcuses = RESTServiceForExcuses.Post(Para);
            var dataForCompany = RESTServiceForCompany.Get();
            ReportDocument rd = new ReportDocument();
            if (!string.IsNullOrEmpty(Para.GroupBy) && Para.GroupBy == "bybranch")
            {
                rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/ExecusesReportByBranch.rpt"));
            }
            else if (!string.IsNullOrEmpty(Para.GroupBy) && Para.GroupBy == "bysection")
            {
                rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/ExecusesReportBySection.rpt"));
            }
            else
            {
                rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/ExecusesReport.rpt"));
            }

            rd.Database.Tables["spGetOrganization;1"].SetDataSource(dataForCompany.Result.ToDataSet().Tables[0]);
            rd.Database.Tables["spsearchExecuse;1"].SetDataSource(dataForExcuses.Result.ToDataSet().Tables[0]);
            rd.ParameterFields["daterange"].CurrentValues.Clear();
            rd.SetParameterValue("daterange", string.Format(Resources.Resources.FromDateLable + " {0} " + Resources.Resources.ToDateLable + " {1} ", Para.FromDate.GetDateFromNumber().ToString("dd/MM/yyyy", Culture), Para.ToDate.GetDateFromNumber().ToString("dd/MM/yyyy", Culture)));
            rd.ParameterFields["UserName"].CurrentValues.Clear();
            rd.SetParameterValue("UserName", User.UserName);
            return rd;
        }
        [CustomAuthorizeMVC(GroupNo = "8", PermissionName = "rep-exc")]
        [Route("PrintReport/{fileType?}")]
        [HttpPost]
        public ActionResult PrintReport(string fileType, [System.Web.Http.FromBody] FormParameters Para)
        {
            try
            {
                var cult = CultureHelper.GetCurrentCulture();
                CultureInfo Culture = new CultureInfo(cult);
                Culture.DateTimeFormat.Calendar = new GregorianCalendar();
                ReportDocument rd = GetReportDocument(Para);
                return ReturnReport(fileType, rd, "Excuses_" + Para.FromDate.GetDateFromNumber().ToString("yyyyMMdd", Culture) + "_" + Para.ToDate.GetDateFromNumber().ToString("yyyyMMdd", Culture));
            }
            catch (Exception ex)
            {
                return RedirectToAction("Error", "Home");
            }
        }

       
    }
}