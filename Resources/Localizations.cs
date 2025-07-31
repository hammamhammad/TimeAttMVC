
namespace Resources
{
  
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("tb_Localization")]
    public partial class Localizations
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Column("ID")]
        public int ID { get; set; }


        [Required]
        [StringLength(100)]
        [Column("RName")]
        public string RName { get; set; }

        [Required]
        [StringLength(4000)]
        [Column("RValueAR")]
        public string RValueAR { get; set; }

        [Required]
        [StringLength(4000)]
        [Column("RValueEN")]
        public string RValueEN { get; set; }

        [Required]
        [StringLength(150)]
        [Column("ResourceSet")]
        public string ResourceSet { get; set; }

    }
}
