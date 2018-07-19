using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TPCIP.Web.Models.Domain
{
    public class GuideSessionHistory
    {
        public long NoteId { get; set; }
        public string GuideSessionId { get; set; }
        public DateTime Date { get; set; }
        public string DisplayDate { get; set; }
        public string CustomerName { get; set; }
        public string CustomerId { get; set; }
        public string Section { get; set; }
        public string PortalId { get; set; }
        public string EntityId { get; set; }
        public string EntityTitle { get; set; }
        public string StepId { get; set; }
        public string ParentAccountNumber { get; set; }
        public string EntityType { get; set; }
        public bool IsResumable { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string NoteText { get; set; }
        public bool isEmptyOBSNote { get; set; }
    }
}
