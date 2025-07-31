using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Resources
{
   public class LocalizationDBModel : DBContextBase
    {
        public LocalizationDBModel()
            : base("LocalizationConnectionString")
        {

        }
    }
}
