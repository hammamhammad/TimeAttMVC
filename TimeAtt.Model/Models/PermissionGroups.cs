namespace TimeAtt.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    [Table("tb_PermissionGroups")]
    public partial class PermissionGroups
    {
        [Key]
        public int GroupID { get; set; }
        public string GroupName { get; set; }

        public string Permissions { get; set; }
      
    }

    public partial class Permissions
       

    {
        public int ModuleID { get; set; }
        public int PrivilegeID { get; set; }
        public string PrivilegeName { get; set; }
        public string Name_AR { get; set; }	
        public string Name_EN { get; set; }	 
        public int? GroupID { get; set; }	 
        public bool? IsOK { get; set; }

      
    }

    public partial class PermissionModules
    {
        public int ModuleID { get; set; }
        public string ModuleName_AR { get; set; }
        public string ModuleName_EN { get; set; }
    }

}
