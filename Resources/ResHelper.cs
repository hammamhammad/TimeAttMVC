
using System;
using System.Collections.Generic;
using System.Linq;



namespace Resources
{
    public static class ResHelper
    {

        public static HashSet<Localizations> ResourceProp { get; private set; }


        private static HashSet<Localizations> GetResorce(bool referesh = false)
        {
            try
            {
                HashSet<Localizations> ResObject = null;
                if (!referesh)
                {
                    if (ResourceProp == null)
                    {
                        ResObject = (HashSet<Localizations>)CacheHandler.GetObject("ResourceTextObj");
                        if (ResObject == null)
                        {

                            using (var Context = new ResourcesRepository())
                            {
                                ResObject = Context.GetAll();
                                CacheHandler.AddObject("ResourceTextObj", ResObject, 300);
                                ResourceProp = ResObject;
                            }
                        }
                        else
                        {
                            ResourceProp = ResObject;
                        }
                    }


                    return ResourceProp;
                }
                else
                {
                    using (var Context = new ResourcesRepository())
                    {
                        ResObject = Context.GetAll();
                        CacheHandler.AddObject("ResourceTextObj", ResObject, 300);
                        ResourceProp = ResObject;
                        return ResourceProp;
                    }
                }

            }
            catch (Exception)
            {

                return null;
            }

        }

        /// <summary>
        /// Get Current Resources By Current User Culture
        /// </summary>
        ///  <param name="ResorcesSet">Optional:Resources Set to retrieve if null or empty will retrive all resources </param>
        /// <returns></returns>
        public static HashSet<Localizations> GetCurrentResources(string ResorcesSet = "", bool referesh = false)
        {
            HashSet<Localizations> ResObject = GetResorce(referesh);
            if (ResObject != null)
            {
                var lang = Common.GetCurrentLanguage(); ;
                var res = ResObject.Where(R => ResorcesSet.IsNullOrEmpty() || R.ResourceSet == ResorcesSet).ToHashSet();
                res.Add(new Localizations() { ResourceSet = "", RName = "Language", RValueAR = lang, RValueEN = lang });
                if (ResorcesSet.IsNullOrEmpty())
                {
                    res = res.GroupBy(test => test.RName)
                                      .Select(grp => grp.First())
                                      .ToHashSet();
                    return res;
                    //return res.DistinctBy(p => new { p.ResourceSet, p.RName }).ToHashSet();
                }

                else
                    return res;
            }
            return null;
        }
        /// <summary>
        /// Get Current Resources By Current User Culture
        /// </summary>
        ///  <param name="ResorcesSet">Optional:Resources Set to retrieve if null or empty will retrive all resources </param>
        /// <returns></returns>
        public static HashSet<string> GetResourcesSet(bool referesh = false)
        {
            HashSet<Localizations> ResObject = GetResorce(referesh);
            if (ResObject != null)
            {
                return ResObject.Select(R => R.ResourceSet).Distinct().ToHashSet();
            }
            return null;
        }

        public static Localizations GetResourceByID(int ID)
        {
            using (var Context = new ResourcesRepository())
            {
                var loc = Context.GetByID(ID);

                return loc;
            }
        }

        public static ResponseResults<bool> Rename(string resourceSet, string newResourceSet)
        {
            try
            {
                using (var Context = new ResourcesRepository())
                {
                    int loc = Context.Rename(resourceSet, newResourceSet);
                    if (loc > 0)
                        return new ResponseResults<bool>("1", "Resource Set has been Renamed Successfully.", true);
                    else
                        return new ResponseResults<bool>("0", "An error occurred while renaming Resource Set.", false);
                }
            }
            catch (Exception ex)
            {

                return new ResponseResults<bool>("0", "An error occurred while renaming Resource Set.", false, ex.ToString());
            }

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="resName">Name of resource</param>
        /// <param name="lang">optional parameter to force resource value by using language 'ar' or 'en' </param>
        /// <param name="defaultValu">optional parameter if no value found for resName will be return default value</param>
        /// <param name="ResorcesSet">Optional:Resources Set to retrieve if null or empty will retrive all resources </param>
        /// <returns></returns>
        public static string Get(string resName, string defaultValu = "", string lang = "", string ResorcesSet = "")
        {

            var ResObj = ResourceProp;
            if (ResObj == null)
                ResObj = GetResorce(false);

            if (ResObj == null)
                return (defaultValu.IsNullOrEmpty() ? resName : defaultValu.ToStringIfNull());
            if (lang.IsNullOrEmpty())
            {
                lang = Common.GetCurrentLanguage();
            }
            if (!lang.IsValidLanguage())
                lang = "ar";
            var value = ResObj.Where(R => R.RName == resName && (ResorcesSet.IsNullOrEmpty() || R.ResourceSet == ResorcesSet)).FirstOrDefault();
            return value == null ? (defaultValu == "" ? resName : defaultValu) : lang == "ar" ? value.RValueAR : value.RValueEN;
        }
        

        public static ResponseResults<Localizations> CreateUpdate(Localizations localization)
        {
            try
            {
                using (var Context = new ResourcesRepository())
                {
                    int loc = Context.CreateUpdate(localization);
                    if (loc > 0)
                    {
                        localization.ID = loc;
                        return new ResponseResults<Localizations>("1", "Resource Set has been Saved Successfully.", localization);
                    }

                    else if (loc == -2)
                        return new ResponseResults<Localizations>("0", "An error occurred while Saving data.", localization, "Resource ID & Resource Set must be Provided");
                    else if (loc == -3)
                        return new ResponseResults<Localizations>("0", "An error occurred while Saving data.", localization, "Resource ID already exists and it must be unique");
                    else
                        return new ResponseResults<Localizations>("0", "An error occurred while Saving data.", localization, "Unknown Error");
                }
            }
            catch (Exception ex)
            {

                return new ResponseResults<Localizations>("0", "An error occurred while Saving data.", localization, ex.ToString());
            }

        }

        public static ResponseResults<Localizations> Delete(int iD)
        {
            try
            {
                using (var Context = new ResourcesRepository())
                {
                    var Res = Context.GetByID(iD);
                    var Result = Context.Delete(iD);
                    if (Result > 0)
                        return new ResponseResults<Localizations>("1", "Resource Set has been deleted Successfully.", Res);
                    else
                        return new ResponseResults<Localizations>("0", "An error occurred while deleting data.", Res, "Unknown Error");
                }
            }
            catch (Exception)
            {

                throw;
            }

        }
    }
}
