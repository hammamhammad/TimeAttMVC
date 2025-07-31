namespace TimeAtt.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
   
    public class Transactions
    {
        public Transactions()
        {

        }
        public long trans_id { get; set; }
        public long m_id { get; set; }
        public string m_date { get; set; }
        public string m_time { get; set; }
        public bool m_status { get; set; }
        public short? m_typ { get; set; }
        public string StatusName { get; set; }
        public string emp_no { get; set; }
        public dynamic emp_card { get; set; }
        public string emp_name { get; set; }
        public int emp_id { get; set; }
        public bool? m_deleted { get; set; }
        public short? m_mode { get; set; }
        public bool m_manual { get; set; }
        public dynamic m_unitid { get; set; }
        public string m_unit { get; set; }
        public int? ModifiedReasonID { get; set; }
        public string ModifiedReason { get; set; }
        public int? m_transtype { get; set; }
        public int? CV_CODE { get; set; }
        public int? acc_date { get; set; }
        public int? DateNo { get; set; }
        public int? sec_id { get; set; }
        public long? reg_id { get; set; }
        public string reg_name { get; set; }
        public dynamic SortKey { get; set; }
        public string sec_Name { get; set; }
        public string Note { get; set; }
        public string TaskDetails { get; set; }
        public byte[] AttachmentFile { get; set; }
        public string AttachmentFileExt { get; set; }
    }

    public partial class TransBody
    {
        public int trans_id { get; set; }
        public int trans_fdate { get; set; }
        public int trans_tdate { get; set; }
        public int? trans_reason { get; set; }
        public int? trans_empid { get; set; }
        public bool? trans_status { get; set; }
        public int? trans_secid { get; set; }
        public long? trans_RegID { get; set; }

    }

    public partial class TransInfo
    {
        public long trans_id { get; set; }
        public int trans_date { get; set; }
        public string trans_date_s { get; set; }
        public int trans_reason { get; set; }
        public string trans_reasonName { get; set; }
        public int trans_type { get; set; }
        public string trans_typeName { get; set; }
        public string trans_time { get; set; }
        public string Note{ get; set; }
        public int trans_empid { get; set; }
        public string UserName { get; set; }
        public string emp_no { get; set; }
        public string emp_name { get; set; }
        public bool trans_status { get; set; }
        public string sec_Name { get; set; }
        public int? sec_id { get; set; }
        public long? reg_id { get; set; }
        public string reg_name { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
