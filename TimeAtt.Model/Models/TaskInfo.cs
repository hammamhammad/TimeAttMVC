using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TimeAtt.Models
{
    public class TaskInfo
    {
        public int AppID { get; set; }
        public int RefID { get; set; }
        public int WorkFlowID { get; set; }
        public string Requester { get; set; }
        public string FullName { get; set; }
        public string FullNameEN { get; set; }
        public int TaskID { get; set; }
        public string TaskNo { get; set; }
        public string Title { get; set; }
        public string TitleEN { get; set; }
        public int WFStatus { get; set; }
        public string TaskStatus_Ar { get; set; }
        public string TaskStatus_En { get; set; }
        public string RequestUrl { get; set; }
        public string RequestType_Ar { get; set; }
        public string RequestType_En { get; set; }
        public DateTime Created { get; set; }
        public string TaskDetails { get; set; }
        public string TaskNote { get; set; }
        public string AssignTask { get; set; }
        public string TaskUrl { get; set; }
        public string RequestDate
        {
            get
            {
                return Created.ToString("dd/MM/yyyy h:mm:ss tt");
            }

        }
    }

    public class TaskStatus
    {
        public short STID { get; set; }
        public string STName_En { get; set; }

        public string STName_Ar { get; set; }

    }
    public class WorkFlowStatus
    {
        public short STID { get; set; }
        public string STName_En { get; set; }

        public string STName_Ar { get; set; }

    }
}