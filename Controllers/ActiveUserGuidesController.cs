using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TPCIP.Web.Models;
using TPCIP.Web.Models.Data;
using TPCIP.Web.Models.Domain;


namespace TPCIP.Web.Controllers
{

    
    public class ActiveUserGuidesController : Controller
    {


        public async Task<PartialViewResult> Index(int pageNumber = 1, int pageSize = 5)
        {          

            using (var client = new HttpClient())
            {
                try
                {

                    client.BaseAddress = new Uri("http://bc13-new.test.tdc.dk");

                    client.DefaultRequestHeaders.Add("x-tdc-user-roles", "CIP_PORTAL");
                    client.DefaultRequestHeaders.Add("x-tdc-username", "m32321");
                    client.DefaultRequestHeaders.Add("x-tdc-has-migrated-to-yspro", "true");
                    client.DefaultRequestHeaders.Add("SSOID", "m32321");

                    var response = await client.GetAsync($"/bc/secure/customer/notes/userid/m32321?pageSize=5&page=1&status=Active");
                    response.EnsureSuccessStatusCode();

                    var stringResult = await response.Content.ReadAsStringAsync();
                    var notes = JsonConvert.DeserializeObject<List<CustomerNote>>(stringResult);

                    var result = notes.Select(MapGuideSessionHistory).ToList();

                    return PartialView(result);
                }
                catch
                {

                    return null;
                }
                //return Ok(new

            }
        }



        public GuideSessionHistory MapGuideSessionHistory(CustomerNote note)
        {
            var result = new GuideSessionHistory
            {
                NoteId = note.id,
                CustomerId = note.lid,
                CustomerName = note.customerName,
                Date = DateTime.Parse(note.lastUpdated ?? note.created),
                EntityId = note.entityName,
                EntityTitle = note.entityTitle,
                StepId = note.entityStep,
                PortalId = note.systemName,
                GuideSessionId = note.entityId,
                Section = note.sectionName,
                ParentAccountNumber = note.customerBan,
                EntityType = note.entityType,
                UserId = note.userId,
                UserName = note.userName,
                NoteText = note.note,
                IsResumable = Convert.ToBoolean(note.additionalValues.FirstOrDefault(av => av.key == "resumable").value),

            };
            return result;
        }
    }
}