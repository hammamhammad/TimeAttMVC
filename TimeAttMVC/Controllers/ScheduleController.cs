using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TimeAtt.Security;

namespace TimeAttMVC.Controllers
{
    [CustomAuthorizeMVC(GroupNo = "2", PermissionName = "sch-view")]
    public class ScheduleController : BaseController
    {
        // GET: Schedule
        public ActionResult Index()
        {
            return View();
        }
    }
}