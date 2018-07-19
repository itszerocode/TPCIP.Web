using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Settings.Configuration;


namespace TPCIP.Web
{
    public class Program
    {
        public static IConfiguration Configuration { get; } = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            /*.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)*/
            .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production"}.json", optional: true)
            .AddEnvironmentVariables()
            .Build();
        public static void Main(string[] args)
        {
            bool seriLogSwitch=true;
            string enVar=Environment.GetEnvironmentVariable("SERILOG_SWITCH")?? "OFF";
            if(enVar=="OFF")
                seriLogSwitch=false;

             Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(Configuration)
                .Filter.ByExcluding(_ => !seriLogSwitch)
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .CreateLogger();
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
