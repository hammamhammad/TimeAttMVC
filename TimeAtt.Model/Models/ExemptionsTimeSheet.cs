namespace TimeAtt.Model.Models
{  
    public class ExemptionsTimeSheet
    {
        public int emp_id { get; set; }
        public string emp_no { get; set; }
        public string emp_name { get; set; }
        public string emp_JobTitle { get; set; }
        public int sec_id { get; set; }
        public string sec_name { get; set; }
        public long reg_id { get; set; }
        public string reg_name { get; set; }
        public bool AttendanceExempted { get; set; }
        public bool PenaltyExempted { get; set; }
    }

}
