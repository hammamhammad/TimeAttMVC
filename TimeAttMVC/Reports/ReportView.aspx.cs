using CrystalDecisions.CrystalReports.Engine;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TimeAtt;
using TimeAtt.Model;
using TimeAtt.Models;

namespace TimeAttMVC.Reports
{
    public partial class ReportView : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
           
            
            
        }
        protected void Page_Init(object sender, EventArgs e)
        {
            DisplayReport();
        }

        private void DisplayReport()
        {
            try
            {
                if (Request.IsAuthenticated && HttpContext.Current.User != null)
                {
                    if (!IsPostBack)
                    {
                        ReportDocument cryRpt = new ReportDocument();

                        IEnumerable<CompanyInfo> Company = null;
                        IEnumerable<SectionsInfo> Section = null;
                        using (SectionsRepository SectionContext = new SectionsRepository())
                        {
                            Section = SectionContext.GetAllAsTree();
                        }
                        using (CompanyRepository CompanyContext = new CompanyRepository())
                        {
                            Company = CompanyContext.GetAll();
                        }
                        var ds = Section.ToDataSet();
                        cryRpt.Load(Server.MapPath("~/Reports/DepartmentsReport.rpt"));
                        //System.Data.SqlClient.SqlConnectionStringBuilder SConn = new System.Data.SqlClient.SqlConnectionStringBuilder((ConfigurationManager.ConnectionStrings["TimeAttConnectionString"].ConnectionString));
                        // cryRpt.SetDatabaseLogon(SConn.UserID, SConn.Password, SConn.DataSource, SConn.InitialCatalog);
                        cryRpt.Database.Tables["spGetOrganization;1"].SetDataSource(Company);
                        cryRpt.Database.Tables["Report_tb_Section_Tree;1"].SetDataSource(ds.Tables[0]);
                        cryRpt.ParameterFields["UserName"].CurrentValues.Clear();
                        cryRpt.SetParameterValue("UserName", HttpContext.Current.User.Identity.Name);
                        CrystalReportViewer1.ReportSource = cryRpt;
                        Session["ReportDocument"] = cryRpt;
                    }
                    else
                    {

                        ReportDocument doc = (ReportDocument)Session["ReportDocument"];
                        CrystalReportViewer1.ReportSource = doc;
                    }

                }
                else
                {
                    var page = HttpContext.Current.Handler as Page;
                    Response.Redirect("~/Account/NotAuthorized", true);


                }
            }
            catch (Exception)
            {
                
               // throw;
            }
            

        }
    }
}