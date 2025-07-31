using System;
using System.Collections.Generic;
using System.Runtime.Caching;
using System.Web;

namespace Resources
{
    public static class CacheHandler
    {


        public static HashSet<T> GetFromCache<T>(string key) where T : class
        {
            try
            {
                var cache = MemoryCache.Default;
                var value = cache.Get(key);
                if (value != null)
                    return value as HashSet<T>;
                else return null;
            }
            catch (Exception)
            {

                throw;
            }


        }
        public static void UpdateCache(string key, object data)
        {
            try
            {
                var cache = MemoryCache.Default;
                CacheItemPolicy policy = new CacheItemPolicy { AbsoluteExpiration = DateTimeOffset.Now.AddHours(1) };
                cache.Set(key, data, policy);
            }
            catch (Exception)
            {

                throw;
            }

        }
        public static void AddToCache(string key, object data)
        {
            try
            {
                var cache = MemoryCache.Default;
                CacheItemPolicy policy = new CacheItemPolicy { AbsoluteExpiration = DateTimeOffset.Now.AddHours(1) };
                cache.Add(key, data, policy);

            }
            catch (Exception)
            {

                throw;
            }


        }

        /// <summary>
        /// returns object was added to the cache by key
        /// </summary>
        /// <param name="Key"></param>
        /// <returns></returns>
        public static object GetObject(string Key)
        {
            try
            {
                // check the cache
                object o = HttpContext.Current.Cache.Get(Key);

                if (o == null)
                    return null;
                else
                    return o;
            }
            catch (Exception)
            {
                return null;
            }
        }
        /// <summary>
        /// returns a flag indicates if the object was added to the cache
        /// </summary>
        /// <param name="key"></param>
        /// <param name="obj"></param>
        /// <param name="absoluteExpiration">Expiration time in minutes</param>
        /// <returns></returns>
        public static bool AddObject(string key, object obj, double absoluteExpiration)
        {
            try
            {
                object o = HttpContext.Current.Cache.Get(key);
                if (o != null)
                    HttpContext.Current.Cache.Remove(key);
                HttpRuntime.Cache.Insert(key, obj, null,
                 DateTime.Now.AddMinutes(absoluteExpiration), TimeSpan.Zero);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
