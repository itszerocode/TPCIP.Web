using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using TPCIP.Web.Models.Data;
using TPCIP.Web.ServiceAgentInterfaces;

namespace TPCIP.Web.ServiceAgent
{
    public class ServiceAgent
    {
        IHttpClientFactory _httpClientFactory;

        public ServiceAgent(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }
        public async Task<T> GetData<T>(string Url)
        {
            var client = _httpClientFactory.CreateClient("github");
            client.DefaultRequestHeaders.Add("x-tdc-username", "m32321");
            client.DefaultRequestHeaders.Add("SSOID", "m32321");

            var response = await client.GetAsync(Url);  //facade.SubscriptionFacade1();

            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                var stringResult = await response.Content.ReadAsStringAsync();
                var subs = JsonConvert.DeserializeObject<T>(stringResult);
                return subs;
            }
            else
            {
                var stringResult = await response.Content.ReadAsStringAsync();
                var subs = JsonConvert.DeserializeObject<BcError>(stringResult);
                throw new Exception(subs.error.message);
            }

            //var stringResult = await response.Content.ReadAsStringAsync();


            //var subs = JsonConvert.DeserializeObject<T>(stringResult);
            //return subs;
        }

       
       
    }
}