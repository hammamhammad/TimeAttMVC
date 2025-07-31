using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TimeAtt.Models
{
    public class ResponseResult<T> 
    {
        public string Status { get; set; }
        public string Msg  { get; set; }
        public T Result { get; set; }

        public ResponseResult()
        {

        }
        public ResponseResult(string Status,string Msg,T Result)
        {
            this.Status = Status;
            this.Msg = Msg;
            this.Result = Result;

        }
    }
    //public class ResponseResult
    //{
    //    public string Status { get; set; }
    //    public string Msg { get; set; }
    //    public object Result { get; set; }

    //    public ResponseResult()
    //    {

    //    }
    //    public ResponseResult(string Status, string Msg, object Result)
    //    {
    //        this.Status = Status;
    //        this.Msg = Msg;
    //        this.Result = Result;

    //    }
    //}
 
}
