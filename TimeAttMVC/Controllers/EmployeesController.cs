using CrystalDecisions.CrystalReports.Engine;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TimeAtt.Models;
using TimeAtt.Security;
using TimeAttMVC.Helpper;
using TimeAtt;
namespace TimeAttMVC.Controllers
{
     [RoutePrefix("Employees")]
     [CustomAuthorizeMVC(GroupNo = "3", PermissionName = "emp-view")]
    public class EmployeesController : BaseController
    {
        // GET: Employees
        public ActionResult Index()
        {
            return View();
        }
        private ReportDocument GetReportDocument(FormParameters Para)
        {
            var cult = CultureHelper.GetCurrentCulture();
            var RESTServiceForEmployees = new RESTService<ResponseResult<IEnumerable<EmployeeInfo>>>(WebApiUrl + "Employees/GetReport");
            var RESTServiceForCompany = new RESTService<ResponseResult<IEnumerable<CompanyInfo>>>(WebApiUrl + "Company/GetWithLogo");
            var dataForEmployees = RESTServiceForEmployees.Post(Para);
            var dataForCompany = RESTServiceForCompany.Get();
            ReportDocument rd = new ReportDocument();
            if (!string.IsNullOrEmpty(Para.GroupBy) && Para.GroupBy == "bybranch")
            {
                rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/EmployeesReportByBranch.rpt"));
            }
            else if (!string.IsNullOrEmpty(Para.GroupBy) && Para.GroupBy == "bysection")
            {
                rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/EmployeesReportBySection.rpt"));
            }
            else
            {
                rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/EmployeesReport.rpt"));
            }
           
            rd.Database.Tables["spGetOrganization;1"].SetDataSource(dataForCompany.Result.ToDataSet().Tables[0]);
            rd.Database.Tables["Report_tb_Employee;1"].SetDataSource(dataForEmployees.Result.ToDataSet().Tables[0]);
            rd.ParameterFields["UserName"].CurrentValues.Clear();
            rd.SetParameterValue("UserName", User.UserName);
            return rd;
        }
        [CustomAuthorizeMVC(GroupNo = "8", PermissionName = "rep-emp")]
        [Route("PrintReport/{fileType?}")]
        [HttpPost]
        public ActionResult PrintReport(string fileType,[System.Web.Http.FromBody] FormParameters Para)
        {
            try
            {
                ReportDocument rd = GetReportDocument(Para);
                return ReturnReport(fileType, rd, "Employees");
            }
            catch (Exception ex)
            {
                return RedirectToAction("Error", "Home", new { errorMsg = ex.ToString() });
            }
        }

    }
}