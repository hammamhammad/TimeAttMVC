namespace TimeAtt.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    [Table("tb_userlog")]
    public partial class UserLogs
    {
        public int id { get; set; }

        public int? logtype { get; set; }

        public int? operationid { get; set; }

        public int? operationtype { get; set; }

        public string arabicdescription { get; set; }

        public string englishdescription { get; set; }

        [StringLength(100)]
        public string username { get; set; }

        [Column(TypeName = "smalldatetime")]
        public DateTime? createdate { get; set; }
    }
}
