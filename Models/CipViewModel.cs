using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TPCIP.Web.Models
{

    public class topNavBar
    {
        public string url;
        public string title;
    }

    public class PortalSectionLink
    {
        public string SectionName { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
    }

    public class CipViewModel
    {
        public List<topNavBar> TopNavBarMenus { get; set; }
        public List<PortalSectionLink> PortalSections { get; set; }

        public string[] scriptFiles { get; set; }

        public string[] cssFiles { get; set; }

        public string EnableHND { get; set; }

        public string CancelledCustomerEnabledInPortals { get; set; }

        public string HotJarId { get; set; }

        public string AppDynamicsKey  { get; set; }        

        public CipViewModel()
        {
            TopNavBarMenus = GetTopNavBar();
            PortalSections = GetPortalSection();
        }

        private List<topNavBar> GetTopNavBar()
        {
            return new List<topNavBar> {
                new topNavBar{ url="http://yousee.dk/", title="yousee.dk"},
                new topNavBar{ url="http://tdc.dk/", title="Tdc.dk"},
                new topNavBar{ url="http://insite.serv01.dk/", title="Insite"},
                new topNavBar{ url="http://nymedarbejderportalen.tdk.dk/", title="Medarbejderportalen"},
                new topNavBar{ url="http://etraywebsrv02:200/universe/default.aspx", title="Salgsuniverset"},
                new topNavBar{ url="https://www.betalingsservice.dk/BS/?id=1&amp;pbs=114ab836a1db094efc77b572ef7cf881&amp;dbnr=&amp;dbgr=00006&amp;navn=&amp;adr=&amp;postby=&amp;knmin=&amp;knmax", title="PBS RAS"},
                new topNavBar{ url="http://teamshare.tdk.dk/sites/infospace/dokumenter/generelt/vaerktoejer/vaerktoejer.htm", title="Kundecenter Værktøjer"},
                new topNavBar{ url="http://mystore.tdk.dk/", title="MyStore"},
                new topNavBar{ url="http://tdkwebdir.tdk.dk/TOPIC/Documents/hilitewords.dll?*&amp;HitFile=/topic/documents/indeks+kunder.htm#FirstRef", title="TDC Opslagsværk"},
                new topNavBar{ url="http://osswls3.nms.tele.dk:7001/TvTools/filmusage?sik=*11221122&UserId=m32321", title="Filmkredittering"},//:ToDo
            };
        }
        private List<PortalSectionLink> GetPortalSection()
        {
            return new List<PortalSectionLink>
                {
                   new PortalSectionLink{ Title = "Kundeoverblik", SectionName = "ch_kundeservice"},
                   new PortalSectionLink{ Title = "Salg & kundeservice", SectionName = "ch_salg"},
                   new PortalSectionLink{ Title = "Regning" , SectionName = "ch_regning"},
                   new PortalSectionLink{ Title = "Support" , SectionName = "ch_support"},
                   new PortalSectionLink{ Title = "Save" , SectionName = "ch_save"},
                   new PortalSectionLink{ Title = "Butik" , SectionName = "ch_butik"},
                   new PortalSectionLink{ Title = "Særlige opgaver" , SectionName = "ch_back"},
                   new PortalSectionLink{ Title = "Erhverv" , SectionName = "ch_scale"},
                   new PortalSectionLink{ Title = "Velkommen", SectionName = "ch_homePage"}
                };
        }
    }   
}
