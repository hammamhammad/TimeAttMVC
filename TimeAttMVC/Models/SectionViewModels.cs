using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TimeAttMVC.Models
{
    public class SectionViewModel
    {
        //[Required]
        //[EmailAddress]
        //[Display(Name = "Email")]
        //public string Email { get; set; }

        //[Required]
        //[StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        //[DataType(DataType.Password)]
        //[Display(Name = "Password")]
       // public string Password { get; set; }

        //[DataType(DataType.Password)]
        //[Display(Name = "Confirm password")]
        //[Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        //public string ConfirmPassword { get; set; }
        [Key]
        public int sec_id { get; set; }
        [Required]
        [DataType(DataType.Text )]
        [Display(Name = "Section No.")]
        [StringLength(10, ErrorMessage = "The {0} must be at least {1} characters long.", MinimumLength = 1)]
        public string sec_No { get; set; }
        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Section Name")]
        [StringLength(150, ErrorMessage = "The {0} must be at least {1} characters long.", MinimumLength = 1)]
        public string sec_Name { get; set; }
      
        public int? sec_secondmanager { get; set; }
        public int? sec_manager { get; set; }

        public bool? sec_sendnotif { get; set; }
        public int? sec_sch { get; set; }
        public string sec_Location { get; set; }

        public string sec_managerName { get; set; }
       
        public string sec_secondmanagerName { get; set; }
    }
}