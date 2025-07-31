using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TimeAtt.Models
{
    public class DataTableParameters
    {

        public int? length { get; set; }
        public int start { get; set; }
        public int draw { get; set; }

        [DefaultValue(-1)]
        public int sortColumn { get; set; }
        public string sortColumnName { get; set; }
        [DefaultValue("asc")]
        public string sortDirection { get; set; }
        public string search { get; set; }
        public static DataTableParameters SET(Dictionary<string, string> QueryString)
        {
            DataTableParameters DTPara = new DataTableParameters();

            DTPara.length = QueryString["length"].ToInt();
            DTPara.start = QueryString["start"].ToInt();
            DTPara.draw = QueryString["draw"].ToInt();



            if (QueryString.ContainsKey("order[0].column"))
            {
                DTPara.sortColumn = QueryString["order[0].column"].ToInt();
                DTPara.sortColumnName = QueryString["columns[" + DTPara.sortColumn.ToString() + "].data"];
            }

            if (QueryString.ContainsKey("order[0].dir"))
                DTPara.sortDirection = QueryString["order[0].dir"];
            if (QueryString.ContainsKey("search.value"))
                DTPara.search = QueryString["search.value"];

            return DTPara;
        }
    }
}
