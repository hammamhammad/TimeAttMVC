namespace TimeAtt.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    [Table("tb_shift")]
    public partial class ShiftMT
    {
        [Required]
        [Key]
        public int shift_id { get; set; }
        [Required]
        [StringLength(250)]
        public string shift_name { get; set; }

        [Required]
        public string shift_fin { get; set; }

        [Required]
        public string shift_fout { get; set; }

        public bool? shift_isnight { get; set; }

        public bool? IsOpenHours { get; set; }
    }
}
