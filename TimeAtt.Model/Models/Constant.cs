namespace TimeAtt.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Constant")]
    public partial class Constant
    {
        [Key]
        [StringLength(5)]
        public string ConstantCode { get; set; }

        [Required]
        [StringLength(3)]
        public string ConstantType { get; set; }

        [Required]
        [StringLength(250)]
        public string ConstantArabicName { get; set; }

        [Required]
        [StringLength(250)]
        public string ConstantEnglishName { get; set; }

        public bool? show { get; set; }
    }
}
