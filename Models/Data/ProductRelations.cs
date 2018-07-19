using System.Collections.Generic;
using System.Runtime.Serialization;

namespace TPCIP.Web.Models.Data
{
    [DataContract]
    public class ProductRelations
    {
        [DataMember]
        public List<AddOnProduct> addOnProducts { get; set; }
    }
}
