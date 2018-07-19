using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Threading.Tasks;
using TPCIP.Web.Models.Data;

namespace TPCIP.Web.ServiceAgentInterfaces
{
    [ServiceContract]
    public partial interface ISubscriptionAgent
    {
        [OperationContract]
        [HttpGet("?subscriptionId={subscriptionId}")]
        Task<List<Subscription>> SearchSubscriptionsAsync(string subscriptionId);
    }
}
