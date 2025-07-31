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
    [RoutePrefix("Sections")]
    [CustomAuthorizeMVC(GroupNo = "1", PermissionName = "sec-view")]
    public class SectionsController : BaseController
    {
        // GET: Sections
        public ActionResult Index()
        {
            //SectionsRepository _sections = new SectionsRepository();
            return View();
        }
        private ReportDocument GetReportDocument()
        {
           
            var cult = CultureHelper.GetCurrentCulture();
            var RESTServiceForSection = new RESTService<ResponseResult<IEnumerable<SectionsInfo>>>(WebApiUrl + "Sections/GetReport");
            var RESTServiceForCompany = new RESTService<ResponseResult<IEnumerable<CompanyInfo>>>(WebApiUrl + "Company/GetWithLogo");
            var dataForSection = RESTServiceForSection.Get();
            var dataForCompany = RESTServiceForCompany.Get();
            ReportDocument rd = new ReportDocument();
            rd.Load(Server.MapPath("~/Reports/" + (cult == "ar" ? "AR" : "EN") + "/DepartmentsReport.rpt"));
            rd.Database.Tables["spGetOrganization;1"].SetDataSource(dataForCompany.Result.ToDataSet().Tables[0]);
            rd.Database.Tables["Report_tb_Section_Tree;1"].SetDataSource(dataForSection.Result.ToDataSet().Tables[0]);
            rd.ParameterFields["UserName"].CurrentValues.Clear();
            rd.SetParameterValue("UserName", User.UserName);
            return rd;
        }
        [CustomAuthorizeMVC(GroupNo = "8", PermissionName = "rep-sec")]
        [Route("PrintReport/{fileType?}")]
        [HttpPost]
        public ActionResult PrintReport(string fileType)
        {
            try
            {
                ReportDocument rd = GetReportDocument();
                return ReturnReport(fileType, rd,"Sections");
            }
            catch (Exception ex)
            {
                return RedirectToAction("Error", "Home",new{errorMsg=ex.ToString()});
            }
        }


    }
}