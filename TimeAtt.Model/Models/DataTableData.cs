using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TimeAtt.Models
{
    public class DataTableData<T> where T:class
    {
        
            public int draw { get; set; }
            public int recordsTotal { get; set; }
            public int recordsFiltered { get; set; }
            public List<T> data { get; set; }
        
    }
}
