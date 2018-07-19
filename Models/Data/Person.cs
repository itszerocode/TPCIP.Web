using System.Runtime.Serialization;
namespace TPCIP.Web.Models.Data
{
    [DataContract]
    public class Person
    {
        [DataMember]
        public string firstName { get; set; }
        [DataMember]
        public string lastName { get; set; }
    }
}
