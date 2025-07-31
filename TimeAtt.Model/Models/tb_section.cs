namespace TimeAtt.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    [Table("tb_section")]
    public partial class SectionsInfo
    {
        [Key]
        public int sec_ID { get; set; }

        [Required]
        [StringLength(250)]
        public string sec_Name { get; set; }

        public int? sec_Parent { get; set; }

        [StringLength(250)]
        public string sec_Location { get; set; }

        public int? sec_Level { get; set; }

        public int? sec_manager { get; set; }

        [StringLength(50)]
        public string sec_No { get; set; }

        public int? sec_sch { get; set; }

        [StringLength(250)]
        public string sec_path { get; set; }

        public int? sec_secondmanager { get; set; }

        public bool? IsRoot { get; set; }

        public bool? sec_secondmanageractive { get; set; }

        public bool? sec_sendnotif { get; set; }

      // [NotMapped]
        public  string sec_managerName { get; set; }
       //[NotMapped]
        public string sec_secondmanagerName { get; set; }
        //[NotMapped]
        public string sch_name { get; set; }
    }
}
