namespace TimeAtt.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    [Table("tb_execuseReason")]
    public partial class ExecuseReasonInfo
    {
        [Key]
        public int execuseReason_id { get; set; }

        [StringLength(250)]
        public string execuseReason_name { get; set; }
        [StringLength(250)]
        public string execuseReason_nameEN { get; set; }
        public int? exc_type { get; set; }
    }
}
