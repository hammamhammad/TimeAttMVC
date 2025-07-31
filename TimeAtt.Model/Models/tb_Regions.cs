namespace TimeAtt.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    [Table("tb_Regions")]
    public partial class RegionsInfo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public long reg_id { get; set; }

        [Required]
        [StringLength(150)]
        public string reg_name { get; set; }
    }
}
