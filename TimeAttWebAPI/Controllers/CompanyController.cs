using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using TimeAtt.Model;
using TimeAtt.Models;
using TimeAtt.Security;

namespace TimeAttWebAPI.Controllers
{
    [RoutePrefix("Company")]
    [CustomAuthorize(GroupNo = "0", PermissionName = "Admin")]
    public class CompanyController : ApiController
    {
        private CompanyRepository companyRepository;
        public CompanyController()
        {
            this.companyRepository = new CompanyRepository();
        }

        public CompanyController(CompanyRepository companyRepository)
        {
            this.companyRepository = companyRepository;
        }
        [HttpGet]
        [Route("Image/Get")]
        [AllowAnonymous]
        
        public HttpResponseMessage GetImage()
        {
            HttpResponseMessage response = null;
            try
            {
                var company = companyRepository.GetSingle();

                byte[] imgData = company.logo;
                MemoryStream ms = new MemoryStream(imgData);

                response = Request.CreateResponse(HttpStatusCode.OK);
                response.Content = new StreamContent(ms);
                response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("image/png");

            }
            catch (Exception)
            {

                response = Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
            return response;
        }
        [HttpGet]
        [Route("Get")]
        [AllowAnonymous]
        [ResponseType(typeof(ResponseResult<CompanyInfo>))]
        public HttpResponseMessage Get()
        {
            HttpResponseMessage response = null;
            try
            {
                var company = companyRepository.GetSingle();
                company.logo = null;
                var responeResult = new ResponseResult<CompanyInfo>("1", Resources.Resources.SuccessRetrievedDataMsg, company);

                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);


            }
            catch (Exception Exception)
            {

                var responeResult = new ResponseResult<string>("0", Resources.Resources.ErrorRetrievedDataMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        [HttpGet]
        [Route("GetWithLogo")]
        [AllowAnonymous]
        [ResponseType(typeof(ResponseResult<IEnumerable<CompanyInfo>>))]
        public HttpResponseMessage GetWithLogo()
        {
            HttpResponseMessage response = null;
            try
            {
                var company = companyRepository.GetAll();
                //company.logo = null;
                var responeResult = new ResponseResult<IEnumerable<CompanyInfo>>("1", Resources.Resources.SuccessRetrievedDataMsg, company);

                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);


            }
            catch (Exception Exception)
            {

                var responeResult = new ResponseResult<string>("0", Resources.Resources.ErrorRetrievedDataMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        [HttpPost]
        [Route("Update")]
        [ResponseType(typeof(ResponseResult<CompanyInfo>))]
        public HttpResponseMessage Update()
        {
            HttpResponseMessage response = null;
            byte[] fileRcrd = null;
            Stream file_Strm = null;
            try
            {
                var company = companyRepository.GetSingle();
                company.logo = null;
                var httpRequest = HttpContext.Current.Request;
                var msg = "";
                // Check if files are available
                if (httpRequest.Files.Count > 0)
                {
                   
                    var postedFile = httpRequest.Files[0];
                    var ext = postedFile.FileName.Split('.')[1].ToString().ToLower() ;
                    var extarr=new string[]{"gif", "png", "jpg", "jpeg"};
                     var size = (postedFile.ContentLength / 1024)*1.0;
                    size=Math.Round(((size / 1024) * 100) / 100);
                    if (!extarr.Contains(ext))
                    {
                        msg = Resources.Resources.CompanyLogoMustBeImageMsg;
                    }
                    else if (size>3.0)
                    {
                        msg = Resources.Resources.CompanyLogoSizeMusBeLessThan1MBMsg;
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
                }
                 if (msg != "")
                 {
                     var responeResult = new ResponseResult<CompanyInfo>("0", msg, company);
                     response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                 }
                 else
                 {
                     CompanyInfo Company = new CompanyInfo { name = httpRequest.Form["CompanyName"], logo = fileRcrd, CalType = "G" };
                     var result = companyRepository.Update(Company);
                     if (result > 0)
                     {
                         var responeResult = new ResponseResult<CompanyInfo>("1", Resources.Resources.SuccessSaveDataMsg, company);
                         response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                     }
                     else
                     {
                         var responeResult = new ResponseResult<CompanyInfo>("0", Resources.Resources.ErrorSaveDataMsg, company);
                         response = Request.CreateResponse(HttpStatusCode.OK, responeResult);
                     }
                 }
                
              
            }
            catch (Exception Exception)
            {

                var responeResult = new ResponseResult<string>("0", Resources.Resources.ErrorSaveDataMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            finally
            {

                fileRcrd = null;
                if (file_Strm != null)
                {
                    file_Strm.Dispose();
                }
                file_Strm = null;
            }
            return response;

        }
        [HttpGet]
        [Route("Settings/Get/{sid}")]
        [AllowAnonymous]
        [ResponseType(typeof(ResponseResult<string>))]
        public HttpResponseMessage GetSettings(int sid)
        {
            HttpResponseMessage response = null;
            try
            {
                var value = companyRepository.GetSettings(sid);
                
                var responeResult = new ResponseResult<string>("1", Resources.Resources.SuccessRetrievedDataMsg, value);

                response = Request.CreateResponse(HttpStatusCode.OK, responeResult);


            }
            catch (Exception Exception)
            {

                var responeResult = new ResponseResult<string>("0", Resources.Resources.ErrorRetrievedDataMsg + Exception.Message, Exception.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, responeResult);
            }
            return response;
        }
        protected override void Dispose(bool disposing)
        {
            companyRepository.Dispose();
            base.Dispose(disposing);
        }
    }
}
