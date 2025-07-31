namespace TimeAtt.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    [Table("tb_employee")]
    public partial class EmployeeInfo
    {
        [Key]
        public int emp_id { get; set; }

        [StringLength(50)]
        public string emp_no { get; set; }

        public long? emp_card { get; set; }

        public int? emp_section { get; set; }
        [Column("emp_name")]
        public string emp_name { get; set; }

        public int? emp_sch { get; set; }

        public bool? emp_deleted { get; set; }

        public int? emp_createddate { get; set; }

        [StringLength(50)]
        public string emp_PersonalID { get; set; }

        [StringLength(250)]
        public string emp_JobTitle { get; set; }

        [StringLength(50)]
        public string emp_JobID { get; set; }

        [StringLength(250)]
        public string emp_Grade { get; set; }

        [Column(TypeName = "date")]
        public DateTime? emp_HiringDate { get; set; }

        [Column(TypeName = "date")]
        public DateTime? emp_TerminationDate { get; set; }

        [StringLength(150)]
        public string emp_email { get; set; }

        [StringLength(50)]
        public string emp_mobile { get; set; }

        [StringLength(50)]
        public string emp_dep { get; set; }

        public int? emp_type { get; set; }

        [StringLength(5)]
        public string emp_jointype { get; set; }

        [StringLength(50)]
        public string emp_username { get; set; }

        public bool? emp_violatedException { get; set; }

        public bool? emp_ExceptionViolation { get; set; }

        public bool? emp_sendnotif { get; set; }

        public long? emp_region { get; set; }

        public long? emp_sectorid { get; set; }

        [StringLength(50)]
        public string emp_Catcode { get; set; }

        [StringLength(50)]
        public string Mngr_No { get; set; }

        [StringLength(250)]
        public string Mngr_Email { get; set; }

        public bool? isManager { get; set; }

        [StringLength(250)]
        public string emp_nameEn { get; set; }

        public string sec_Name { get; set; }
        public string reg_name { get; set; }
        public string sch_Name { get; set; }
        public string GroupName { get; set; }
        public string emp_cardNvc { get; set; }
        public int TotalRecord { get; set; }
        public long? reg_id { get; set; }
        public int? sec_id { get; set; }
        public int? ex_FromDate { get; set; }
        public int? ex_ToDate { get; set; }
    }

    public class Locations
    {
        public string LocationName { get; set; }
    }
}
