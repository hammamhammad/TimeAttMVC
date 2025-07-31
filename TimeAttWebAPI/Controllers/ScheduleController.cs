using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using TimeAtt;
using TimeAtt.Models;
using TimeAtt.Security;


namespace TimeAttWebAPI.Controllers
{
    [RoutePrefix("Schedules")]
    [CustomAuthorize(GroupNo = "2", PermissionName = "sch-view")]
    public class ScheduleController : ApiController
    {
        private ScheduleRepository scheduleRepository;
        private ShiftRepository shiftRepository;
        private SceduleGroupRepository sceduleGroupRepository;
        public ScheduleController()
        {
            this.scheduleRepository = new ScheduleRepository();
            this.shiftRepository = new ShiftRepository();
            this.sceduleGroupRepository = new SceduleGroupRepository();
        }

        public ScheduleController(ScheduleRepository scheduleRepository, ShiftRepository shiftRepository, SceduleGroupRepository sceduleGroupRepository)
        {
            this.scheduleRepository = scheduleRepository;
            this.shiftRepository = shiftRepository;
            this.sceduleGroupRepository = sceduleGroupRepository;
        }

        #region Schedule
        [HttpGet]
        [Route("GetAll")]
        [ResponseType(typeof(ResponseResult<IEnumerable<ScheduleInfo>>))]
        public HttpResponseMessage GetAllSections()
        {
            HttpResponseMessage response = null;
            try
            {
                var result = scheduleRepository.GetAll().OrderBy(o => o.sch_id);
                var responeResult = new ResponseResult<IEnumerable<ScheduleInfo>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;



        }
        [HttpGet]
        [Route("GetByID/{sch_ID}")]
        [ResponseType(typeof(ResponseResult<ScheduleInfo>))]
        public HttpResponseMessage GetByID(int sch_ID)
        {
            HttpResponseMessage response = null;
            try
            {
                var result = scheduleRepository.GetSingle(sch_ID);
                var responeResult = new ResponseResult<ScheduleInfo>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;



        }

        [HttpPost]
        [Route("Add")]
        [ResponseType(typeof(ResponseResult<ScheduleInfo>))]
        [CustomAuthorize(GroupNo = "2", PermissionName = "sch-add")]
        public HttpResponseMessage AddSchedule([FromBody]ScheduleInfo ScheduletInfo)
        {
            HttpResponseMessage response = null;
            try
            {
                string msg = "";
                if (!scheduleRepository.IsValid(ScheduletInfo, out msg))
                {
                    var responeResult = new ResponseResult<ScheduleInfo>("0", Resources.Resources.SaveScheduleErrorMsg + Environment.NewLine + msg, ScheduletInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    return response;
                }

                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var NewID = scheduleRepository.Add(Credential.Username, ScheduletInfo);
                if (NewID > 0)
                {
                    var result = scheduleRepository.GetSingle(NewID);
                    var responeResult = new ResponseResult<ScheduleInfo>("1", Resources.Resources.SuccessSaveDataMsg, result);

                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<ScheduleInfo>("0", Resources.Resources.SaveScheduleErrorMsg, ScheduletInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.SaveScheduleErrorMsg + Exception.Message, Exception.Message);

                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;



        }

        [HttpPost]
        [Route("Update")]
        [ResponseType(typeof(ResponseResult<ScheduleInfo>))]
        [CustomAuthorize(GroupNo = "2", PermissionName = "sch-edit")]
        public HttpResponseMessage UpdateSchedule([FromBody]ScheduleInfo ScheduletInfo)
        {
            HttpResponseMessage response = null;
            try
            {
                string msg = "";
                if (!scheduleRepository.IsValid(ScheduletInfo, out msg))
                {
                    var responeResult = new ResponseResult<ScheduleInfo>("0", Resources.Resources.SaveScheduleErrorMsg + Environment.NewLine + msg, ScheduletInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    return response;
                }
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var EffictedRow = scheduleRepository.Update(Credential.Username, ScheduletInfo);
                if (EffictedRow > 0 && ScheduletInfo.sch_id > 0)
                {
                    var result = scheduleRepository.GetSingle(ScheduletInfo.sch_id);
                    var responeResult = new ResponseResult<ScheduleInfo>("1", Resources.Resources.SuccessSaveDataMsg, result);

                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<ScheduleInfo>("0", Resources.Resources.SaveScheduleErrorMsg, ScheduletInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.SaveScheduleErrorMsg + Exception.Message, Exception.Message);

                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }

        [HttpPost]
        [Route("Delete/{id}")]
        [ResponseType(typeof(ResponseResult<ScheduleInfo>))]
        [CustomAuthorize(GroupNo = "2", PermissionName = "sch-delete")]
        public HttpResponseMessage DeleteSchedule(int id)
        {
            HttpResponseMessage response = null;
            try
            {
                ScheduleInfo ScheduletInfo = scheduleRepository.GetSingle(id);
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var ReturnValue = scheduleRepository.Delete(Credential.Username, id);
                if (ReturnValue > 0)
                {
                    var responeResult = new ResponseResult<ScheduleInfo>("1", Resources.Resources.SuccessDeleteMsg, ScheduletInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    string msg = "";
                    if (ReturnValue == -2)
                    {
                        msg = Resources.Resources.ThereAreEmployeesRelatedToScheduleMsg;


                    }
                    if (ReturnValue == -3)
                    {
                        msg = Resources.Resources.ThereAreSctionsRelatedToScheduleMsg;

                    }
                    if (ReturnValue == -4)
                    {
                        msg = Resources.Resources.ThereAreGroupRelatedToScheduleMsg;

                    }
                    if (ReturnValue == 0)
                    {
                        msg = Resources.Resources.DeleteScheduleErrorMsg;
                    }

                    var responeResult = new ResponseResult<ScheduleInfo>("0", Resources.Resources.DeleteScheduleErrorMsg + Environment.NewLine + msg, ScheduletInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.DeleteScheduleErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }

        [HttpPost]
        [Route("ChangeSchedule/{Sch_ID}/{ByEmployee}/{BySection}/{ByRegion}")]
        [ResponseType(typeof(ResponseResult<object>))]
        [CustomAuthorize(GroupNo = "2", PermissionName = "sch-move")]
        public HttpResponseMessage ChangeSchedule(int Sch_ID, bool ByEmployee, int BySection, long ByRegion)
        {
            HttpResponseMessage response = null;
            try
            {

                if (Sch_ID <= 0)
                {
                    var responeResult = new ResponseResult<object>("0", Resources.Resources.YouMustSelectScheduleToContinueMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    return response;
                }
                if (ByEmployee == false && BySection <= 0 && ByRegion <= 0)
                {
                    var responeResult = new ResponseResult<object>("0", Resources.Resources.YouMustSelectTypeOfScheduleChangeMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    return response;
                }
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var ReturnValue = scheduleRepository.Change(Credential.Username, Sch_ID, ByEmployee, BySection, ByRegion);
                if (ReturnValue > 0)
                {
                    var responeResult = new ResponseResult<object>("1", Resources.Resources.SuccessSaveDataMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<object>("1", Resources.Resources.SuccessSaveDataMsg, null);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.ChangeScheduleErrorMsg + Exception.Message, Exception.ToString());
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }

        #endregion

        #region Shifts
        [HttpGet]
        [Route("Shifts/GetAll")]
        [ResponseType(typeof(ResponseResult<IEnumerable<ShiftInfo>>))]
        public HttpResponseMessage GetAllShifts()
        {
            HttpResponseMessage response = null;
            try
            {
                var result = shiftRepository.GetAll().OrderBy(o => o.shift_id);
                var responeResult = new ResponseResult<IEnumerable<ShiftInfo>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;



        }
        [HttpGet]
        [Route("Shifts/GetByID/{shift_ID}")]
        [ResponseType(typeof(ResponseResult<ShiftInfo>))]
        public HttpResponseMessage ShiftsGetByID(int shift_ID)
        {
            HttpResponseMessage response = null;
            try
            {
                var result = shiftRepository.GetSingle(shift_ID);
                var responeResult = new ResponseResult<ShiftInfo>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;



        }
        [HttpGet]
        [Route("Shifts/GetByEmpNoAndDate/{empno}/{date?}")]
        [ResponseType(typeof(ResponseResult<ShiftInfo>))]
        public HttpResponseMessage GetByEmpNoAndDate(string empno,DateTime? date=null)
        {
            HttpResponseMessage response = null;
            try
            {
                if (!date.HasValue)
                    date = DateTime.Now.Date;
                var employeesRepository = new EmployeesRepository();
                var empresult = employeesRepository.GetSingle(empno);

                var result = shiftRepository.GetByEmpNoAndDate(empresult.emp_id, date.Value);
                var responeResult = new ResponseResult<ShiftInfo>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;



        }


        [HttpPost]
        [Route("Shifts/AddUpdateMT")]
        [ResponseType(typeof(ResponseResult<ShiftMT>))]
        [CustomAuthorize(GroupNo = "2", PermissionName = "sch-addshift")]
        public HttpResponseMessage AddShift([FromBody]ShiftMT shiftMT)
        {
            HttpResponseMessage response = null;
            try
            {
                ShiftInfo shiftinfoConv = new ShiftInfo
                {
                    IsFH = false,
                    IsOpenHours = false,
                    shift_allow = 0,
                    shift_allow_out = 0,
                    shift_deleted = true,
                    shift_fbreak = null,
                    shift_FH_from = "00:00",
                    shift_FH_to = "00:00",
                    shift_fin = shiftMT.shift_fin,
                    shift_fout = shiftMT.shift_fout,
                    shift_fOverTime = null,
                    shift_id = shiftMT.shift_id,
                    shift_isnight = shiftMT.shift_isnight,
                    shift_name = shiftMT.shift_name,
                    shift_off = (shiftMT.shift_fin == "00:00" && shiftMT.shift_fout == "00:00"),
                    shift_OverTimeMinutes = null,
                    shift_sin = "--:--",
                    shift_sout = "--:--",
                    shift_tbreak = null,
                    shift_tOverTime = null,
                    shift_twoshifts = false,
                    shift_withbreak = false,
                    shift_withOverTime = false
                };
              
           
                string msg = "";
                if (!shiftRepository.IsValid(shiftinfoConv, out msg))
                {
                    var responeResult = new ResponseResult<ShiftMT>("0", Resources.Resources.SaveShiftErrorMsg + Environment.NewLine + msg, shiftMT);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    return response;
                }

                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                if (shiftMT.shift_id == 0)
                {
                    var NewID = shiftRepository.AddMT(Credential.Username, shiftinfoConv);
                    if (NewID > 0)
                    {
                        var Shiftresult = shiftRepository.GetSingle(NewID);
                        var responeResult = new ResponseResult<ShiftInfo>("1", Resources.Resources.SuccessSaveDataMsg, Shiftresult);

                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }
                    else
                    {
                        var responeResult = new ResponseResult<ShiftMT>("0", Resources.Resources.SaveShiftErrorMsg, shiftMT);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }
                }
                else
                {
                    var EffictedRow = shiftRepository.UpdateMT(Credential.Username, shiftinfoConv);
                    if (EffictedRow > 0 && shiftMT.shift_id > 0)
                    {
                        var Shiftresult = shiftRepository.GetSingle(shiftMT.shift_id);
                        var responeResult = new ResponseResult<ShiftInfo>("1", Resources.Resources.SuccessSaveDataMsg, Shiftresult);

                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }
                    else
                    {
                        var responeResult = new ResponseResult<ShiftMT>("0", Resources.Resources.SaveShiftErrorMsg, shiftMT);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }
                }
               

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.SaveShiftErrorMsg + Exception.Message, Exception.Message);

                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;



        }

       


        [HttpPost]
        [Route("Shifts/Add")]
        [ResponseType(typeof(ResponseResult<ShiftInfo>))]
        [CustomAuthorize(GroupNo = "2", PermissionName = "sch-addshift")]
        public HttpResponseMessage AddShift([FromBody]ShiftInfo ShiftInfo)
        {
            HttpResponseMessage response = null;
            try
            {
                string msg = "";
                if (!shiftRepository.IsValid(ShiftInfo, out msg))
                {
                    var responeResult = new ResponseResult<ShiftInfo>("0", Resources.Resources.SaveShiftErrorMsg + Environment.NewLine + msg, ShiftInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    return response;
                }

                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var NewID = shiftRepository.Add(Credential.Username, ShiftInfo);
                if (NewID > 0)
                {
                    var Shiftresult = shiftRepository.GetSingle(NewID);
                    var responeResult = new ResponseResult<ShiftInfo>("1", Resources.Resources.SuccessSaveDataMsg, Shiftresult);

                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<ShiftInfo>("0", Resources.Resources.SaveShiftErrorMsg, ShiftInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.SaveShiftErrorMsg + Exception.Message, Exception.Message);

                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;



        }

        [HttpPost]
        [Route("Shifts/Update")]
        [ResponseType(typeof(ResponseResult<ShiftInfo>))]
        [CustomAuthorize(GroupNo = "2", PermissionName = "sch-editshift")]
        public HttpResponseMessage UpdateShift([FromBody]ShiftInfo ShiftInfo)
        {
            HttpResponseMessage response = null;
            try
            {
                string msg = "";
                if (!shiftRepository.IsValid(ShiftInfo, out msg))
                {
                    var responeResult = new ResponseResult<ShiftInfo>("0", Resources.Resources.SaveShiftErrorMsg + Environment.NewLine + msg, ShiftInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    return response;
                }
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var EffictedRow = shiftRepository.Update(Credential.Username, ShiftInfo);
                if (EffictedRow > 0 && ShiftInfo.shift_id > 0)
                {
                    var Shiftresult = shiftRepository.GetSingle(ShiftInfo.shift_id);
                    var responeResult = new ResponseResult<ShiftInfo>("1", Resources.Resources.SuccessSaveDataMsg, Shiftresult);

                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<ShiftInfo>("0", Resources.Resources.SaveShiftErrorMsg, ShiftInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.SaveShiftErrorMsg + Exception.Message, Exception.Message);

                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;



        }

        [HttpPost]
        [Route("Shifts/Delete/{id}")]
        [ResponseType(typeof(ResponseResult<ShiftInfo>))]
        [CustomAuthorize(GroupNo = "2", PermissionName = "sch-deleteshift")]
        public HttpResponseMessage DeleteShift(int id)
        {
            HttpResponseMessage response = null;
            try
            {
                ShiftInfo ShiftInfo = shiftRepository.GetSingle(id);
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var ReturnValue = shiftRepository.Delete(Credential.Username, id);
                if (ReturnValue > 0)
                {
                    var responeResult = new ResponseResult<ShiftInfo>("1", Resources.Resources.SuccessDeleteMsg, ShiftInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    string msg = "";
                    if (ReturnValue == -2)
                        msg = Resources.Resources.YoucannotDeleteShiftThatRelatedToScheduleMsg; //"لا يمكن الحذف هناك جداول دوام مرتبطة بالوردية المراد حذفها"


                    var responeResult = new ResponseResult<ShiftInfo>("0", Resources.Resources.DeleteShiftErrorMsg + Environment.NewLine + msg, ShiftInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.DeleteShiftErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }
        #endregion

        #region Schedule Groups
        [HttpGet]
        [Route("Groups/GetAll")]
        [ResponseType(typeof(ResponseResult<IEnumerable<SchedulGroupInfo>>))]
        public HttpResponseMessage GetAllGroups()
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var result = sceduleGroupRepository.GetAll(Credential.Username).OrderBy(o => o.schGroup_id);
                var responeResult = new ResponseResult<IEnumerable<SchedulGroupInfo>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }
        [HttpGet]
        [Route("Groups/GetAll/{EmpID}")]
        [ResponseType(typeof(ResponseResult<IEnumerable<SchedulGroupInfo>>))]
        public HttpResponseMessage GetAllGroups(int EmpID)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var result = sceduleGroupRepository.GetAll(Credential.Username, EmpID).OrderBy(o => o.schGroup_id);
                var responeResult = new ResponseResult<IEnumerable<SchedulGroupInfo>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;



        }
        [HttpGet]
        [Route("Groups/GetByID/{Group_ID}")]
        [ResponseType(typeof(ResponseResult<SchedulGroupInfo>))]
        public HttpResponseMessage GetGroupsByID(int Group_ID)
        {
            HttpResponseMessage response = null;
            try
            {
                var result = sceduleGroupRepository.GetSingle(Group_ID);
                var responeResult = new ResponseResult<SchedulGroupInfo>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;



        }




        [HttpPost]
        [Route("Groups/Add")]
        [ResponseType(typeof(ResponseResult<SchedulGroupInfo>))]
        [CustomAuthorize(GroupNo = "2", PermissionName = "sch-addschGroup")]
        public HttpResponseMessage AddScheduleGroup([FromBody]SchedulGroupInfo ScheduleGrouptInfo)
        {
            HttpResponseMessage response = null;
            try
            {
                string msg = "";
                if (!sceduleGroupRepository.IsValid(ScheduleGrouptInfo, out msg))
                {
                    var responeResult = new ResponseResult<SchedulGroupInfo>("0", Resources.Resources.SaveScheduleGroupErrorMsg + Environment.NewLine + msg, ScheduleGrouptInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    return response;
                }

                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var NewID = sceduleGroupRepository.Add(Credential.Username, ScheduleGrouptInfo);
                if (NewID > 0)
                {
                    var result = sceduleGroupRepository.GetSingle(NewID);
                    var responeResult = new ResponseResult<SchedulGroupInfo>("1", Resources.Resources.SuccessSaveDataMsg, result);

                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<SchedulGroupInfo>("0", Resources.Resources.SaveScheduleGroupErrorMsg, ScheduleGrouptInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.SaveScheduleGroupErrorMsg + Exception.Message, Exception.Message);

                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;



        }

        [HttpPost]
        [Route("Groups/Update")]
        [ResponseType(typeof(ResponseResult<SchedulGroupInfo>))]
        [CustomAuthorize(GroupNo = "2", PermissionName = "sch-editschGroup")]
        public HttpResponseMessage UpdateScheduleGroup([FromBody]SchedulGroupInfo ScheduleGrouptInfo)
        {
            HttpResponseMessage response = null;
            try
            {
                string msg = "";
                if (!sceduleGroupRepository.IsValid(ScheduleGrouptInfo, out msg))
                {
                    var responeResult = new ResponseResult<SchedulGroupInfo>("0", Resources.Resources.SaveScheduleGroupErrorMsg + Environment.NewLine + msg, ScheduleGrouptInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    return response;
                }
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var EffictedRow = sceduleGroupRepository.Update(Credential.Username, ScheduleGrouptInfo);
                if (EffictedRow > 0 && ScheduleGrouptInfo.schGroup_id > 0)
                {
                    var result = sceduleGroupRepository.GetSingle(ScheduleGrouptInfo.schGroup_id);
                    var responeResult = new ResponseResult<SchedulGroupInfo>("1", Resources.Resources.SuccessSaveDataMsg, result);

                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<SchedulGroupInfo>("0", Resources.Resources.SaveScheduleGroupErrorMsg, ScheduleGrouptInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.SaveScheduleGroupErrorMsg + Exception.Message, Exception.Message);

                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }

        [HttpPost]
        [Route("Groups/Delete/{id}")]
        [ResponseType(typeof(ResponseResult<SchedulGroupInfo>))]
        [CustomAuthorize(GroupNo = "2", PermissionName = "sch-deleteschGroup")]
        public HttpResponseMessage DeleteScheduleGroup(int id)
        {
            HttpResponseMessage response = null;
            try
            {
                SchedulGroupInfo ScheduleGrouptInfo = sceduleGroupRepository.GetSingle(id);
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var ReturnValue = sceduleGroupRepository.Delete(Credential.Username, id);
                if (ReturnValue > 0)
                {
                    var responeResult = new ResponseResult<SchedulGroupInfo>("1", Resources.Resources.SuccessDeleteMsg, ScheduleGrouptInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<SchedulGroupInfo>("0", Resources.Resources.DeleteScheduleGroupErrorMsg, ScheduleGrouptInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.DeleteScheduleGroupErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }

        #endregion

        protected override void Dispose(bool disposing)
        {
            scheduleRepository.Dispose();
            shiftRepository.Dispose();
            sceduleGroupRepository.Dispose();
            base.Dispose(disposing);
        }
    }
}
