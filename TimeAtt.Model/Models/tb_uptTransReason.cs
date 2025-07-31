namespace TimeAtt.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Runtime.Serialization;
    [Table("tb_uptTransReason")]
    public partial class TransReason
    {
        [Key]
        public int uptTransReason_id { get; set; }
        [StringLength(250)]
        public string uptTransReason_name { get; set; }
        public string uptTransReason_nameEN { get; set; }
        public int? uptTransReason_Type { get; set; }
    }
}
