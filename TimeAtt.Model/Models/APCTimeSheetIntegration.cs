using System;

namespace TimeAtt.Model.Models
{
    public class APCTimeSheetIntegration
    {
        public class TimeSheetSickLeave
        {
            public long EMPLOYEE_NUMBER { get; set; }
            public string UPLOAD_REFERENCE { get; set; }
            public string ABSENCE_TYPE { get; set; }
            public DateTime ABSENCE_START_DATE { get; set; }
            public DateTime ABSENCE_END_DATE { get; set; }
            public int DURATION { get; set; }

            //UPLOAD_DATE
        }

        public class FieldTimeSheetSummary
        {
            public long EMPLOYEE_NUMBER { get; set; }
            public DateTime UPLOAD_DATE { get; set; }
            public string ELEMENT_TYPE { get; set; }
            public DateTime ELEMENT_DATE { get; set; }
            public int VALUE { get; set; }
            public string UPLOAD_REFERENCE { get; set; }
        }
    }
}
