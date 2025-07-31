using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TimeAtt.Security;

namespace TimeAttMVC.Controllers
{
     [CustomAuthorizeMVC(GroupNo = "0", PermissionName = "Admin")]
    public class UsersController : BaseController
    {
        // GET: Users
        public ActionResult Index()
        {
            return View();
        }
    }
}