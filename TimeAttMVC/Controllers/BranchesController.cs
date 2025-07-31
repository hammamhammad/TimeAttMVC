using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TimeAtt.Models;
using TimeAtt.Security;

namespace TimeAttMVC.Controllers
{
     [CustomAuthorizeMVC(GroupNo = "20", PermissionName = "reg-view")]
    public class BranchesController : BaseController
    {
        // GET: Branches
        public ActionResult Index()
        {
            return View();
        }
    }
}