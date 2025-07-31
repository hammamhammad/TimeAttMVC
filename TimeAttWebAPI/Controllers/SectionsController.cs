using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.OData;
using TimeAtt;
using TimeAtt.Models;
using TimeAtt.Security;

namespace TimeAttWebAPI.Controllers
{
    [RoutePrefix("Sections")]
    [CustomAuthorize(GroupNo = "1", PermissionName = "sec-view")]
    public class SectionsController : ApiController
    {
        private SectionsRepository sectionsRepository;
        public SectionsController()
        {
            this.sectionsRepository = new SectionsRepository();
        }

        public SectionsController(SectionsRepository sectionsRepository)
        {
            this.sectionsRepository = sectionsRepository;
        }
        // GET api/<controller>
        [HttpGet]
        [Route("GetAll")]
        [ResponseType(typeof(ResponseResult<IEnumerable<SectionsInfo>>))]
        public HttpResponseMessage GetAllSections()
        {
            HttpResponseMessage response = null;
            try
            {


                var result = sectionsRepository.GetAll().OrderBy(o => o.sec_ID);
                //object myresult =  new  {data = result  };
                var responeResult = new ResponseResult<IEnumerable<SectionsInfo>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);


            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadSectionListErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;



        }
        [HttpGet]
        [Route("GetAll/Tree")]
        [ResponseType(typeof(ResponseResult<IEnumerable<TreeNodes>>))]

        public HttpResponseMessage GetSectionsTree()
        {
            HttpResponseMessage response = null;
            try
            {


                var result = Common.GetSectionTreeNodes().OrderBy(o => o.id);
                var responeResult = new ResponseResult<IEnumerable<TreeNodes>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                //object myresult = new { data = result };
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);


            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadSectionListErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
            //return new string[] { "value1", "value2" };


        }
        [HttpGet]
        [Route("GetReport")]
        [ResponseType(typeof(ResponseResult<IEnumerable<SectionsInfo>>))]
        [CustomAuthorize(GroupNo = "8", PermissionName = "rep-sec")]
        public HttpResponseMessage GetReport()
        {
            HttpResponseMessage response = null;
            try
            {


                var result = sectionsRepository.GetAllAsTree();
                var responeResult = new ResponseResult<IEnumerable<SectionsInfo>>("1", Resources.Resources.SuccessRetrievedDataMsg, result);
                //object myresult = new { data = result };
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);


            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadSectionListErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
            //return new string[] { "value1", "value2" };


        }

        // GET api/<controller>/5
        [HttpGet]
        [Route("GetByID/{id}")]
        [ResponseType(typeof(ResponseResult<SectionsInfo>))]

        public HttpResponseMessage Get(int id)
        {
            //return sectionsRepository.GetSingle(id);
            HttpResponseMessage response = null;
            try
            {
                var Sectionresult = sectionsRepository.GetSingle(id);
                //object myresult =  new  {data = result  };
                var responeResult = new ResponseResult<SectionsInfo>("1", Resources.Resources.SuccessRetrievedDataMsg, Sectionresult);
                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.LoadDataErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;

        }

        // POST api/<controller>
        [HttpPost]
        [Route("Add")]
        [ResponseType(typeof(ResponseResult<SectionsInfo>))]
        [CustomAuthorize(GroupNo = "1", PermissionName = "sec-add")]
        public HttpResponseMessage Add([FromBody]SectionsInfo SecInfo)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var NewID = sectionsRepository.Add(Credential.Username, SecInfo);
                if (NewID > 0)
                {
                    var Sectionresult = sectionsRepository.GetSingle(NewID);
                    var responeResult = new ResponseResult<SectionsInfo>("1", Resources.Resources.SuccessAddDataMsg, Sectionresult);

                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<SectionsInfo>("0", Resources.Resources.AddSectionErrorMsg, SecInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.AddSectionErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }

        // PUT api/<controller>
        [HttpPost]
        [Route("Update")]
        [ResponseType(typeof(ResponseResult<SectionsInfo>))]
        [CustomAuthorize(GroupNo = "1", PermissionName = "sec-edit")]
        public HttpResponseMessage Update([FromBody]SectionsInfo SecInfo)
        {
            HttpResponseMessage response = null;
            try
            {
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var EffictedRow = sectionsRepository.Update(Credential.Username, SecInfo);
                if (EffictedRow > 0 && SecInfo.sec_ID > 0)
                {
                    var Sectionresult = sectionsRepository.GetSingle(SecInfo.sec_ID);
                    var responeResult = new ResponseResult<SectionsInfo>("1", Resources.Resources.SuccessSaveDataMsg, Sectionresult);

                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<SectionsInfo>("0", Resources.Resources.SaveSectionErrorMsg, SecInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.SaveSectionErrorMsg + Exception.Message, Exception.Message);

                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }

        // DELETE api/<controller>/5
        [HttpPost]
        [Route("Delete/{id}")]
        [ResponseType(typeof(ResponseResult<SectionsInfo>))]
        [CustomAuthorize(GroupNo = "1", PermissionName = "sec-delete")]
        public HttpResponseMessage Delete(int id)
        {
            HttpResponseMessage response = null;
            try
            {
                SectionsInfo SecInfo = sectionsRepository.GetSingle(id);
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var ReturnValue = sectionsRepository.Delete(Credential.Username, id);
                if (ReturnValue > 0)
                {
                    var responeResult = new ResponseResult<SectionsInfo>("1", Resources.Resources.SuccessDeleteMsg, SecInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    string msg = "";
                    if (ReturnValue == -2)
                        msg = Resources.Resources.YoucannotDeleteMainSectionMsg ; //"لا يمكن حذف القسم الرئيسي لجميع الأقسام";
                    if (ReturnValue == -3)
                        msg = Resources.Resources.YouCannotDeleteSectionUnderSectionMsg;//"لا يمكن حذف القسم لوجود أقسام تابعة له..يجب حذف الأقسام التابع للقسم المراد حذفه لتتمكن من عملية الحذف";
                    else if (ReturnValue == -4)
                        msg = Resources.Resources.YouCannotDeleteSectionWithEmployeeMsg; //"لا يمكن حذف القسم لوجود موظفين تابعين للقسم أو الأقسام التابعة";
                    var responeResult = new ResponseResult<SectionsInfo>("0", Resources.Resources.DeleteSectionErrorMsg + Environment.NewLine + msg, SecInfo);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }

            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.DeleteSectionErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }

        // Move Section api/<controller>/5
        [HttpPost]
        [Route("Move/{ID}/{Parent}")]
        [ResponseType(typeof(ResponseResult<SectionsInfo>))]
        [CustomAuthorize(GroupNo = "1", PermissionName = "sec-move")]
        public HttpResponseMessage Move(int ID, int Parent)
        {
            HttpResponseMessage response = null;
            try
            {
                SectionsInfo FromNode = sectionsRepository.GetSingle(ID);
                SectionsInfo ToNode = sectionsRepository.GetSingle(Parent);
                var Res = new { FromNode, ToNode };
                var Credential = Common.GetCurrentCredentials(Request.Headers.Authorization);

                var ReturnValue = sectionsRepository.Move(Credential.Username, FromNode, ToNode.sec_ID);
                if (ReturnValue > 0)
                {
                    var responeResult = new ResponseResult<SectionsInfo>("1", Resources.Resources.SuccessMoveSectionMsg, FromNode);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
                else
                {
                    var responeResult = new ResponseResult<SectionsInfo>("0", Resources.Resources.MoveSectionErrorMsg, FromNode);
                    response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                }
            }
            catch (Exception Exception)
            {
                var responeResult = new ResponseResult<string>("0", Resources.Resources.MoveSectionErrorMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }

            return response;
        }
        protected override void Dispose(bool disposing)
        {
            sectionsRepository.Dispose();
            base.Dispose(disposing);
        }
    }
}