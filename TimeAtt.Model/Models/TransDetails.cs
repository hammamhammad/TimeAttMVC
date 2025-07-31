using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TimeAtt.Models
{
    public class TransDetails
    {
        // public int MyProperty { get; set; }
        public string m_date { get; set; }
        public string emp_no { get; set; }
        public string emp_name { get; set; }
        public string emp_nameEn { get; set; }
        public string sec_name { get; set; }
        public string shiftinfo { get; set; }
        public string shift_name { get; set; }
        public int m_vac_id { get; set; }
        public string vacinfo { get; set; }
        public int exc_id { get; set; }
        public string Excuseinfo { get; set; }
        public string timefin { get; set; }
        public string timefout { get; set; }
        public string LateIn { get; set; }
        public string Earlyout { get; set; }
        public string TotalLate { get; set; }
        public int m_dateno { get; set; }
        public List<TransactionData> TransData { get; set; }
    }

    public class TransactionData
    {
        public string m_time { get; set; }
        public string m_unit { get; set; }
        public string AStatus { get; set; }
        public string SStatus { get; set; }
        public string TransReason { get; set; }
    }

    public class SFDailyTimeSheet
    {
        public long Rowno { get; set; }
        public int emp_id { get; set; }
        public string emp_no { get; set; }
        public string emp_name { get; set; }
        public string emp_nameEn { get; set; }
        public int emp_section { get; set; }
        public string sec_Name { get; set; }
        public int dateno { get; set; }
        public string m_date { get; set; }
        public string timefin { get; set; }
        public string timefout { get; set; }
        public string timeTotal { get; set; }
        public string ActualTime { get; set; }
        public string LateIn { get; set; }
        public string Earlyout { get; set; }
        public string OverTime { get; set; }
        public string TotalLate { get; set; }
        public int vac_id { get; set; }
        public string vacinfo { get; set; }
        public string ExcuseTime { get; set; }
        public string ExecuseTime { get; set; }
        public string TStatus { get; set; }
        
        public string execuseReason_name { get; set; }
        public string execuseReason_nameEN { get; set; }
        public int exc_id { get; set; }
        public string Excuseinfo { get; set; }
        public string exc_hours { get; set; }
        public bool m_manual { get; set; }
        public int  m_dateno { get; set; }
    }
}
