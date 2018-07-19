using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using TPCIP.Web.Models;
using System.Net.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using TPCIP.Web.Models.Data;
using TPCIP.Web.ServiceLocator;
using Serilog;
using System.Diagnostics;
namespace TPCIP.Web.Controllers
{
    public class CipController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IHttpClientFactory _httpClientFactory;
        public SmtpConfig SmtpConfig { get; }

        public CipController(IHostingEnvironment hostingEnvironment,IHttpClientFactory httpClientFactory, IOptions<SmtpConfig> smtpConfig)
        {
            _hostingEnvironment = hostingEnvironment;
            _httpClientFactory = httpClientFactory;
            SmtpConfig = smtpConfig.Value;
        }
        public IActionResult Home()
        {
            using (Log.Logger.BeginTimedOperation("Home","ToolActiveUserGuides"))
            {
            string webRootPath = _hostingEnvironment.WebRootPath;
            CipViewModel cipViewModel = new CipViewModel();

            cipViewModel.scriptFiles =  System.IO.File.ReadAllLines(webRootPath + "/txt/includedJsFiles.txt");
            cipViewModel.scriptFiles = cipViewModel.scriptFiles.Concat(GetFilesFromDirectory(webRootPath , "js/Tools")).ToArray();
            cipViewModel.scriptFiles = cipViewModel.scriptFiles.Concat(GetFilesFromDirectory(webRootPath, "js/IncludedControls")).ToArray();

            cipViewModel.cssFiles = System.IO.File.ReadAllLines(webRootPath + "/txt/includedCssFiles.txt");
            var portalSectionName = "ch_kundeservice";
           
            var jsBuilder = new StringBuilder();
            jsBuilder.Append(String.Format("$(document).ready(function(){{ TdcAsyncWebPartLoader.portalId=TdcAsyncWebPartLoader.portalIds.CIP; TdcMain.changePortalSection('{0}','{1}','{2}','{3}')}});", portalSectionName, "", false, ""));
            jsBuilder.Append("jQuery(document).ready(function(){{TdcPageStatesManager.goToSessionOverview();}});");
            ViewBag.startUpJquery =  jsBuilder;

            //To Do
            cipViewModel.EnableHND = "0";
            cipViewModel.CancelledCustomerEnabledInPortals = string.Empty;
            cipViewModel.HotJarId = "111";
            cipViewModel.AppDynamicsKey = "1111";

            return View(cipViewModel);
            }
        }

        private string[] GetFilesFromDirectory(string dirPath, string dir)
        {
            try{
              int zero=0;
              int crazy=1/zero;
            }catch(Exception e){
                Log.Fatal(e,"Exception occurred");
            }
            Log.Information("From TPCIP.Web: Inside GetFilesFromDirectory");
            
            string[] filePaths = Directory.GetFiles(dirPath+"/"+dir);
            string[] fileNames = new string[filePaths.Length];
            int i = 0;
            foreach (string filePath in filePaths)
            {
                string fileName = Path.GetFileName(filePath);
                fileNames[i] = dir + "/" + fileName;
                i++;
            }
            return fileNames;
            
        }
    }
}