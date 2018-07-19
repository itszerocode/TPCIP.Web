using System.Runtime.Serialization;

namespace TPCIP.Web.Models.Data
{
    [DataContract]
    public class ProductPrices
    {
        public enum EventCodeEnums { MTLY };

        [DataMember]
        public string eventCode { get; set; }

        [DataMember]
        public string priceType { get; set; }

        [DataMember]
        public decimal rate { get; set; }

        [DataMember]
        public string rateExclVat { get; set; }
    }
}