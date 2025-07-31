using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TimeAtt.Models
{
    public class Violations
    {
        public long empNO { get; set; }
        public string EMPNAME { get; set; }
        public string ENG_NAME { get; set; }
        public int AbsenceDuration { get; set; }
        public int Abs_NumberOfRepletion { get; set; }
        public string abs_ViolationText { get; set; }
        public string abs_ViolationTextEN { get; set; }
        public int DelayDuration { get; set; }
        public string TotalLateStr { get; set; }
        public int Late_NumberOfRepletion { get; set; }
        public string late_ViolationText { get; set; }
        public string late_ViolationTextEN { get; set; }
        public string UploadMonth { get; set; }
        public string ExEmployee { get; set; }
        public string TERMINATION_DATE { get; set; }
        public string UploadRef { get; set; }
    }

    public class ViolationsYears
    {
        public int Year { get; set; }
    }
    public class ViolationsMonths
    {
        public int MonthNo { get; set; }
        public string MonthName { get; set; }
    }

    public class ViolationDetails
    {
        public long EmpNo { get; set; }
        public string emp_name { get; set; }
        public string emp_nameEn { get; set; }
        public string sec_Name { get; set; }
        public string ViolationMonth { get; set; }
        public List<ViolationLateness> Lateness { get; set; }
        public List<ViolationAbsence> Absence { get; set; }
    }
    public class ViolationLateness
    {
        public long EmpNo { get; set; }
        public string TransactionDate { get; set; }
        public int TotalLate { get; set; }
        public string TotalLateStr { get; set; }
    }

    public class ViolationAbsence
    {
        public long EmpNo { get; set; }
        public string AbsenceStart { get; set; }
        public string AbsenceEnd { get; set; }
        public int Duration { get; set; }
        

    }
    
}
