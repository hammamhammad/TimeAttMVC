using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;

namespace TimeAttWebAPI
{
     public class LanguageMessageHandler : DelegatingHandler
    {
        private const string LangAR = "ar";
        private const string LangEN = "en-US";
       
 
        private readonly List<string> _supportedLanguages = new List<string> { LangAR, LangEN };
 
        private bool SetHeaderIfAcceptLanguageMatchesSupportedLanguage(HttpRequestMessage request)
        {
            foreach (var lang in request.Headers.AcceptLanguage)
            {
                if (_supportedLanguages.Contains(lang.Value))
                {
                    SetCulture(request, lang.Value);
                    return true;
                }
            }
 
            return false;
        }
 
        private bool SetHeaderIfGlobalAcceptLanguageMatchesSupportedLanguage(HttpRequestMessage request)
        {
            foreach (var lang in request.Headers.AcceptLanguage)
            {
                var globalLang = lang.Value.Substring(0, 2);
                if (_supportedLanguages.Any(t => t.StartsWith(globalLang)))
                {
                    SetCulture(request, _supportedLanguages.FirstOrDefault(i => i.StartsWith(globalLang)));
                    return true;
                }
            }
 
            return false;
        }
 
        private void SetCulture(HttpRequestMessage request, string lang)
        {
            CultureInfo cult = new CultureInfo(lang);
            DateTimeFormatInfo df = new DateTimeFormatInfo();
            var cal = new System.Globalization.GregorianCalendar();
            df.Calendar = cal;
            cult.DateTimeFormat = df;
            request.Headers.AcceptLanguage.Clear();
            request.Headers.AcceptLanguage.Add(new StringWithQualityHeaderValue(lang));
            Thread.CurrentThread.CurrentCulture = cult;
            Thread.CurrentThread.CurrentUICulture = cult;
        }
 
        protected override async Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request, CancellationToken cancellationToken)
        {
            if (!SetHeaderIfAcceptLanguageMatchesSupportedLanguage(request))
            {
                // Whoops no localization found. Lets try Globalisation
                if (!SetHeaderIfGlobalAcceptLanguageMatchesSupportedLanguage(request))
                {
                    // no global or localization found
                    SetCulture(request, LangEN);
                }
            }
 
            var response = await base.SendAsync(request, cancellationToken);          
            return response;
        }
    }
}
