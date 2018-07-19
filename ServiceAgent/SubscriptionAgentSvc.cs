using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using TPCIP.Web.Models.Data;
using TPCIP.Web.ServiceAgentInterfaces;

namespace TPCIP.Web.ServiceAgent
{

    public class BcError
    {
        public error error;
    }

        public class error
    {
        public string code;
        public string message;
    }

    public class SubscriptionAgentSvc : ServiceAgent, ISubscriptionAgent
    {
        string bcUrl = "/bc/secure/";
        IHttpClientFactory _httpClientFactory;
        public SubscriptionAgentSvc(IHttpClientFactory httpClientFactory) : base(httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }
        public virtual async Task<List<Subscription>> SearchSubscriptionsAsync(string subscriptionId)
        {
            var client = _httpClientFactory.CreateClient("github");
            var url = bcUrl+"subscription?subscriptionId=" + subscriptionId;
            var response =await GetData<List<Subscription>>(url);
            // var response = await client.GetAsync($);  //facade.SubscriptionFacade1();
            return response;
            
        }       
    }
}