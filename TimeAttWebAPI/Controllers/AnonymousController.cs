using ExtensionMethods;
using Newtonsoft.Json.Linq;
using Resources;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using TimeAtt.Model.Security;
using TimeAtt.Models;
using Resource = Resources.Resources;
namespace TimeAttWebAPI.Controllers
{
    /// <summary>
    /// Anonymous functions
    /// </summary>
    [RoutePrefix("Anonymous")]
    [AllowAnonymous]
    public class AnonymousController : ApiController
    {
        /// <summary>
        ///  Refresh Context
        /// </summary>
        /// <returns>ResponseResult of string </returns>
        [HttpGet]
        [ResponseType(typeof(ResponseResult<string>))]
        [Route("IamHere")]
        public async Task<HttpResponseMessage> IamHere()
        {
            HttpResponseMessage response = null;
            try
            {
                if (TimeAtt.Common.GetCurrentUserInfo() != null)
                {
                    var obj = await Task.FromResult(new ResponseResult<string>("1", "Success", "Is OK"));
                    response = Request.CreateResponse(HttpStatusCode.OK, obj);
                }
            }
            catch (Exception)
            {
                var obj = await Task.FromResult(new ResponseResult<string>("0", "failed", "Is not login"));
                response = Request.CreateResponse(HttpStatusCode.OK, obj);
            }
            return response;
        }
        /// <summary>
        /// Login
        /// </summary>
        /// <param name="credentials"></param>
        /// <returns>ResponseResult of string </returns>
        [HttpPost]
        [ResponseType(typeof(ResponseResult<string>))]
        [Route("login")]
        public async Task<HttpResponseMessage> Login([FromBody] CredentialsLogin credentials)
        {
            ResponseResult<string> Res = null;

            var IsAuthenticated = await Task.FromResult(MyIdentity.Authenticate(credentials.Username, credentials.Password, credentials.RememberMe, false, "F"));
            if (IsAuthenticated)
                Res = new ResponseResult<string>("1", "Success", "Is OK");
            else
            {

                Res = new ResponseResult<string>("0", Resources.Resources.Incorrectusernamepassword, null);

            }



            return Request.CreateResponse(HttpStatusCode.OK, Res);
        }
        [HttpPost]
        [ResponseType(typeof(ResponseResult<string>))]
        [Route("logout")]
        public HttpResponseMessage logout()
        {
            ResponseResult<string> Res = null;
            MyIdentity.ClearAuthCookie();
            Res = new ResponseResult<string>("1", "Success", "Is OK");
            return Request.CreateResponse(HttpStatusCode.OK, Res);
        }
        /// <summary>
        /// Get Resources Language
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetResources")]
        [ResponseType(typeof(Dictionary<string, string>))]
        public HttpResponseMessage GetResources()
        {
            var lang = TimeAtt.Common.GetCurrentLanguage();
            var resourceObject = ResHelper.GetCurrentResources("TimeAtt", true).ToDictionary(p => p.RName, p => lang == "ar" ? p.RValueAR : p.RValueEN);

            ////var resourceSet = typeof(Resource)
            ////    .GetProperties()
            ////    .Where(p => !p.Name.IsLikeAny("ResourceManager", "Culture")) // Skip the properties you don't need on the client side.
            ////    .ToDictionary(p => p.Name, p => p.GetValue(null) as string);
            ////IDictionaryEnumerator enumerator = resourceSet.GetEnumerator();
            ////while (enumerator.MoveNext())
            ////{
            ////    resourceObject.Add(enumerator.Key.ToString(), enumerator.Value.ToString());
            ////}
            ////var resourceObject = new JObject();

            //var resourceSet = Resources.Resources.ResourceManager.GetResourceSet(new CultureInfo(TimeAtt.Common.GetCurrentLanguage()), true, true);
            //IDictionaryEnumerator enumerator = resourceSet.GetEnumerator();
            //while (enumerator.MoveNext())
            //{
            //    if (enumerator.Value != null && enumerator.Key != null)
            //        resourceObject.Add(enumerator.Key.ToString(), enumerator.Value.ToString());
            //}


            return Request.CreateResponse(HttpStatusCode.OK, resourceObject);

        }

    }

}
