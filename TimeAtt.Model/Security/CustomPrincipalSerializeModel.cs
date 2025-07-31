using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TimeAtt.Security
{
    public class CustomPrincipalSerializeModel
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public short? UserPer { get; set; }
        public int? UserEmpID { get; set; }
        public long? reg_id { get; set; }
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
    }
}