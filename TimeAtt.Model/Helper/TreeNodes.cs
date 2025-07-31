using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TimeAtt.Models
{
    public class TreeNodes
    {
        public int id { get; set; }
        public string label { get; set; }
        public string label2 { get; set; }
        public int? Parent { get; set; }
    }
}