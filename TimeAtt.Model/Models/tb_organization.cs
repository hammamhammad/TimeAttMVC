namespace TimeAtt.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    [Table("tb_organization")]
    public partial class CompanyInfo
    {
        [Key]
        [StringLength(250)]
        public string name { get; set; }

        [Column(TypeName = "image")]
        public byte[] logo { get; set; }

        [StringLength(1)]
        public string CalType { get; set; }
    }
}
