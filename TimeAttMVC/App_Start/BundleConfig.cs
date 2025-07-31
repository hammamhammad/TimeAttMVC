using System.Web;
using System.Web.Optimization;

namespace TimeAttMVC
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));
            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                       "~/Scripts/jquery-ui-{version}.js"));
            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));
            bundles.Add(new ScriptBundle("~/bundles/jquerycookie").Include(
                        "~/Scripts/jquery.cookie.js"));


            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/DataTable").Include("~/Scripts/DataTables/datatables.all.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/timeattcommon").Include("~/Scripts/validator.min.js", "~/Scripts/bootstrap-toggle.min.js"
                    , "~/Scripts/notify.js", "~/Scripts/jquery.easing.min.js", "~/Scripts/jquery-confirm.js", "~/Scripts/bootstrap-datepicker.js",
                    "~/Scripts/bootstrap-datepicker.ar.js", "~/Scripts/jquery.blockUI.js", "~/Scripts/TimeAtt/TimeAttCommon.js"));

            bundles.Add(new ScriptBundle("~/bundles/timeattsections").Include("~/Scripts/tree.jquery.js", "~/Scripts/TimeAtt/TimeAttSections.js"));

            bundles.Add(new ScriptBundle("~/bundles/timeattschedules").Include("~/Scripts/jquery.timepicker.min.js", "~/Scripts/TimeAtt/TimeAttSchedules.js"));
            bundles.Add(new ScriptBundle("~/bundles/chart").Include("~/Scripts/Chart.js"));
            bundles.Add(new ScriptBundle("~/bundles/timeattbranches").Include("~/Scripts/TimeAtt/TimeAttBranches.js"));
            bundles.Add(new ScriptBundle("~/bundles/timeattvacations").Include("~/Scripts/TimeAtt/TimeAttVacations.js"));
            bundles.Add(new ScriptBundle("~/bundles/timeattexcuses").Include("~/Scripts/jquery.timepicker.min.js", "~/Scripts/TimeAtt/TimeAttExcuses.js"));
            bundles.Add(new ScriptBundle("~/bundles/timeatttimesheet").Include("~/Scripts/jquery.timepicker.min.js", "~/Scripts/TimeAtt/TimeAttTimeSheet.js", "~/Scripts/TimeAtt/TimeAttTransaction.js"));
            bundles.Add(new ScriptBundle("~/bundles/timeattemployees").Include("~/Scripts/tree.jquery.js", "~/Scripts/TimeAtt/TimeAttEmployees.js", "~/Scripts/TimeAtt/TimeAttTransaction.js"));
            bundles.Add(new ScriptBundle("~/bundles/timeattusers").Include("~/Scripts/tree.jquery.js", "~/Scripts/TimeAtt/TimeAttUsers.js"));
            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));
            bundles.Add(new ScriptBundle("~/bundles/bootstrap-rtl").Include(
                 "~/Scripts/bootstrap-rtl.js",
                 "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/plugincss").Include(
                     "~/Content/jqtree.css", "~/Content/bootstrap-toggle.min.css", "~/Content/notify-flat.css", "~/Content/normalize.css", "~/Content/themes/base/minified/jquery-ui.min.css", "~/Content/font-awesome.min.css", "~/Content/jquery-confirm.css", "~/Content/jquery.timepicker.css", "~/Content/bootstrap-datepicker.css",
                     "~/Content/themes/base/all.css", "~/Content/bs_modal_transition.css"));

            bundles.Add(new StyleBundle("~/Content/DataTablecss").Include("~/Content/DataTables/css/datatables.all.min.css"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                    "~/Content/bootstrap.css", "~/Content/bootstrap-theme.min.css",
                    "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/css-rtl").Include(
                      "~/Content/bootstrap-rtl.css",
                      "~/Content/site.css", "~/Content/bootstrap-theme.min.css", "~/Content/bootstrap-fliprtl.css"));
            bundles.Add(new ScriptBundle("~/bundles/Localization").Include("~/Scripts/TimeAtt/Localization.js", "~/Scripts/js-cookie.js"));


        }
    }
}
