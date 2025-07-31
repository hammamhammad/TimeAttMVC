using Newtonsoft.Json;
using System.Linq;
using System.Web.Mvc;
using TimeAtt;

namespace TimeAttMVC.Controllers
{
    public class ResourceController : BaseController
    {
        // GET: /Resource/GetResources
        const int durationInSeconds = 2 * 60 * 60;  // 2 hours.

        [OutputCache(VaryByCustom = "culture", Duration = durationInSeconds)]
        [AllowAnonymous]
        public JsonResult GetResources()
        {
            var lang = Common.GetCurrentLanguage();
            return Json(
                 Resources.ResHelper.GetCurrentResources("TimeAtt", true).ToDictionary(p => p.RName, p => lang == "ar" ? p.RValueAR : p.RValueEN)
                 //typeof(Resource)
                 //.GetProperties()
                 //.Where(p => !p.Name.IsLikeAny("ResourceManager", "Culture")) // Skip the properties you don't need on the client side.
                 //.ToDictionary(p => p.Name, p => p.GetValue(null) as string)
                 , JsonRequestBehavior.AllowGet);




        }
        [OutputCache(VaryByCustom = "culture", Duration = durationInSeconds)]
        [AllowAnonymous]
        public object GetDataTableLanguage()
        {

            var fileContents = System.IO.File.ReadAllText(Server.MapPath(@"~/" + Resources.ResHelper.Get(resName: "Datatable_Lang", defaultValu: "Content/lang/datatable_ArabicLang.txt", ResorcesSet: "TimeAtt")));

            return JsonConvert.DeserializeObject(fileContents);





        }
    }
}