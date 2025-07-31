using CrystalDecisions.CrystalReports.Engine;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Web.Mvc;
using TimeAtt;
using TimeAtt.Model.Models;
using TimeAtt.Models;
using TimeAtt.Security;
using TimeAttMVC.Helpper;

namespace TimeAttMVC.Controllers
{
    [RoutePrefix("TimeSheet")]
    [CustomAuthorizeMVC(GroupNo = "4", PermissionName = "timesheet-view")]
    public class TimeSheetController : BaseController
    {
        // GET: TimeSheet
        public ActionResult Index()
        {
            return View();
        }
        private ReportDocument GetDailyReportDocument(FormParameters Para)
        {
            var cult = CultureHelper.GetCurrentCulture();
            CultureInfo Culture = new CultureInfo(cult);
            Culture.DateTimeFormat.Calendar = new GregorianCalendar(); 

            var RESTServiceForDaily = new RESTService<ResponseResult<IEnumerable<DailyTimeSheet>>>(WebApiUrl + "TimeSheet/Daily/GetDailyTimeSheet");
            var RESTServiceForCompany = new RESTService<ResponseResult<IEnumerable<CompanyInfo>>>(WebApiUrl + "Company/GetWithLogo");
            var dataForDaily = RESTServiceForDaily.Post(Para);
            var dataForCompany = RESTServiceForCompany.Get();
            ReportDocument rd = new ReportDocument();
            if (!string.IsNullOrEmpty(Para.GroupBy) && Para.GroupBy == "bybranch")
            {
                rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/DailyTimeSheetReportByBranch.rpt"));
            }
            else if (!string.IsNullOrEmpty(Para.GroupBy) && Para.GroupBy == "bysection")
            {
                rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/DailyTimeSheetReportBySection.rpt"));
            }
            else
            {
                rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/DailyTimeSheetReport.rpt"));
            }
            
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

            var RESTServiceForMonthly = new RESTService<ResponseResult<IEnumerable<MonthlyTimeSheet>>>(WebApiUrl + "TimeSheet/Monthly/GetMonthlyTimeSheet");
            var RESTServiceForCompany = new RESTService<ResponseResult<IEnumerable<CompanyInfo>>>(WebApiUrl + "Company/GetWithLogo");
            var dataForMonthly = RESTServiceForMonthly.Post(Para);
            var dataForCompany = RESTServiceForCompany.Get();
            ReportDocument rd = new ReportDocument();
            if (!string.IsNullOrEmpty(Para.GroupBy) && Para.GroupBy == "bybranch")
            {
                rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/MonthlyTimeSheetReportByBranch.rpt"));
            }
            else if (!string.IsNullOrEmpty(Para.GroupBy) && Para.GroupBy == "bysection")
            {
                rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/MonthlyTimeSheetReportBySection.rpt"));
            }
            else
            {
                rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/MonthlyTimeSheetReport.rpt"));
            }

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

            var RESTServiceForMonthly = new RESTService<ResponseResult<MonthlyDailyTimeSheet>>(WebApiUrl + "TimeSheet/Monthly/GetDetails");
            var RESTServiceForCompany = new RESTService<ResponseResult<IEnumerable<CompanyInfo>>>(WebApiUrl + "Company/GetWithLogo");
            var dataForMonthly = RESTServiceForMonthly.Post(Para);
            var dataForCompany = RESTServiceForCompany.Get();
            ReportDocument rd = new ReportDocument();
            rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/MonthlyDetailsTimeSheetReport.rpt"));
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
        private ReportDocument GetVaiolatioReportDocument(FormParameters Para)
        {
            var cult = CultureHelper.GetCurrentCulture();
            CultureInfo Culture = new CultureInfo(cult);
            Culture.DateTimeFormat.Calendar = new GregorianCalendar();

            var RESTServiceForDaily = new RESTService<ResponseResult<IEnumerable<Violations>>>(WebApiUrl + "TimeSheet/Violations/GetViolations");
            var RESTServiceForCompany = new RESTService<ResponseResult<IEnumerable<CompanyInfo>>>(WebApiUrl + "Company/GetWithLogo");
            var dataForDaily = RESTServiceForDaily.Post(Para);
            var dataForCompany = RESTServiceForCompany.Get();
            ReportDocument rd = new ReportDocument();
            if (!string.IsNullOrEmpty(Para.GroupBy) && Para.GroupBy == "bybranch")
            {
                rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/ViolationReportByBranch.rpt"));
            }
            else if (!string.IsNullOrEmpty(Para.GroupBy) && Para.GroupBy == "bysection")
            {
                rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/ViolationReportBySection.rpt"));
            }
            else
            {
                rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/ViolationReport.rpt"));
            }

            rd.Database.Tables["spGetOrganization;1"].SetDataSource(dataForCompany.Result.ToDataSet().Tables[0]);
            rd.Database.Tables["Report_GetViolationsByMonthandCompany_SP;1"].SetDataSource(dataForDaily.Result.ToDataSet().Tables[0]);
            rd.ParameterFields["daterange"].CurrentValues.Clear();
            var firstDayOfMonth = new DateTime(Para.Year.Value, Para.Month.Value, 1);
            var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);
            rd.SetParameterValue("daterange", string.Format(Resources.Resources.FromDateLable + " {0} " + Resources.Resources.ToDateLable + " {1} ", firstDayOfMonth.ToString("dd/MM/yyyy", Culture), lastDayOfMonth.ToString("dd/MM/yyyy", Culture)));
            rd.ParameterFields["UserName"].CurrentValues.Clear();
            rd.SetParameterValue("UserName", User.UserName);
            return rd;
        }
        private ReportDocument GetExemptionsReportDocument(FormParameters Para)
        {
            var cult = CultureHelper.GetCurrentCulture();
            CultureInfo Culture = new CultureInfo(cult);
            Culture.DateTimeFormat.Calendar = new GregorianCalendar();

            var RESTServiceForExemptions = new RESTService<ResponseResult<IEnumerable<ExemptionsTimeSheet>>>(WebApiUrl + "TimeSheet/Exemptions/GetAllFiltered");
            var RESTServiceForCompany = new RESTService<ResponseResult<IEnumerable<CompanyInfo>>>(WebApiUrl + "Company/GetWithLogo");
            var dataForExemptions = RESTServiceForExemptions.Post(Para);
            var dataForCompany = RESTServiceForCompany.Get();
            ReportDocument rd = new ReportDocument();
            if (!string.IsNullOrEmpty(Para.GroupBy) && Para.GroupBy == "bybranch")
            {
                rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/ExemptionsReportByBranch.rpt"));
            }
            else if (!string.IsNullOrEmpty(Para.GroupBy) && Para.GroupBy == "bysection")
            {
                rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/ExemptionsReportBySection.rpt"));
            }
            else
            {
                rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/ExemptionsReport.rpt"));
            }

            rd.Database.Tables["spGetOrganization;1"].SetDataSource(dataForCompany.Result.ToDataSet().Tables[0]);
            rd.Database.Tables["Report_GetExemptionsTimeSheet;1"].SetDataSource(dataForExemptions.Result.ToDataSet().Tables[0]);
            //rd.ParameterFields["daterange"].CurrentValues.Clear();
            //rd.SetParameterValue("daterange", string.Format(Resources.Resources.FromDateLable + " {0} " + Resources.Resources.ToDateLable + " {1} ", Para.FromDate.GetDateFromNumber().ToString("dd/MM/yyyy", Culture), Para.ToDate.GetDateFromNumber().ToString("dd/MM/yyyy", Culture)));
            rd.ParameterFields["UserName"].CurrentValues.Clear();
            rd.SetParameterValue("UserName", User.UserName);
            return rd;
        }
        private ReportDocument GetFingerPrintReportDocument(FormParameters Para)
        {
            var cult = CultureHelper.GetCurrentCulture();
            CultureInfo Culture = new CultureInfo(cult);
            Culture.DateTimeFormat.Calendar = new GregorianCalendar();

            var RESTServiceForDaily = new RESTService<ResponseResult<IEnumerable<TransInfo>>>(WebApiUrl + "TimeSheet/GetAllFingerPrint");
            var RESTServiceForCompany = new RESTService<ResponseResult<IEnumerable<CompanyInfo>>>(WebApiUrl + "Company/GetWithLogo");
            var dataForDaily = RESTServiceForDaily.Post(Para);
            var dataForCompany = RESTServiceForCompany.Get();
            ReportDocument rd = new ReportDocument();
            if (!string.IsNullOrEmpty(Para.GroupBy) && Para.GroupBy == "bybranch")
            {
                rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/FingerPrintReportByBranch.rpt"));
            }
            else if (!string.IsNullOrEmpty(Para.GroupBy) && Para.GroupBy == "bysection")
            {
                rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/FingerPrintReportBySection.rpt"));
            }
            else
            {
                rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/FingerPrintReport.rpt"));
            }

            rd.Database.Tables["spGetOrganization;1"].SetDataSource(dataForCompany.Result.ToDataSet().Tables[0]);
            rd.Database.Tables["spsearchFingerPrint;1"].SetDataSource(dataForDaily.Result.ToDataSet().Tables[0]);
            rd.ParameterFields["daterange"].CurrentValues.Clear();
            //var firstDayOfMonth = new DateTime(Para.Year.Value, Para.Month.Value, 1);
            //var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);
            rd.SetParameterValue("daterange", string.Format(Resources.Resources.FromDateLable + " {0} " + Resources.Resources.ToDateLable + " {1} ", Para.FromDate.GetDateFromNumber().ToString("dd/MM/yyyy", Culture), Para.ToDate.GetDateFromNumber().ToString("dd/MM/yyyy", Culture)));
            rd.ParameterFields["UserName"].CurrentValues.Clear();
            rd.SetParameterValue("UserName", User.UserName);
            return rd;
        }

        [CustomAuthorizeMVC(GroupNo = "8", PermissionName = "rep-daly")]
        [Route("Daily/PrintReport/{fileType?}")]
        public ActionResult DailyPrintReport(string fileType, [System.Web.Http.FromBody] FormParameters Para)
        {
            try
            {
                var cult = CultureHelper.GetCurrentCulture();
                CultureInfo Culture = new CultureInfo(cult);
                Culture.DateTimeFormat.Calendar = new GregorianCalendar();
                ReportDocument rd = GetDailyReportDocument(Para);
                return ReturnReport(fileType, rd, "Daily_"+ Para.FromDate.GetDateFromNumber().ToString("yyyyMMdd",Culture) + "_" + Para.ToDate.GetDateFromNumber().ToString("yyyyMMdd",Culture) );
            }
            catch (Exception ex)
            {
                return RedirectToAction("Error", "Home", new { errorMsg = ex.ToString() });
            }
        }
        [CustomAuthorizeMVC(GroupNo = "8", PermissionName = "rep-monthly")]
        [Route("Monthly/PrintReport/{fileType?}")]
        public ActionResult MonthlyPrintReport(string fileType, [System.Web.Http.FromBody] FormParameters Para)
        {
            try
            {
                var cult = CultureHelper.GetCurrentCulture();
                CultureInfo Culture = new CultureInfo(cult);
                Culture.DateTimeFormat.Calendar = new GregorianCalendar();
                ReportDocument rd = GetMonthlyReportDocument(Para);
                return ReturnReport(fileType, rd, "Monthly_"+ Para.FromDate.GetDateFromNumber().ToString("yyyyMMdd",Culture) + "_" + Para.ToDate.GetDateFromNumber().ToString("yyyyMMdd",Culture) );
            }
            catch (Exception ex)
            {
                return RedirectToAction("Error", "Home", new { errorMsg = ex.ToString() });
            }
        }
        [CustomAuthorizeMVC(GroupNo = "8", PermissionName = "rep-monthly")]
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

        [CustomAuthorizeMVC(GroupNo = "8", PermissionName = "rep-trans")]
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

       // [CustomAuthorizeMVC(GroupNo = "4", PermissionName = "timesheet-penalty")]
        [Route("vaiolation/PrintReport/{fileType?}")]
        public ActionResult VaiolationPrintReport(string fileType, [System.Web.Http.FromBody] FormParameters Para)
        {
            try
            {
                var cult = CultureHelper.GetCurrentCulture();
                CultureInfo Culture = new CultureInfo(cult);
                Culture.DateTimeFormat.Calendar = new GregorianCalendar();
                ReportDocument rd = GetVaiolatioReportDocument(Para);
                return ReturnReport(fileType, rd, "Vaiolatio_" + Para.FromDate.GetDateFromNumber().ToString("yyyyMMdd", Culture) + "_" + Para.ToDate.GetDateFromNumber().ToString("yyyyMMdd", Culture));
            }
            catch (Exception ex)
            {
                return RedirectToAction("Error", "Home", new { errorMsg = ex.ToString() });
            }
        }

        [Route("FingerPrint/PrintReport/{fileType?}")]
        public ActionResult FingerPrintReport(string fileType, [System.Web.Http.FromBody] FormParameters Para)
        {
            try
            {
                var cult = CultureHelper.GetCurrentCulture();
                CultureInfo Culture = new CultureInfo(cult);
                Culture.DateTimeFormat.Calendar = new GregorianCalendar();
                ReportDocument rd = GetFingerPrintReportDocument(Para);
                return ReturnReport(fileType, rd, "FingerPrint_" + Para.FromDate.GetDateFromNumber().ToString("yyyyMMdd", Culture) + "_" + Para.ToDate.GetDateFromNumber().ToString("yyyyMMdd", Culture));
            }
            catch (Exception ex)
            {
                return RedirectToAction("Error", "Home", new { errorMsg = ex.ToString() });
            }
        }

        [CustomAuthorizeMVC(GroupNo = "4", PermissionName = "timesheet-exemptions")]
        [Route("Exemptions/PrintReport/{fileType?}")]
        public ActionResult ExemptionsPrintReport(string fileType, [System.Web.Http.FromBody] FormParameters Para)
        {
            try
            {
                var cult = CultureHelper.GetCurrentCulture();
                CultureInfo Culture = new CultureInfo(cult);
                Culture.DateTimeFormat.Calendar = new GregorianCalendar();
                ReportDocument rd = GetExemptionsReportDocument(Para);
                return ReturnReport(fileType, rd, "Exemptions_" + DateTime.Now.ToString("yyyyMMddHHmmss"));
            }
            catch (Exception ex)
            {
                return RedirectToAction("Error", "Home", new { errorMsg = ex.ToString() });
            }
        }
        //reprresent print button
    }
}