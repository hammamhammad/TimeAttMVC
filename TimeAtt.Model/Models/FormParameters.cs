using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;

namespace TimeAtt.Models
{
    public class FormParameters
    {
        public string RowFilter { get; set; }
        public int? Sec_ID { get; set; }
        public long? Reg_ID { get; set; }
        public string Emp_Loc { get; set; }
        public int? Emp_ID { get; set; }
        public int FromDate { get; set; }
        public int ToDate { get; set; }
        public long? Device_ID { get; set; }
        public string GroupBy { get; set; }
        public string OrderBy { get; set; }
        public string OrderDirection { get; set; }
        public int? Type { get; set; }
        public int? Year { get; set; }
        public int? Month { get; set; }
        public long? Company { get; set; }

    }
}
