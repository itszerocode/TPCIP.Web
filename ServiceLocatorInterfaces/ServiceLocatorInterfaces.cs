using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TPCIP.Web.ServiceLocatorInterfaces
{
    public interface IServiceLocator
    {
        T GetService<T>();       
    }
}
