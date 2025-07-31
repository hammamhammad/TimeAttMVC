using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using TimeAtt.Model.Security;

namespace TimeAttMVC.Helpper
{
    public class RESTService<T>
    {
        private string URL = "";
       
        public RESTService(string url)
        {
            URL = url;
        }
        
        public T Get()
        {
           
            using (WebClient webClient = new WebClient())
            {
                try
                {
                    webClient.Encoding = System.Text.UTF8Encoding.UTF8;
                    webClient.Headers.Add("Token", MyIdentity.GetAuthCookie().Value);
                    webClient.Headers[HttpRequestHeader.AcceptLanguage] = CultureHelper.GetCurrentCulture();
                    return JsonConvert.DeserializeObject<T>(
                        webClient.DownloadString(URL)
                    );
                }
                catch (WebException e)
                {

                    throw new Exception(e.Message + URL);
                }
                
            }
        }
        public T Post(dynamic  data)
        {

            using (WebClient webClient = new WebClient())
            {
                try
                {
                   
                    webClient.Encoding = System.Text.UTF8Encoding.UTF8;
                    webClient.Headers[HttpRequestHeader.ContentType] = "application/json";
                    webClient.Headers[HttpRequestHeader.AcceptLanguage] = CultureHelper.GetCurrentCulture();
                    webClient.Headers.Add("Token", MyIdentity.GetAuthCookie().Value);
                    var json = Newtonsoft.Json.JsonConvert.SerializeObject(data);
                    json = HttpUtility.UrlDecode(json);
                    return JsonConvert.DeserializeObject<T>(
                        webClient.UploadString(URL, "POST", json)
                    );
                }
                catch (WebException e)
                {

                    throw new Exception(e.Message);
                }

            }
        }

        public T Post(dynamic data,string lang="ar")
        {

            using (WebClient webClient = new WebClient())
            {
                try
                {

                    webClient.Encoding = System.Text.UTF8Encoding.UTF8;
                    webClient.Headers[HttpRequestHeader.ContentType] = "application/json";
                    webClient.Headers[HttpRequestHeader.AcceptLanguage] = CultureHelper.GetCurrentCulture();
                    webClient.Headers.Add("Token", MyIdentity.GetAuthCookie().Value);
                    var json = Newtonsoft.Json.JsonConvert.SerializeObject(data);
                    json = HttpUtility.UrlDecode(json);
                    return JsonConvert.DeserializeObject<T>(
                        webClient.UploadString(URL, "POST", json)
                    );
                }
                catch (WebException e)
                {

                    throw new Exception(e.Message);
                }

            }
        }
        public async Task<T> GetAsync()
        {

            using (HttpClient httpClient = new HttpClient())
            {
                
                httpClient.DefaultRequestHeaders.Add("Token", MyIdentity.GetAuthCookie().Value);
                return JsonConvert.DeserializeObject<T>(
                    await httpClient.GetStringAsync(URL)
                );
            }
        }
    }
}