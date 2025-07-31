

namespace Resources
{
    public class ResponseResults<T>
    {
        public string Status { get; set; }
        public string Msg { get; set; }
        public T Result { get; set; }
        public string AdditionalInformation { get; set; }

        public ResponseResults()
        {

        }
        public ResponseResults(string Status, string Msg, T Result,string AdditionalInformation="")
        {
            this.Status = Status;
            this.Msg = Msg;
            this.Result = Result;
            this.AdditionalInformation = AdditionalInformation;

        }
      
    }
}
