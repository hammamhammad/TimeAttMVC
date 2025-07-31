namespace TimeAtt.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Security.Principal;
   [Table("tb_users")]
    public partial class UserInfo
    {
        [Key]
        public int user_id { get; set; }

        [StringLength(150)]
        [Display(Name="User Name")]
        [Required(ErrorMessage="User Name is requierd")]
        public string user_name { get; set; }

        [StringLength(50)]
        [Display(Name = "Password")]
        [Required(ErrorMessage = "Password is requierd")]
        [DataType(DataType.Password)]
        public string user_pass { get; set; }

        public short? user_per { get; set; }

        public int? user_empid { get; set; }

        public bool? user_active { get; set; }

        [StringLength(150)]
        public string user_email { get; set; }

        public bool? user_permchange { get; set; }

        public bool? user_mustchangepassword { get; set; }
        public string EmpName { get; set; }
        public string EmpNameEN { get; set; }
        public string EmpNO { get; set; }
        public int? user_Group { get; set; }
        public long? reg_id { get; set; }
        public string GroupName { get; set; }
        public string UserBranches { get; set; }
        public string NewPassword { get; set; }
        public string PolicyURLAR { get; set; }
        public string PolicyURLEN { get; set; }
        public string HeaderIMGURL { get; set; }
        public string TimeAttPolicyURLAR { get; set; }
        public string TimeAttPolicyURLEN { get; set; }

    }
}
