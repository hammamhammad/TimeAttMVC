namespace TimeAtt.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    [Table("tb_schGroup")]
    public partial class SchedulGroupInfo
    {
        [Key]
        public int schGroup_id { get; set; }

        [Required]
        [StringLength(250)]
        public string schGroup_name { get; set; }

        public int sch_id { get; set; }

        public bool schGroup_deleted { get; set; }

        public int? sch_startdate { get; set; }

        public int? sch_enddate { get; set; }
        public virtual string StartDate { get; set; }

        public virtual string EndDate { get; set; }
        public virtual bool IsApply { get; set; }
        public virtual string sch_name { get; set; }
        public virtual List<SchedulGroupEmployees> scheduleGroupEmployees { get; set; }
    }
}
