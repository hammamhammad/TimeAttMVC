using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Dynamic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Http.Controllers;
using TimeAtt.Models;
using TimeAtt.Security;

namespace TimeAtt
{
    //Client credential
    public class Credentials
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
    
    public class Common
    {
        private static string secretKey = "@^Y$^*(%&$#%C^#%^38n*#6835sedrt6tvbry";
        public const string BasicAuthResponseHeader = "WWW-Authenticate";
        public const string BasicAuthResponseHeaderValue = "Basic";
        public static Credentials GetApiCredentials()
        {
            try
            {
                var ApiUserName = ConfigurationManager.AppSettings["ApiUserName"];
                var ApiPassword = ConfigurationManager.AppSettings["ApiPassword"];
                return new Credentials() { Username = ApiUserName, Password = ApiPassword };
            }
            catch (Exception)
            {

                return   new Credentials() { Username = "", Password = "" };
            }
          
        }
        public static Credentials GetCurrentCredentials(AuthenticationHeaderValue authValue)
        {
            if (System.Web.HttpContext.Current.User != null && System.Web.HttpContext.Current.User.Identity.IsAuthenticated)
            {
                if (authValue != null && !String.IsNullOrWhiteSpace(authValue.Parameter) && authValue.Scheme == BasicAuthResponseHeaderValue)
                {
                    return ParseAuthorizationHeader(authValue.Parameter);
                }
                return new Credentials() { Username = System.Web.HttpContext.Current.User.Identity.Name, Password = "" };
            }

            if (authValue != null && !String.IsNullOrWhiteSpace(authValue.Parameter) && authValue.Scheme == BasicAuthResponseHeaderValue)
            {
                return ParseAuthorizationHeader(authValue.Parameter);
            }
            else
            {
                return null;
            }
        }
        private static Credentials ParseAuthorizationHeader(string authHeader)
        {
            string[] credentials;
            if (authHeader.Contains(":"))
            {
                credentials = authHeader.Split(':');
            }
            else
                credentials = Encoding.ASCII.GetString(Convert.FromBase64String(authHeader)).Split(new[] { ':' });

            if (credentials.Length != 2 || string.IsNullOrEmpty(credentials[0]) || string.IsNullOrEmpty(credentials[1]))
                return null;

            return new Credentials() { Username = credentials[0], Password = credentials[1], };
        }
        public static List<TreeNodes> GetSectionTreeNodes()
        {

            using (var Sectionrepostory = new SectionsRepository())
            {
                var nodes = new List<TreeNodes>();
                foreach (var item in Sectionrepostory.GetAll().ToList())
                {
                    nodes.Add(new TreeNodes() { id = item.sec_ID, Parent = (item.sec_Parent == 0 ? null : item.sec_Parent), label = item.sec_Name, label2 = item.sec_No });

                }
                return nodes;
            }
        }
        public static CustomPrincipal GetCurrentUserInfo()
        {
            try
            {
                return Thread.CurrentPrincipal as CustomPrincipal;
            }
            catch (Exception)
            {

                return null;
            }
        }



       

      

        public static List<T> MapTo<T>(DataTable table) where T : class, new()
        {

            var mapstring = "";
            try
            {
                List<Tuple<DataColumn, PropertyInfo>> map = new List<Tuple<DataColumn, PropertyInfo>>();
                foreach (PropertyInfo pi in typeof(T).GetProperties())
                {
                    //if (table.Columns.Contains(pi.Name))
                    //{
                    //    map.Add(new Tuple<DataColumn, PropertyInfo>(
                    //    table.Columns[pi.Name], pi));
                    //}
                    
                    ColumnAttribute col = (ColumnAttribute)
                  Attribute.GetCustomAttribute(pi, typeof(ColumnAttribute));
                    if (col == null || string.IsNullOrEmpty(col.Name))
                    {
                        if (table.Columns.Contains(pi.Name))
                        {
                            map.Add(new Tuple<DataColumn, PropertyInfo>(
                            table.Columns[pi.Name], pi));
                        }
                    }
                    else
                    {
                        if (table.Columns.Contains(col.Name))
                        {
                            map.Add(new Tuple<DataColumn, PropertyInfo>(
                                table.Columns[col.Name], pi));
                        }
                    }
                }

                List<T> list = new List<T>(table.Rows.Count);
                foreach (DataRow row in table.Rows)
                {
                    if (row == null)
                    {
                        list.Add(null);
                        continue;
                    }
                    T item = new T();
                    foreach (Tuple<DataColumn, PropertyInfo> pair in map)
                    {

                        object value = row[pair.Value1];
                        mapstring = pair.Value1.ToString() + " ||| " + pair.ToString() + " ||| " + value.ToString();
                        if (value is DBNull) value = null;
                        pair.Value2.SetValue(item, value,null);
                    }
                    list.Add(item);
                }
                return list;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message + Environment.NewLine + mapstring);
            }

        }
        public static string Encrype(string password, string username)
        {
            return Encrypt(password, username.ToUpper(), true);
        }
        private static string Encrypt(string toEncrypt, string username, bool useHashing)
        {
            byte[] keyArray;
            byte[] toEncryptArray = UTF8Encoding.UTF8.GetBytes(toEncrypt);



            //System.Windows.Forms.MessageBox.Show(key);
            //If hashing use get hashcode regards to your key
            if (useHashing)
            {
                MD5CryptoServiceProvider hashmd5 = new MD5CryptoServiceProvider();
                keyArray = hashmd5.ComputeHash(UTF8Encoding.UTF8.GetBytes(username.ToUpper()));
                //Always release the resources and flush data
                // of the Cryptographic service provide. Best Practice

                hashmd5.Clear();
            }
            else
                keyArray = UTF8Encoding.UTF8.GetBytes(username.ToUpper());

            TripleDESCryptoServiceProvider tdes = new TripleDESCryptoServiceProvider();
            //set the secret key for the tripleDES algorithm
            tdes.Key = keyArray;
            //mode of operation. there are other 4 modes.
            //We choose ECB(Electronic code Book)
            tdes.Mode = CipherMode.ECB;
            //padding mode(if any extra byte added)

            tdes.Padding = PaddingMode.PKCS7;

            ICryptoTransform cTransform = tdes.CreateEncryptor();
            //transform the specified region of bytes array to resultArray
            byte[] resultArray =
              cTransform.TransformFinalBlock(toEncryptArray, 0,
              toEncryptArray.Length);
            //Release resources held by TripleDes Encryptor
            tdes.Clear();
            //Return the encrypted data into unreadable string format
            return Convert.ToBase64String(resultArray, 0, resultArray.Length);
        }
        private static string FromBase64ForUrl(string input)
        {
            int padChars = (input.Length % 4) == 0 ? 0 : (4 - (input.Length % 4));
            StringBuilder result = new StringBuilder(input, input.Length + padChars);
            result.Append(String.Empty.PadRight(padChars, '='));
            result.Replace('-', '+');
            result.Replace('_', '/');
            return result.ToString();// Convert.FromBase64String(result.ToString());
        }
        public static string Decrypt(string text)
        {
            try
            {
                text = FromBase64ForUrl(text);
                RijndaelManaged rijndaelCipher = new RijndaelManaged();
                byte[] encryptedData = Convert.FromBase64String(text);
                byte[] salt = Encoding.ASCII.GetBytes(secretKey.Length.ToString());
                PasswordDeriveBytes SecretKey = new PasswordDeriveBytes(secretKey, salt);
                // Create a decryptor from the existing SecretKey bytes.
                ICryptoTransform Decryptor = rijndaelCipher.CreateDecryptor(SecretKey.GetBytes(16), SecretKey.GetBytes(16));
                MemoryStream memoryStream = new MemoryStream(encryptedData);
                // Create a CryptoStream. (always use Read mode for decryption).
                CryptoStream cryptoStream = new CryptoStream(memoryStream, Decryptor, CryptoStreamMode.Read);
                // Since at this point we don't know what the size of decrypted data
                // will be, allocate the buffer long enough to hold EncryptedData;
                // DecryptedData is never longer than EncryptedData.
                byte[] plainText = new byte[encryptedData.Length];
                // Start decrypting.
                int decryptedCount = cryptoStream.Read(plainText, 0, plainText.Length);
                memoryStream.Close();
                cryptoStream.Close();
                // Convert decrypted data into a string.
                string decryptedData = Encoding.Unicode.GetString(plainText, 0, decryptedCount);
                // Return decrypted string.
                return decryptedData;
            }
            catch //(Exception exception)
            {
                throw;
            }
        }
        public static string GetCurrentLanguage()
        {
            var lang = "ar";
            HttpCookie cultureCookie = System.Web.HttpContext.Current.Request.Cookies["_culture"];
            if (cultureCookie != null)
            {
                lang = cultureCookie.Value.ToLower() != "ar" ? "en" : "ar";
            }
            else
            {
                if (HttpContext.Current.Request.Headers["Accept-Language"] != null)
                    lang = HttpContext.Current.Request.Headers["Accept-Language"];
            }
            return lang.ToLower();
        }
        public static string GetDomain()
        {
            return ConfigurationManager.AppSettings["domain"].ToString();
        }

        public static void CheckLoclizeForData(DataTable dt)
        {
            try
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    string txt = "";
                    //  If keysResource.Count > 0 Then
                    foreach (DataRow dr in dt.Rows)
                    {
                        foreach (DataColumn item in dt.Columns)
                        {
                            if (dr[item.ColumnName].ToString().Contains("$"))
                            {
                                txt = GetDBName(dr[item.ColumnName].ToString());
                                if (txt.Length > 0 & item.MaxLength != -1)
                                {
                                    item.ReadOnly = false;
                                    if (item.MaxLength < txt.Length)
                                    {
                                        item.MaxLength = txt.Length;
                                    }
                                    dr[item.ColumnName] = txt;
                                }
                                else if (txt.Length > 0)
                                {
                                    dr[item.ColumnName] = txt;
                                }
                                // dr(item.ColumnName) = keysResource.GetValueByKey(dr(item.ColumnName)).value
                            }
                        }
                    }
                }
                //End If
            }
            catch (Exception ex)
            {
            }
        }

        public static string GetDBName(string resName, string lang = "", string ResorcesSet = "")
        {
            //var keysResource = GetResorce(false);
            if (lang.Length == 0)
                lang = GetCurrentLanguage();
            string rname = resName;
            int lastindex = 0;
            List<DictionaryEntry> listword = new List<DictionaryEntry>();
            DictionaryEntry dic = default(DictionaryEntry);
            if (resName.Count((char c) => c == '$') >= 4)
            {
                string Localizations = "";

                for (int i = 0; i <= resName.Length - 1; i++)
                {
                    if (resName[i] == '$')
                    {
                        string sr = "";
                        for (int j = i; j <= resName.Length - 1; j++)
                        {
                            sr += resName[j];
                            if (resName[j + 1] == '$')
                            {
                                Localizations = Resources.ResHelper.Get(sr.Replace("$", ""),lang: lang);
                                //keysResource.Where(res => (ResorcesSet.IsNullOrEmpty() || res.ResourceSet == ResorcesSet) && res.RName.ToLower() == sr.ToLower()).FirstOrDefault();
                                //if (!string.IsNullOrEmpty( Localizations))
                                //{

                                dic = new DictionaryEntry(sr, Localizations);
                                listword.Add(dic);

                                //}
                                //else
                                //{
                                //    dic = new DictionaryEntry(sr, Get(sr, lang: lang, ResorcesSet: ResorcesSet));
                                //    listword.Add(dic);
                                //}
                                i = j + 1;
                                break;
                            }

                        }
                    }
                }

                if (listword.Count > 0)
                {
                    foreach (DictionaryEntry d in listword)
                    {
                        resName = resName.Replace(d.Key.ToString(), d.Value.ToString());
                    }
                }
                return resName.Replace("$", "");
                // return Resources.Resources.ResourceManager.GetString(resName.Replace("$",""), new System.Globalization.CultureInfo(GetCurrentLanguage()));
            }
            else
            {
                lastindex = resName.LastIndexOf("$");
                if (lastindex > 0)
                {
                    rname = resName.Substring(0, lastindex);
                    lastindex = rname.LastIndexOf("$");
                    if (lastindex > 0)
                    {
                        rname = rname.Substring(lastindex);
                    }
                }
                string Localizations = "";
                Localizations = Resources.ResHelper.Get(rname.Replace("$", ""), lang: lang); 
                //keysResource.Where(res => (ResorcesSet.IsNullOrEmpty() || res.ResourceSet == ResorcesSet) && res.RName.ToLower() == rname.ToLower()).FirstOrDefault();

                return resName.Replace(rname, Localizations).Replace("$", "");

            }
        }
    }
}