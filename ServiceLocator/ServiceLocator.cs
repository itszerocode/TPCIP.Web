using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using TPCIP.Web.ServiceAgent;
using TPCIP.Web.ServiceAgentInterfaces;
using TPCIP.Web.ServiceLocatorInterfaces;

namespace TPCIP.Web.ServiceLocator
{
    class ServiceLocatorTool : IServiceLocator
    {
        public readonly Dictionary<Type, object> _serviceMappings = new Dictionary<Type, object>();
        //public readonly BcAgentHelper _bcAgentHelper;
        public ServiceLocatorTool(IHttpClientFactory httpClientFactory)
        {
            //_serviceAreaMappings.Add(typeof(ISubscriptionAgent), "");

            Map<ISubscriptionAgent>(new SubscriptionAgentSvc(httpClientFactory));

            string useFakes = "2";// Request.QueryString["usefakes"];
            if (useFakes == "1" || useFakes == "true")
            {
             Map<ISubscriptionAgent>(new SubscriptionAgent());
            }
            else if (useFakes == "2")
            {
                Map<ISubscriptionAgent>(new SubscriptionAgent2(new SubscriptionAgentSvc(httpClientFactory)));
            }
        }

        public T GetService<T>()
        {
            if (IsTypeMapped(typeof(T)))
            {
                return (T)_serviceMappings[typeof(T)];
            }
            else
            {
                throw new NotImplementedException(
                    string.Format("The interface {0} has not been mapped in the ServiceLocator.", typeof(T).Name));
            }
        }

        public void Map<TService>(TService instance)
        {
            _serviceMappings[typeof(TService)] = instance;
        }

        public bool IsTypeMapped(Type type)
        {
            return _serviceMappings.ContainsKey(type);
        }
    }

    //public partial class ServiceLocator : IServiceLocator
    //{
    //    public readonly Dictionary<Type, object> _serviceMappings = new Dictionary<Type, object>();
    //    public readonly BcAgentHelper _bcAgentHelper;

    //    public ServiceLocator()
    //    {
    //        _bcAgentHelper = new BcAgentHelper("https://bc13-new.test.tdc.dk/bc/secure/");
    //        Map(_bcAgentHelper.CreateChannel<ISubscriptionAgent>());
    //    }

    //    public ServiceLocator(string url)
    //    {            
    //        _bcAgentHelper = new BcAgentHelper(url);
    //    }

    //    public T GetService<T>()
    //    {
    //        if (IsTypeMapped(typeof(T)))
    //        {
    //            return (T)_serviceMappings[typeof(T)];
    //        }
    //        else
    //        {
    //            throw new NotImplementedException(
    //                string.Format("The interface {0} has not been mapped in the ServiceLocator.", typeof(T).Name));
    //        }
    //    }

    //    public void Map<TService>(TService instance)
    //    {
    //        _serviceMappings[typeof(TService)] = instance;
    //    }

    //    public bool IsTypeMapped(Type type)
    //    {
    //        return _serviceMappings.ContainsKey(type);
    //    }
    //}
}