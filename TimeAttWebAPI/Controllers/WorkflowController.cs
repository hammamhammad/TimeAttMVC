using ExtensionMethods;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web.Http;
using TimeAtt;
using TimeAtt.Model.Models;
using TimeAtt.Model.Repository;
using TimeAtt.Models;
using TimeAtt.Security;

namespace TimeAttWebAPI.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [RoutePrefix("workflow")]
    public class WorkflowController : ApiController
    {

        private WorkFlowRepository ContextDb = null;
        private TimeSheetRepositry timeSheetRepositry;
        public WorkflowController()
        {
            timeSheetRepositry = new TimeSheetRepositry();
            ContextDb = new WorkFlowRepository();
        }
        internal static int GetEmailSenderID()
        {
            return System.Configuration.ConfigurationManager.AppSettings["EmailSenderID"].ToInt();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="TaskID"></param>
        /// <param name="ActionID"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("SendEmailTo/{TaskID}/{ActionID}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public ResponseStatus SendEmailTo(int TaskID, int ActionID)
        {

            try
            {

                EmailEntity Email = ContextDb.GetEmailByAction(TaskID, ActionID);
                if (Email != null)
                {
                    StringBuilder emailmsgstatus = new StringBuilder();
                    string[] Recipients = Email.Recipient.Split(';');
                    foreach (var item in Recipients)
                    {
                        bool isSend = Notification.Email.AddToDB(item, Email.Subject, Email.Title, Email.Body, 0, GetEmailSenderID(), true, null, null, Email.TemplateID.ToShort());
                        emailmsgstatus.AppendLine(isSend ? "Email has been sent successfully to Email:" + item : "Sending email failed to Email:" + item + "  / " + Notification.Email.Result.Description);
                    }

                    var resp = new ResponseStatus()
                    {
                        Status = "OK",
                        Response = emailmsgstatus.ToString()
                    };
                    return resp;

                }
                else
                {
                    var resp = new ResponseStatus()
                    {
                        Status = "Exception",
                        Response = "Cannot find Email information to send email"
                    };
                    return resp;
                }
            }
            catch (Exception ex)
            {

                var resp = new ResponseStatus()
                {
                    Status = "Exception",
                    Response = ex.ToString()
                };
                return resp;
            }
        }

        [HttpGet]
        [Route("CheckWorkflowTask")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage CheckWorkflowTask()
        {
            HttpResponseMessage response = null;
            object Result = null;
            try
            {

                Result = new
                {
                    Status = "OK",
                    Response = "True"
                };

                response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            catch (Exception Exception)
            {

                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="TaskID"></param>
        /// <param name="Usename"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("AssignTo/{TaskID}/{Usename}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public ResponseStatus AssignTo(int TaskID, string Usename)
        {

            try
            {


                string st = "OK";
                string Result = ContextDb.AssignTo(TaskID, Usename);
                if (string.IsNullOrEmpty(Result))
                {
                    Result = "Assign to : Cannot retrive data from SP:AssignTo";
                    st = "Error";
                }
                else
                {
                    if (Result.ToLower().Contains("error"))
                    {
                        st = "Error";
                    }
                }


                var resp = new ResponseStatus()
                {
                    Status = st,
                    Response = Result
                };
                return resp;
            }
            catch (Exception ex)
            {

                var resp = new ResponseStatus()
                {
                    Status = "Exception",
                    Response = ex.ToString()
                };
                return resp;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="TaskID"></param>
        /// <param name="GroupID"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("AssignToGroup/{TaskID}/{GroupID}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public ResponseStatus AssignToGroup(int TaskID, int GroupID)
        {

            try
            {

                string st = "OK";
                string Result = ContextDb.AssignToGroup(TaskID, GroupID);
                if (string.IsNullOrEmpty(Result))
                {
                    Result = "Assign to Group : Cannot retrive data from SP:AssignToGroup";
                    st = "Error";
                }
                else
                {
                    if (Result.ToLower().Contains("error"))
                    {
                        st = "Error";
                    }
                }


                var resp = new ResponseStatus()
                {
                    Status = st,
                    Response = Result
                };
                return resp;
            }
            catch (Exception ex)
            {

                var resp = new ResponseStatus()
                {
                    Status = "Exception",
                    Response = ex.ToString()
                };
                return resp;
            }
        }

        /// <summary>
        /// Assign To Support Services Coordinator
        /// </summary>
        /// <param name="TaskID"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("AssignToSSCoordinator/{TaskID}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public ResponseStatus AssignToSSCoordinator(int TaskID)
        {
            try
            {

                string st = "OK";
                string Result = ContextDb.AssignToSSCoordinator(TaskID);
                if (string.IsNullOrEmpty(Result))
                {
                    Result = "Assign to : Cannot retrive data from SP:AssignToSSCoordinator";
                    st = "Error";
                }
                else
                {
                    if (Result.ToLower().Contains("error"))
                    {
                        st = "Error";
                    }
                }


                var resp = new ResponseStatus()
                {
                    Status = st,
                    Response = Result
                };
                return resp;
            }
            catch (Exception ex)
            {

                var resp = new ResponseStatus()
                {
                    Status = "Exception",
                    Response = ex.ToString()
                };
                return resp;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="TaskID"></param>
        /// <param name="TaskNote"></param>
        /// <param name="AssignTask"></param>
        /// <param name="Udata"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("ApproveActivity")]
        //[CustomAuthorize(ValidateToken = true, TokenDuration = 15)]
        public HttpResponseMessage ApproveActivity([FromBody] TaskInfo entity)// int TaskID, string TaskNote, string AssignTask)
        {

            object Result = null;
            HttpResponseMessage resp = null;
            try
            {

                string response = "";
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.ErrorRetrievedDataMsg, null);
                    resp = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult);
                    return resp;
                }

                int res = ContextDb.ApproveActivity(entity.TaskID, entity.TaskNote, entity.AssignTask, Credential.Username, out response);
                if (res > 0)
                {
                    Result = new ResponseResult<int>("1", Resources.Resources.ApproveCompleteOK, res);
                    resp = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new ResponseResult<int>("0", response, res);
                    resp = Request.CreateResponse(HttpStatusCode.OK, Result);
                }

            }

            catch (Exception ex)
            {

                Result = new ResponseResult<int>("0", ex.Message, 0);
                resp = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            return resp;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="TaskID"></param>
        /// <param name="Udata"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("CancelActivity")]
        //[CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage CancelActivity([FromBody] int TaskID)
        {

            object Result = null;
            HttpResponseMessage resp = null;
            try
            {

                string response = "";
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.ErrorRetrievedDataMsg, null);
                    resp = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult);
                    return resp;
                }

                int res = ContextDb.CancelActivity(TaskID, Credential.Username, out response);
                if (res > 0)
                {
                    Result = new ResponseResult<int>("1", Resources.Resources.CancelCompleteOK, res);
                    resp = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new ResponseResult<int>("0", response, res);
                    resp = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
            }
            catch (Exception ex)
            {

                Result = new ResponseResult<int>("0", ex.Message, 0);
                resp = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            return resp;
        }

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="TaskID"></param>
        ///// <param name="Udata"></param>
        ///// <param name="TaskNote"></param>
        ///// <returns></returns>
        //[HttpPost]
        //[Route("ReAssignActivity")]
        ////[CustomAuthorize(ValidateUserAndPassword = true)]
        //public ResponseStatus ReAssignActivity(int TaskID, string Udata, string TaskNote)
        //{
        //    WorkFlowRepository ContextDb = null;
        //    try
        //    {
        //        ContextDb = new WorkFlowRepository();
        //        string response = "";

        //        int res = ContextDb.ReAssignActivity(TaskID, Udata, TaskNote, out response);
        //        if (res > 0)
        //        {
        //            var resp = new ResponseStatus()
        //            {
        //                Status = "OK",
        //                Response = response
        //            };
        //            return resp;
        //        }
        //        else
        //        {
        //            var resp = new ResponseStatus()
        //            {
        //                Status = "Exception",
        //                Response = response
        //            };
        //            return resp;
        //        }
        //    }
        //    catch (Exception ex)
        //    {

        //        return new ResponseStatus()
        //        {
        //            Status = "Exception",
        //            Response = "CancelActivity Error: " + ex.Message
        //        };
        //    }

        //}

        /// <summary>
        /// 
        /// </summary>
        /// <param name="TaskID"></param>
        /// <param name="TaskNote"></param>
        /// <param name="Udata"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("RejectActivity")]
        //[CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage RejectActivity([FromBody] TaskInfo entit)
        {

            object Result = null;
            HttpResponseMessage resp = null;
            try
            {

                string response = "";
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.ErrorRetrievedDataMsg, null);
                    resp = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult);
                    return resp;
                }

                int res = ContextDb.RejectActivity(entit.TaskID, entit.TaskNote, Credential.Username, out response);
                if (res > 0)
                {
                    Result = new ResponseResult<int>("1", Resources.Resources.RejectCompleteOK, res);
                    resp = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new ResponseResult<int>("0", response, res);
                    resp = Request.CreateResponse(HttpStatusCode.OK, Result);
                }

            }

            catch (Exception ex)
            {

                Result = new ResponseResult<int>("0", ex.Message, 0);
                resp = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            return resp;

        }

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <returns></returns>
        //[HttpGet]
        //[Route("CompleteTask")]
        //[CustomAuthorize(ValidateUserAndPassword = true)]
        //public HttpResponseMessage CompleteTask()
        //{
        //    HttpResponseMessage response = null;
        //    object Result = null;
        //    try
        //    {

        //        Result = new
        //        {
        //            Status = "OK",
        //            Response = "True"
        //        };

        //        response = Request.CreateResponse(HttpStatusCode.OK, Result);
        //    }
        //    catch (Exception Exception)
        //    {

        //        Result = new
        //        {
        //            Status = "Exception",
        //            Response = Exception.Message
        //        };
        //        response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
        //    }
        //    return response;

        //}

        /// <summary>
        /// 
        /// </summary>
        /// <param name="taskStatus"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetMyAllRequest/{taskStatus}")]
        //[CustomAuthorize(ValidateToken = true, TokenDuration = 15)]
        public HttpResponseMessage GetMyAllRequest(int? taskStatus)
        {
            //var user = System.Web.HttpContext.Current.User as CustomPrincipal;
            HttpResponseMessage response = null;
            object Result = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.ErrorRetrievedDataMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult);
                    return response;
                }

                var list = ContextDb.GetMyAllRequest(Credential.Username, taskStatus);
                if (list.Count == 0)
                    list = new List<TaskInfo>();
                // list = list.OrderByDescending(O => O.Created).ToList();
                Result = new ResponseResult<List<TaskInfo>>("1", Resources.Resources.SuccessRetrievedDataMsg, list);
                response = Request.CreateResponse(HttpStatusCode.OK, Result);

            }
            catch (Exception ex)
            {
                Result = new ResponseResult<TaskInfo>("0", Resources.Resources.ErrorRetrievedDataMsg + Environment.NewLine + ex.ToString(), null);
                response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            return response;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Udata"></param>
        /// <param name="taskStatus"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetMyAllTasks/{taskStatus}")]
        public HttpResponseMessage GetMyAllTasks(short? taskStatus)
        {
            HttpResponseMessage response = null;
            object Result = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.ErrorRetrievedDataMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult);
                    return response;
                }

                var list = ContextDb.GetMyAllTasks(Credential.Username, taskStatus);

                if (list.Count == 0)
                    list = new List<TaskInfo>();
                // list = list.OrderByDescending(O => O.Created).ToList();
                Result = new ResponseResult<List<TaskInfo>>("1", Resources.Resources.SuccessRetrievedDataMsg, list);
                response = Request.CreateResponse(HttpStatusCode.OK, Result);

            }
            catch (Exception ex)
            {
                Result = new ResponseResult<TaskInfo>("0", Resources.Resources.ErrorRetrievedDataMsg + Environment.NewLine + ex.ToString(), null);
                response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            return response;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetTaskStatus")]
        public HttpResponseMessage GetTaskStatus()
        {
            HttpResponseMessage response = null;
            object Result = null;
            try
            {

                var list = ContextDb.GetTaskStatus();

                Result = new ResponseResult<List<TaskStatus>>("1", Resources.Resources.SuccessRetrievedDataMsg, list);
                response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            catch (Exception ex)
            {
                Result = new ResponseResult<TaskInfo>("0", Resources.Resources.ErrorRetrievedDataMsg + Environment.NewLine + ex.ToString(), null);
                response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            return response;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetWorkFlowStatus")]
        public HttpResponseMessage GetWorkFlowStatus()
        {
            HttpResponseMessage response = null;
            object Result = null;
            try
            {

                var list = ContextDb.GetWorkFlowStatus();


                Result = new ResponseResult<List<WorkFlowStatus>>("1", Resources.Resources.SuccessRetrievedDataMsg, list);
                response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            catch (Exception ex)
            {
                Result = new ResponseResult<WorkFlowStatus>("0", Resources.Resources.ErrorRetrievedDataMsg + Environment.NewLine + ex.ToString(), null);
                response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            return response;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="TaskID"></param>
        /// <param name="Udata"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetTaskDetails/{TaskID}")]
        public HttpResponseMessage GetTaskDetails(int TaskID)
        {
            HttpResponseMessage Response = null;
            object Result = null;
            try
            {
                string dt = DateTime.Now.ToString();

                string response = "";
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.ErrorRetrievedDataMsg, null);
                    Response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult);
                    return Response;
                }

                var data = ContextDb.GetTaskDetails(TaskID, Credential.Username, dt, out response);

                DataTable dt_Task = data.Tables[0];
                DataTable dt_history = data.Tables[1];
                if (dt_Task != null && dt_Task.Rows.Count > 0)
                {
                    Common.CheckLoclizeForData(dt_Task);
                    Common.CheckLoclizeForData(dt_history);

                    var TaskDetails = TimeAtt.Common.MapTo<TaskDetailsEntity>(dt_Task).SingleOrDefault();
                    var taskHistory = TimeAtt.Common.MapTo<TaskHistoryEntity>(dt_history);
                    var resp = new TaskDataDetailsResponse()
                    {
                        TaskDetails = TaskDetails,
                        TaskHistoryDetails = taskHistory,
                        Response = new ResponseStatus()
                        {
                            Status = "OK",
                            Response = response
                        }
                    };

                    Result = new ResponseResult<TaskDataDetailsResponse>("1", Resources.Resources.SuccessRetrievedDataMsg, resp);
                    Response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    if (response.Contains("6"))
                        Result = new ResponseResult<TaskDataDetailsResponse>("0", response.Replace("6", ""), null);
                    else
                        Result = new ResponseResult<TaskDataDetailsResponse>("0", Resources.Resources.ErrorRetrievedDataMsg + Environment.NewLine + response, null);
                    Response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
            }
            catch (Exception ex)
            {
                Result = new ResponseResult<TaskDataDetailsResponse>("0", Resources.Resources.ErrorRetrievedDataMsg + Environment.NewLine + ex.ToString(), null);
                Response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            return Response;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("CreateNewTask")]
        public ResponseStatus CreateNewTask([FromBody] TaskInfo entity, byte[] AttachmentFile = null, string AttachmentFileExt = null)
        {
            try
            {
                //var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var dt = ContextDb.CreateNewTask(entity.AppID, entity.RefID, entity.WorkFlowID, entity.Title, entity.TitleEN, entity.TaskDetails, entity.Requester, AttachmentFile, AttachmentFileExt);
                if (!string.IsNullOrEmpty(dt))
                    return new ResponseStatus()
                    {
                        Status = "OK",
                        Response = dt.ToString()
                    };
                else
                    return new ResponseStatus()
                    {
                        Status = "Exception",
                        Response = "No data return from CreateNewTask SP AppID=" + entity.AppID + " RefID=" + entity.RefID + " WorkFlowID=" + entity.WorkFlowID + " Title=" + entity.Title + " Requester=" + entity.Requester
                    };
            }
            catch (Exception ex)
            {
                var resp = new ResponseStatus()
                {
                    Status = "Exception",
                    Response = ex.ToString()
                };
                return resp;
            }
        }


        [HttpPost]
        [Route("CreateNewTaskV2")]
        public ResponseStatus CreateNewTaskV2([FromBody] TaskInfo entity, byte[] AttachmentFile = null, string AttachmentFileExt = null)
        {
            try
            {
                //var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var dt = ContextDb.CreateNewTaskV2(entity.AppID, entity.RefID, entity.WorkFlowID, entity.Title, entity.TitleEN, entity.TaskDetails, entity.Requester, AttachmentFile, AttachmentFileExt);
                return dt;
                //if (!string.IsNullOrEmpty(dt))
                //    return new ResponseStatus()
                //    {
                //        Status = "OK",
                //        Response = dt.ToString()
                //    };
                //else
                //    return new ResponseStatus()
                //    {
                //        Status = "Exception",
                //        Response = "No data return from CreateNewTask SP AppID=" + entity.AppID + " RefID=" + entity.RefID + " WorkFlowID=" + entity.WorkFlowID + " Title=" + entity.Title + " Requester=" + entity.Requester
                //    };
            }
            catch (Exception ex)
            {
                var resp = new ResponseStatus()
                {
                    Status = "Exception",
                    Response = ex.ToString()
                };
                return resp;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="TaskID"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetYourTaskDetails/{TaskID}")]
        public HttpResponseMessage GetYourTaskDetails(int TaskID)
        {
            HttpResponseMessage Response = null;
            object Result = null;
            try
            {
                string dt = DateTime.Now.ToString();

                string response = "";
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.ErrorRetrievedDataMsg, null);
                    Response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult);
                    return Response;
                }

                var data = ContextDb.GetYourTaskDetails(TaskID, Credential.Username, dt, out response);

                DataTable dt_Task = data.Tables[0];
                DataTable dt_history = data.Tables[1];




                if (dt_Task != null && dt_Task.Rows.Count > 0)
                {
                    Common.CheckLoclizeForData(dt_Task);
                    Common.CheckLoclizeForData(dt_history);

                    var TaskDetails = TimeAtt.Common.MapTo<TaskDetailsEntity>(dt_Task).SingleOrDefault();
                    var taskHistory = TimeAtt.Common.MapTo<TaskHistoryEntity>(dt_history);
                    var resp = new TaskDataDetailsResponse()
                    {
                        TaskDetails = TaskDetails,
                        TaskHistoryDetails = taskHistory,
                        Response = new ResponseStatus()
                        {
                            Status = "OK",
                            Response = response
                        }
                    };
                    Result = new ResponseResult<TaskDataDetailsResponse>("1", Resources.Resources.SuccessRetrievedDataMsg, resp);
                    Response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new ResponseResult<TaskDataDetailsResponse>("0", Resources.Resources.ErrorRetrievedDataMsg + Environment.NewLine + response, null);
                    Response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
            }
            catch (Exception ex)
            {
                Result = new ResponseResult<TaskDataDetailsResponse>("0", Resources.Resources.ErrorRetrievedDataMsg + Environment.NewLine + ex.ToString(), null);
                Response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            return Response;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="TaskID"></param>
        /// <returns></returns>
        [Route("GetTaskDetailsView/{TaskID}")]
        public HttpResponseMessage GetTaskDetailsView(int TaskID)
        {
            HttpResponseMessage Response = null;
            object Result = null;
            try
            {
                string dt = DateTime.Now.ToString();

                string response = "";
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.ErrorRetrievedDataMsg, null);
                    Response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult);
                    return Response;
                }

                var data = ContextDb.GetTaskDetailsView(TaskID, Credential.Username, dt, out response);

                DataTable dt_Task = data.Tables[0];
                DataTable dt_history = data.Tables[1];




                if (dt_Task != null && dt_Task.Rows.Count > 0)
                {
                    Common.CheckLoclizeForData(dt_Task);
                    Common.CheckLoclizeForData(dt_history);

                    var TaskDetails = TimeAtt.Common.MapTo<TaskDetailsEntity>(dt_Task).SingleOrDefault();
                    var taskHistory = TimeAtt.Common.MapTo<TaskHistoryEntity>(dt_history);
                    var resp = new TaskDataDetailsResponse()
                    {
                        TaskDetails = TaskDetails,
                        TaskHistoryDetails = taskHistory,
                        Response = new ResponseStatus()
                        {
                            Status = "OK",
                            Response = response
                        }
                    };
                    Result = new ResponseResult<TaskDataDetailsResponse>("1", Resources.Resources.SuccessRetrievedDataMsg, resp);
                    Response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new ResponseResult<TaskDataDetailsResponse>("0", Resources.Resources.ErrorRetrievedDataMsg + Environment.NewLine + response, null);
                    Response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
            }
            catch (Exception ex)
            {
                Result = new ResponseResult<TaskDataDetailsResponse>("0", Resources.Resources.ErrorRetrievedDataMsg + Environment.NewLine + ex.ToString(), null);
                Response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            return Response;
        }
        //public TaskDataDetailsResponse GetTaskDetailsView(string TaskID, string Udata)
        //{
        //    try
        //    {
        //        return WorkFlowBL.GetTaskDetailsView(TaskID, Udata);
        //    }
        //    catch (Exception ex)
        //    {

        //        var resp = new TaskDataDetailsResponse()
        //        {
        //            TaskDetails = new TaskDetailsEntity(),
        //            TaskHistoryDetails = new List<TaskHistoryEntity>(),
        //            Response = new ResponseStatus()
        //            {
        //                Status = "Exception",
        //                Response = ex.Message
        //            }
        //        };
        //        return resp;
        //    }
        //}

        //public ResponseStatus StartWorkFlow(string TaskID, string ActionID)
        //{
        //    try
        //    {
        //        validateUserAndPassword();
        //        return WorkFlowBL.StartWorkFlow(TaskID);
        //    }
        //    catch (Exception ex)
        //    {

        //        var resp = new ResponseStatus()
        //        {
        //            Status = "Exception",
        //            Response = ex.ToString()
        //        };
        //        return resp;
        //    }
        //}
        //public ResponseStatus EndWorkFlow(string TaskID, string ActionID, string TaskStatus)
        //{
        //    try
        //    {
        //        validateUserAndPassword();
        //        return WorkFlowBL.EndWorkFlow(TaskID, ActionID, TaskStatus);

        //    }
        //    catch (Exception ex)
        //    {

        //        var resp = new ResponseStatus()
        //        {
        //            Status = "Exception",
        //            Response = ex.ToString()
        //        };
        //        return resp;
        //    }
        //}


        [HttpGet]
        [Route("GetTaskAttach/{TaskID}")]
        public HttpResponseMessage Generate(long TaskID)
        {
            var data = ContextDb.GetTaskAttachment(TaskID);
            if (data.FileData != null)
            {
                var stream = new MemoryStream(data.FileData);
                // processing the stream.

                var result = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ByteArrayContent(stream.ToArray())
                };
                result.Content.Headers.ContentDisposition =
                    new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                    {
                        FileName = TaskID.ToString() + data.FileExt
                    };
                result.Content.Headers.ContentType =
                    new MediaTypeHeaderValue("application/octet-stream");

                return result;
            }
            return null;
        }
        [HttpGet]
        [Route("SyncWithActiveDiroctry")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage SyncWithActiveDiroctry()
        {
            HttpResponseMessage response = null;


            try
            {
                ResponseStatus Result = ContextDb.SyncWithActiveDiroctry();

                response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            catch (Exception Exception)
            {

                object Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;
        }
        [HttpGet]
        [Route("GetActiveDiroctryUsers")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage GetActiveDiroctryUsers()
        {
            HttpResponseMessage response = null;


            try
            {
                var dt = ContextDb.GetActiveDiroctryUsers();
                //StringBuilder sb = new StringBuilder();

                //IEnumerable<string> columnNames = dt.Columns.Cast<DataColumn>().
                //                                  Select(column => column.ColumnName);
                //sb.AppendLine(string.Join(",", columnNames));

                //foreach (DataRow row in dt.Rows)
                //{
                //    IEnumerable<string> fields = row.ItemArray.Select(field => field.ToString());
                //    sb.AppendLine(string.Join(",", fields));
                //}

                //File.WriteAllText("test.csv", sb.ToString());
                HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
                //var list = dt.ToDynamic().ToList();

                result.Content = new StringContent(TransformDataTableToCsv(dt));
                result.Content.Headers.ContentType = new MediaTypeHeaderValue("text/csv");
                result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment"); //attachment will force download
                result.Content.Headers.ContentDisposition.FileName = "RecordExport.csv";


                return result;
                //response = Request.CreateResponse(HttpStatusCode.OK, sb);
            }
            catch (Exception Exception)
            {

                object Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;
        }
        private string TransformDataTableToCsv(DataTable dt)
        {
            StringBuilder output = new StringBuilder();
            IEnumerable<string> coulmnNames = dt.Columns.Cast<DataColumn>()
                .Select(x => x.ColumnName);
            output.AppendLine(string.Join(",", coulmnNames));
            foreach (DataRow row in dt.Rows)
            {
                IEnumerable<string> fields = row.ItemArray
                .Select(x => string.Concat("\"", x.ToString().Replace("\"", "\"\""), "\""));
                output.AppendLine(string.Join(",", fields));
            }
            return output.ToString();
        }
        private string WriteTsv<T>(IEnumerable<T> data)
        {
            StringBuilder output = new StringBuilder();
            PropertyDescriptorCollection props = TypeDescriptor.GetProperties(typeof(T));
            foreach (PropertyDescriptor prop in props)
            {
                output.Append(prop.DisplayName); // header
                output.Append("\t");
            }
            output.AppendLine();
            foreach (T item in data)
            {
                foreach (PropertyDescriptor prop in props)
                {
                    output.Append(prop.Converter.ConvertToString(
                         prop.GetValue(item)));
                    output.Append("\t");
                }
                output.AppendLine();
            }
            return output.ToString();
        }
        /// <summary>
        /// this for assign task to hr group by company, this for violation WF only
        /// </summary>
        /// <param name="TaskID"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("AssignToHRGroup/{TaskID}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public ResponseStatus AssignToHRGroup(int TaskID)
        {

            try
            {

                string st = "OK";
                string Result = ContextDb.AssignToHRGroup(TaskID);
                if (string.IsNullOrEmpty(Result))
                {
                    Result = "Assign to Group : Cannot retrive data from SP:AssignToHRGroup";
                    st = "Error";
                }
                else
                {
                    if (Result.ToLower().Contains("error"))
                    {
                        st = "Error";
                    }
                }


                var resp = new ResponseStatus()
                {
                    Status = st,
                    Response = Result
                };
                return resp;
            }
            catch (Exception ex)
            {

                var resp = new ResponseStatus()
                {
                    Status = "Exception",
                    Response = ex.ToString()
                };
                return resp;
            }
        }

        /// <summary>
        /// this for assign task to payroll group by company, this for violation WF only
        /// </summary>
        /// <param name="TaskID"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("AssignToPRGroup/{TaskID}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public ResponseStatus AssignToPRGroup(int TaskID)
        {

            try
            {

                string st = "OK";
                string Result = ContextDb.AssignToPRGroup(TaskID);
                if (string.IsNullOrEmpty(Result))
                {
                    Result = "Assign to Group : Cannot retrive data from SP:AssignToPRGroup";
                    st = "Error";
                }
                else
                {
                    if (Result.ToLower().Contains("error"))
                    {
                        st = "Error";
                    }
                }


                var resp = new ResponseStatus()
                {
                    Status = st,
                    Response = Result
                };
                return resp;
            }
            catch (Exception ex)
            {

                var resp = new ResponseStatus()
                {
                    Status = "Exception",
                    Response = ex.ToString()
                };
                return resp;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="TaskID"></param>
        /// <param name="Udata"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetViolationTaskDetails/{TaskID}")]
        public HttpResponseMessage GetViolationTaskDetails(int TaskID)
        {
            HttpResponseMessage Response = null;
            object Result = null;
            try
            {
                string dt = DateTime.Now.ToString();

                string response = "";
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.ErrorRetrievedDataMsg, null);
                    Response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult);
                    return Response;
                }

                var data = ContextDb.GetViolationTaskDetails(TaskID, Credential.Username, dt, out response);

                DataTable dt_Absences = data.Tables[0];
                DataTable dt_Lateness = data.Tables[1];
                DataTable dt_Violations = data.Tables[2];

                if (dt_Absences != null && dt_Absences.Rows.Count > 0)
                {
                    //Common.CheckLoclizeForData(dt_Task);
                    //Common.CheckLoclizeForData(dt_history);

                    var Absenceslst = TimeAtt.Common.MapTo<TimeAttEmployees_Absence>(dt_Absences);
                    var Latenesslst = TimeAtt.Common.MapTo<TimeAttEmployees_LATE>(dt_Lateness);
                    var Violationslst = TimeAtt.Common.MapTo<TimeAttEmployees_Violation>(dt_Violations);
                    var resp = new EmployeesViolationTaskDetails()
                    {
                        Absences = Absenceslst,
                        Lateness = Latenesslst,
                        Violations = Violationslst,
                        CompanyName = data.Tables[3].Rows[0]["CompanyName"].ToString(),
                        PeriodStart = DateTime.Parse(data.Tables[3].Rows[0]["PeriodStart"].ToString()),
                        PeriodEnd = DateTime.Parse(data.Tables[3].Rows[0]["PeriodEnd"].ToString()),
                        Response = new ResponseStatus()
                        {
                            Status = "OK",
                            Response = response
                        }
                    };

                    Result = new ResponseResult<EmployeesViolationTaskDetails>("1", Resources.Resources.SuccessRetrievedDataMsg, resp);
                    Response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {

                    Result = new ResponseResult<EmployeesViolationTaskDetails>("0", Resources.Resources.ErrorRetrievedDataMsg + Environment.NewLine + response, null);
                    Response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
            }
            catch (Exception ex)
            {
                Result = new ResponseResult<EmployeesViolationTaskDetails>("0", Resources.Resources.ErrorRetrievedDataMsg + Environment.NewLine + ex.ToString(), null);
                Response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            return Response;
        }

        /// <summary>
        /// Check Execuse Requested By manager of employee
        /// </summary>
        /// <param name="TaskID"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("Condtions/CheckExecuseRequestedByMGR/{TaskID}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage CheckExecuseRequestedByMGR(int TaskID)
        {
            HttpResponseMessage response = null;
            object Result = null;
            try
            {

                var result = ContextDb.CheckExecuseRequestedByMGR(TaskID);
                if (result)
                {
                    Result = new
                    {
                        Status = "OK",
                        Response = "True"
                    };
                }
                else
                {
                    Result = new
                    {
                        Status = "OK",
                        Response = "False"
                    };
                }

                response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            catch (Exception Exception)
            {

                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;

        }

        /// <summary>
        /// Check Fingerprint Requested By manager of employee
        /// </summary>
        /// <param name="TaskID"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("Condtions/CheckFingerprintRequestedByMGR/{TaskID}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage CheckFingerprintRequestedByMGR(int TaskID)
        {
            HttpResponseMessage response = null;
            object Result = null;
            try
            {

                var result = ContextDb.CheckFingerprintRequestedByMGR(TaskID);
                if (result)
                {
                    Result = new
                    {
                        Status = "OK",
                        Response = "True"
                    };
                }
                else
                {
                    Result = new
                    {
                        Status = "OK",
                        Response = "False"
                    };
                }

                response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            catch (Exception Exception)
            {

                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;

        }

        /// <summary>
        /// Assign To Support Services Coordinator
        /// </summary>
        /// <param name="TaskID"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("AssignToStationaryCoordinator/{TaskID}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public ResponseStatus AssignToStationaryCoordinator(int TaskID)
        {
            try
            {

                string st = "OK";
                string Result = ContextDb.AssignToStationaryCoordinator(TaskID);
                if (string.IsNullOrEmpty(Result))
                {
                    Result = "Assign to : Cannot retrive data from SP:AssignToSSCoordinator";
                    st = "Error";
                }
                else
                {
                    if (Result.ToLower().Contains("error"))
                    {
                        st = "Error";
                    }
                }


                var resp = new ResponseStatus()
                {
                    Status = st,
                    Response = Result
                };
                return resp;
            }
            catch (Exception ex)
            {

                var resp = new ResponseStatus()
                {
                    Status = "Exception",
                    Response = ex.ToString()
                };
                return resp;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="refID"></param>
        /// <param name="wFStatus"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("UpdateStationeryRequestStatus/{refID}/{wFStatus}/{userName}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage UpdateStationeryRequestStatus(long refID, short wFStatus, string userName)
        {
            object Result = null;
            HttpResponseMessage response = null;
            string outpara = "";
            try
            {

                var result = ContextDb.UpdateStationeryRequestStatus(refID, wFStatus, userName, out outpara);

                if (result <= 0)
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "Exception"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "OK"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }

            }
            catch (Exception Exception)
            {
                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };

                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }

            return response;
        }

        [HttpGet]
        [Route("Condtions/CheckRequesterCompany/{TaskID}/{company}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage CheckRequesterCompany(int TaskID, long company)
        {
            HttpResponseMessage response = null;
            object Result = null;
            try
            {

                var result = ContextDb.CheckRequesterCompany(TaskID, company);
                if (result)
                {
                    Result = new
                    {
                        Status = "OK",
                        Response = "True"
                    };
                }
                else
                {
                    Result = new
                    {
                        Status = "OK",
                        Response = "False"
                    };
                }

                response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            catch (Exception Exception)
            {

                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="refID"></param>
        /// <param name="wFStatus"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("UpdateCarPermitRequestStatus/{refID}/{wFStatus}/{userName}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage UpdateCarPermitRequestStatus(long refID, short wFStatus, string userName)
        {
            object Result = null;
            HttpResponseMessage response = null;
            string outpara = "";
            try
            {

                var result = ContextDb.UpdateCarPermitRequestStatus(refID, wFStatus, userName, out outpara);

                if (result <= 0)
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "Exception"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "OK"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }

            }
            catch (Exception Exception)
            {
                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };

                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }

            return response;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="refID"></param>
        /// <param name="wFStatus"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("UpdateCarParkingRequestStatus/{refID}/{wFStatus}/{userName}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage UpdateCarParkingRequestStatus(long refID, short wFStatus, string userName)
        {
            object Result = null;
            HttpResponseMessage response = null;
            string outpara = "";
            try
            {

                var result = ContextDb.UpdateCarParkingRequestStatus(refID, wFStatus, userName, out outpara);

                if (result <= 0)
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "Exception"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "OK"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }

            }
            catch (Exception Exception)
            {
                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };

                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }

            return response;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="refID"></param>
        /// <param name="wFStatus"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("UpdateYourVoiceRequestStatus/{refID}/{wFStatus}/{userName}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage UpdateYourVoiceRequestStatus(long refID, short wFStatus, string userName)
        {
            object Result = null;
            HttpResponseMessage response = null;
            string outpara = "";
            try
            {

                var result = ContextDb.UpdateYourVoiceRequestStatus(refID, wFStatus, userName, out outpara);

                if (result <= 0)
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "Exception"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "OK"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }

            }
            catch (Exception Exception)
            {
                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };

                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }

            return response;
        }


        [HttpGet]
        [Route("Condtions/CheckAPCTimeAttRequestedByMGR/{TaskID}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage CheckAPCTimeAttRequestedByMGR(int TaskID)
        {
            HttpResponseMessage response = null;
            object Result = null;
            try
            {

                var result = ContextDb.CheckAPCTimeAttRequestedByMGR(TaskID);
                if (result)
                {
                    Result = new
                    {
                        Status = "OK",
                        Response = "True"
                    };
                }
                else
                {
                    Result = new
                    {
                        Status = "OK",
                        Response = "False"
                    };
                }

                response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            catch (Exception Exception)
            {

                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;

        }




        /// <summary>
        /// 
        /// </summary>
        /// <param name="refID"></param>
        /// <param name="wFStatus"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("UpdateTimesheetRequestStatus/{refID}/{wFStatus}/{userName}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage UpdateTimesheetRequestStatus(long refID, short wFStatus, string userName)
        {
            object Result = null;
            HttpResponseMessage response = null;
            string outpara = "";
            try
            {
                var result = ContextDb.UpdateTimesheetRequestStatus(refID, wFStatus, userName, out outpara);
                if (result <= 0)
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "Exception"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "OK"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }

            }
            catch (Exception Exception)
            {
                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };

                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }

            return response;
        }

        [HttpGet]
        [Route("SyncEmployeeTimeSheetToOracle/{TaskID}")]
        public HttpResponseMessage SyncEmployeeTimeSheetToOracle(int TaskID)
        {
            HttpResponseMessage response = null;
            object Result = null;
            DataSet ds = null;
            List<APCTimeSheetIntegration.TimeSheetSickLeave> timeSheetSickLeave = null;
            List<APCTimeSheetIntegration.TimeSheetSickLeave> timeSheetAnnualVacation = null;
            List<APCTimeSheetIntegration.FieldTimeSheetSummary> fieldTimeSheetTotalBounce = null;
            List<APCTimeSheetIntegration.FieldTimeSheetSummary> fieldTimeSheetOvertime = null;
            List<APCTimeSheetIntegration.FieldTimeSheetSummary> fieldTimeSheetFoodAllowance = null;

            try
            {
                bool resultTotalBounce = false, resultOvertime = false, resultFoodAllowance = false, resultSickLeave = false, resultAnnualVacation = false;

                var oraRepos = new OracleIntegrationRepository();

                ds = ContextDb.GetTimesheetAttendanceBatch(TaskID);

                fieldTimeSheetTotalBounce = TimeAtt.Common.MapTo<APCTimeSheetIntegration.FieldTimeSheetSummary>(ds.Tables[0]);
                resultTotalBounce = (fieldTimeSheetTotalBounce.Count > 0 && fieldTimeSheetTotalBounce[0].VALUE > 0) ? oraRepos.SaveEmployeeTimesheetSummaryToOracle(fieldTimeSheetTotalBounce) : true;


                fieldTimeSheetOvertime = TimeAtt.Common.MapTo<APCTimeSheetIntegration.FieldTimeSheetSummary>(ds.Tables[1]);
                resultOvertime = (fieldTimeSheetOvertime.Count > 0 && fieldTimeSheetOvertime[0].VALUE > 0) ? oraRepos.SaveEmployeeTimesheetSummaryToOracle(fieldTimeSheetOvertime) : true;


                fieldTimeSheetFoodAllowance = TimeAtt.Common.MapTo<APCTimeSheetIntegration.FieldTimeSheetSummary>(ds.Tables[2]);
                resultFoodAllowance = (fieldTimeSheetFoodAllowance.Count > 0 && fieldTimeSheetFoodAllowance[0].VALUE > 0) ? oraRepos.SaveEmployeeTimesheetSummaryToOracle(fieldTimeSheetFoodAllowance) : true;

                timeSheetSickLeave = TimeAtt.Common.MapTo<APCTimeSheetIntegration.TimeSheetSickLeave>(ds.Tables[3]);
                resultSickLeave = (timeSheetSickLeave.Count > 0) ? oraRepos.SaveEmployeeTimesheetToOracle(timeSheetSickLeave) : true;

                timeSheetAnnualVacation = TimeAtt.Common.MapTo<APCTimeSheetIntegration.TimeSheetSickLeave>(ds.Tables[4]);
                resultAnnualVacation = (timeSheetAnnualVacation.Count > 0) ? oraRepos.SaveEmployeeTimesheetToOracle(timeSheetAnnualVacation) : true;

                if (resultSickLeave && resultTotalBounce && resultOvertime && resultFoodAllowance && resultAnnualVacation)
                {
                    Result = new
                    {
                        Status = "OK",
                        Response = "True"
                    };
                }
                else
                {
                    Result = new
                    {
                        Status = "Exception",
                        Response = "An unexpected error occurred while sync data."
                    };
                }
                response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            catch (Exception Exception)
            {
                Result = new
                {
                    Status = "Exception",
                    Response = "An unexpected error occurred while sync data." + Environment.NewLine + Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;
        }

        /// <summary>
        /// Assign Task To Department manager
        /// </summary>
        /// <param name="TaskID"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("AssignToEC_DeptMGR/{TaskID}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public ResponseStatus AssignToEC_DeptMGR(int TaskID)
        {
            try
            {

                string st = "OK";
                string Result = ContextDb.AssignToEC_DeptMGR(TaskID);
                if (string.IsNullOrEmpty(Result))
                {
                    Result = "Assign to : Cannot retrive data from SP:AssignToEC_DeptMGR";
                    st = "Error";
                }
                else
                {
                    if (Result.ToLower().Contains("error"))
                    {
                        st = "Error";
                    }
                }


                var resp = new ResponseStatus()
                {
                    Status = st,
                    Response = Result
                };
                return resp;
            }
            catch (Exception ex)
            {

                var resp = new ResponseStatus()
                {
                    Status = "Exception",
                    Response = ex.ToString()
                };
                return resp;
            }
        }

        [HttpGet]
        [Route("Condtions/CheckExEmployeeRequesterGrade/{TaskID}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage CheckExEmployeeRequesterGrade(int TaskID)
        {
            HttpResponseMessage response = null;
            object Result = null;
            try
            {

                var result = ContextDb.CheckExEmployeeRequesterGrade(TaskID);
                if (result)
                {
                    Result = new
                    {
                        Status = "OK",
                        Response = "True"
                    };
                }
                else
                {
                    Result = new
                    {
                        Status = "OK",
                        Response = "False"
                    };
                }

                response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            catch (Exception Exception)
            {

                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;

        }

        [HttpGet]
        [Route("UpdateExEmployeeRequestStatus/{refID}/{wFStatus}/{userName}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage UpdateExEmployeeRequestStatus(long refID, short wFStatus, string userName)
        {
            object Result = null;
            HttpResponseMessage response = null;
            string outpara = "";
            try
            {
                var result = ContextDb.UpdateExEmployeeRequestStatus(refID, wFStatus, userName, out outpara);
                if (result <= 0)
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "Exception"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "OK"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }

            }
            catch (Exception Exception)
            {
                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };

                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }

            return response;
        }
        /// <summary>
        /// This will update the Support Service request status
        /// </summary>
        /// <param name="refID"></param>
        /// <param name="wFStatus"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("UpdateSupportServiceRequestStatus/{refID}/{wFStatus}/{userName}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage UpdateSupportServiceRequestStatus(long refID, short wFStatus, string userName)
        {
            object Result = null;
            HttpResponseMessage response = null;
            string outpara = "";
            try
            {
                var result = ContextDb.UpdateSupportServiceRequestStatus(refID, wFStatus, userName, out outpara);
                if (result <= 0)
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "Exception"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "OK"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
            }
            catch (Exception Exception)
            {
                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;
        }

        /// <summary>
        /// Check Execuse Requested By AIC employee
        /// </summary>
        /// <param name="TaskID"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("Condtions/CheckExecuseRequestedByAIC/{TaskID}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage CheckExecuseRequestedByAIC(int TaskID)
        {
            HttpResponseMessage response = null;
            object Result = null;
            try
            {

                var result = ContextDb.CheckExecuseRequestedByAIC(TaskID);
                if (result)
                {
                    Result = new
                    {
                        Status = "OK",
                        Response = "True"
                    };
                }
                else
                {
                    Result = new
                    {
                        Status = "OK",
                        Response = "False"
                    };
                }

                response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            catch (Exception Exception)
            {

                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;

        }

        /// <summary>
        /// Check Execuse type is not personal
        /// </summary>
        /// <param name="TaskID"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("Condtions/CheckExecuseNotPersonal/{TaskID}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage CheckExecuseNotPersonal(int TaskID)
        {
            HttpResponseMessage response = null;
            object Result = null;
            try
            {

                var result = ContextDb.CheckExecuseNotPersonal(TaskID);
                if (result)
                {
                    Result = new
                    {
                        Status = "OK",
                        Response = "True"
                    };
                }
                else
                {
                    Result = new
                    {
                        Status = "OK",
                        Response = "False"
                    };
                }

                response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            catch (Exception Exception)
            {

                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;

        }

        /// <summary>
        /// This will update the Facility Service request status
        /// </summary>
        /// <param name="refID"></param>
        /// <param name="wFStatus"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("UpdateFacilityServiceRequestStatus/{refID}/{wFStatus}/{userName}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage UpdateFacilityServiceRequestStatus(long refID, short wFStatus, string userName)
        {
            object Result = null;
            HttpResponseMessage response = null;
            string outpara = "";
            try
            {
                var result = ContextDb.UpdateFacilityServiceRequestStatus(refID, wFStatus, userName, out outpara);
                if (result <= 0)
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "Exception"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "OK"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
            }
            catch (Exception Exception)
            {
                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;
        }

        /// <summary>
        /// This will update the Workers Accommodation request status
        /// </summary>
        /// <param name="refID"></param>
        /// <param name="wFStatus"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("UpdateWorkersAccommodationRequestStatus/{refID}/{wFStatus}/{userName}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage UpdateWorkersAccommodationRequestStatus(long refID, short wFStatus, string userName)
        {
            object Result = null;
            HttpResponseMessage response = null;
            string outpara = "";
            try
            {
                var result = ContextDb.UpdateWorkersAccommodationRequestStatus(refID, wFStatus, userName, out outpara);
                if (result <= 0)
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "Exception"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "OK"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
            }
            catch (Exception Exception)
            {
                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;
        }

        /// <summary>
        /// This will update the Labor Replacement request status
        /// </summary>
        /// <param name="refID"></param>
        /// <param name="wFStatus"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("UpdateLaborReplacementRequestStatus/{refID}/{wFStatus}/{userName}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage UpdateLaborReplacementRequestStatus(long refID, short wFStatus, string userName)
        {
            object Result = null;
            HttpResponseMessage response = null;
            string outpara = "";
            try
            {
                var result = ContextDb.UpdateLaborReplacementRequestStatus(refID, wFStatus, userName, out outpara);
                if (result <= 0)
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "Exception"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "OK"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
            }
            catch (Exception Exception)
            {
                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;
        }

        /// <summary>
        /// This will update the Warehouse Asset request status
        /// </summary>
        /// <param name="refID"></param>
        /// <param name="wFStatus"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("UpdateWarehouseAssetRequestStatus/{refID}/{wFStatus}/{userName}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage UpdateWarehouseAssetRequestStatus(long refID, short wFStatus, string userName)
        {
            object Result = null;
            HttpResponseMessage response = null;
            string outpara = "";
            try
            {
                var result = ContextDb.UpdateWarehouseAssetRequestStatus(refID, wFStatus, userName, out outpara);
                if (result <= 0)
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "Exception"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "OK"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
            }
            catch (Exception Exception)
            {
                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;
        }


        [HttpGet]
        [Route("SendSMSTo/{mobile}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public ResponseStatus SendSMSTo(string mobile)
        {

            try
            {
                Notification.Message message = new Notification.Message(mobile, "Test SMS", 18653);

                bool isSend = Notification.SMS.Send(message, 4);

                if (isSend)
                {
                    var resp = new ResponseStatus()
                    {
                        Status = "OK",
                        Response = "Success"
                    };
                    return resp;
                }

                else
                {
                    var resp = new ResponseStatus()
                    {
                        Status = "Exception",
                        Response = "Cannot find Email information to send email"
                    };
                    return resp;
                }
            }
            catch (Exception ex)
            {

                var resp = new ResponseStatus()
                {
                    Status = "Exception",
                    Response = ex.ToString()
                };
                return resp;
            }
        }

        ///// <summary>
        ///// This will update the Digital Champion request status
        ///// </summary>
        ///// <param name="refID"></param>
        ///// <param name="wFStatus"></param>
        ///// <param name="userName"></param>
        ///// <returns></returns>
        //[HttpGet]
        //[Route("UpdateDigitalChampionRequestStatus/{refID}/{wFStatus}/{userName}")]
        //[CustomAuthorize(ValidateUserAndPassword = true)]
        //public HttpResponseMessage UpdateDigitalChampionRequestStatus(long refID, short wFStatus, string userName)
        //{
        //    object Result = null;
        //    HttpResponseMessage response = null;
        //    string outpara = "";
        //    try
        //    {
        //        var result = ContextDb.UpdateDigitalChampionRequestStatus(refID, wFStatus, userName, out outpara);
        //        if (result <= 0)
        //        {
        //            Result = new
        //            {
        //                Response = outpara,
        //                Status = "Exception"
        //            };
        //            response = Request.CreateResponse(HttpStatusCode.OK, Result);
        //        }
        //        else
        //        {
        //            Result = new
        //            {
        //                Response = outpara,
        //                Status = "OK"
        //            };
        //            response = Request.CreateResponse(HttpStatusCode.OK, Result);
        //        }
        //    }
        //    catch (Exception Exception)
        //    {
        //        Result = new
        //        {
        //            Status = "Exception",
        //            Response = Exception.Message
        //        };
        //        response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
        //    }
        //    return response;
        //}



        ///// <summary>
        ///// This will update the Digital Champion request status
        ///// </summary>
        ///// <param name="refID"></param>
        ///// <param name="wFStatus"></param>
        ///// <param name="userName"></param>
        ///// <returns></returns>
        [HttpGet]
        [Route("UpdateDisabilityRequestStatus/{refID}/{wFStatus}/{userName}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage UpdateDisabilityRequestStatus(long refID, short wFStatus, string userName)
        {
            object Result = null;
            HttpResponseMessage response = null;
            string outpara = "";
            try
            {
                var result = ContextDb.UpdateDisabilityRequestStatus(refID, wFStatus, userName, out outpara);
                if (result <= 0)
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "Exception"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "OK"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
            }
            catch (Exception Exception)
            {
                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;
        }

        ///// <summary>
        ///// This will update the Digital Champion request status
        ///// </summary>
        ///// <param name="refID"></param>
        ///// <param name="wFStatus"></param>
        ///// <param name="userName"></param>
        ///// <returns></returns>
        //[HttpGet]
        //[Route("UpdateDigitalChampionRequestStatus/{refID}/{wFStatus}/{userName}")]
        //[CustomAuthorize(ValidateUserAndPassword = true)]
        //public HttpResponseMessage UpdateDigitalChampionRequestStatus(long refID, short wFStatus, string userName)
        //{
        //    object Result = null;
        //    HttpResponseMessage response = null;
        //    string outpara = "";
        //    try
        //    {
        //        var result = ContextDb.UpdateDigitalChampionRequestStatus(refID, wFStatus, userName, out outpara);
        //        if (result <= 0)
        //        {
        //            Result = new
        //            {
        //                Response = outpara,
        //                Status = "Exception"
        //            };
        //            response = Request.CreateResponse(HttpStatusCode.OK, Result);
        //        }
        //        else
        //        {
        //            Result = new
        //            {
        //                Response = outpara,
        //                Status = "OK"
        //            };
        //            response = Request.CreateResponse(HttpStatusCode.OK, Result);
        //        }
        //    }
        //    catch (Exception Exception)
        //    {
        //        Result = new
        //        {
        //            Status = "Exception",
        //            Response = Exception.Message
        //        };
        //        response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
        //    }
        //    return response;
        //}



        ///// <summary>
        ///// This will update the Course Registration request status
        ///// </summary>
        ///// <param name="refID"></param>
        ///// <param name="wFStatus"></param>
        ///// <param name="userName"></param>
        ///// <returns></returns>
        [HttpGet]
        [Route("UpdateCourseRegistrationRequestStatus/{refID}/{wFStatus}/{userName}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage UpdateCourseRegistrationRequestStatus(long refID, short wFStatus, string userName)
        {
            object Result = null;
            HttpResponseMessage response = null;
            string outpara = "";
            try
            {
                var result = ContextDb.UpdateCourseRegistrationRequestStatus(refID, wFStatus, userName, out outpara);
                if (result <= 0)
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "Exception"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "OK"
                    };
                    //here we need to check if approved then run the register function
                    //1- get details from ReqgisrtationRequest tableby refID
                    if (wFStatus == 2)
                    {
                        var coursex = ContextDb.GetRegistrationRequestByID(refID);
                        if (coursex != null)
                        {
                            PostApprovedCourseRegistrationAsync(coursex[0].CourseID, coursex[0].EmpNo, coursex[0].EmpUsername);
                        }
                    }
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
            }
            catch (Exception Exception)
            {
                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;
        }

        /// <summary>
        /// thsi will register approved member to be part of athe requested course
        /// </summary>
        /// <param name="courseID"></param>
        /// <param name="empNo"></param>
        /// <param name="empUsername"></param>
        /// <returns></returns>
        public bool PostApprovedCourseRegistrationAsync(int courseID, long empNo, string empUsername)
        {
            CourseRegistration registrationDetails = null;
            HttpClientHandler handler = new HttpClientHandler();
            bool status = false;
            try
            {
                using (var client = new HttpClient(handler, false))
                {
                    //HTTP GET
                    client.DefaultRequestHeaders.Add("currentuser", empUsername + "@alkhorayef.com");
                    client.DefaultRequestHeaders.Add("api-key", "28236d7r5t80df53u5e4v472d55v0w6g");
                    //https://services.alkhorayef.com/LMS/CourseRegistrationAfterApproval/
                    var responseTask = client.GetAsync("https://services.alkhorayef.com/LMS/CourseRegistrationAfterApproval/LMS/CourseRegistrationAfterApproval/" + courseID + "/" + empNo + "/" + empUsername);
                    responseTask.Wait();
                    var result = responseTask.Result;
                    //if (result.IsSuccessStatusCode)
                    //{
                    //    //var readTask = result.Content.ReadAsAsync<CourseRegistration>();
                    //    //readTask.Wait();
                    //    //registrationDetails = readTask.Result;
                    //}
                    status = result.IsSuccessStatusCode;
                }
                return status;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        /// <summary>
        /// Check AIC requester is region manager
        /// </summary>
        /// <param name="TaskID"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("Condtions/CheckAICRequesterIsRegionManager/{TaskID}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage CheckAICRequesterIsRegionManager(int TaskID)
        {
            HttpResponseMessage response = null;
            object Result = null;
            try
            {

                var result = ContextDb.CheckAICRequesterIsRegionManager(TaskID);
                if (result)
                {
                    Result = new
                    {
                        Status = "OK",
                        Response = "True"
                    };
                }
                else
                {
                    Result = new
                    {
                        Status = "OK",
                        Response = "False"
                    };
                }

                response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            catch (Exception Exception)
            {

                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;

        }
        /// <summary>
        /// Assign To  AIC Region MGR
        /// </summary>
        /// <param name="TaskID"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("AssignToAICRegionMGR/{TaskID}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public ResponseStatus AssignToAICRegionMGR(int TaskID)
        {
            try
            {

                string st = "OK";
                string Result = ContextDb.AssignToAICRegionMGR(TaskID);
                if (string.IsNullOrEmpty(Result))
                {
                    Result = "Assign to : Cannot retrive data from SP:AssignToAICRegionMGR";
                    st = "Error";
                }
                else
                {
                    if (Result.ToLower().Contains("error"))
                    {
                        st = "Error";
                    }
                }


                var resp = new ResponseStatus()
                {
                    Status = st,
                    Response = Result
                };
                return resp;
            }
            catch (Exception ex)
            {

                var resp = new ResponseStatus()
                {
                    Status = "Exception",
                    Response = ex.ToString()
                };
                return resp;
            }
        }

        ///// <summary>
        ///// This will update the Digital Champion request status
        ///// </summary>
        ///// <param name="refID"></param>
        ///// <param name="wFStatus"></param>
        ///// <param name="userName"></param>
        ///// <returns></returns>
        //[HttpGet]
        //[Route("UpdateDigitalChampionRequestStatus/{refID}/{wFStatus}/{userName}")]
        //[CustomAuthorize(ValidateUserAndPassword = true)]
        //public HttpResponseMessage UpdateDigitalChampionRequestStatus(long refID, short wFStatus, string userName)
        //{
        //    object Result = null;
        //    HttpResponseMessage response = null;
        //    string outpara = "";
        //    try
        //    {
        //        var result = ContextDb.UpdateDigitalChampionRequestStatus(refID, wFStatus, userName, out outpara);
        //        if (result <= 0)
        //        {
        //            Result = new
        //            {
        //                Response = outpara,
        //                Status = "Exception"
        //            };
        //            response = Request.CreateResponse(HttpStatusCode.OK, Result);
        //        }
        //        else
        //        {
        //            Result = new
        //            {
        //                Response = outpara,
        //                Status = "OK"
        //            };
        //            response = Request.CreateResponse(HttpStatusCode.OK, Result);
        //        }
        //    }
        //    catch (Exception Exception)
        //    {
        //        Result = new
        //        {
        //            Status = "Exception",
        //            Response = Exception.Message
        //        };
        //        response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
        //    }
        //    return response;
        //}



        ///// <summary>
        ///// This will update the Alternative User request status
        ///// </summary>
        ///// <param name="refID"></param>
        ///// <param name="wFStatus"></param>
        ///// <param name="userName"></param>
        ///// <returns></returns>
        [HttpGet]
        [Route("UpdateAlternativeUsersStatusV2/{refID}/{wFStatus}/{userName}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage UpdateAlternativeUsersStatusV2(long refID, short wFStatus, string userName)
        {
            object Result = null;
            HttpResponseMessage response = null;
            string outpara = "";
            try
            {
                var result = ContextDb.UpdateAlternativeUsersStatusV2(refID, wFStatus, userName, out outpara);
                if (result <= 0)
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "Exception"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "OK"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
            }
            catch (Exception Exception)
            {
                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;
        }
        

        [HttpGet]
        [Route("UpdateAICFacilityRequestStatus/{refID}/{wFStatus}/{userName}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage UpdateAICFacilityRequestStatus(long refID, short wFStatus, string userName)
        {
            object Result = null;
            HttpResponseMessage response = null;
            string outpara = "";
            try
            {
                var result = ContextDb.UpdateAICFacilityRequestStatus(refID, wFStatus, userName, out outpara);
                if (result <= 0)
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "Exception"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "OK"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
            }
            catch (Exception Exception)
            {
                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;
        }
        [HttpGet]
        [Route("Condtions/CheckAPCOvertimeReqOver80/{TaskID}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage CheckAPCOvertimeReqOver80(int TaskID)
        {
            HttpResponseMessage response = null;
            object Result = null;
            try
            {

                var result = ContextDb.CheckAPCOvertimeReqOver80(TaskID);
                if (result)
                {
                    Result = new
                    {
                        Status = "OK",
                        Response = "True"
                    };
                }
                else
                {
                    Result = new
                    {
                        Status = "OK",
                        Response = "False"
                    };
                }

                response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            catch (Exception Exception)
            {

                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;

        }
        [HttpGet]
        [Route("UpdateOccasionRequestStatus/{refID}/{wFStatus}/{userName}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage UpdateOccasionRequestStatus(long refID, short wFStatus, string userName)
        {
            object Result = null;
            HttpResponseMessage response = null;
            string outpara = "";
            try
            {
                var result = ContextDb.UpdateOccasionRequestStatus(refID, wFStatus, userName, out outpara);
                if (result <= 0)
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "Exception"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "OK"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
            }
            catch (Exception Exception)
            {
                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;
        }
        [HttpGet]
        [Route("UpdateOvertimeManagerRequest/{refID}/{wFStatus}/{userName}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage UpdateOvertimeManagerRequest(long refID, short wFStatus, string userName)
        {
            object Result = null;
            HttpResponseMessage response = null;
            string outpara = "";
            try
            {
                var result = ContextDb.UpdateOvertimeManagerRequest(refID, wFStatus, userName, out outpara);
                if (result <= 0)
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "Exception"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "OK"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
            }
            catch (Exception Exception)
            {
                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;
        }

        [HttpGet]
        [Route("UpdateOvertimePresidentRequest/{refID}/{wFStatus}/{userName}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage UpdateOvertimePresidentRequest(long refID, short wFStatus, string userName)
        {
            object Result = null;
            HttpResponseMessage response = null;
            string outpara = "";
            try
            {
                var result = ContextDb.UpdateOvertimePresidentRequest(refID, wFStatus, userName, out outpara);
                if (result <= 0)
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "Exception"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "OK"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
            }
            catch (Exception Exception)
            {
                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;
        }

        [HttpGet]
        [Route("UpdateBusinessCardRequestStatus/{refID}/{wFStatus}/{userName}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage UpdateBusinessCardRequestStatus(long refID, short wFStatus, string userName)
        {
            object Result = null;
            HttpResponseMessage response = null;
            string outpara = "";
            try
            {
                var result = ContextDb.UpdateBusinessCardRequestStatus(refID, wFStatus, userName, out outpara);
                if (result <= 0)
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "Exception"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "OK"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
            }
            catch (Exception Exception)
            {
                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;
        }

        [HttpGet]
        [Route("UpdateOra_EmpTrainingRequestStatus/{refID}/{wFStatus}/{userName}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage UpdateOra_EmpTrainingRequestStatus(long refID, short wFStatus, string userName)
        {
            object Result = null;
            HttpResponseMessage response = null;
            string outpara = "";
            try
            {
                var result = ContextDb.UpdateOra_EmpTrainingRequestStatus(refID, wFStatus, userName, out outpara);
                if (result <= 0)
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "Exception"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "OK"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
            }
            catch (Exception Exception)
            {
                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;
        }
        [HttpGet]
        [Route("RejectViolationRequestStatus/{refID}/{wFStatus}/{userName}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage RejectViolationRequestStatus(long refID, short wFStatus, string userName)
        {
            object Result = null;
            HttpResponseMessage response = null;
            string outpara = "";
            try
            {
                var result = ContextDb.RejectViolationRequestStatus(refID, wFStatus, userName, out outpara);
                if (result <= 0)
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "Exception"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "OK"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
            }
            catch (Exception Exception)
            {
                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="TaskID"></param>
        /// <param name="ActionID"></param>
        /// <param name="userName"></param>
        /// <param name="appID"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("SendMobileAppNotification/{TaskID}/{ActionID}/{userName}/{appID}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage SendMobileAppNotification(long TaskID,int ActionID, string userName,int appID)
        {
object Result = null;
                HttpResponseMessage response = null;
            try
            {
                
                var result = ContextDb.SendMobileAppNotification(TaskID, userName,appID,ActionID);
                if (result <= 0)
                {
                    Result = new
                    {
                        Response = "outpara",
                        Status = "Exception"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new
                    {
                        Response = "outpara",
                        Status = "OK"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
            }
            catch (Exception Exception)
            {
                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;
        }
        
        [HttpGet]
        [Route("Condtions/CheckExecuseApprovedByCSSO/{TaskID}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage CheckExecuseApprovedByCSSO(int TaskID)
        {
            HttpResponseMessage response = null;
            object Result = null;
            try
            {

                var result = ContextDb.CheckExecuseApprovedByCSSO(TaskID);
                if (result)
                {
                    Result = new
                    {
                        Status = "OK",
                        Response = "True"
                    };
                }
                else
                {
                    Result = new
                    {
                        Status = "OK",
                        Response = "False"
                    };
                }

                response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            catch (Exception Exception)
            {

                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;

        }

        [HttpGet]
        [Route("Condtions/CheckExecuseApprovedByCurrentUser/{TaskID}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage CheckExecuseApprovedByCurrentUser(int TaskID)
        {
            HttpResponseMessage response = null;
            object Result = null;
            try
            {

                var result = ContextDb.CheckExecuseApprovedByCurrentUser(TaskID);
                if (result)
                {
                    Result = new
                    {
                        Status = "OK",
                        Response = "True"
                    };
                }
                else
                {
                    Result = new
                    {
                        Status = "OK",
                        Response = "False"
                    };
                }

                response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            catch (Exception Exception)
            {

                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;

        }

        [HttpGet]
        [Route("UpdateRedemptionRequestStatus/{refID}/{wFStatus}/{userName}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage UpdateRedemptionRequestStatus(long refID, short wFStatus, string userName)
        {
            object Result = null;
            HttpResponseMessage response = null;
            string outpara = "";
            try
            {
                var result = ContextDb.UpdateRedemptionRequestStatus(refID, wFStatus, userName, out outpara);
                if (result <= 0)
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "Exception"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    Result = new
                    {
                        Response = outpara,
                        Status = "OK"
                    };
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
            }
            catch (Exception Exception)
            {
                Result = new
                {
                    Status = "Exception",
                    Response = Exception.Message
                };
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, Result);
            }
            return response;
        }
    }
}
