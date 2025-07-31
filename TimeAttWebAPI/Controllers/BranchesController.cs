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
    [RoutePrefix("Branches")]
    [CustomAuthorize(GroupNo = "20", PermissionName = "reg-view")]
    public class BranchesController : ApiController
    {
        private RegionsRepository branchesRepository;
        public BranchesController()
        {
            this.branchesRepository = new RegionsRepository();
        }

        public BranchesController(RegionsRepository branchesRepository)
        {
            this.branchesRepository = branchesRepository;
        }
        [HttpGet]
        [Route("GetAll")]
        [AllowAnonymous]
        [ResponseType(typeof(ResponseResult<IEnumerable<RegionsInfo>>))]
        public HttpResponseMessage GetAll()
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);
                
                var result = branchesRepository.GetAll(Credential.Username).OrderBy(o => o.reg_id);
                //object myresult =  new  {data = result  };
                var responeResult = new ResponseResult<IEnumerable<RegionsInfo>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);


            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadBranchListErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;



        }
        [HttpGet]
        [Route("GetByID/{id}")]
        [ResponseType(typeof(ResponseResult<RegionsInfo>))]
        public HttpResponseMessage Get(int id)
        {
            //return sectionsRepository.GetSingle(id);
            HttpResponseMessage response = null;
            try
            {
                var result = branchesRepository.GetSingle(id);
                //object myresult =  new  {data = result  };
                var responeResult = new ResponseResult<RegionsInfo>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
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
        [ResponseType(typeof(ResponseResult<RegionsInfo>))]
        [CustomAuthorize(GroupNo = "20", PermissionName = "reg-add")]
        public HttpResponseMessage Add([FromBody]RegionsInfo RegInfo)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var NewID = branchesRepository.Add(Credential.Username, RegInfo);
                if (NewID > 0)
                {
                    var Sectionresult = branchesRepository.GetSingle(RegInfo.reg_id);
                    var responeResult = new ResponseResult<RegionsInfo>("1", Resources.Resources.SuccessAddDataMsg, Sectionresult);

                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    string msg = "";
                    if (NewID == -2)
                        msg = Resources.Resources.BranchNoAlreadyExistsMsg;

                    var responeResult = new ResponseResult<RegionsInfo>("0", Resources.Resources.AddBranchErrorMsg + " " + msg, RegInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.AddBranchErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }

        // PUT api/<controller>
        [HttpPost]
        [Route("Update/{CurrentID}")]
        [ResponseType(typeof(ResponseResult<RegionsInfo>))]
        [CustomAuthorize(GroupNo = "20", PermissionName = "reg-edit")]
        public HttpResponseMessage Update(long CurrentID, [FromBody]RegionsInfo RegInfo)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var EffictedRow = branchesRepository.Update(Credential.Username,CurrentID, RegInfo);
                if (EffictedRow > 0 && RegInfo.reg_id > 0)
                {
                    var result = branchesRepository.GetSingle(RegInfo.reg_id);
                    var responeResult = new ResponseResult<RegionsInfo>("1", Resources.Resources.SuccessSaveDataMsg, result);

                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    string msg = "";
                    if (EffictedRow == -2)
                        msg = Resources.Resources.BranchNoAlreadyExistsMsg;
                    var responeResult = new ResponseResult<RegionsInfo>("0", Resources.Resources.SaveBranchErrorMsg + " " + msg, RegInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.SaveBranchErrorMsg + Exception.Message, Exception.Message);

                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }

        // DELETE api/<controller>/5
        [HttpPost]
        [Route("Delete/{id}")]
        [ResponseType(typeof(ResponseResult<RegionsInfo>))]
        [CustomAuthorize(GroupNo = "20", PermissionName = "reg-delete")]
        public HttpResponseMessage Delete(long id)
        {
            HttpResponseMessage response = null;
            try
            {
                RegionsInfo regInfo = branchesRepository.GetSingle(id);
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var ReturnValue = branchesRepository.Delete(Credential.Username, id);
                if (ReturnValue > 0)
                {
                    var responeResult = new ResponseResult<RegionsInfo>("1", Resources.Resources.SuccessDeleteMsg, regInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    string msg = "";
                    if (ReturnValue == -2)
                        msg = Resources.Resources.ThereAreEmployeesRelatedToBranchMsg;
                    var responeResult = new ResponseResult<RegionsInfo>("0", Resources.Resources.DeleteBranchErrorMsg + Environment.NewLine + msg, regInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.DeleteBranchErrorMsg + " " + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }
        protected override void Dispose(bool disposing)
        {
            branchesRepository.Dispose();
            base.Dispose(disposing);
        }
    }
}
