using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Description;
using TimeAtt;
using TimeAtt.Models;
using TimeAtt.Security;

namespace TimeAttWebAPI.Controllers
{
    [RoutePrefix("Employees")]
    [CustomAuthorize(GroupNo = "3", PermissionName = "emp-view")]
    public class EmployeesController : ApiController
    {
        private EmployeesRepository employeesRepository;

        public EmployeesController()
        {
            this.employeesRepository = new EmployeesRepository();
        }
        public EmployeesController(EmployeesRepository employeesRepository)
        {
            this.employeesRepository = employeesRepository;
        }

        [HttpGet]
        [Route("GetAll/{Sec_ID?}/{Reg_ID?}")]
        [ResponseType(typeof(ResponseResult<IEnumerable<EmployeeInfo>>))]
        [AllowAnonymous]
        public HttpResponseMessage GetAllEmployee(int Sec_ID=0,int Reg_ID=0)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var result = employeesRepository.GetAll(Credential.Username , Sec_ID, Reg_ID).OrderBy(o => o.emp_card);
                var responeResult = new ResponseResult<IEnumerable<EmployeeInfo>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message );
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }

        [HttpGet]
        [Route("GetAllLocations")]
        [ResponseType(typeof(ResponseResult<IEnumerable<Locations>>))]
        [AllowAnonymous]
        public HttpResponseMessage GetAllLocations()
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var result = employeesRepository.GetEmployeesLocations();
                var responeResult = new ResponseResult<IEnumerable<Locations>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message );
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        [HttpPost]
        [Route("GetReport")]
        [ResponseType(typeof(ResponseResult<IEnumerable<EmployeeInfo>>))]
        [CustomAuthorize(GroupNo = "8", PermissionName = "rep-emp")]
        public HttpResponseMessage GetReport([FromBody]  FormParameters Para)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var result = employeesRepository.GetReport(Credential.Username, Para.Sec_ID, Resources.Resources.lang);
                var responeResult = new ResponseResult<IEnumerable<EmployeeInfo>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message );
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        [HttpGet]
        [Route("GetAllPaging")]
        [ResponseType(typeof(ResponseResult<DataTableData<EmployeeInfo>>))]
        public HttpResponseMessage GetAllEmployeePaging( )
        {
          
            Dictionary<string, string> QueryString = Request.GetQueryStrings();
            int Sec_ID=QueryString["Sec_ID"].ToInt();
            long Reg_ID = QueryString["Reg_ID"].ToLong();
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var result = employeesRepository.GetAllPaging(Credential.Username, Sec_ID, Reg_ID, QueryString);
                var responeResult = new ResponseResult<DataTableData <EmployeeInfo>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        [HttpGet]
        [Route("GetByID/{emp_ID}")]
        [ResponseType(typeof(ResponseResult<EmployeeInfo>))]
        public HttpResponseMessage GetByID(int  emp_ID)
        {
            HttpResponseMessage response = null;
            try
            {
                var result = employeesRepository.GetSingle(emp_ID);
                //object myresult =  new  {data = result  };
                var responeResult = new ResponseResult<EmployeeInfo>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message );
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }
        [HttpGet]
        [Route("GetByEmpNo/{emp_NO}")]
        [ResponseType(typeof(ResponseResult<EmployeeInfo>))]
        public HttpResponseMessage GetByID(string emp_NO)
        {
            HttpResponseMessage response = null;
            try
            {
                var result = employeesRepository.GetSingle(emp_NO);
                var responeResult = new ResponseResult<EmployeeInfo>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message );
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }

        [HttpGet]
        [Route("GetEmployeeType")]
        [ResponseType(typeof(ResponseResult<IEnumerable<Constant>>))]
        public HttpResponseMessage GetEmployeeType()
        {
            HttpResponseMessage response = null;
            try
            {
                var result = employeesRepository.GetEmployeeType();
                var responeResult = new ResponseResult<IEnumerable<Constant>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }

        [HttpPost]
        [Route("CheckEmployee")]
        [ResponseType(typeof(ResponseResult<EmployeeInfo>))]
        public HttpResponseMessage CheckEmployee([FromBody] EmployeeInfo EmpInfo)
        {

            HttpResponseMessage response = null;
            try
            {
                string msg="";
               if (!employeesRepository.IsValid(EmpInfo,out msg))
               {
                   var responeResult = new ResponseResult<EmployeeInfo>("0", Resources.Resources.ErrorSaveDataMsg + " : " + msg, EmpInfo);
                   response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                   return response;
               }
                var result = employeesRepository.CheckEmployeeExists( EmpInfo);
                if (result== 0)
                {
                    var responeResult = new ResponseResult<EmployeeInfo>("1", Resources.Resources.SuccessRetrievedDataMsg, EmpInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    if (result>0)
                    {
                        EmpInfo.emp_id = result;
                        var responeResult = new ResponseResult<EmployeeInfo>("2", Resources.Resources.ConfirmationChangeEmployeeNoMsg, EmpInfo);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }
                    else if (result==-2)
                    {
                        var responeResult = new ResponseResult<EmployeeInfo>("0", Resources.Resources.EmployeeNoAlreadyExistsMSg, EmpInfo);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }
                    else if (result == -3)
                    {
                        var responeResult = new ResponseResult<EmployeeInfo>("0", Resources.Resources.EmployeeCardNoAlreadyExistsMSg, EmpInfo);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }
                    else
                    {
                        var responeResult = new ResponseResult<EmployeeInfo>("0", Resources.Resources.ErrorRetrievedDataMsg, EmpInfo);
                        response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                    }
                       

                    
                }
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.ErrorRetrievedDataMsg + ":" + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }

        [HttpPost]
        [Route("Add")]
        [ResponseType(typeof(ResponseResult<EmployeeInfo>))]
        [CustomAuthorize(GroupNo = "3", PermissionName = "emp-add")]
        public HttpResponseMessage Add([FromBody] EmployeeInfo EmpInfo)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var NewID = employeesRepository.Add(Credential.Username, EmpInfo);
                if (NewID > 0)
                {
                    var Result = employeesRepository.GetSingle(NewID);
                    var responeResult = new ResponseResult<EmployeeInfo>("1", Resources.Resources.SuccessAddDataMsg, Result);

                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<EmployeeInfo>("0", Resources.Resources.AddEmployeeErrorMsg, EmpInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.AddEmployeeErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }
        [HttpPost]
        [Route("Update")]
        [ResponseType(typeof(ResponseResult<EmployeeInfo>))]
        [CustomAuthorize(GroupNo = "3", PermissionName = "emp-edit")]
        public HttpResponseMessage Update([FromBody] EmployeeInfo EmpInfo)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var NewID = employeesRepository.Update(Credential.Username, EmpInfo);
                if (NewID > 0)
                {
                    var Result = employeesRepository.GetSingle(EmpInfo.emp_id);
                    var responeResult = new ResponseResult<EmployeeInfo>("1", Resources.Resources.SuccessSaveDataMsg, Result);

                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<EmployeeInfo>("0", Resources.Resources.SaveEmployeeErrorMsg, EmpInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.SaveEmployeeErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }

        [HttpPost]
        [Route("Delete/{emp_id}/{deleteolddata}")]
        [ResponseType(typeof(ResponseResult<EmployeeInfo>))]
        [CustomAuthorize(GroupNo = "3", PermissionName = "emp-delete")]
        public HttpResponseMessage Delete(int emp_id, bool deleteolddata)
        {
            HttpResponseMessage response = null;
            try
            {
                EmployeeInfo Empinfo = employeesRepository.GetSingle(emp_id);
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var ReturnValue = employeesRepository.Delete(Credential.Username, emp_id, deleteolddata);
                if (ReturnValue > 0)
                {
                    var responeResult = new ResponseResult<EmployeeInfo>("1", Resources.Resources.SuccessDeleteMsg, Empinfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<EmployeeInfo>("0", Resources.Resources.DeleteEmployeeErrorMsg, Empinfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.DeleteEmployeeErrorMsg + " : " + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }
        protected override void Dispose(bool disposing)
        {
            employeesRepository.Dispose();
            base.Dispose(disposing);
        }

    }
}
