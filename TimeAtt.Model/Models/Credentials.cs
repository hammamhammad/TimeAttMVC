using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TimeAtt.Models
{
    public class CredentialsLogin
    {
        public string Username { get; set; }
        public string Password { get; set; }

        public bool RememberMe { get; set; }
        
    }
}
