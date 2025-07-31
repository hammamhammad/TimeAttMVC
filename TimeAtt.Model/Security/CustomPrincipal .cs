using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;
using TimeAtt.Models;

namespace TimeAtt.Security
{
    public class CustomPrincipal : IPrincipal
    {
        public IIdentity Identity { get; private set; }

        public bool IsInRole(string role)
        {
            //if (roles.Any(r => role.Contains(r)))
            //{
            //    return true;
            //}
            //else
            //{
            //    return false;
            //}
            return true;
        }

        public CustomPrincipal(string Username)
        {

            this.Identity = new GenericIdentity(Username);
        }

        public int UserId { get; set; }
        public string UserName { get; set; }
        public short? UserPer { get; set; }
        public int? UserEmpID { get; set; }
        public bool? IsActive { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeeNameEN { get; set; }
        public string PolicyURLAR { get; set; }
        public string PolicyURLEN { get; set; }
        public string TimeAttPolicyURLAR { get; set; }
        public string TimeAttPolicyURLEN { get; set; }
        public string HeaderIMGURL { get; set; }
        public string EmployeeNumber { get; set; }
        public DateTime Created { get; set; }
        public string AuthType { get; set; }
        public bool? MustChangePassword { get; set; }
        public long? reg_id { get; set; }
    }
}