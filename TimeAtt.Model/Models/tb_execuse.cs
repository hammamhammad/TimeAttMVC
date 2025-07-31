namespace TimeAtt.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    [Table("tb_execuse")]
    public partial class ExecuseInfo
    {
        [Key]
        public int exc_id { get; set; }

        public int? exc_empid { get; set; }

        public string exc_date { get; set; }
        public string exc_todate { get; set; }

        [StringLength(5)]
        public string exc_ftime { get; set; }

        [StringLength(5)]
        public string exc_ttime { get; set; }

        public string exc_reason { get; set; }

        public bool? exc_deleted { get; set; }

        public bool? exc_status { get; set; }

        public int? execuseReason_ID { get; set; }

        [StringLength(5)]
        public string ApprovalByManager { get; set; }

        public int? exc_type { get; set; }

        public DateTime? Created { get; set; }

        public DateTime? Updated { get; set; }
        public string exc_hours { get; set; }
        public int? exc_minuts { get; set; }
        public string execuseReason_Name { get; set; }

        public string emp_name { get; set; }
        public string emp_no { get; set; }
        public int? exc_dateNo { get; set; }
        public dynamic SortKey { get; set; }
        public string reg_name { get; set; }
        public long? reg_id { get; set; }
        public int? sec_ID { get; set; }
        public string sec_Name { get; set; }
        public string TaskDetails { get; set; }

        public byte[] AttachmentFile { get; set; }
        public string AttachmentFileExt { get; set; }
    }
    public partial class ExcuseBody
    {
        public int exc_id { get; set; }
        public int exc_fdate { get; set; }
        public int exc_tdate { get; set; }
        public int? exc_type { get; set; }
        public int? exc_empid { get; set; }
        public bool? exc_status { get; set; }
        public bool? exc_deleted { get; set; }
        public int? exc_secid { get; set; }
        public long? exc_RegID { get; set; }

    }
}
