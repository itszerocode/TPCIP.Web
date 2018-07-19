using System;
using System.Runtime.Serialization;

namespace TPCIP.Web.Models.Data
{
    [Serializable]
    [DataContract]
    public class AdditionalValue
    {
        [DataMember(EmitDefaultValue = false)]
        public long id { get; set; }

        [DataMember]
        public string key { get; set; }

        [DataMember]
        public string value { get; set; }
    }
}
