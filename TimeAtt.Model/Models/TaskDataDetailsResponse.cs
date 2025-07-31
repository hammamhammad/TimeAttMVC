using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TimeAtt.Models
{
    public class TaskDataDetailsResponse
    {
        public TaskDetailsEntity TaskDetails { get; set; }


        public List<TaskHistoryEntity> TaskHistoryDetails { get; set; }


        public ResponseStatus Response { get; set; }

        public TaskDataDetailsResponse()
        {

        }
    }
    public class TaskDetailsEntity
    {

        public int TaskID { get; set; }

        public int AppID { get; set; }

        public int RefID { get; set; }

        public string Title { get; set; }

        public string TitleEN { get; set; }

        public string Requester_username { get; set; }

        public string Requester_empid { get; set; }

        public string Requester_fullname { get; set; }

        public string Requester_email { get; set; }

        public string CurrentUser_username { get; set; }

        public string CurrentUser_empid { get; set; }

        public string CurrentUser_fullname { get; set; }

        public string CurrentUser_email { get; set; }

        public short TaskStatus { get; set; }

        public short ActivityType { get; set; }

        public DateTime Created { get; set; }


        public DateTime Updated { get; set; }

        public string TaskNo { get; set; }

        public string TaskNote { get; set; }

        public string AppViewURL { get; set; }

        public string TaskDetailsBody { get; set; }

        public string ActivityURL { get; set; }

        public bool CanReAssgin { get; set; }

        public bool CanCancel { get; set; }
        public byte[] FileData { get; set; }

        public string FileExt { get; set; }
        public TaskDetailsEntity()
        {

        }

    }

    public class TaskHistoryEntity
    {

        public long HID { get; set; }

        public int TaskID { get; set; }

        public int ActivityID { get; set; }

        public string CurrentUser { get; set; }

        public short WFStatus { get; set; }

        public string WFStatus_ar { get; set; }

        public string WFStatus_en { get; set; }

        public string TaskNote { get; set; }

        public string Created { get; set; }

        public string CreatedTime { get; set; }

        public DateTime Updated { get; set; }

        public string AName { get; set; }

        public string ANameEn { get; set; }

        public string Userimg { get; set; }
        public TaskHistoryEntity()
        {

        }
    }
}