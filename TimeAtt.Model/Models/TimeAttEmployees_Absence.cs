using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TimeAtt.Model.Models
{
   public class TimeAttEmployees_Absence
    {
        public long ID { get; set; }
        public long EmpNo { get; set; }
        public string EMPNAME { get; set; }
        public string ENG_NAME { get; set; }
        public DateTime AbsenceStart { get; set; }
        public DateTime AbsenceEnd { get; set; }
        public int Duration { get; set; }
        public long Company { get; set; }
        public DateTime Created { get; set; }
        public string UploadReference { get; set; }

    }
}
    