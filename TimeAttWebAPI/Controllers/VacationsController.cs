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
    [RoutePrefix("Vacations")]
    [CustomAuthorize(GroupNo = "6", PermissionName = "vac-view")]
    public class VacationsController : ApiController
    {
        private VacationsTypeRepository vacationsTypeRepository;
        private VacationsRepository vacationsRepository;
        public VacationsController()
        {
            this.vacationsTypeRepository = new VacationsTypeRepository();
            this.vacationsRepository = new VacationsRepository();
        }

        public VacationsController(VacationsTypeRepository vacationsTypeRepository, VacationsRepository vacationsRepository)
        {
            this.vacationsTypeRepository = vacationsTypeRepository;
            this.vacationsRepository = vacationsRepository;

        }

        #region Vacations Type
        [HttpGet]
        [Route("Types/GetAll")]
        [ResponseType(typeof(ResponseResult<IEnumerable<VacationType>>))]
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

        [HttpGet]
        [Route("Types/GetByID/{ID}")]
        [ResponseType(typeof(ResponseResult<VacationType>))]
        public HttpResponseMessage GetTypeByID(int ID)
        {
            //return sectionsRepository.GetSingle(id);
            HttpResponseMessage response = null;
            try
            {
                var Result = vacationsTypeRepository.GetSingle(ID);
                //object myresult =  new  {data = result  };
                var responeResult = new ResponseResult<VacationType>("1", Resources.Resources.SuccessRetrievedDataMsg, Result);
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
        [CustomAuthorize(GroupNo = "6", PermissionName = "vac-addtype")]
        [Route("Types/Add")]
        [ResponseType(typeof(ResponseResult<VacationType>))]
        public HttpResponseMessage AddType([FromBody] VacationType vacationType)
        {

            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var NewID = vacationsTypeRepository.Add(Credential.Username, vacationType);

                if (NewID > 0)
                {
                    var Result = vacationsTypeRepository.GetSingle(NewID);
                    var responeResult = new ResponseResult<VacationType>("1", Resources.Resources.SuccessAddDataMsg, Result);

                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<VacationType>("0", Resources.Resources.AddVactionTypeErrorMsg, vacationType);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.AddVactionTypeErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }
        [HttpPost]
        [CustomAuthorize(GroupNo = "6", PermissionName = "vac-edittype")]
        [Route("Types/Update")]
        [ResponseType(typeof(ResponseResult<VacationType>))]
        public HttpResponseMessage UpdateType([FromBody] VacationType vacationType)
        {

            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var RowsEffected = vacationsTypeRepository.Update(Credential.Username, vacationType);

                if (RowsEffected > 0)
                {

                    var responeResult = new ResponseResult<VacationType>("1", Resources.Resources.SuccessSaveDataMsg, vacationType);

                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<VacationType>("0", Resources.Resources.SaveVacationTypeErrorMsg, vacationType);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.SaveVacationTypeErrorMsg + ":" + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }
        [HttpPost]
        [CustomAuthorize(GroupNo = "6", PermissionName = "vac-deletetype")]
        [Route("Types/Delete/{ID}")]
        [ResponseType(typeof(ResponseResult<VacationType>))]
        public HttpResponseMessage DeleteType(int ID)
        {

            HttpResponseMessage response = null;
            try
            {
                VacationType vacationType = vacationsTypeRepository.GetSingle(ID);
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var ReturnValue = vacationsTypeRepository.Delete(Credential.Username, ID);
                if (ReturnValue > 0)
                {
                    var responeResult = new ResponseResult<VacationType>("1", Resources.Resources.SuccessDeleteMsg, vacationType);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    string msg = "";
                    if (ReturnValue == 0)
                        msg = Resources.Resources.YouCannotDeleteVacationTypeRelatedVacations;
                    var responeResult = new ResponseResult<VacationType>("0", Resources.Resources.DeleteVacationTypeErrorMsg + Environment.NewLine + msg, vacationType);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.DeleteVacationTypeErrorMsg + ":" + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }
        #endregion
        #region Vacations
        [HttpPost]
        [Route("GetAll")]
        [ResponseType(typeof(ResponseResult<IEnumerable<VacationsInfo>>))]
        public HttpResponseMessage GetAllVacations([FromBody] FormParameters vacationSearchParameters)
        {
            HttpResponseMessage response = null;
            try
            {
                VacationBody vacationSearch = new VacationBody();

                vacationSearch.vac_secid = vacationSearchParameters.Sec_ID.HasValue ? vacationSearchParameters.Sec_ID : 0;
                vacationSearch.vac_RegID = vacationSearchParameters.Reg_ID.HasValue ? vacationSearchParameters.Reg_ID : 0;
                vacationSearch.vac_empid = vacationSearchParameters.Emp_ID.HasValue  ? vacationSearchParameters.Emp_ID  : 0;
                vacationSearch.vac_fdate = vacationSearchParameters.FromDate ;
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
        [HttpGet]
        [Route("GetByID/{ID}")]
        [ResponseType(typeof(ResponseResult<VacationsInfo>))]
        public HttpResponseMessage GetVacationByID(int ID)
        {
            HttpResponseMessage response = null;
            try
            {

                var Result = vacationsRepository.GetSingle(ID);
                var responeResult = new ResponseResult<VacationsInfo>("1", Resources.Resources.SuccessRetrievedDataMsg, Result);
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
        [CustomAuthorize(GroupNo = "6", PermissionName = "vac-addvac")]
        [Route("Add")]
        [ResponseType(typeof(ResponseResult<VacationsInfo>))]
        public HttpResponseMessage AddVacation([FromBody] VacationBody vacation)
        {

            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var NewID = vacationsRepository.Add(Credential.Username, vacation);

                if (NewID > 0)
                {
                    if (vacation.vac_empid != null && vacation.vac_empid != 0)
                    {
                        var Result = vacationsRepository.GetSingle(NewID);
                        var responeResult = new ResponseResult<VacationsInfo>("1", Resources.Resources.SuccessAddDataMsg, Result);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);

                    }
                    else
                    {
                        var Result = vacationsRepository.GetAll(Credential.Username, vacation);
                        var responeResult = new ResponseResult<IEnumerable<VacationsInfo>>("1", Resources.Resources.SuccessAddDataMsg, Result);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }

                }
                else
                {
                    if (vacation.vac_empid != null && vacation.vac_empid != 0)
                    {
                        var responeResult = new ResponseResult<VacationBody>("0", Resources.Resources.TherIsvacationForEmpInSameDateMsg, vacation);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }
                    else
                    {
                        var responeResult = new ResponseResult<VacationBody>("0", Resources.Resources.AddVactionErrorMsg, vacation);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);

                    }

                }
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.AddVactionErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }
        [HttpPost]
        [CustomAuthorize(GroupNo = "6", PermissionName = "vac-editvac")]
        [Route("Update")]
        [ResponseType(typeof(ResponseResult<VacationsInfo>))]
        public HttpResponseMessage UpdateVacation([FromBody] VacationBody vacation)
        {

            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                var RowEffected = vacationsRepository.Update(Credential.Username, vacation);

                if (RowEffected > 0)
                {
                    var Result = vacationsRepository.GetSingle(vacation.vac_id);
                    var responeResult = new ResponseResult<VacationsInfo>("1", Resources.Resources.SuccessSaveDataMsg, Result);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<VacationBody>("0", Resources.Resources.SaveVacationErrorMsg, vacation);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.SaveVacationErrorMsg + ":" + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }
        [HttpPost]
        [CustomAuthorize(GroupNo = "6", PermissionName = "vac-deletevac")]
        [Route("Delete/{ID}")]
        [ResponseType(typeof(ResponseResult<VacationsInfo>))]
        public HttpResponseMessage DeleteVacation(int ID)
        {

            HttpResponseMessage response = null;
            try
            {
                VacationsInfo vacation = vacationsRepository.GetSingle(ID);
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var ReturnValue = vacationsRepository.Delete(Credential.Username, ID);
                if (ReturnValue > 0)
                {
                    var responeResult = new ResponseResult<VacationsInfo>("1", Resources.Resources.SuccessDeleteMsg, vacation);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {

                    var responeResult = new ResponseResult<VacationsInfo>("0", Resources.Resources.DeleteVacationErrorMsg, vacation);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.DeleteVacationErrorMsg + ":" + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }
        #endregion
        protected override void Dispose(bool disposing)
        {
            vacationsRepository.Dispose();
            base.Dispose(disposing);
        }
    }
}
