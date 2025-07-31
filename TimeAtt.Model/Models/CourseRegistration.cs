using System;

namespace TimeAtt.Model.Models
{
    public class CourseRegistration
    {
        public int ID { get; set; }
        public long EmpNo { get; set; }
        public string EmpUsername { get; set; }
        public int CourseID { get; set; }
        public DateTime Created { get; set; }
        public long CreatedBy { get; set; }
        public DateTime Updated { get; set; }
        public long UpdatedBy { get; set; }
    }
}
