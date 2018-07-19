using System.Collections.Generic;
using System.Runtime.Serialization;

// ReSharper disable InconsistentNaming
namespace TPCIP.Web.Models.Data
{
    [DataContract]
    public class AddOnProduct
    {
        [DataMember]
        public Product addOnProduct { get; set; }
    }
}
