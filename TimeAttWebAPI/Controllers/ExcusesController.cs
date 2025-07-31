using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using TimeAtt;
using TimeAtt.Model;
using TimeAtt.Models;
using TimeAtt.Security;

namespace TimeAttWebAPI.Controllers
{
    [RoutePrefix("Excuses")]
    [CustomAuthorize(GroupNo = "7", PermissionName = "exc-view")]
    public class ExcusesController : ApiController
    {
        private ExcusesRepository excusesRepository;
        public ExcusesController()
        {
            this.excusesRepository = new ExcusesRepository();
        }

        public ExcusesController(ExcusesRepository excusesRepository)
        {
            this.excusesRepository = excusesRepository;
        }
        #region Reasons
        [HttpGet]
        [Route("Reasons/GetAll")]
        [ResponseType(typeof(ResponseResult<IEnumerable<ExecuseReasonInfo>>))]
        [AllowAnonymous]
        public HttpResponseMessage GetAllReasons()
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
        [HttpGet]
        [Route("Reasons/GetByID/{ID}")]
        [ResponseType(typeof(ResponseResult<ExecuseReasonInfo>))]
        public HttpResponseMessage GetReasonByID(int ID)
        {
            //return sectionsRepository.GetSingle(id);
            HttpResponseMessage response = null;
            try
            {
                var Result = excusesRepository.GetReasonByID(ID);
                //object myresult =  new  {data = result  };
                var responeResult = new ResponseResult<ExecuseReasonInfo>("1", Resources.Resources.SuccessRetrievedDataMsg, Result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.ErrorExcuseReasonRetriveData + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }
        [HttpPost]
        [CustomAuthorize(GroupNo = "7", PermissionName = "exc-addReason")]
        [Route("Reasons/Add")]
        [ResponseType(typeof(ResponseResult<ExecuseReasonInfo>))]
        public HttpResponseMessage AddExcuseReason([FromBody] ExecuseReasonInfo ExcReasonInfo)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var Result = excusesRepository.AddExcuseReason(ExcReasonInfo, Credential.Username);
                if (Result > 0)
                {
                    var NewExcuseReasonData = excusesRepository.GetReasonByID(Result);
                    var responeResult = new ResponseResult<ExecuseReasonInfo>("1", Resources.Resources.ExcuseReasonAddedSuccessMsg, NewExcuseReasonData);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {

                    var responeResult = new ResponseResult<ExecuseReasonInfo>("0", Resources.Resources.AddExcuseReasonErrorMsg, ExcReasonInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.AddExcuseReasonErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }
        [HttpPost]
        [CustomAuthorize(GroupNo = "7", PermissionName = "exc-editReason")]
        [Route("Reasons/Update")]
        [ResponseType(typeof(ResponseResult<ExecuseReasonInfo>))]
        public HttpResponseMessage UpdateExcuseReason([FromBody] ExecuseReasonInfo ExcReasonInfo)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var Result = excusesRepository.UpdateExcuseReason(ExcReasonInfo, Credential.Username);
                if (Result > 0)
                {
                    var ExcuseReasonData = excusesRepository.GetReasonByID(ExcReasonInfo.execuseReason_id);
                    var responeResult = new ResponseResult<ExecuseReasonInfo>("1", Resources.Resources.SuccessSaveDataMsg, ExcuseReasonData);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {

                    var responeResult = new ResponseResult<ExecuseReasonInfo>("0", Resources.Resources.SaveExcuseReasonErrorMsg, ExcReasonInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.SaveExcuseReasonErrorMsg + ":" + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }
        [HttpPost]
        [CustomAuthorize(GroupNo = "7", PermissionName = "exc-deleteReason")]
        [Route("Reasons/Delete/{ID}")]
        [ResponseType(typeof(ResponseResult<ExecuseReasonInfo>))]
        public HttpResponseMessage DeleteExcuseReason(int ID)
        {

            HttpResponseMessage response = null;
            try
            {
                ExecuseReasonInfo ExecuseReason = excusesRepository.GetReasonByID(ID);
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var ReturnValue = excusesRepository.DeleteExcuseReason(ID, Credential.Username);
                if (ReturnValue > 0)
                {
                    var responeResult = new ResponseResult<ExecuseReasonInfo>("1", Resources.Resources.SuccessDeleteMsg, ExecuseReason);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    string msg = "";
                    if (ReturnValue == 0)
                        msg = Resources.Resources.YouCannotDeleteExcuseReasonRelatedExcuses;
                    var responeResult = new ResponseResult<ExecuseReasonInfo>("0", Resources.Resources.DeleteExcuseReasonErrorMsg + Environment.NewLine + msg, ExecuseReason);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.DeleteExcuseReasonErrorMsg + ":" + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }
        #endregion

       

        #region Excuses
        [HttpGet]
        [Route("GetByID/{exc_ID}")]
        [ResponseType(typeof(ResponseResult<ExecuseInfo>))]
        public HttpResponseMessage GetByID(int exc_ID)
        {
            //return sectionsRepository.GetSingle(id);
            HttpResponseMessage response = null;
            try
            {
                var Result = excusesRepository.GetSingle(exc_ID);
                //object myresult =  new  {data = result  };
                var responeResult = new ResponseResult<ExecuseInfo>("1", Resources.Resources.SuccessRetrievedDataMsg, Result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.ErrorExcuseReasonRetriveData + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }
        [HttpPost]
        [Route("GetAll")]
        [ResponseType(typeof(ResponseResult<IEnumerable<ExecuseInfo>>))]
        public HttpResponseMessage GetAll([FromBody] FormParameters excuseSearchParamater)
        {
            //return sectionsRepository.GetSingle(id);
            HttpResponseMessage response = null;
            try
            {
                ExcuseBody excuseSearch = new ExcuseBody();

                excuseSearch.exc_secid = excuseSearchParamater.Sec_ID.HasValue ? excuseSearchParamater.Sec_ID : 0;
                excuseSearch.exc_RegID = excuseSearchParamater.Reg_ID.HasValue ? excuseSearchParamater.Reg_ID : 0;
                excuseSearch.exc_empid = excuseSearchParamater.Emp_ID.HasValue ? excuseSearchParamater.Emp_ID : 0;
                excuseSearch.exc_fdate = excuseSearchParamater.FromDate;
                excuseSearch.exc_tdate = excuseSearchParamater.ToDate;
                excuseSearch.exc_type = excuseSearchParamater.Type.HasValue ? excuseSearchParamater.Type : 0;
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var Result = excusesRepository.GetAll(Credential.Username, excuseSearch);
                var responeResult = new ResponseResult<IEnumerable<ExecuseInfo>>("1", Resources.Resources.SuccessRetrievedDataMsg, Result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.ErrorExcuseReasonRetriveData + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }

        [HttpPost]
        [CustomAuthorize(GroupNo = "7", PermissionName = "exc-add")]
        [Route("Add")]
        [ResponseType(typeof(ResponseResult<ExecuseInfo>))]
        public HttpResponseMessage AddExcuse([FromBody] ExecuseInfo ExcInfo)
        {
            //return sectionsRepository.GetSingle(id);
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var Result = excusesRepository.AddExcuse(ExcInfo, Credential.Username);
                if (Result > 0)
                {
                    var NewExcuseData = excusesRepository.GetSingle(Result);
                    var responeResult = new ResponseResult<ExecuseInfo>("1", Resources.Resources.ExcuseAddedSuccessMsg, NewExcuseData);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var msg = Resources.Resources.AddExcuseErrorMsg;
                    if (Result == -2)
                    {
                        msg = Resources.Resources.ExcuseMustBeInShiftPeriod;
                    }
                    else if (Result == 0)
                    {
                        msg = Resources.Resources.ExcuseAlreadyExists;
                    }
                    var responeResult = new ResponseResult<ExecuseInfo>("0", msg, ExcInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.AddExcuseErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }

        [HttpPost]
        [CustomAuthorize(GroupNo = "7", PermissionName = "exc-edit")]
        [Route("Update")]
        [ResponseType(typeof(ResponseResult<ExecuseInfo>))]
        public HttpResponseMessage UpdateExcuse([FromBody] ExecuseInfo ExcInfo)
        {
            //return sectionsRepository.GetSingle(id);
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var Result = excusesRepository.UpdateExcuse(ExcInfo, Credential.Username);
                if (Result > 0)
                {
                    var UpdatedExcuseData = excusesRepository.GetSingle(ExcInfo.exc_id);
                    var responeResult = new ResponseResult<ExecuseInfo>("1", Resources.Resources.ExcuseUpdatedSucsessMsg, UpdatedExcuseData);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var msg = Resources.Resources.UpdateExcuseErrorMsg;
                    if (Result == -2)
                    {
                        msg = Resources.Resources.ExcuseMustBeInShiftPeriod;
                    }
                    var responeResult = new ResponseResult<ExecuseInfo>("0", msg, ExcInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.UpdateExcuseErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }

        [HttpPost]
        [CustomAuthorize(GroupNo = "7", PermissionName = "exc-delete")]
        [Route("Delete/{ID}")]
        [ResponseType(typeof(ResponseResult<ExecuseInfo>))]
        public HttpResponseMessage DeleteExcuse(int ID)
        {

            HttpResponseMessage response = null;
            try
            {
                ExecuseInfo excusedata = excusesRepository.GetSingle(ID);
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var ReturnValue = excusesRepository.Delete(Credential.Username, ID);
                if (ReturnValue > 0)
                {
                    var responeResult = new ResponseResult<ExecuseInfo>("1", Resources.Resources.SuccessDeleteMsg, excusedata);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {

                    var responeResult = new ResponseResult<ExecuseInfo>("0", Resources.Resources.DeleteExcuseErrorMsg, excusedata);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.DeleteExcuseErrorMsg + ":" + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }
        #endregion
        protected override void Dispose(bool disposing)
        {
            excusesRepository.Dispose();
            base.Dispose(disposing);
        }


    }
}
