using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;

namespace TimeAtt.Models
{
   
    public class MonthlyDailyTimeSheet
    {
        public List<DailyTimeSheet> Details { get; set; }
        public List<MonthlyTimeSheet> Summary { get; set; }
    }
    public class MonthlyTimeSheet
    {

        public long m_id { get; set; }
        public int emp_id { get; set; }
        public long emp_card { get; set; }
        public string emp_no { get; set; }
        public string emp_name { get; set; }
        public string emp_nameEn { get; set; }
        public string sec_name { get; set; }
        public int sec_id { get; set; }
        public int daysno { get; set; }
        public int daysabsent { get; set; }
        public int daysoff { get; set; }
        public int daysvication { get; set; }
        public int totalExecuseM { get; set; }
        public int ac_workM { get; set; }
        public int totalworkM { get; set; }
        public int totallateM { get; set; }
        public int totaloverM { get; set; }
        public string totalExecuse { get; set; }
        public string totalwork { get; set; }
        public string ac_work { get; set; }
        public string totalover { get; set; }
        public string totallate { get; set; }
        public string reg_name { get; set; }
        public long? reg_id { get; set; }
        public int fdateno { get; set; }
        public int tdateno { get; set; }

        public List<SFDailyTimeSheet> TransData { get; set; }

    }


}
