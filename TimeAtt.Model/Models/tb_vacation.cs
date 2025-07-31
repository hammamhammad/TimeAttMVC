namespace TimeAtt.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    [Table("tb_vacation")]
    public partial class VacationsInfo
    {
        [Key]
        public int vac_id { get; set; }
        public int? vac_type { get; set; }
        public int? vac_empid { get; set; }
        public int? sec_ID { get; set; }
        public string emp_no { get; set; }
        public string emp_name { get; set; }
        public string sec_Name { get; set; }
        public string vac_fdate { get; set; }
        public string vac_tdate { get; set; }
        public string vtype_name { get; set; }
        public string vac_fdate_h { get; set; }
        public string vac_tdate_h { get; set; }
        public int? fdate { get; set; }
        public int? tdate { get; set; }
        public bool? vac_status { get; set; }
        public bool? vac_deleted { get; set; }
        public string vac_HRTransName { get; set; }
        public string vac_HRTransCode { get; set; }
        public DateTime? vac_HRLastupdate { get; set; }
        public string vac_HRID { get; set; }
        public int? vac_DaysNo { get; set; }
        public dynamic SortKey { get; set; }
        public string reg_name { get; set; }
        public long? reg_id { get; set; }
    }
    public partial class VacationBody
    {
        public int vac_id { get; set; }
        public int vac_fdate { get; set; }
        public int vac_tdate { get; set; }
        public int? vac_type { get; set; }
        public int? vac_empid { get; set; } 
        public bool? vac_status { get; set; }
        public bool? vac_deleted { get; set; }
        public int? vac_secid { get; set; }
        public long? vac_RegID { get; set; }
        public byte[] AttachmentFile { get; set; }
        public string AttachmentFileExt { get; set; }
        public string vac_reason { get; set; }
        public string TaskDetails { get; set; }
    }
}









