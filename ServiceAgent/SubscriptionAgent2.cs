using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TPCIP.Web.ServiceAgentInterfaces;
using TPCIP.Web.Models.Data;

namespace TPCIP.Web.ServiceAgent
{
    public class SubscriptionAgent2 : SubscriptionAgent
    {
        private readonly ISubscriptionAgent _bcChannel;

        public SubscriptionAgent2(ISubscriptionAgent bcChannel)
        {
            _bcChannel = bcChannel;
        }

        public override async Task<List<Subscription>> SearchSubscriptionsAsync(string subscriptionId)
        {
            try
            {
                return await _bcChannel.SearchSubscriptionsAsync(subscriptionId);
            }
            catch (Exception ex)
            {
                
            }
            return await base.SearchSubscriptionsAsync(subscriptionId);
        }
    }
}
