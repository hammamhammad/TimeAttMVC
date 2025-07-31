using Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using TimeAtt.Security;

namespace TimeAttWebAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
    /// <summary>
    /// Return Resources Language
    /// </summary>
    /// 
    [RoutePrefix("Resources")]
    [CustomAuthorize(GroupNo = "0", PermissionName = "Admin")]
    public class ResourcesController : ApiController
    {
        /// <summary>
        /// Get Resources Language
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAll/{Referesh}")]
        [ResponseType(typeof(HashSet<Localizations>))]
        public async Task<HttpResponseMessage> GetAll(bool Referesh)
        {
            HttpResponseMessage response = null;
            try
            {

                // var UserInfo = HttpContext.Current.User as CustomPrincipal;
                var Res = await Task.FromResult(ResHelper.GetCurrentResources("", Referesh));

                response = Request.CreateResponse(HttpStatusCode.OK, Res);


            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, ex.ToString());
            }
            return response;
        }
        /// <summary>
        /// Get Resources Set
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetResourceSet/{Referesh}")]
        [ResponseType(typeof(HashSet<string>))]
        public async Task<HttpResponseMessage> GetResourceSet(bool Referesh)
        {
            HttpResponseMessage response = null;
            try
            {

                // var UserInfo = HttpContext.Current.User as CustomPrincipal;
                var Res = await Task.FromResult(ResHelper.GetResourcesSet(Referesh));

                response = Request.CreateResponse(HttpStatusCode.OK, Res);


            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, ex.ToString());
            }
            return response;
        }
        /// <summary>
        /// Get Resources Language by ID
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetByID/{ID}")]
        [ResponseType(typeof(Localizations))]
        public async Task<HttpResponseMessage> GetByID(int ID)
        {
            HttpResponseMessage response = null;
            try
            {
                var Res = await Task.FromResult(ResHelper.GetResourceByID(ID));
                response = Request.CreateResponse(HttpStatusCode.OK, Res);
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, ex.ToString());
            }
            return response;
        }
        /// <summary>
        /// Rename Resource Set
        /// </summary>
        /// <param name="ResourceSet"></param>
        /// <param name="NewResourceSet"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("Rename/{ResourceSet}/{NewResourceSet}")]
        [ResponseType(typeof(ResponseResults<bool>))]
        public async Task<HttpResponseMessage> Rename(string ResourceSet, string NewResourceSet)
        {
            HttpResponseMessage response = null;
            try
            {
                var Res = await Task.FromResult(ResHelper.Rename(ResourceSet, NewResourceSet));
                response = Request.CreateResponse(HttpStatusCode.OK, Res);

            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, ex.ToString());
            }
            return response;
        }
        /// <summary>
        /// Get Resources Language
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("Get")]
        [ResponseType(typeof(Dictionary<string, string>))]
        public async Task<HttpResponseMessage> Get()
        {
            HttpResponseMessage response = null;
            try
            {
                var Res = await Task.FromResult(ResHelper.GetCurrentResources());
                var lang = Common.GetCurrentLanguage();
                response = Request.CreateResponse(HttpStatusCode.OK, Res.ToDictionary(p => p.RName, p => lang == "ar" ? p.RValueAR : p.RValueEN));
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, ex.ToString());
            }
            return response;
        }
        /// <summary>
        /// Get Resources Language
        /// </summary>
        /// <param name="ResourceSet">Resources Set to retrieve if null or empty will retrive all resources</param>
        /// <returns></returns>
        [HttpGet]
        [Route("Get/{ResourceSet}")]
        [ResponseType(typeof(Dictionary<string, string>))]
        public async Task<HttpResponseMessage> GetByResourceSet(string ResourceSet)
        {
            HttpResponseMessage response = null;
            try
            {
                var Res = await Task.FromResult(ResHelper.GetCurrentResources(ResourceSet));
                var lang = Common.GetCurrentLanguage();
                response = Request.CreateResponse(HttpStatusCode.OK, Res.ToDictionary(p => p.RName, p => lang == "ar" ? p.RValueAR : p.RValueEN));
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, ex.ToString());
            }
            return response;
        }
        /// <summary>
        /// Get Resources Language
        /// </summary>
        /// <param name="ResourceSet">Resources Set to retrieve if null or empty will retrive all resources</param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet]
        [Route("Get/{ResourceSet}/{Lang}")]
        [ResponseType(typeof(Dictionary<string, string>))]
        public async Task<HttpResponseMessage> GetByResourceSetAndLanguage(string ResourceSet, string Lang)
        {
            HttpResponseMessage response = null;
            try
            {
                var Res = await Task.FromResult(ResHelper.GetCurrentResources(ResourceSet));
                //var lang = Common.GetCurrentLanguage();
                response = Request.CreateResponse(HttpStatusCode.OK, Res.ToDictionary(p => p.RName, p => Lang == "ar" ? p.RValueAR : p.RValueEN));
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, ex.ToString());
            }
            return response;
        }
        /// <summary>
        /// Create Or Update Resource
        /// </summary>
        /// <param name="localization">localization data</param>
        /// <returns></returns>
        [HttpPost]
        [Route("CreateUpdate")]
        [ResponseType(typeof(ResponseResults<Localizations>))]
      
        public async Task<HttpResponseMessage> CreateUpdate([FromBody] Localizations localization)
        {
            HttpResponseMessage response = null;
            try
            {


                var Res = await Task.FromResult(ResHelper.CreateUpdate(localization));

                response = Request.CreateResponse(HttpStatusCode.OK, Res);


            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, ex.ToString());
            }
            return response;
        }

        [HttpPost]
        [Route("Delete/{ID}")]
        [ResponseType(typeof(ResponseResults<Localizations>))]
    
        public async Task<HttpResponseMessage> Delete(int ID)
        {
            HttpResponseMessage response = null;
            try
            {


                var Res = await Task.FromResult(ResHelper.Delete(ID));

                response = Request.CreateResponse(HttpStatusCode.OK, Res);


            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, ex.ToString());
            }
            return response;
        }
    }
}

