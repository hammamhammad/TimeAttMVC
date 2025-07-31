using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;

namespace TimeAtt.Models
{
   
    public class DailyTransactions
    {
        public DailyTimeSheet Daily { get; set; }
        public IEnumerable<Transactions> Trans { get; set; }
    }
    public class DailyTimeSheet
    {
        public long RowNum { get; set; }
        public long m_id { get; set; }
        public long ID { get; set; }
        public int emp_id { get; set; }
        public long emp_card { get; set; }
        public string emp_no { get; set; }
        public string emp_name { get; set; }
        public string emp_nameEn { get; set; }
        public string sec_Name { get; set; }
        public int emp_section { get; set; }
        public int m_dateno { get; set; }
        public string m_date { get; set; }
        public string m_date_h { get; set; }
        public string NameOfDay { get; set; }
        public string timefin { get; set; }
        public string timefout { get; set; }
        public string fLateIn { get; set; }
        public string fEarlyout { get; set; }
        public string timesin { get; set; }
        public string timesout { get; set; }
        public string sLateIn { get; set; }
        public string sEarlyout { get; set; }
        public string timeTotal { get; set; }
        public string ActualTime { get; set; }
        public string LateIn { get; set; }
        public string OverTime { get; set; }
        public string TotalLate { get; set; }
        public string Earlyout { get; set; }
        public int? vac_id { get; set; }
        public bool? m_manual { get; set; }
        public int? exc_id { get; set; }
        public string ExecuseTime { get; set; }
        public string Excuseinfo { get; set; }
        public string exc_hours { get; set; }
        public string vacinfo { get; set; }
        public string execuseReason_name { get; set; }
        public string TStatus { get; set; }
        public string StatusCode { get; set; }
        public int? m_shiftid { get; set; }
        public string shift_name { get; set; }
        public bool shift_twoshifts { get; set; }
        public int? sec_id { get; set; }
        public long? reg_id { get; set; }
        public string reg_name { get; set; }
        public dynamic SortKey { get; set; }
    }
}
