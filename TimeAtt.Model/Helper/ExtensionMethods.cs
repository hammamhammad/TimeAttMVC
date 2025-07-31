using System;
using System.Collections.Generic;
using System.Data;
using System.Dynamic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TimeAtt
{
    public static partial class ExtensionMethods
    {
        public static List<dynamic> ToDynamic(this DataTable dt)
        {
            var dynamicDt = new List<dynamic>();
            foreach (DataRow row in dt.Rows)
            {
                dynamic dyn = new ExpandoObject();
                dynamicDt.Add(dyn);
                foreach (DataColumn column in dt.Columns)
                {
                    var dic = (IDictionary<string, object>)dyn;
                    dic[column.ColumnName] = row[column];
                }
            }
            return dynamicDt;
        }
        public static int getTimeInt(this string  value)
        {
            try
            {
                return value.Replace(":", "").ToInt();
            }
            catch (Exception)
            {

                return 0;
            }
            
        }
        public static int ToInt(this object value)
        {
            try
            {
                if (value.IsNull())
                    value = 0;
                return Convert.ToInt32(value);
            }
            catch (Exception)
            {

                return 0;
            }

        }
        public static long ToBigInt(this object value)
        {
            try
            {
                return Convert.ToInt64(value);
            }
            catch (Exception)
            {

                return 0;
            }

        }
        public static UInt32 ToUInt32(this object value)
        {
            return Convert.ToUInt32(value);
        }
        public static int? ToNullableInt(this object value)
        {
            if (Convert.IsDBNull(value) || value == null)
                return null;
            return value.ToInt();
        }
        public static System.DateTime GetDateFromNumber(this object value)
        {
            System.Globalization.GregorianCalendar gc = new System.Globalization.GregorianCalendar();
            var obj = value.ToInt();
            return DateTime.FromOADate(obj);
        }
        public static int GetNumberFromDate(this object value)
        {
            var obj = Convert.ToDateTime(value);
            return Convert.ToInt32(obj.ToOADate());
        }
        public static string ToStringIfNull(this object value)
        {
            if (IsNull(value))
                return "";
            return Convert.ToString(value);
        }
        public static string ToTrim(this object value)
        {
            if (IsNull(value))
                return "";
            return Convert.ToString(value).Trim();
        }
        public static string ToNullableString(this object value)
        {
            if (IsNull(value))
                return null;
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
            if (IsNull(value) )
                return null;
            return value.ToByte();
        }

        public static sbyte ToSByte(this object value)
        {
            return Convert.ToSByte(value);
        }
        public static sbyte? ToNullableSByte(this object value)
        {
            if (IsNull(value) )
                return null;
            return value.ToSByte();
        }

        public static short ToShort(this object value)
        {
            return Convert.ToInt16(value);
        }
        public static short? ToNullableShort(this object value)
        {
            if (IsNull(value) )
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

        public static bool IsNull(this object obj)
        {
            return (Convert.IsDBNull(obj) || obj == null);
        }
        public static bool IsInt(this object obj)
        {
            try
            {
                int temp = 0;
                return int.TryParse(obj.ToString(), out temp);
            }
            catch (Exception)
            {

                return false;
            }

        }
        public static bool IsLong(this object obj)
        {
            try
            {
                long temp = 0;
                return long.TryParse(obj.ToString(), out temp);
            }
            catch (Exception)
            {

                return false;
            }

        }
        public static IEnumerable<List<T>> InSetsOf<T>(this IEnumerable<T> source, int max)
        {
            List<T> toReturn = new List<T>(max);
            foreach (var item in source)
            {
                toReturn.Add(item);
                if (toReturn.Count == max)
                {
                    yield return toReturn;
                    toReturn = new List<T>(max);
                }
            }
            if (toReturn.Any())
            {
                yield return toReturn;
            }
        }
        public static DataSet ToDataSet<T>(this IEnumerable<T> list)
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
    }
}
