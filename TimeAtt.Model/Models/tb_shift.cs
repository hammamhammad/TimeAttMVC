namespace TimeAtt.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    [Table("tb_shift")]
    public partial class ShiftInfo
    {
        [Key]
        public int shift_id { get; set; }

        [StringLength(250)]
        public string shift_name { get; set; }

        [Required]
        [StringLength(50)]
        public string shift_fin { get; set; }

        [Required]
        [StringLength(50)]
        public string shift_fout { get; set; }

        [Required]
        [StringLength(50)]
        public string shift_sin { get; set; }

        [Required]
        [StringLength(50)]
        public string shift_sout { get; set; }

        public bool? shift_off { get; set; }

        public short? shift_allow { get; set; }

        public bool shift_deleted { get; set; }

        public bool? shift_withbreak { get; set; }

        [StringLength(12)]
        public string shift_fbreak { get; set; }

        [StringLength(12)]
        public string shift_tbreak { get; set; }

        public bool? shift_withOverTime { get; set; }

        [StringLength(12)]
        public string shift_fOverTime { get; set; }

        [StringLength(12)]
        public string shift_tOverTime { get; set; }

        public int? shift_OverTimeMinutes { get; set; }

        public bool? shift_twoshifts { get; set; }

        public bool? shift_isnight { get; set; }

        public short? shift_allow_out { get; set; }

        [StringLength(12)]
        public string shift_FH_from { get; set; }

        [StringLength(12)]
        public string shift_FH_to { get; set; }

        public bool? IsFH { get; set; }

        public bool? IsOpenHours { get; set; }
        public bool? auto_trans { get; set; }
        public bool IsTwoShift { get { return shift_sin != "--:--"; } }

    }
}
