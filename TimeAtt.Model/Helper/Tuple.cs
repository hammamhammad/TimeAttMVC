using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace TimeAtt
{
    public sealed class Tuple<T1, T2>
    {
        public Tuple()
        {
        }
        public Tuple(T1 value1, T2 value2) { Value1 = value1; Value2 = value2; }
        public T1 Value1 { get; set; }
        public T2 Value2 { get; set; }
    }

       
    }

