using CrystalDecisions.CrystalReports.Engine;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TimeAtt;
using TimeAtt.Model.Models;
using TimeAtt.Models;
using TimeAttMVC.Helpper;

namespace TimeAttMVC.Controllers
{
    [RoutePrefix("SelfServices")]
    public class SelfServicesController : BaseController
    {
        public SelfServicesController()
        {
        }

        // GET: SelfServices
        public ActionResult Index()
        {
            return View();
        }

        [Route("Daily/PrintReport/{fileType?}")]
        public ActionResult DailyPrintReport(string fileType, [System.Web.Http.FromBody] FormParameters Para)
        {
            try
            {
                var cult = CultureHelper.GetCurrentCulture();
                CultureInfo Culture = new CultureInfo(cult);
                Culture.DateTimeFormat.Calendar = new GregorianCalendar();
                ReportDocument rd = GetDailyReportDocument(Para);
                return ReturnReport(fileType, rd, "Daily_" + Para.FromDate.GetDateFromNumber().ToString("yyyyMMdd", Culture) + "_" + Para.ToDate.GetDateFromNumber().ToString("yyyyMMdd", Culture));
            }
            catch (Exception ex)
            {
                return RedirectToAction("Error", "Home", new { errorMsg = ex.ToString() });
            }
        }

        [Route("Monthly/PrintReport/{fileType?}")]
        public ActionResult MonthlyPrintReport(string fileType, [System.Web.Http.FromBody] FormParameters Para)
        {
            try
            {
                var cult = CultureHelper.GetCurrentCulture();
                CultureInfo Culture = new CultureInfo(cult);
                Culture.DateTimeFormat.Calendar = new GregorianCalendar();
                ReportDocument rd = GetMonthlyReportDocument(Para);
                return ReturnReport(fileType, rd, "Monthly_" + Para.FromDate.GetDateFromNumber().ToString("yyyyMMdd", Culture) + "_" + Para.ToDate.GetDateFromNumber().ToString("yyyyMMdd", Culture));
            }
            catch (Exception ex)
            {
                return RedirectToAction("Error", "Home", new { errorMsg = ex.ToString() });
            }
        }

        [Route("Monthly/Details/PrintReport/{fileType?}")]
        public ActionResult MonthlyDetailsPrintReport(string fileType, [System.Web.Http.FromBody] FormParameters Para)
        {
            try
            {
                var cult = CultureHelper.GetCurrentCulture();
                CultureInfo Culture = new CultureInfo(cult);
                Culture.DateTimeFormat.Calendar = new GregorianCalendar();
                ReportDocument rd = GetMonthlyDetailsReportDocument(Para);
                return ReturnReport(fileType, rd, "MonthlyDetails_" + Para.FromDate.GetDateFromNumber().ToString("yyyyMMdd", Culture) + "_" + Para.ToDate.GetDateFromNumber().ToString("yyyyMMdd", Culture));
            }
            catch (Exception ex)
            {
                return RedirectToAction("Error", "Home", new { errorMsg = ex.ToString() });
            }
        }

        [Route("Transactions/PrintReport/{fileType?}")]
        public ActionResult TransactionsPrintReport(string fileType, [System.Web.Http.FromBody] FormParameters Para)
        {
            try
            {
                var cult = CultureHelper.GetCurrentCulture();
                CultureInfo Culture = new CultureInfo(cult);
                Culture.DateTimeFormat.Calendar = new GregorianCalendar();
                ReportDocument rd = GetTransactionsReportDocument(Para);
                return ReturnReport(fileType, rd, "Transactions_" + Para.FromDate.GetDateFromNumber().ToString("yyyyMMdd", Culture) + "_" + Para.ToDate.GetDateFromNumber().ToString("yyyyMMdd", Culture));
            }
            catch (Exception ex)
            {
                return RedirectToAction("Error", "Home", new { errorMsg = ex.ToString() });
            }
        }

        private ReportDocument GetDailyReportDocument(FormParameters Para)
        {
            var cult = CultureHelper.GetCurrentCulture();
            CultureInfo Culture = new CultureInfo(cult);
            Culture.DateTimeFormat.Calendar = new GregorianCalendar();

            var RESTServiceForDaily = new RESTService<ResponseResult<IEnumerable<DailyTimeSheet>>>(WebApiUrl + "SelfServices/TimeSheet/GetDailyTimeSheetForManager/" + Para.FromDate + "/" + Para.ToDate + "/" + (Para.Emp_ID == 0 ? -1 : Para.Emp_ID));
            var RESTServiceForCompany = new RESTService<ResponseResult<IEnumerable<CompanyInfo>>>(WebApiUrl + "Company/GetWithLogo");
            var dataForDaily = RESTServiceForDaily.Get();
            var dataForCompany = RESTServiceForCompany.Get();
            ReportDocument rd = new ReportDocument();
            //if (!string.IsNullOrEmpty(Para.GroupBy) && Para.GroupBy == "bybranch")
            //{
            //    rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/DailyTimeSheetReportByBranch.rpt"));
            //}
            //else if (!string.IsNullOrEmpty(Para.GroupBy) && Para.GroupBy == "bysection")
            //{
                rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/DailyTimeSheetReportBySection.rpt"));
            //}
            //else
            //{
            //    rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/DailyTimeSheetReport.rpt"));
            //}

            rd.Database.Tables["spGetOrganization;1"].SetDataSource(dataForCompany.Result.ToDataSet().Tables[0]);
            rd.Database.Tables["Repotr_DailyTimeSheet_WithOutPaging;1"].SetDataSource(dataForDaily.Result.ToDataSet().Tables[0]);
            rd.ParameterFields["daterange"].CurrentValues.Clear();
            rd.SetParameterValue("daterange", string.Format(Resources.Resources.FromDateLable + " {0} " + Resources.Resources.ToDateLable + " {1} ", Para.FromDate.GetDateFromNumber().ToString("dd/MM/yyyy", Culture), Para.ToDate.GetDateFromNumber().ToString("dd/MM/yyyy", Culture)));
            rd.ParameterFields["UserName"].CurrentValues.Clear();
            rd.SetParameterValue("UserName", User.UserName);
            return rd;
        }
        private ReportDocument GetMonthlyReportDocument(FormParameters Para)
        {
            var cult = CultureHelper.GetCurrentCulture();
            CultureInfo Culture = new CultureInfo(cult);
            Culture.DateTimeFormat.Calendar = new GregorianCalendar();

            var RESTServiceForMonthly = new RESTService<ResponseResult<IEnumerable<MonthlyTimeSheet>>>(WebApiUrl + "SelfServices/TimeSheet/GetTimeSheetMonthlyDetailsForManagerEX/-1/" + Para.FromDate + "/" + Para.ToDate);
            var RESTServiceForCompany = new RESTService<ResponseResult<IEnumerable<CompanyInfo>>>(WebApiUrl + "Company/GetWithLogo");
            var dataForMonthly = RESTServiceForMonthly.Get();
            var dataForCompany = RESTServiceForCompany.Get();
            ReportDocument rd = new ReportDocument();
            //if (!string.IsNullOrEmpty(Para.GroupBy) && Para.GroupBy == "bybranch")
            //{
            //    rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/MonthlyTimeSheetReportByBranch.rpt"));
            //}
            //else if (!string.IsNullOrEmpty(Para.GroupBy) && Para.GroupBy == "bysection")
            //{
                rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/MonthlyTimeSheetReportBySection.rpt"));
            //}
            //else
            //{
            //    rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/MonthlyTimeSheetReport.rpt"));
            //}

            rd.Database.Tables["spGetOrganization;1"].SetDataSource(dataForCompany.Result.ToDataSet().Tables[0]);
            rd.Database.Tables["Report_GetTimeSheetSummry_WithOutPaging;1"].SetDataSource(dataForMonthly.Result.ToDataSet().Tables[0]);
            rd.ParameterFields["daterange"].CurrentValues.Clear();
            rd.SetParameterValue("daterange", string.Format(Resources.Resources.FromDateLable + " {0} " + Resources.Resources.ToDateLable + " {1} ", Para.FromDate.GetDateFromNumber().ToString("dd/MM/yyyy", Culture), Para.ToDate.GetDateFromNumber().ToString("dd/MM/yyyy", Culture)));
            rd.ParameterFields["UserName"].CurrentValues.Clear();
            rd.SetParameterValue("UserName", User.UserName);
            return rd;
        }
        private ReportDocument GetMonthlyDetailsReportDocument(FormParameters Para)
        {
            var cult = CultureHelper.GetCurrentCulture();
            CultureInfo Culture = new CultureInfo(cult);
            Culture.DateTimeFormat.Calendar = new GregorianCalendar();

            var RESTServiceForMonthly = new RESTService<ResponseResult<MonthlyDailyTimeSheet>>(WebApiUrl + "SelfServices/TimeSheet/GetMonthDetails");
            var RESTServiceForCompany = new RESTService<ResponseResult<IEnumerable<CompanyInfo>>>(WebApiUrl + "Company/GetWithLogo");
            var dataForMonthly = RESTServiceForMonthly.Post(Para);
            var dataForCompany = RESTServiceForCompany.Get();
            ReportDocument rd = new ReportDocument();
            rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/MonthlyDetailsTimeSheetReportSS.rpt"));
            rd.Database.Tables["spGetOrganization;1"].SetDataSource(dataForCompany.Result.ToDataSet().Tables[0]);
            rd.Database.Tables["Report_GetTimeSheetSummry_WithOutPaging;1"].SetDataSource(dataForMonthly.Result.Summary.ToDataSet().Tables[0]);
            rd.Database.Tables["Repotr_DailyTimeSheet_WithOutPaging;1"].SetDataSource(dataForMonthly.Result.Details.ToDataSet().Tables[0]);
            rd.ParameterFields["daterange"].CurrentValues.Clear();
            rd.SetParameterValue("daterange", string.Format(Resources.Resources.FromDateLable + " {0} " + Resources.Resources.ToDateLable + " {1} ", Para.FromDate.GetDateFromNumber().ToString("dd/MM/yyyy", Culture), Para.ToDate.GetDateFromNumber().ToString("dd/MM/yyyy", Culture)));
            rd.ParameterFields["UserName"].CurrentValues.Clear();
            rd.SetParameterValue("UserName", User.UserName);
            return rd;
        }
        private ReportDocument GetTransactionsReportDocument(FormParameters Para)
        {
            var cult = CultureHelper.GetCurrentCulture();
            CultureInfo Culture = new CultureInfo(cult);
            Culture.DateTimeFormat.Calendar = new GregorianCalendar();

            var RESTServiceForTransactions = new RESTService<ResponseResult<IEnumerable<Transactions>>>(WebApiUrl + "TimeSheet/Transactions/GetTransactions");
            var RESTServiceForCompany = new RESTService<ResponseResult<IEnumerable<CompanyInfo>>>(WebApiUrl + "Company/GetWithLogo");
            var dataForTransactions = RESTServiceForTransactions.Post(Para);
            var dataForCompany = RESTServiceForCompany.Get();
            ReportDocument rd = new ReportDocument();
            if (!string.IsNullOrEmpty(Para.GroupBy) && Para.GroupBy == "bybranch")
            {
                rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/TransactionsReportByBranch.rpt"));
            }
            else if (!string.IsNullOrEmpty(Para.GroupBy) && Para.GroupBy == "bysection")
            {
                rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/TransactionsReportBySection.rpt"));
            }
            else
            {
                rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/TransactionsReport.rpt"));
            }

            rd.Database.Tables["spGetOrganization;1"].SetDataSource(dataForCompany.Result.ToDataSet().Tables[0]);
            rd.Database.Tables["TimeAtt_GetTransDetails_WithoutPaging;1"].SetDataSource(dataForTransactions.Result.ToDataSet().Tables[0]);
            rd.ParameterFields["daterange"].CurrentValues.Clear();
            rd.SetParameterValue("daterange", string.Format(Resources.Resources.FromDateLable + " {0} " + Resources.Resources.ToDateLable + " {1} ", Para.FromDate.GetDateFromNumber().ToString("dd/MM/yyyy", Culture), Para.ToDate.GetDateFromNumber().ToString("dd/MM/yyyy", Culture)));
            rd.ParameterFields["UserName"].CurrentValues.Clear();
            rd.SetParameterValue("UserName", User.UserName);
            return rd;
        }
    }
}