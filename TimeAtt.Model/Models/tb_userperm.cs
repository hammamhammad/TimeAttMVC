namespace TimeAtt.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    [Table("tb_userperm")]
    public partial class UserPermissions
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int user_no { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(150)]
        public string prev_name { get; set; }

        public bool? prev_ok { get; set; }

        public int? group_no { get; set; }
    }
}
