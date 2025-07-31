namespace TimeAtt.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public class TransactionsMT
    {
        public TransactionsMT()
        {

        }
        public long TRANSID { get; set; }
        public long EMPNO { get; set; }
        public string TRANSDATE { get; set; }
        public string TRANSTIME { get; set; }
        public int? TRANSACTUALDATE { get; set; }

    }
}
