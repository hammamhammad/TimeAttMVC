using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Threading;
using System.Web;

namespace Resources
{
    public sealed class Tuple<T1, T2>
    {
        public Tuple() { }
        public Tuple(T1 value1, T2 value2) { Value1 = value1; Value2 = value2; }
        public T1 Value1 { get; set; }
        public T2 Value2 { get; set; }
    }
    public static class Common
    {
        public static string GetCurrentNeutralCulture()
        {
            return GetNeutralCulture(Thread.CurrentThread.CurrentCulture.Name);
        }

        public static string GetException(Exception ex)
        {
       

            return ex.Message + (ex.InnerException != null ? "-->" + ex.InnerException.Message : "");
        }
        public static string GetNeutralCulture(string name)
        {
            if (!name.Contains("-")) return name;

            return name.Split('-')[0]; // Read first part only. E.g. "en", "es"
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
    }
    public static partial class ExtensionMethods
    {

        static string[] Lang = new string[] { "ar", "en" };
        public static int ToInt(this object value)
        {
            return Convert.ToInt32(value);
        }
        public static int? ToNullableInt(this object value)
        {
            if (Convert.IsDBNull(value) || value == null)
                return null;
            return value.ToInt();
        }
        public static string ToNullableString(this object value)
        {
            if (IsNull(value))
                return null;
            return Convert.ToString(value);
        }
        public static string ToStringIfNull(this object value)
        {
            if (IsNull(value))
                return "";
            return Convert.ToString(value);
        }
        public static bool ToBoolean(this object value)
        {
            return Convert.ToBoolean(value);
        }
        public static bool? ToNullableBoolean(this object value)
        {
            if (IsNull(value))
                return null;
            return value.ToBoolean();
        }
        public static decimal ToDecimal(this object value)
        {
            return Convert.ToDecimal(value);
        }
        public static decimal? ToNullableDecimal(this object value)
        {
            if (IsNull(value) || string.IsNullOrEmpty(value.ToNullableString()))
                return null;
            return value.ToDecimal();
        }
        public static byte ToByte(this object value)
        {
            return Convert.ToByte(value);
        }
        public static byte? ToNullableByte(this object value)
        {
            if (IsNull(value) || value == "")
                return null;
            return value.ToByte();
        }
        public static sbyte ToSByte(this object value)
        {
            return Convert.ToSByte(value);
        }
        public static sbyte? ToNullableSByte(this object value)
        {
            if (IsNull(value) || value == "")
                return null;
            return value.ToSByte();
        }
        public static short ToShort(this object value)
        {
            return Convert.ToInt16(value);
        }
        public static short? ToNullableShort(this object value)
        {
            if (IsNull(value) || value == "")
                return null;
            return value.ToShort();
        }
        public static long ToLong(this object value)
        {
            return Convert.ToInt64(value);
        }
        public static long? ToNullableLong(this object value)
        {
            if (IsNull(value))
                return null;
            return value.ToLong();
        }
        public static char ToChar(this object value)
        {
            return Convert.ToChar(value);
        }
        public static char? ToNullableChar(this object value)
        {
            if (IsNull(value))
                return null;
            return value.ToChar();
        }
        public static IDictionary<string, string> ToDictionary(this NameValueCollection col)
        {
            IDictionary<string, string> dict = new Dictionary<string, string>();
            foreach (var k in col.AllKeys)
            {
                dict.Add(k, col[k]);
            }
            return dict;
        }
        public static bool IsNull(this object obj)
        {
            return (Convert.IsDBNull(obj) || obj == null);
        }
        public static DateTime ToDateTime(this object value)
        {
            return Convert.ToDateTime(value);
        }
        public static DateTime? ToNullableDateTime(this object value)
        {
            if (IsNull(value))
                return null;
            return value.ToDateTime();
        }
        public static string TrimStart(this string value, string trimString)
        {
            if (string.IsNullOrEmpty(value) || string.IsNullOrEmpty(trimString) || !value.StartsWith(trimString))
                return value;
            else
                return value.Remove(0, trimString.Length);
        }
        public static string ReplaceWhiteSpaceWith(this string value, string newString)
        {
            if (string.IsNullOrEmpty(value))
                return value;
            else
                return new Regex("\\s+").Replace(value.Trim(), newString);
        }
        public static string ReplaceWithNullIfEmpty(this string value)
        {
            return value.Trim().ReplaceIfNullOrEmpty(null);
        }
        public static string ReplaceIfNullOrEmpty(this string value, string newValue)
        {
            if (string.IsNullOrEmpty(value))
                return newValue;
            else
                return value;
        }
       
        public static string ToHashPassword(this string value)
        {
            return "******";
        }
        public static bool IsNullOrEmpty(this string value)
        {
            return string.IsNullOrEmpty(value) || value.Trim().Length == 0;
        }
        public static bool IsNotNullOrEmpty(this string value)
        {
            return !string.IsNullOrEmpty(value);
        }
        public static bool IsValidLanguage(this string value)
        {
            if (string.IsNullOrEmpty(value))
                return false;
            if (!Lang.Contains(value.ToLower()))
                return false;
            return true;


        }
        /// <summary>
        /// Convert Arabic Numbers to English Numbers
        /// </summary>
        /// <param name="value">numbers as string</param>
        /// <returns>if value is Null Or WhiteSpace then value else converted value</returns>
        public static string ConvertArabicNumbersToEnglish(this string value)
        {
            if (value.IsNullOrEmpty() || value.Trim().Length == 0)
                return value;

            string englishNumber = string.Empty;
            foreach (var character in value)
                englishNumber += char.IsDigit(character) ? char.GetNumericValue(character).ToString() : character.ToString();
            return englishNumber;
        }
        public static string ConvertDateNoToString(this string date, string fformat, string tformat)
        {
            try
            {
                return DateTime.ParseExact(date, fformat, System.Globalization.CultureInfo.InvariantCulture).ToString(tformat);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public static DataSet ToDataSet<T>(this IList<T> list)
        {
            Type elementType = typeof(T);
            DataSet ds = new DataSet();
            DataTable t = new DataTable();
            ds.Tables.Add(t);

            //add a column to table for each public property on T
            foreach (var propInfo in elementType.GetProperties())
            {
                Type ColType = Nullable.GetUnderlyingType(propInfo.PropertyType) ?? propInfo.PropertyType;

                t.Columns.Add(propInfo.Name, ColType);
            }

            //go through each property on T and add each value to the table
            foreach (T item in list)
            {
                DataRow row = t.NewRow();

                foreach (var propInfo in elementType.GetProperties())
                {
                    row[propInfo.Name] = propInfo.GetValue(item, null) ?? DBNull.Value;
                }

                t.Rows.Add(row);
            }

            return ds;
        }
        public static DataTable ToDataTable<T>(this IEnumerable<T> items)
        {
            DataTable dataTable = new DataTable(typeof(T).Name);
            //Get all the properties
            PropertyInfo[] Props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (PropertyInfo prop in Props)
            {
                //Setting column names as Property names
                dataTable.Columns.Add(prop.Name);
            }
            foreach (T item in items)
            {
                var values = new object[Props.Length];
                for (int i = 0; i < Props.Length; i++)
                {
                    //inserting property values to datatable rows
                    values[i] = Props[i].GetValue(item, null);
                }
                dataTable.Rows.Add(values);
            }
            //put a breakpoint here and check datatable
            return dataTable;
        }
        //public static HashSet<T> MapTo<T>(this DataTable table) where T : class, new()
        //{
        //    HashSet<Tuple<DataColumn, PropertyInfo>> map =
        //    new HashSet<Tuple<DataColumn, PropertyInfo>>();

        //    foreach (PropertyInfo pi in typeof(T).GetProperties())
        //    {
        //        if (table.Columns.Contains(pi.Name))
        //        {
        //            map.Add(new Tuple<DataColumn, PropertyInfo>(
        //            table.Columns[pi.Name], pi));
        //        }
        //    }

        //    HashSet<T> list = new HashSet<T>();//(table.Rows.Count);
        //    foreach (DataRow row in table.Rows)
        //    {
        //        if (row == null)
        //        {
        //            list.Add(null);
        //            continue;
        //        }
        //        T item = new T();
        //        foreach (Tuple<DataColumn, PropertyInfo> pair in map)
        //        {
        //            object value = row[pair.Value1];
        //            if (value is DBNull) value = null;
        //            pair.Value2.SetValue(item, value, null);
        //        }
        //        list.Add(item);
        //    }
        //    return list;
        //}
        /// <summary>
        /// Determines whether a sequence contains any elements
        /// </summary>
        /// <typeparam name="T">Any Type</typeparam>
        /// <param name="collection"></param>
        /// <returns>
        /// True  : if the source sequence contains any elements
        /// False : If sequence is null or count of elements equal zero
        /// </returns>
        public static bool HasAny<T>(this IEnumerable<T> enumerable)
        {
            return !enumerable.IsNullOrEmpty();// (enumerable != null && enumerable.Any());
        }
        public static IEnumerable<TSource> DistinctBy<TSource, TKey>
      (this IEnumerable<TSource> source, Func<TSource, TKey> keySelector)
        {
            HashSet<TKey> seenKeys = new HashSet<TKey>();
            foreach (TSource element in source)
            {
                if (seenKeys.Add(keySelector(element)))
                {
                    yield return element;
                }
            }
        }
        /// <summary>
        /// Determines whether a sequence is null or has no elements
        /// </summary>
        /// <typeparam name="T">Any Type</typeparam>
        /// <param name="collection"></param>
        /// <returns>
        /// True  : if the source sequence is null or has no elements
        /// False : If sequence has any elements
        /// </returns>
        public static bool IsNullOrEmpty<T>(this IEnumerable<T> enumerable)
        {
            if (enumerable == null)
            {
                return true;
            }
            /* If this is a list, use the Count property for efficiency. 
             * The Count property is O(1) while IEnumerable.Count() is O(N). */
            var collection = enumerable as ICollection<T>;
            if (collection != null)
            {
                return collection.Count < 1;
            }
            return !enumerable.Any();
        }
        // for generic interface IEnumerable<T>
        public static string ToString<T>(this IEnumerable<T> source, string separator)
        {
            if (source == null || string.IsNullOrEmpty(separator))
                return null;

            string[] array = source.Where(n => n != null).Select(n => n.ToString()).ToArray();

            return string.Join(separator, array);
        }
        public static IEnumerable<IEnumerable<T>> Chunk<T>(this IEnumerable<T> source, int chunksize)
        {
            while (source.Any())
            {
                yield return source.Take(chunksize);
                source = source.Skip(chunksize);
            }
        }

        public static System.DateTime GetDateFromNumber(this double num)
        {
            return System.DateTime.FromOADate(num);
        }
        public static System.DateTime GetDateFromNumber(this int num)
        {
            return System.DateTime.FromOADate(num);
        }
        public static int GetNumberFromDate(this System.DateTime date)
        {
            return Convert.ToInt32(date.ToOADate());
        }
        public static int GetDayFromNumber(this double num)
        {
            return System.DateTime.FromOADate(num).Day;
        }
        public static int GetMonthFromNumber(this double num)
        {
            return System.DateTime.FromOADate(num).Month;
        }
        public static int GetYearFromNumber(this double num)
        {
            return System.DateTime.FromOADate(num).Year;
        }
        public static HashSet<T> ToHashSet<T>(this IEnumerable<T> source)
        {
            return new HashSet<T>(source);
        }
      
        public static HashSet<T> MapTo<T>(this DataTable table)
            where T : class, new()
        {
            List<Tuple<DataColumn, PropertyInfo>> map =
                new List<Tuple<DataColumn, PropertyInfo>>();

            foreach (PropertyInfo pi in typeof(T).GetProperties())
            {
                ColumnAttribute col = (ColumnAttribute)
                    Attribute.GetCustomAttribute(pi, typeof(ColumnAttribute));
                if (col == null || col.Name.IsNullOrEmpty())
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

            HashSet<T> list = new HashSet<T>();
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
                    if (value is DBNull) value = null;
                    pair.Value2.SetValue(item, value, null);
                }
                list.Add(item);
            }
            return list;
        }
     

    }
}
