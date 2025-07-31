using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeAtt.Models;

namespace TimeAtt.Model.Models
{
    public class TimeAttEmployees_Violation
    {
        public long PenaltyID { get; set; }
        public long EmpNo { get; set; }
        public string EMPNAME { get; set; }
        public string ENG_NAME { get; set; }
        public string ViolationType { get; set; }
        public string ViolationSpecific { get; set; }
        public string RepetitionValue { get; set; }
        public int? AbsenceDuration { get; set; }
        public int? DelayDuration { get; set; }
        public string UploadReference { get; set; }

        public string abs_ViolationText { get; set; }
        public string abs_ViolationTextEN { get; set; }
        public string late_ViolationText { get; set; }

        public string late_ViolationTextEN { get; set; }
        public string TotalLateStr { get; set; }
public string ExEmployee { get; set; }
        public DateTime Created { get; set; }
    }

    public class EmployeesViolationTaskDetails
    {
        public string CompanyName { get; set; }
        public DateTime PeriodStart { get; set; }
        public DateTime PeriodEnd { get; set; }

        public List<TimeAttEmployees_Absence> Absences { get; set; }
        public List<TimeAttEmployees_LATE> Lateness { get; set; }


        public List<TimeAttEmployees_Violation> Violations { get; set; }


        public ResponseStatus Response { get; set; }

        public EmployeesViolationTaskDetails()
        {

        }
    }
}
