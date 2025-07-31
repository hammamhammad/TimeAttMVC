namespace TimeAtt.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    [Table("tb_vacationtype")]
    public partial class VacationType
    {
        [Key]
        public int vtype_id { get; set; }

        [StringLength(250)]
        public string vtype_name { get; set; }

        public bool istrip { get; set; }
    }
}
