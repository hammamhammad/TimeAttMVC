using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TimeAtt.Model.Models
{
    public class EmailEntity
    {
        public int EmailID { get; set; }
        public string Recipient { get; set; }
        public string Subject { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public int TemplateID { get; set; }
        public int ACID { get; set; }
        public EmailEntity()
        {

        }
    }
}