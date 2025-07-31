namespace TimeAtt.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    [Table("tb_schGroupEmployees")]
    public partial class SchedulGroupEmployees
    {
        [Key]
        public int schGroupEmployees_id { get; set; }

        public int schGroup_id { get; set; }

        public int emp_id { get; set; }

        public virtual string emp_no { get; set; }
        public virtual string  emp_name { get; set; }
    }
}
