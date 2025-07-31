using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using TimeAtt;
using TimeAtt.Model;
using TimeAtt.Models;
using TimeAtt.Security;

namespace TimeAttWebAPI.Controllers
{
    [RoutePrefix("SelfServices")]
    public class SelfServicesController : ApiController
    {
        private ExcusesRepository excusesRepository;
        private TimeSheetRepositry timeSheetRepositry;
        private VacationsRepository vacationsRepository;
        private TransReasonRepository transReasonRepository;
        private VacationsTypeRepository vacationsTypeRepository;

        /// <summary>
        /// 
        /// </summary>
        public SelfServicesController()
        {
            this.excusesRepository = new ExcusesRepository();
            this.timeSheetRepositry = new TimeSheetRepositry();
            this.vacationsRepository = new VacationsRepository();
            this.transReasonRepository = new TransReasonRepository();
            this.vacationsTypeRepository = new VacationsTypeRepository();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetCurrent")]
        [ResponseType(typeof(ResponseResult<CustomPrincipal>))]
        public HttpResponseMessage GetCurrent()
        {
            HttpResponseMessage response = null;
            try
            {
                var UserData = RequestContext.Principal as CustomPrincipal;
                var responeResult = new ResponseResult<CustomPrincipal>("1", Resources.Resources.SuccessRetrievedDataMsg, UserData);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.RequestUnauthorizedMsg, Exception.Message + Environment.NewLine + Exception.InnerException == null ? "" : Exception.InnerException.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }

        #region Excuse
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("Excuse/Reasons/GetAll")]
        [AllowAnonymous]
        public HttpResponseMessage GetAllExcuseReasons()
        {
            //return sectionsRepository.GetSingle(id);
            HttpResponseMessage response = null;
            try
            {
                var Result = excusesRepository.GetAllReasons();
                //object myresult =  new  {data = result  };
                var responeResult = new ResponseResult<IEnumerable<ExecuseReasonInfo>>("1", Resources.Resources.SuccessRetrievedDataMsg, Result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.ErrorExcuseReasonRetriveData + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="ExcInfo"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("Excuse/CanAdd")]
        public HttpResponseMessage CanAddExcuse([FromBody] ExecuseInfo ExcInfo)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.AddExcuseErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult);
                    return response;
                }
                var result = excusesRepository.CanAddExcuse(ExcInfo, Credential.Username);
                Common.CheckLoclizeForData(result.Tables[0]);
                var res = TimeAtt.Common.MapTo<ResponseStatus>(result.Tables[0]).SingleOrDefault();

                if (res.Status.ToLower() == "ok")
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("1", Resources.Resources.ExcuseAddedSuccessMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("0", res.Response, ExcInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
            }
            catch (Exception ex)
            {
                var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.AddExcuseErrorMsg + ex.Message, null);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            return response;
        }
        [HttpGet]
        [Route("Excuse/GetShiftInfo/{mDate}/{empNo?}")]
        public HttpResponseMessage GetShiftInfo(int mDate, int? empNo = null)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeRes = new ResponseResult<ShiftInfo>("0", Resources.Resources.AddExcuseErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeRes);
                    return response;
                }
               
                var data = excusesRepository.GetShiftInfo(empNo.Value, mDate);
                if (data != null)
                {
                    var responeResult = new ResponseResult<ShiftInfo>("1", Resources.Resources.SuccessRetrievedDataMsg, data);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<ShiftInfo>("0", Resources.Resources.LoadDataErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<ShiftInfo>("0", Resources.Resources.LoadDataErrorMsg, null);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);


            }
            return response;
        }

        [HttpPost]
        [Route("WorkRemote/AddByEmp")]
        public HttpResponseMessage AddByEmp([FromBody] ExecuseInfo ExcInfo)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.AddExcuseErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult);
                    return response;
                }
                var execID = excusesRepository.AddExcuseByEmp(ExcInfo, Credential.Username);
                if (execID > 0)
                {
                    TaskInfo task = new TaskInfo();
                    task.AppID = (int)Applications.ExecuseApp;
                    task.WorkFlowID = (int)WorkFlow.RemotelyWF;
                    task.Title = Resources.Resources.RemotelyReqlblAR;
                    task.TitleEN = Resources.Resources.RemotelyReqlblEN;
                    task.RefID = execID;
                    task.TaskDetails = ExcInfo.TaskDetails;
                    task.Requester = Credential.Username;

                    WorkflowController workflow = new WorkflowController();
                    var res = workflow.CreateNewTask(task);
                    if (res.Status.ToLower() == "ok")
                    {
                        var responeResult = new ResponseResult<ExecuseInfo>("1", Resources.Resources.ExcuseAddedSuccessMsg, ExcInfo);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }
                    else
                    {
                        excusesRepository.DeleteFaieldExecuse(execID);
                        var msg = Resources.Resources.AddExcuseErrorMsg;
                        var responeResult = new ResponseResult<ExecuseInfo>("0", msg, null);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }

                }
                else
                {
                    var msg = Resources.Resources.AddExcuseErrorMsg;
                    var responeResult = new ResponseResult<ExecuseInfo>("0", msg, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception ex)
            {
                var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.AddExcuseErrorMsg + ex.Message, null);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            return response;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="ExecuseData"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("WorkRemote/ManagerAddExecuse")]
        public HttpResponseMessage ManagerAddExecuse([FromBody] ExecuseInfo ExcInfo)
        {
            string msg;
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.AddExcuseErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult);
                    return response;
                }
               
                var execID = excusesRepository.ManagerAddExecuse(ExcInfo, Credential.Username);
                if (execID > 0)
                {
                    ExcInfo.exc_id = execID;

                    TaskInfo task = new TaskInfo();
                    task.AppID = (int)Applications.ExecuseApp;
                    task.WorkFlowID = (int)WorkFlow.RemotelyWF;
                    task.Title = Resources.Resources.RemotelyReqlblAR;
                    task.TitleEN = Resources.Resources.RemotelyReqlblEN;
                    task.RefID = execID;
                    task.TaskDetails = ExcInfo.TaskDetails;
                    task.Requester = Credential.Username;


                    WorkflowController workflow = new WorkflowController();
                    var res = workflow.CreateNewTask(task, ExcInfo.AttachmentFile, ExcInfo.AttachmentFileExt);
                    if (res.Status.ToLower() == "ok")
                    {
                        var responeResult = new ResponseResult<ExecuseInfo>("1", Resources.Resources.ExcuseAddedSuccessMsg, ExcInfo);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }
                    else
                    {
                        excusesRepository.DeleteFaieldExecuse(execID);
                        msg = Resources.Resources.AddExcuseErrorMsg;
                        var responeResult = new ResponseResult<ExecuseInfo>("0", msg, null);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }

                }
                else
                {
                    msg = Resources.Resources.AddExcuseErrorMsg;
                    var responeResult = new ResponseResult<ExecuseInfo>("0", msg, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception ex)
            {
                var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.AddExcuseErrorMsg + ex.Message, null);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            return response;
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="ExcInfo"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("Excuse/AddByEmp")]
        public HttpResponseMessage AddExcuseByEmp([FromBody] ExecuseInfo ExcInfo)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.AddExcuseErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult);
                    return response;
                }
                var execID = excusesRepository.AddExcuseByEmp(ExcInfo, Credential.Username);
                if (execID > 0)
                {
                    ExcInfo.exc_id = execID;

                    TaskInfo task = new TaskInfo();
                    task.AppID = (int)Applications.ExecuseApp;
                    task.WorkFlowID = (int)WorkFlow.ExecuseWF;
                    task.Title = Resources.Resources.ExcuseRequestAR;
                    task.TitleEN = Resources.Resources.ExcuseRequestEN;
                    task.RefID = execID;
                    task.TaskDetails = ExcInfo.TaskDetails;
                    task.Requester = Credential.Username;

                    WorkflowController workflow = new WorkflowController();
                    var res = workflow.CreateNewTask(task);
                    if (res.Status.ToLower() == "ok")
                    {
                        var responeResult = new ResponseResult<ExecuseInfo>("1", Resources.Resources.ExcuseAddedSuccessMsg, ExcInfo);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }
                    else
                    {
                        excusesRepository.DeleteFaieldExecuse(execID);
                        var msg = Resources.Resources.AddExcuseErrorMsg;
                        var responeResult = new ResponseResult<ExecuseInfo>("0", msg, null);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }

                }
                else
                {
                    var msg = Resources.Resources.AddExcuseErrorMsg;
                    var responeResult = new ResponseResult<ExecuseInfo>("0", msg, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception ex)
            {
                var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.AddExcuseErrorMsg + ex.Message, null);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            return response;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="execID"></param>
        public void DeleteFaieldExecuse(int execID)
        {

            try
            {
                excusesRepository.DeleteFaieldExecuse(execID);
            }
            catch (Exception)
            {

                throw;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="WFStatus"></param>
        /// <param name="RefID"></param>
        /// <param name="CurrentUser"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("Excuse/UpdateEmpExecuse/{WFStatus}/{RefID}/{CurrentUser}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public ResponseStatus UpdateEmpExecuse(short WFStatus, int RefID, string CurrentUser)
        {
            string outpara = "";
            try
            {
                int res = excusesRepository.UpdateEmpExecuse(RefID, WFStatus, CurrentUser, out outpara);
                if (res < 0)
                    return new ResponseStatus()
                    {
                        Status = "Exception",
                        Response = outpara
                    };

                else
                    return new ResponseStatus()
                    {
                        Status = "OK",
                        Response = outpara
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="ExcInfo"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("Excuse/CanManagerAddExecuse")]
        public HttpResponseMessage CanManagerAddExecuse([FromBody] ExecuseInfo ExcInfo)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.AddExcuseErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult);
                    return response;
                }
                var result = excusesRepository.CanManagerAddExecuse(ExcInfo, Credential.Username);
                Common.CheckLoclizeForData(result.Tables[0]);
                var res = TimeAtt.Common.MapTo<ResponseStatus>(result.Tables[0]).SingleOrDefault();

                if (res.Status.ToLower() == "ok")
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("1", Resources.Resources.ExcuseAddedSuccessMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("0", res.Response, ExcInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
            }
            catch (Exception ex)
            {
                var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.AddExcuseErrorMsg + ex.Message, null);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            return response;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("Excuse/AddByEmpWithAttach")]
        public HttpResponseMessage AddExcuseByEmpWithAttach()
        {
            ExecuseInfo ExcInfo = null;
            var httpRequest = HttpContext.Current.Request;
            byte[] fileRcrd = null;
            Stream file_Strm = null;
            var msg = "";
            HttpResponseMessage response = null;
            try
            {
                ExcInfo = new ExecuseInfo();
                if (httpRequest.Files.Count > 0)
                {
                    for (int i = 0; i < httpRequest.Files.Count; i++)
                    {
                        var postedFile = httpRequest.Files[i];
                        var ext = Path.GetExtension(postedFile.FileName).ToLower();
                        var extarr = ConfigurationManager.AppSettings["FileTypes"].ToString().Split(',');// new string[] { ".gif", ".png", ".jpg", ".jpeg", ".pdf", ".docx", ".doc", ".msg", ".eml" };

                        if (!extarr.Contains(ext))
                        {
                            msg = string.Format(Resources.Resources.LogoMustBeImageMsg, ConfigurationManager.AppSettings["FileTypes"].ToString());
                            var responeResult = new ResponseResult<ExecuseInfo>("0", msg, null);
                            response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                            return response;
                        }
                        else
                        {
                            msg = "";
                        }

                        if (msg == "")
                        {
                            fileRcrd = new byte[postedFile.ContentLength];
                            file_Strm = postedFile.InputStream;
                            file_Strm.Read(fileRcrd, 0, postedFile.ContentLength);
                        }
                        if (httpRequest.Files.AllKeys[i] == "AttachmentFile")
                        {
                            ExcInfo.AttachmentFile = fileRcrd;
                            ExcInfo.AttachmentFileExt = ext;
                        }
                    }
                }


                ExcInfo.exc_date = httpRequest.Form["exc_date"].ToString();
                ExcInfo.exc_todate = httpRequest.Form["exc_todate"].ToString();
                ExcInfo.exc_ftime = httpRequest.Form["exc_ftime"].ToString();
                ExcInfo.exc_ttime = httpRequest.Form["exc_ttime"].ToString();
                ExcInfo.exc_reason = httpRequest.Form["exc_reason"].ToString();
                ExcInfo.execuseReason_ID = httpRequest.Form["execuseReason_ID"].ToInt();
                ExcInfo.exc_type = httpRequest.Form["exc_type"].ToInt();
                var execuseReasonString = httpRequest.Form["execuseReasonString"].ToString();
                var exc_TotalTime = httpRequest.Form["exc_TotalTime"].ToString();



                string ReqDetailsBody = @"<div class=''>
                            <div>
                                <div class='form-detail'>
                                    <label class='cell-3 pr0' res-type='H' res-name='ExcuseDateClm'>" + Resources.Resources.ExcuseDateClm + @"</label>
                                    <span id='lb_execdate'>" + ExcInfo.exc_date.GetDateFromNumber().ToString("dd/MM/yyyy") + @"</span>" +
                                      (ExcInfo.exc_todate != "-1" ? @" <span> to " + ExcInfo.exc_todate.GetDateFromNumber().ToString("dd/MM/yyyy") + @" </span>" : "") +
                                
                                @"</div>

                                <div class='form-detail'>
                                    <label class='cell-3 pr0' res-type='H' res-name='ExcuseTypeLable'>" + Resources.Resources.ExcuseTypeLable + @"</label>
                                    <span id='lb_exectype'>" + (ExcInfo.exc_type == 1 ? Resources.Resources.ExcuseTypePersonal : Resources.Resources.ExcuseTypeOfficialDuty) + @"</span>
                                </div>
                                <div class='form-detail'>
                                    <label class='cell-3 pr0' res-type='H' res-name='Excuse_Reason'>" + Resources.Resources.Excuse_Reason + @"</label>
                                    <span id='lb_execreseon'>" + execuseReasonString + @"</span>
                                </div>
                                <div class='form-detail'>
                                    <label class='cell-3 pr0' res-type='H' res-name='ExcuseTime'>" + Resources.Resources.ExcuseTime + @"</label>
                                    <span id='lb_exectime'>
                                        <span res-type='H' res-name='FromLable'>" + Resources.Resources.FromLable + @"</span>
                                        <span>" + ExcInfo.exc_ftime + @"</span>
                                        <span res-type='H' res-name='ToLable'>" + Resources.Resources.ToLable + @"</span>
                                        <span>" + ExcInfo.exc_ttime + @"</span>
                                        <span res-type='H' res-name='ExcuseTotalLable'>" + Resources.Resources.ExcuseTotalLable + @"</span>
                                    </span>
                                    <b>
                                        <span id='lb_exectotaltime'> " + exc_TotalTime + @"</span>
                                    </b>
                                </div>
                                <div class='form-detail'>
                                    <label class='cell-3 pr0' res-type='H' res-name='NotesLable'>" + Resources.Resources.NotesLable + @"</label>
                                    <span id='lb_execnote'>" + ExcInfo.exc_reason + @"</span>
                                </div>
                            </div>
                        </div>";

                ExcInfo.TaskDetails = ReqDetailsBody;// httpRequest.Form["TaskDetails"].ToString();



                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.AddExcuseErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult);
                    return response;
                }
                var list = excusesRepository.AddExcuseByEmpV2(ExcInfo, Credential.Username);
                if (list.Count > 0 && list != null)
                {
                    ExcInfo.exc_id = list[0].exc_id;

                    TaskInfo task = new TaskInfo();
                    task.AppID = (int)Applications.ExecuseApp;
                    task.WorkFlowID = (int)WorkFlow.ExecuseWF;
                    task.Title = Resources.Resources.ExcuseRequestAR;
                    task.TitleEN = Resources.Resources.ExcuseRequestEN;
                    task.RefID = ExcInfo.exc_id;
                    task.TaskDetails = ExcInfo.TaskDetails;
                    task.Requester = Credential.Username;

                    WorkflowController workflow = new WorkflowController();
                    var res = workflow.CreateNewTaskV2(task, ExcInfo.AttachmentFile, ExcInfo.AttachmentFileExt);
                    if (res.Status.ToLong() > 0)
                    {
                        foreach (var item in list)
                             excusesRepository.UpdateExecuseTaskID(item.exc_id, res.Status.ToLong());

                        var responeResult = new ResponseResult<ExecuseInfo>("1", Resources.Resources.ExcuseAddedSuccessMsg, ExcInfo);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }
                    else
                    {
                        foreach (var item in list)
                            excusesRepository.DeleteFaieldExecuse(item.exc_id);
                        //excusesRepository.DeleteFaieldExecuse(execID);
                        msg = Resources.Resources.AddExcuseErrorMsg;
                        var responeResult = new ResponseResult<ExecuseInfo>("0", msg, null);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }

                }
                else
                {
                    msg = Resources.Resources.AddExcuseErrorMsg;
                    var responeResult = new ResponseResult<ExecuseInfo>("0", msg, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception ex)
            {
                var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.AddExcuseErrorMsg + ex.Message, null);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            return response;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="ExecuseData"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("Excuse/ManagerAddExecuseWithAttach")]
        public HttpResponseMessage ManagerAddExecuse()
        {
            ExecuseInfo ExcInfo = null;
            var httpRequest = HttpContext.Current.Request;
            byte[] fileRcrd = null;
            Stream file_Strm = null;
            var msg = "";
            HttpResponseMessage response = null;
            try
            {
                ExcInfo = new ExecuseInfo();
                if (httpRequest.Files.Count > 0)
                {
                    for (int i = 0; i < httpRequest.Files.Count; i++)
                    {
                        var postedFile = httpRequest.Files[i];
                        var ext = Path.GetExtension(postedFile.FileName).ToLower();
                        var extarr = ConfigurationManager.AppSettings["FileTypes"].ToString().Split(',');// new string[] { ".gif", ".png", ".jpg", ".jpeg", ".pdf", ".docx", ".doc", ".msg", ".eml" };

                        if (!extarr.Contains(ext))
                        {
                            msg = string.Format(Resources.Resources.LogoMustBeImageMsg, ConfigurationManager.AppSettings["FileTypes"].ToString());
                            var responeResult = new ResponseResult<ExecuseInfo>("0", msg, null);
                            response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                            return response;
                        }
                        else
                        {
                            msg = "";
                        }

                        if (msg == "")
                        {
                            fileRcrd = new byte[postedFile.ContentLength];
                            file_Strm = postedFile.InputStream;
                            file_Strm.Read(fileRcrd, 0, postedFile.ContentLength);
                        }
                        if (httpRequest.Files.AllKeys[i] == "AttachmentFile")
                        {
                            ExcInfo.AttachmentFile = fileRcrd;
                            ExcInfo.AttachmentFileExt = ext;
                        }
                    }
                }

                ExcInfo.exc_empid = httpRequest.Form["exc_empid"].ToInt();
                ExcInfo.emp_name = httpRequest.Form["emp_name"].ToString();
                ExcInfo.exc_date = httpRequest.Form["exc_date"].ToString();
                ExcInfo.exc_todate = httpRequest.Form["exc_todate"].ToString();
                ExcInfo.exc_ftime = httpRequest.Form["exc_ftime"].ToString();
                ExcInfo.exc_ttime = httpRequest.Form["exc_ttime"].ToString();
                ExcInfo.exc_reason = httpRequest.Form["exc_reason"].ToString();
                ExcInfo.execuseReason_ID = httpRequest.Form["execuseReason_ID"].ToInt();
                ExcInfo.exc_type = httpRequest.Form["exc_type"].ToInt();
                var execuseReasonString = httpRequest.Form["execuseReasonString"].ToString();
                var exc_TotalTime = httpRequest.Form["exc_TotalTime"].ToString();



                string ReqDetailsBody = @"<div class=''>
                            <div>
                                <div class='form-detail'>
                                    <label class='cell-3 pr0' res-type='H' res-name='EmployeeName'>" + Resources.Resources.EmployeeName + @"</label>
                                    <span id='lb_execdate'>" + ExcInfo.emp_name + @"</span>
                                </div>
                                <div class='form-detail'>
                                    <label class='cell-3 pr0' res-type='H' res-name='ExcuseDateClm'>" + Resources.Resources.ExcuseDateClm + @"</label>
                                    <span id='lb_execdate'>" + ExcInfo.exc_date.GetDateFromNumber().ToString("dd/MM/yyyy") + @"</span>"+
                                    (ExcInfo.exc_todate != "-1" ? @" <span> to " + ExcInfo.exc_todate.GetDateFromNumber().ToString("dd/MM/yyyy") + @" </span>" : "") +
                                
                                @"</div>
                                <div class='form-detail'>
                                    <label class='cell-3 pr0' res-type='H' res-name='ExcuseTypeLable'>" + Resources.Resources.ExcuseTypeLable + @"</label>
                                    <span id='lb_exectype'>" + (ExcInfo.exc_type == 1 ? Resources.Resources.ExcuseTypePersonal : Resources.Resources.ExcuseTypeOfficialDuty) + @"</span>
                                </div>
                                <div class='form-detail'>
                                    <label class='cell-3 pr0' res-type='H' res-name='Excuse_Reason'>" + Resources.Resources.Excuse_Reason + @"</label>
                                    <span id='lb_execreseon'>" + execuseReasonString + @"</span>
                                </div>
                                <div class='form-detail'>
                                    <label class='cell-3 pr0' res-type='H' res-name='ExcuseTime'>" + Resources.Resources.ExcuseTime + @"</label>
                                    <span id='lb_exectime'>
                                        <span res-type='H' res-name='FromLable'>" + Resources.Resources.FromLable + @"</span>
                                        <span>" + ExcInfo.exc_ftime + @"</span>
                                        <span res-type='H' res-name='ToLable'>" + Resources.Resources.ToLable + @"</span>
                                        <span>" + ExcInfo.exc_ttime + @"</span>
                                        <span res-type='H' res-name='ExcuseTotalLable'>" + Resources.Resources.ExcuseTotalLable + @"</span>
                                    </span>
                                    <b>
                                        <span id='lb_exectotaltime'> " + exc_TotalTime + @"</span>
                                    </b>
                                </div>
                                <div class='form-detail'>
                                    <label class='cell-3 pr0' res-type='H' res-name='NotesLable'>" + Resources.Resources.NotesLable + @"</label>
                                    <span id='lb_execnote'>" + ExcInfo.exc_reason + @"</span>
                                </div>
                            </div>
                        </div>";

                ExcInfo.TaskDetails = ReqDetailsBody;// httpRequest.Form["TaskDetails"].ToString();

                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.AddExcuseErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult);
                    return response;
                }
                var list = excusesRepository.ManagerAddExecuseV2(ExcInfo, Credential.Username);
                if (list.Count > 0 && list != null)
                {
                    ExcInfo.exc_id = list[0].exc_id;

                    TaskInfo task = new TaskInfo();
                    task.AppID = (int)Applications.ExecuseApp;
                    task.WorkFlowID = (int)WorkFlow.ExecuseWF;
                    task.Title = Resources.Resources.ExcuseRequestAR;
                    task.TitleEN = Resources.Resources.ExcuseRequestEN;
                    task.RefID = ExcInfo.exc_id;
                    task.TaskDetails = ExcInfo.TaskDetails;
                    task.Requester = Credential.Username;

                    WorkflowController workflow = new WorkflowController();
                    var res = workflow.CreateNewTaskV2(task, ExcInfo.AttachmentFile, ExcInfo.AttachmentFileExt);
                    if (res.Status.ToLong() > 0)
                    {
                        foreach (var item in list)
                            excusesRepository.UpdateExecuseTaskID(item.exc_id, res.Status.ToLong());

                        var responeResult = new ResponseResult<ExecuseInfo>("1", Resources.Resources.ExcuseAddedSuccessMsg, ExcInfo);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }
                    else
                    {
                        foreach (var item in list)
                            excusesRepository.DeleteFaieldExecuse(item.exc_id);
                        //excusesRepository.DeleteFaieldExecuse(execID);
                        msg = Resources.Resources.AddExcuseErrorMsg;
                        var responeResult = new ResponseResult<ExecuseInfo>("0", msg, null);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }

                }
                else
                {
                    msg = Resources.Resources.AddExcuseErrorMsg;
                    var responeResult = new ResponseResult<ExecuseInfo>("0", msg, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception ex)
            {
                var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.AddExcuseErrorMsg + ex.Message, null);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            return response;
        }



        #endregion

        #region Transaction
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        [Route("Trans/Reasons/GetAll")]
        public HttpResponseMessage GetAllReasons()
        {
            //return sectionsRepository.GetSingle(id);
            HttpResponseMessage response = null;
            try
            {
                var Result = transReasonRepository.GetAll();
                //object myresult =  new  {data = result  };
                var responeResult = new ResponseResult<IEnumerable<TransReason>>("1", Resources.Resources.SuccessRetrievedDataMsg, Result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="trs_date"></param>
        /// <param name="m_time"></param>
        /// <param name="TransType"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("Trans/CanAddTransaction/{trs_date}/{m_time}/{TransType}")]
        public HttpResponseMessage CanAddTransaction(int trs_date, string m_time, int TransType)
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
                m_time = m_time.Replace('-', ':');
                var result = timeSheetRepositry.CanAddTransaction(Credential.Username, trs_date, m_time, TransType);
                if (result.Status.ToLower() == "ok")
                {
                    Result = new ResponseResult<Transactions>("1", Resources.Resources.SuccessRetrievedDataMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    result.Response = Common.GetDBName(result.Response);
                    var responeResult = new ResponseResult<Transactions>("0", result.Response, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
            }
            catch (Exception ex)
            {

                Result = new ResponseResult<Transactions>("0", Resources.Resources.ErrorRetrievedDataMsg + ex.Message, null);
                response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            return response;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="emp_id"></param>
        /// <param name="trs_date"></param>
        /// <param name="m_time"></param>
        /// <param name="TransType"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("Trans/CanManagerAddTransaction/{emp_id}/{trs_date}/{m_time}/{TransType}")]
        public HttpResponseMessage CanManagerAddTransaction(int emp_id,int trs_date, string m_time, int TransType)
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
                m_time = m_time.Replace('-', ':');
                var result = timeSheetRepositry.CanManagerAddTransaction( Credential.Username,emp_id, trs_date, m_time, TransType);
                if (result.Status.ToLower() == "ok")
                {
                    Result = new ResponseResult<Transactions>("1", Resources.Resources.SuccessRetrievedDataMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, Result);
                }
                else
                {
                    result.Response = Common.GetDBName(result.Response);
                    var responeResult = new ResponseResult<Transactions>("0", result.Response, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
            }
            catch (Exception ex)
            {

                Result = new ResponseResult<Transactions>("0", Resources.Resources.ErrorRetrievedDataMsg + ex.Message, null);
                response = Request.CreateResponse(HttpStatusCode.OK, Result);
            }
            return response;
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="Trans"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("Trans/AddTransByEmp")]
        public HttpResponseMessage AddTransByEmp([FromBody] Transactions Trans)
        {
            HttpResponseMessage response = null;
            try
            {
                Trans.m_time = Trans.m_time.Replace('-', ':');
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.AddTransErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult);
                    return response;
                }
                var result = timeSheetRepositry.AddTransactionsByEmp(Trans, Credential.Username);
                if (result > 0)
                {
                    TaskInfo task = new TaskInfo();
                    task.AppID = (int)Applications.FingerPrintApp;
                    task.WorkFlowID = (int)WorkFlow.FingerPrintWF;
                    task.Title = Resources.Resources.FingerPrintRequestAR;
                    task.TitleEN = Resources.Resources.FingerPrintRequestEN;
                    task.RefID = result.ToInt();
                    task.TaskDetails = Trans.TaskDetails;
                    task.Requester = Credential.Username;
                    WorkflowController workflow = new WorkflowController();
                    var res = workflow.CreateNewTask(task);
                    if (res.Status.ToLower() == "ok")
                    {
                        var responeResult = new ResponseResult<Transactions>("1", Resources.Resources.SuccessSaveDataMsg, Trans);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }
                    else
                    {
                        var responeResult = new ResponseResult<Transactions>("0", Resources.Resources.AddTransErrorMsg, Trans);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }
                }
                else
                {
                    var responeResult = new ResponseResult<Transactions>("0", Resources.Resources.AddTransErrorMsg, Trans);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<Transactions>("0", Resources.Resources.AddTransErrorMsg, null);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            return response;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("Trans/AddTransByEmpWithAttach")]
        public HttpResponseMessage AddTransByEmpWithAttach()
        {
            
            var httpRequest = HttpContext.Current.Request;
            byte[] fileRcrd = null;
            Stream file_Strm = null;
            var msg = "";

            Transactions Trans = null;
            HttpResponseMessage response = null;
            try
            {

                Trans = new Transactions();
                if (httpRequest.Files.Count > 0)
                {
                    for (int i = 0; i < httpRequest.Files.Count; i++)
                    {
                        var postedFile = httpRequest.Files[i];
                        var ext = Path.GetExtension(postedFile.FileName).ToLower();
                        var extarr = ConfigurationManager.AppSettings["FileTypes"].ToString().Split(',');// new string[] { ".gif", ".png", ".jpg", ".jpeg", ".pdf", ".docx", ".doc", ".msg", ".eml" };

                        if (!extarr.Contains(ext))
                        {
                            msg = string.Format(Resources.Resources.LogoMustBeImageMsg, ConfigurationManager.AppSettings["FileTypes"].ToString());
                            var responeResult = new ResponseResult<Transactions>("0", msg, null);
                            response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                            return response;
                        }
                        else
                        {
                            msg = "";
                        }

                        if (msg == "")
                        {
                            fileRcrd = new byte[postedFile.ContentLength];
                            file_Strm = postedFile.InputStream;
                            file_Strm.Read(fileRcrd, 0, postedFile.ContentLength);
                        }
                        if (httpRequest.Files.AllKeys[i] == "AttachmentFile")
                        {
                            Trans.AttachmentFile = fileRcrd;
                            Trans.AttachmentFileExt = ext;
                        }
                    }
                }


                Trans.DateNo = httpRequest.Form["DateNo"].ToNullableInt();
                Trans.m_transtype = httpRequest.Form["m_transtype"].ToNullableInt();
                Trans.m_time = httpRequest.Form["m_time"].ToString();
                Trans.ModifiedReasonID = httpRequest.Form["ModifiedReasonID"].ToNullableInt();
                Trans.Note = httpRequest.Form["Note"].ToString();
                Trans.emp_id = httpRequest.Form["emp_id"].ToInt();
                var SelectedTranTypeText = httpRequest.Form["SelectedTranTypeText"].ToString();
                var SelectedReasonText = httpRequest.Form["SelectedReasonText"].ToString();
                Trans.m_time = Trans.m_time.Replace('-', ':');

                string ReqDetailsBody = @"<div class=''>
                                            <div>
                                                <div class='form-detail'>
                                                    <label class='cell-3 pr0'>" + Resources.Resources.ClmDate + @"</label>
                                                    <span id='lb_execdate'>" + Trans.DateNo.GetDateFromNumber().ToString("dd/MM/yyyy") + @"</span>
                                                </div>
                                                <div class='form-detail'>
                                                    <label class='cell-3 pr0'>" + Resources.Resources.TransactionType + @"</label>
                                                    <span id='lb_exectype'>" + SelectedTranTypeText + @"</span>
                                                </div>
                                                <div class='form-detail'>
                                                    <label class='cell-3 pr0' res-type='H' res-name='Reason'>" + Resources.Resources.ClmTheReason + @"</label>
                                                    <span id='lb_execreseon'>" + SelectedReasonText + @"</span>
                                                </div>
                                                <div class='form-detail'>
                                                    <label class='cell-3 pr0' res-type='H' res-name='TransactionTime'>" + Resources.Resources.ClmTime + @"</label>
                                                    <span id='lb_exectime'>" + Trans.m_time + @"</span>
                                                </div>
                                                <div class='form-detail'>
                                                    <label class='cell-3 pr0' res-type='H' res-name='Notes'>" + Resources.Resources.NotesLable + @"</label>
                                                    <span id='lb_execnote'>" + Trans.Note + @"</span>
                                                </div>
                                            </div>
                                        </div>";

                Trans.TaskDetails = ReqDetailsBody;




                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.AddTransErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult);
                    return response;
                }
                var result = timeSheetRepositry.AddTransactionsByEmp(Trans, Credential.Username);
                if (result > 0)
                {
                    TaskInfo task = new TaskInfo();
                    task.AppID = (int)Applications.FingerPrintApp;
                    task.WorkFlowID = (int)WorkFlow.FingerPrintWF;
                    task.Title = Resources.Resources.FingerPrintRequestAR;
                    task.TitleEN = Resources.Resources.FingerPrintRequestEN;
                    task.RefID = result.ToInt();
                    task.TaskDetails = Trans.TaskDetails;
                    task.Requester = Credential.Username;
                    WorkflowController workflow = new WorkflowController();
                    var res = workflow.CreateNewTask(task, Trans.AttachmentFile, Trans.AttachmentFileExt);
                    if (res.Status.ToLower() == "ok")
                    {
                        var responeResult = new ResponseResult<Transactions>("1", Resources.Resources.SuccessSaveDataMsg, Trans);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }
                    else
                    {
                        var responeResult = new ResponseResult<Transactions>("0", Resources.Resources.AddTransErrorMsg, Trans);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }
                }
                else
                {
                    var responeResult = new ResponseResult<Transactions>("0", Resources.Resources.AddTransErrorMsg, Trans);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<Transactions>("0", Resources.Resources.AddTransErrorMsg, null);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            return response;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("Trans/ManagerAddTransByEmpWithAttach")]
        public HttpResponseMessage ManagerAddTransByEmpWithAttach()
        {
            var httpRequest = HttpContext.Current.Request;
            byte[] fileRcrd = null;
            Stream file_Strm = null;
            var msg = "";

            Transactions Trans = null;
            HttpResponseMessage response = null;
            try
            {

                Trans = new Transactions();
                if (httpRequest.Files.Count > 0)
                {
                    for (int i = 0; i < httpRequest.Files.Count; i++)
                    {
                        var postedFile = httpRequest.Files[i];
                        var ext = Path.GetExtension(postedFile.FileName).ToLower();
                        var extarr = ConfigurationManager.AppSettings["FileTypes"].ToString().Split(',');// new string[] { ".gif", ".png", ".jpg", ".jpeg", ".pdf", ".docx", ".doc", ".msg", ".eml" };

                        if (!extarr.Contains(ext))
                        {
                            msg = string.Format(Resources.Resources.LogoMustBeImageMsg, ConfigurationManager.AppSettings["FileTypes"].ToString());
                            var responeResult = new ResponseResult<Transactions>("0", msg, null);
                            response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                            return response;
                        }
                        else
                        {
                            msg = "";
                        }

                        if (msg == "")
                        {
                            fileRcrd = new byte[postedFile.ContentLength];
                            file_Strm = postedFile.InputStream;
                            file_Strm.Read(fileRcrd, 0, postedFile.ContentLength);
                        }
                        if (httpRequest.Files.AllKeys[i] == "AttachmentFile")
                        {
                            Trans.AttachmentFile = fileRcrd;
                            Trans.AttachmentFileExt = ext;
                        }
                    }
                }

                Trans.emp_name= httpRequest.Form["emp_name"].ToString();
                Trans.emp_id= httpRequest.Form["emp_id"].ToInt();

                Trans.DateNo = httpRequest.Form["DateNo"].ToNullableInt();
                Trans.m_transtype = httpRequest.Form["m_transtype"].ToNullableInt();
                Trans.m_time = httpRequest.Form["m_time"].ToString();
                Trans.ModifiedReasonID = httpRequest.Form["ModifiedReasonID"].ToNullableInt();
                Trans.Note = httpRequest.Form["Note"].ToString();
                Trans.emp_id = httpRequest.Form["emp_id"].ToInt();
                var SelectedTranTypeText = httpRequest.Form["SelectedTranTypeText"].ToString();
                var SelectedReasonText = httpRequest.Form["SelectedReasonText"].ToString();
                Trans.m_time = Trans.m_time.Replace('-', ':');

                string ReqDetailsBody = @"<div class=''>
                                            <div>
                                                <div class='form-detail'>
                                                    <label class='cell-3 pr0' res-type='H' res-name='EmployeeName'>" + Resources.Resources.EmployeeName + @"</label>
                                                    <span id='lb_execdate'>" + Trans.emp_name + @"</span>
                                                </div>
                                                <div class='form-detail'>
                                                    <label class='cell-3 pr0'>" + Resources.Resources.ClmDate + @"</label>
                                                    <span id='lb_execdate'>" + Trans.DateNo.GetDateFromNumber().ToString("dd/MM/yyyy") + @"</span>
                                                </div>
                                                <div class='form-detail'>
                                                    <label class='cell-3 pr0'>" + Resources.Resources.TransactionType + @"</label>
                                                    <span id='lb_exectype'>" + SelectedTranTypeText + @"</span>
                                                </div>
                                                <div class='form-detail'>
                                                    <label class='cell-3 pr0' res-type='H' res-name='Reason'>" + Resources.Resources.ClmTheReason + @"</label>
                                                    <span id='lb_execreseon'>" + SelectedReasonText + @"</span>
                                                </div>
                                                <div class='form-detail'>
                                                    <label class='cell-3 pr0' res-type='H' res-name='TransactionTime'>" + Resources.Resources.ClmTime + @"</label>
                                                    <span id='lb_exectime'>" + Trans.m_time + @"</span>
                                                </div>
                                                <div class='form-detail'>
                                                    <label class='cell-3 pr0' res-type='H' res-name='Notes'>" + Resources.Resources.NotesLable + @"</label>
                                                    <span id='lb_execnote'>" + Trans.Note + @"</span>
                                                </div>
                                            </div>
                                        </div>";

                Trans.TaskDetails = ReqDetailsBody;




                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.AddTransErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult);
                    return response;
                }
                var result = timeSheetRepositry.ManagerAddTransactionsByEmp(Trans, Credential.Username);
                if (result > 0)
                {
                    TaskInfo task = new TaskInfo();
                    task.AppID = (int)Applications.FingerPrintApp;
                    task.WorkFlowID = (int)WorkFlow.FingerPrintWF;
                    task.Title = Resources.Resources.FingerPrintRequestAR;
                    task.TitleEN = Resources.Resources.FingerPrintRequestEN;
                    task.RefID = result.ToInt();
                    task.TaskDetails = Trans.TaskDetails;
                    task.Requester = Credential.Username;
                    WorkflowController workflow = new WorkflowController();
                    var res = workflow.CreateNewTask(task, Trans.AttachmentFile, Trans.AttachmentFileExt);
                    if (res.Status.ToLower() == "ok")
                    {
                        var responeResult = new ResponseResult<Transactions>("1", Resources.Resources.SuccessSaveDataMsg, Trans);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }
                    else
                    {
                        var responeResult = new ResponseResult<Transactions>("0", Resources.Resources.AddTransErrorMsg, Trans);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }
                }
                else
                {
                    var responeResult = new ResponseResult<Transactions>("0", Resources.Resources.AddTransErrorMsg, Trans);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<Transactions>("0", Resources.Resources.AddTransErrorMsg, null);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
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
        [Route("Trans/UpdateFingerprintReqStatus/{refID}/{wFStatus}/{userName}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage UpdateFingerprintReqStatus(long refID, short wFStatus, string userName)
        {
            object Result = null;
            HttpResponseMessage response = null;
            string outpara = "";
            try
            {

                var result = timeSheetRepositry.UpdateFingerprintReqStatus(refID, wFStatus, userName, out outpara);

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

        #endregion

        /// <summary>
        /// 
        /// </summary>
        /// <param name="empid"></param>
        /// <param name="date"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("TimeSheet/GetTransDetailsForEmployee/{empid}/{date}")]
        public HttpResponseMessage GetTransDetailsForEmployee(int empid, int date)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.LoadDataErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult);
                    return response;
                }
                DataSet data = timeSheetRepositry.GetTransDetailsForEmployee(empid, date, Credential.Username);
                if (data != null & data.Tables.Count > 0)
                {
                    var headerDT = data.Tables[0];

                    Common.CheckLoclizeForData(headerDT);

                    var header = TimeAtt.Common.MapTo<TransDetails>(headerDT).SingleOrDefault();

                    var transDT = data.Tables[1];
                    Common.CheckLoclizeForData(transDT);
                    var trans = TimeAtt.Common.MapTo<TransactionData>(transDT);


                    header.TransData = trans;

                    var responeResult = new ResponseResult<TransDetails>("1", Resources.Resources.SuccessRetrievedDataMsg, header);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<TransDetails>("0", Resources.Resources.LoadDataErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception ex)
            {
                var responeResult = new ResponseResult<TransDetails>("0", Resources.Resources.LoadDataErrorMsg + ex.Message, null);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            return response;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fdate"></param>
        /// <param name="tdate"></param>
        /// <param name="empid"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("TimeSheet/GetDailyTimeSheetForManager/{fdate}/{tdate}/{empid}")]
        public HttpResponseMessage GetDailyTimeSheetForManager(int fdate, int tdate, int empid = -1)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.LoadDataErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult);
                    return response;
                }
                DataSet data = timeSheetRepositry.GetDailyTimeSheetForManager(Credential.Username, empid, fdate, tdate);
                if (data != null & data.Tables.Count > 0)
                {
                    var dt = data.Tables[0];

                    Common.CheckLoclizeForData(dt);

                    var list = TimeAtt.Common.MapTo<SFDailyTimeSheet>(dt);

                    var responeResult = new ResponseResult<List<SFDailyTimeSheet>>("1", Resources.Resources.SuccessRetrievedDataMsg, list);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

                else
                {
                    var responeResult = new ResponseResult<List<SFDailyTimeSheet>>("0", Resources.Resources.LoadDataErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }


            }
            catch (Exception ex)
            {
                var responeResult = new ResponseResult<List<SFDailyTimeSheet>>("0", Resources.Resources.LoadDataErrorMsg + ex.Message, null);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            return response;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="empid"></param>
        /// <param name="fdate"></param>
        /// <param name="tdate"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("TimeSheet/GetMonthlySummaryTimeSheetForManager/{empid}/{fdate}/{tdate}")]
        public HttpResponseMessage GetMonthlySummaryTimeSheetForManager(int empid, int fdate, int tdate)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.LoadDataErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult);
                    return response;
                }
                DataSet data = timeSheetRepositry.GetMonthlySummaryTimeSheetForManager(Credential.Username, empid, fdate, tdate);

                if (data != null & data.Tables.Count > 0)
                {
                    var dt = data.Tables[0];

                    Common.CheckLoclizeForData(dt);

                    var list = TimeAtt.Common.MapTo<MonthlyTimeSheet>(dt);

                    var responeResult = new ResponseResult<List<MonthlyTimeSheet>>("1", Resources.Resources.SuccessRetrievedDataMsg, list);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

                else
                {
                    var responeResult = new ResponseResult<List<MonthlyTimeSheet>>("0", Resources.Resources.LoadDataErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
            }
            catch (Exception ex)
            {
                var responeResult = new ResponseResult<List<MonthlyTimeSheet>>("0", Resources.Resources.LoadDataErrorMsg + ex.Message, null);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            return response;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="empid"></param>
        /// <param name="fdate"></param>
        /// <param name="tdate"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("TimeSheet/GetTimeSheetMonthlyDetailsForManager/{empid}/{fdate}/{tdate}")]
        public HttpResponseMessage GetTimeSheetMonthlyDetailsForManager(int empid, int fdate, int tdate)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.LoadDataErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult);
                    return response;
                }
                DataSet data = timeSheetRepositry.GetTimeSheetMonthlyDetailsForManager(empid, fdate, tdate, Credential.Username);
                if (data != null & data.Tables.Count > 0)
                {
                    var headerDT = data.Tables[0];


                    var header = TimeAtt.Common.MapTo<MonthlyTimeSheet>(headerDT).SingleOrDefault();

                    var transDT = data.Tables[1];
                    var trans = TimeAtt.Common.MapTo<SFDailyTimeSheet>(transDT);


                    header.TransData = trans;

                    var responeResult = new ResponseResult<MonthlyTimeSheet>("1", Resources.Resources.SuccessRetrievedDataMsg, header);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<MonthlyTimeSheet>("0", Resources.Resources.LoadDataErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception ex)
            {
                var responeResult = new ResponseResult<MonthlyTimeSheet>("0", Resources.Resources.LoadDataErrorMsg + ex.Message, null);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            return response;


        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="empid"></param>
        /// <param name="fdate"></param>
        /// <param name="tdate"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("TimeSheet/GetTimeSheetMonthlyDetailsForManagerEX/{empid}/{fdate}/{tdate}")]
        public HttpResponseMessage GetTimeSheetMonthlyDetailsForManagerEX(int empid, int fdate, int tdate)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.LoadDataErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult);
                    return response;
                }
                var dataForMonthly = timeSheetRepositry.GetMonthlySummaryTimeSheetForManagerEX(empid, fdate, tdate, Credential.Username);
                if (dataForMonthly != null)
                {
                    var header = TimeAtt.Common.MapTo<MonthlyTimeSheet>(dataForMonthly);

                    var responeResult = new ResponseResult<List<MonthlyTimeSheet>>("1", Resources.Resources.SuccessRetrievedDataMsg, header);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<MonthlyTimeSheet>("0", Resources.Resources.LoadDataErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception ex)
            {
                var responeResult = new ResponseResult<MonthlyTimeSheet>("0", Resources.Resources.LoadDataErrorMsg + ex.Message, null);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            return response;


        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="empid"></param>
        /// <param name="date"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("TimeSheet/GetTransDetailsForManager/{empid}/{date}")]
        public HttpResponseMessage GetTransDetailsForManager(int empid, int date)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.LoadDataErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult);
                    return response;
                }
                DataSet data = timeSheetRepositry.GetTransDetailsForManager(empid, date, Credential.Username);
                if (data != null & data.Tables.Count > 0)
                {
                    var headerDT = data.Tables[0];

                    Common.CheckLoclizeForData(headerDT);

                    var header = TimeAtt.Common.MapTo<TransDetails>(headerDT).SingleOrDefault();

                    var transDT = data.Tables[1];
                    Common.CheckLoclizeForData(transDT);
                    var trans = TimeAtt.Common.MapTo<TransactionData>(transDT);


                    header.TransData = trans;

                    var responeResult = new ResponseResult<TransDetails>("1", Resources.Resources.SuccessRetrievedDataMsg, header);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<TransDetails>("0", Resources.Resources.LoadDataErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception ex)
            {
                var responeResult = new ResponseResult<TransDetails>("0", Resources.Resources.LoadDataErrorMsg + ex.Message, null);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            return response;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Para"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("TimeSheet/GetMonthDetails")]
        public HttpResponseMessage GetMonthlyTimeSheetGetDetails([FromBody] FormParameters Para)
        {
            // Dictionary<string, string> QueryString = Request.GetQueryStrings();
            int Emp_ID = Para.Emp_ID.Value; //QueryString["Emp_ID"].ToInt();
            int FromDate = Para.FromDate;//QueryString["FromDate"].ToInt();
            int ToDate = Para.ToDate;//QueryString["ToDate"].ToInt();

            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult1 = new ResponseResult<ExecuseInfo>("0", Resources.Resources.LoadDataErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult1);
                    return response;
                }
                var ds = timeSheetRepositry.GetMothlyTimeSheetDetailsSF(Credential.Username, FromDate, ToDate, Emp_ID, Resources.Resources.lang);
                var dt1 = ds.Tables[1];
                var dt2 = ds.Tables[0];
                Common.CheckLoclizeForData(dt1);
                Common.CheckLoclizeForData(dt2);
                var resultDetails = Common.MapTo<DailyTimeSheet>(dt1);
                var resultMonthly = Common.MapTo<MonthlyTimeSheet>(dt2);

                //var resultMonthly = timeSheetRepositry.GetMonthlyTimeSheetSummary(Credential.Username, FromDate, ToDate, Emp_ID, Resources.Resources.lang);
                var result = new MonthlyDailyTimeSheet
                {
                    Details = resultDetails,
                    Summary = resultMonthly
                };
                var responeResult = new ResponseResult<MonthlyDailyTimeSheet>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Para"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("Monthly/GetDetails")]
        public HttpResponseMessage GetMonthlyDetails([FromBody] FormParameters Para)
        {
            // Dictionary<string, string> QueryString = Request.GetQueryStrings();
            int Emp_ID = Para.Emp_ID.Value; //QueryString["Emp_ID"].ToInt();
            int FromDate = Para.FromDate;//QueryString["FromDate"].ToInt();
            int ToDate = Para.ToDate;//QueryString["ToDate"].ToInt();

            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var resultDetails = timeSheetRepositry.GetMothlyTimeSheetDetails(Credential.Username, FromDate, ToDate, Emp_ID, Resources.Resources.lang);
                var resultMonthly = timeSheetRepositry.GetMonthlyTimeSheetSummary(Credential.Username, FromDate, ToDate, Emp_ID, Resources.Resources.lang);
                var result = new MonthlyDailyTimeSheet
                {
                    Details = resultDetails,
                    Summary = resultMonthly
                };
                var responeResult = new ResponseResult<MonthlyDailyTimeSheet>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="vacationSearchParameters"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("Vacations/GetAll")]
        public HttpResponseMessage GetAllVacations([FromBody] FormParameters vacationSearchParameters)
        {
            HttpResponseMessage response = null;
            try
            {
                VacationBody vacationSearch = new VacationBody();

                vacationSearch.vac_secid = vacationSearchParameters.Sec_ID.HasValue ? vacationSearchParameters.Sec_ID : 0;
                vacationSearch.vac_RegID = vacationSearchParameters.Reg_ID.HasValue ? vacationSearchParameters.Reg_ID : 0;
                vacationSearch.vac_empid = vacationSearchParameters.Emp_ID.HasValue ? vacationSearchParameters.Emp_ID : 0;
                vacationSearch.vac_fdate = vacationSearchParameters.FromDate;
                vacationSearch.vac_tdate = vacationSearchParameters.ToDate;
                vacationSearch.vac_type = vacationSearchParameters.Type.HasValue ? vacationSearchParameters.Type : 0;
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var Result = vacationsRepository.GetAll(Credential.Username, vacationSearch);
                var responeResult = new ResponseResult<IEnumerable<VacationsInfo>>("1", Resources.Resources.SuccessRetrievedDataMsg, Result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("Vacations/Types/GetAll")]
        public HttpResponseMessage GetAllTypes()
        {
            //return sectionsRepository.GetSingle(id);
            HttpResponseMessage response = null;
            try
            {
                var Result = vacationsTypeRepository.GetAll();
                //object myresult =  new  {data = result  };
                var responeResult = new ResponseResult<IEnumerable<VacationType>>("1", Resources.Resources.SuccessRetrievedDataMsg, Result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="vacation"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("Vacations/CanAdd")]
        public HttpResponseMessage CanAddVacation([FromBody] VacationBody vacation)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult = new ResponseResult<VacationBody>("0", Resources.Resources.AddExcuseErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult);
                }
                var result = vacationsRepository.CanAddVacation(vacation, Credential.Username);
                Common.CheckLoclizeForData(result.Tables[0]);
                var res = TimeAtt.Common.MapTo<ResponseStatus>(result.Tables[0]).SingleOrDefault();

                if (res.Status.ToLower() == "ok")
                {
                    var responeResult = new ResponseResult<VacationBody>("1", Resources.Resources.ExcuseAddedSuccessMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<VacationBody>("0", res.Response, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
            }
            catch (Exception ex)
            {
                var responeResult = new ResponseResult<VacationBody>("0", Resources.Resources.AddExcuseErrorMsg + ex.Message, null);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            return response;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("Vacations/Add")]
        public HttpResponseMessage AddVacation()
        {
            var httpRequest = HttpContext.Current.Request;
            byte[] fileRcrd = null;
            Stream file_Strm = null;

            var msg = "";
            VacationBody vacation = null;

            HttpResponseMessage response = null;
            try
            {
                vacation = new VacationBody();
                if (httpRequest.Files.Count > 0)
                {
                    for (int i = 0; i < httpRequest.Files.Count; i++)
                    {
                        var postedFile = httpRequest.Files[i];
                        var ext = Path.GetExtension(postedFile.FileName).ToLower();
                        var extarr = ConfigurationManager.AppSettings["FileTypes"].ToString().Split(',');// new string[] { ".gif", ".png", ".jpg", ".jpeg", ".pdf", ".docx", ".doc",".msg",".eml" };

                        if (!extarr.Contains(ext))
                        {
                            msg = string.Format(Resources.Resources.LogoMustBeImageMsg, ConfigurationManager.AppSettings["FileTypes"].ToString());
                            var responeResult = new ResponseResult<VacationBody>("0", msg, null);
                            response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                            return response;
                        }
                        else
                        {
                            msg = "";
                        }

                        if (msg == "")
                        {
                            fileRcrd = new byte[postedFile.ContentLength];
                            file_Strm = postedFile.InputStream;
                            file_Strm.Read(fileRcrd, 0, postedFile.ContentLength);
                        }
                        if (httpRequest.Files.AllKeys[i] == "AttachmentFile")
                        {
                            vacation.AttachmentFile = fileRcrd;
                            vacation.AttachmentFileExt = ext;
                        }
                    }
                }


                vacation.vac_fdate = httpRequest.Form["vac_fdate"].ToInt();
                vacation.vac_tdate = httpRequest.Form["vac_tdate"].ToInt();
                vacation.vac_type = httpRequest.Form["vac_type"].ToNullableInt();
                vacation.vac_empid = httpRequest.Form["vac_empid"].ToNullableInt();
                vacation.vac_reason = httpRequest.Form["vac_reason"].ToString();
                var TotalDays = httpRequest.Form["TotalDays"].ToString();
                var SelectedTypeText = httpRequest.Form["SelectedTypeText"].ToString();



                string ReqDetailsBody = @"<div class=''>
                                              <div>
                                                <div class='form-detail'>
                                                  <label class='cell-3 pr0'>" + Resources.Resources.VacationTypeClm + @"</label>
                                                  <span id='lb_execdate'> " + SelectedTypeText + @"</span>
                                                </div>
                                                <div class='form-detail'>
                                                  <label class='cell-3 pr0'>" + Resources.Resources.FromLable + @"</label>
                                                  <span id='lb_exectype'>" + vacation.vac_fdate.GetDateFromNumber().ToString("dd/MM/yyyy") + @"</span>
                                                </div>
                                                <div class='form-detail'>
                                                  <label class='cell-3 pr0'>" + Resources.Resources.ToLable + @"</label>
                                                  <span id='lb_execreseon'>" + vacation.vac_tdate.GetDateFromNumber().ToString("dd/MM/yyyy") + @"</span>
                                                </div>
                                                <div class='form-detail'>
                                                  <label class='cell-3 pr0'>" + Resources.Resources.TotalDaysLable + @"</label>
                                                  <span id='lb_exectime'>" + TotalDays + @"</span>
                                                </div>
                                                <div class='form-detail'>
                                                    <label class='cell-3 pr0' res-type='H' res-name='NotesLable'>" + Resources.Resources.NotesLable + @"</label>
                                                    <span id='lb_execnote'>" + vacation.vac_reason + @"</span>
                                                </div>
                                              </div>
                                            </div>";

                vacation.TaskDetails = ReqDetailsBody;




                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult = new ResponseResult<VacationBody>("0", Resources.Resources.LoadDataErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult);
                    return response;
                }
                var NewID = vacationsRepository.AddByEmp(Credential.Username, vacation);

                if (NewID > 0)
                {
                    vacation.vac_id = NewID;

                    TaskInfo task = new TaskInfo();
                    task.AppID = (int)Applications.VacationApp;
                    task.WorkFlowID = (int)WorkFlow.VacationWF;
                    task.Title = Resources.Resources.VacationRequestAR;
                    task.TitleEN = Resources.Resources.VacationRequestEN;
                    task.RefID = NewID;
                    task.TaskDetails = vacation.TaskDetails;
                    task.Requester = Credential.Username;

                    WorkflowController workflow = new WorkflowController();
                    var res = workflow.CreateNewTask(task, vacation.AttachmentFile, vacation.AttachmentFileExt);

                    if (res.Status.ToLower() == "ok")
                    {
                        var responeResult = new ResponseResult<VacationBody>("1", Resources.Resources.SuccessAddDataMsg, vacation);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }
                    else
                    {
                        vacationsRepository.DeleteFaieldVacation(NewID);
                        msg = Resources.Resources.AddVactionErrorMsg;
                        var responeResult = new ResponseResult<VacationBody>("0", msg, null);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }
                }
                else if (NewID == -3)
                {
                    var responeResult = new ResponseResult<VacationBody>("0", Resources.Resources.TherIsvacationForEmpInSameDateMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<VacationBody>("0", Resources.Resources.AddVactionErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.AddVactionErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("IsManager")]
        public HttpResponseMessage IsManager()
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (Credential == null)
                {
                    var responeResult1 = new ResponseResult<bool>("0", Resources.Resources.LoadDataErrorMsg, false);
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult1);
                    return response;
                }
                var res = timeSheetRepositry.IsManager(Credential.Username);

                var responeResult = new ResponseResult<bool>("1", Resources.Resources.SuccessRetrievedDataMsg, res);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);


            }
            catch (Exception ex)
            {
                var responeResult = new ResponseResult<bool>("0", Resources.Resources.LoadDataErrorMsg + ex.Message, false);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            return response;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="searchDailyParameter"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("Daily/GetDailyTimeSheet")]
        //[ResponseType(typeof(ResponseResult<IEnumerable<DailyTimeSheet>>))]
        public HttpResponseMessage GetDailyTimeSheet([FromBody] FormParameters searchDailyParameter)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var result = timeSheetRepositry.GetDailyTimeSheet(Credential.Username, searchDailyParameter, Resources.Resources.lang);
                var responeResult = new ResponseResult<IEnumerable<DailyTimeSheet>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Para"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("Monthly/GetMonthlyTimeSheet")]
        public HttpResponseMessage GetMonthlyTimeSheet([FromBody] FormParameters Para)
        {


            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var result = timeSheetRepositry.GetMonthlyTimeSheet(Credential.Username, Resources.Resources.lang, Para);
                var responeResult = new ResponseResult<IEnumerable<MonthlyTimeSheet>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetEmpsByMGR")]
        // [ResponseType(typeof(ResponseResult<CustomPrincipal>))]
        public HttpResponseMessage GetEmpsByMGR()
        {
            HttpResponseMessage response = null;
            try
            {
                var UserData = RequestContext.Principal as CustomPrincipal;
                if (UserData == null)
                {
                    var responeResult1 = new ResponseResult<CustomPrincipal>("0", Resources.Resources.LoadDataErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult1);
                    return response;
                }
                var res = timeSheetRepositry.GetEmployeesByManager(UserData.EmployeeNumber.ToInt());

                var responeResult = new ResponseResult<List<EmployeeInfo>>("1", Resources.Resources.SuccessRetrievedDataMsg, res);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.RequestUnauthorizedMsg, Exception.Message + Environment.NewLine + Exception.InnerException == null ? "" : Exception.InnerException.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="WFStatus"></param>
        /// <param name="RefID"></param>
        /// <param name="CurrentUser"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("Vacation/UpdateEmpVacation/{WFStatus}/{RefID}/{CurrentUser}")]
        [CustomAuthorize(ValidateUserAndPassword = true)]
        public ResponseStatus UpdateEmpVacation(short WFStatus, int RefID, string CurrentUser)
        {
            string outpara = "";
            try
            {
                int res = vacationsRepository.UpdateEmpVacation(RefID, WFStatus, CurrentUser, out outpara);
                if (res < 0)
                    return new ResponseStatus()
                    {
                        Status = "Exception",
                        Response = outpara
                    };

                else
                    return new ResponseStatus()
                    {
                        Status = "OK",
                        Response = outpara
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

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetEmpsByMGR_V2")]
        [CustomAuthorize(ValidateToken =true,TokenDuration =15)]
        //[CustomAuthorize(ValidateUserAndPassword = true)]
        public HttpResponseMessage GetEmpsByMGR_V2()
        {
            HttpResponseMessage response = null;
            try
            {
                var UserData = RequestContext.Principal as CustomPrincipal;
                if (UserData == null)
                {
                    var responeResult1 = new ResponseResult<CustomPrincipal>("0", Resources.Resources.LoadDataErrorMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.Unauthorized, responeResult1);
                    return response;
                }
                var res = timeSheetRepositry.GetEmployeesByManager(UserData.EmployeeNumber.ToInt());

                var responeResult = new ResponseResult<List<EmployeeInfo>>("1", Resources.Resources.SuccessRetrievedDataMsg, res);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.RequestUnauthorizedMsg, Exception.Message + Environment.NewLine + Exception.InnerException == null ? "" : Exception.InnerException.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }

        

    }
}
