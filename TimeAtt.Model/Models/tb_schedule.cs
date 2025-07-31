namespace TimeAtt.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    [Table("tb_schedule")]
    public partial class ScheduleInfo
    {
        [Key]
        public int sch_id { get; set; }

        [Required]
        [StringLength(250)]
        public string sch_name { get; set; }

        public bool sch_oneshift { get; set; }

        public string sch_desc { get; set; }

        public int? sch_1 { get; set; }

        public int? sch_2 { get; set; }

        public int? sch_3 { get; set; }

        public int? sch_4 { get; set; }

        public int? sch_5 { get; set; }

        public int? sch_6 { get; set; }

        public int? sch_7 { get; set; }

        public bool? sch_delete { get; set; }

        public bool? sch_isnight { get; set; }
    }
}
