#pragma checksum "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\Shared\_CipLayout.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "277c8b09fd6e970de07dcd2bf1eb17ade411d78f"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Shared__CipLayout), @"mvc.1.0.view", @"/Views/Shared/_CipLayout.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Shared/_CipLayout.cshtml", typeof(AspNetCore.Views_Shared__CipLayout))]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#line 1 "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\_ViewImports.cshtml"
using TPCIP.Web;

#line default
#line hidden
#line 2 "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\_ViewImports.cshtml"
using TPCIP.Web.Models;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"277c8b09fd6e970de07dcd2bf1eb17ade411d78f", @"/Views/Shared/_CipLayout.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"c297e95e08206610b0473ebd6664e174de9023a0", @"/Views/_ViewImports.cshtml")]
    public class Views_Shared__CipLayout : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<CipViewModel>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/images/icons/tdc_logo.png"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("alt", new global::Microsoft.AspNetCore.Html.HtmlString("TDC logo"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("margin-right-10"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("TDCLogo"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("style", new global::Microsoft.AspNetCore.Html.HtmlString("margin-top: 5px;"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_5 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("height", new global::Microsoft.AspNetCore.Html.HtmlString("40"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.HeadTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(21, 25, true);
            WriteLiteral("<!DOCTYPE html>\r\n<html>\r\n");
            EndContext();
            BeginContext(46, 173, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "498ba27920c54387a968b600c9a9cd68", async() => {
                BeginContext(52, 121, true);
                WriteLiteral("\r\n    <meta charset=\"utf-8\" />\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\r\n    <title>");
                EndContext();
                BeginContext(174, 28, false);
#line 7 "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\Shared\_CipLayout.cshtml"
      Write(Translations.PortalTitle_Cip);

#line default
#line hidden
                EndContext();
                BeginContext(202, 10, true);
                WriteLiteral("</title>\r\n");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.HeadTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(219, 2, true);
            WriteLiteral("\r\n");
            EndContext();
            BeginContext(221, 13384, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "6f0ffa8f29394918a0685e77a9c7ba1a", async() => {
                BeginContext(227, 2, true);
                WriteLiteral("\r\n");
                EndContext();
#line 10 "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\Shared\_CipLayout.cshtml"
     foreach (var cssfile in Model.cssFiles)
    {

#line default
#line hidden
                BeginContext(282, 30, true);
                WriteLiteral("        <link rel=\"stylesheet\"");
                EndContext();
                BeginWriteAttribute("href", " href=\"", 312, "\"", 327, 1);
#line 12 "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\Shared\_CipLayout.cshtml"
WriteAttributeValue("", 319, cssfile, 319, 8, false);

#line default
#line hidden
                EndWriteAttribute();
                BeginContext(328, 5, true);
                WriteLiteral(" />\r\n");
                EndContext();
#line 13 "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\Shared\_CipLayout.cshtml"
    }

#line default
#line hidden
                BeginContext(340, 2, true);
                WriteLiteral("\r\n");
                EndContext();
#line 15 "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\Shared\_CipLayout.cshtml"
     foreach (var scriptfile in Model.scriptFiles)
    {

#line default
#line hidden
                BeginContext(401, 31, true);
                WriteLiteral("        <script class=\"TpCipJS\"");
                EndContext();
                BeginWriteAttribute("src", " src=\"", 432, "\"", 449, 1);
#line 17 "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\Shared\_CipLayout.cshtml"
WriteAttributeValue("", 438, scriptfile, 438, 11, false);

#line default
#line hidden
                EndWriteAttribute();
                BeginContext(450, 12, true);
                WriteLiteral("></script>\r\n");
                EndContext();
#line 18 "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\Shared\_CipLayout.cshtml"
    }

#line default
#line hidden
                BeginContext(469, 312, true);
                WriteLiteral(@"    <div class=""navbar navbar-inverse navbar-fixed-top"" id=""topNavBar1"" role=""navigation"" style=""z-index: 1049 !important; background-color:#636969"">
        <div class=""container navbar-content-holder"">
            <div class=""navbar-collapse"">
                <ul class=""nav navbar-nav navbar-nav-global"">
");
                EndContext();
#line 23 "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\Shared\_CipLayout.cshtml"
                     foreach (var menu in Model.TopNavBarMenus)
                    {

#line default
#line hidden
                BeginContext(869, 60, true);
                WriteLiteral("                        <li>\r\n                            <a");
                EndContext();
                BeginWriteAttribute("href", " href=\"", 929, "\"", 945, 1);
#line 26 "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\Shared\_CipLayout.cshtml"
WriteAttributeValue("", 936, menu.url, 936, 9, false);

#line default
#line hidden
                EndWriteAttribute();
                BeginContext(946, 51, true);
                WriteLiteral(" target=\'_blank\'>\r\n                                ");
                EndContext();
                BeginContext(998, 10, false);
#line 27 "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\Shared\_CipLayout.cshtml"
                           Write(menu.title);

#line default
#line hidden
                EndContext();
                BeginContext(1008, 67, true);
                WriteLiteral("\r\n                            </a>\r\n                        </li>\r\n");
                EndContext();
#line 30 "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\Shared\_CipLayout.cshtml"
                    }

#line default
#line hidden
                BeginContext(1098, 417, true);
                WriteLiteral(@"                </ul>
            </div>
        </div>
    </div>
    <div id=""cip_content_container"">
        <nav class=""navbar navbar-default navbar-fixed-top"" id=""topNavBar2"" role=""navigation"">
            <div class=""navbar-header"">
                <button type=""button"" class=""navbar-toggle"" data-toggle=""collapse"" data-target=""#bs-example-navbar-collapse-1"">
                    <span class=""sr-only"">");
                EndContext();
                BeginContext(1516, 30, false);
#line 39 "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\Shared\_CipLayout.cshtml"
                                     Write(Translations.Toggle_navigation);

#line default
#line hidden
                EndContext();
                BeginContext(1546, 633, true);
                WriteLiteral(@"</span>
                    <span class=""icon-bar""></span>
                    <span class=""icon-bar""></span>
                    <span class=""icon-bar""></span>
                </button>
            </div>
            <div class=""collapse navbar-collapse"" id=""bs-example-navbar-collapse-1"">
                <input type=""button"" style=""margin-top:7px;height:36px"" id=""LogoutBtn"" class=""row btn btn-primary logoutBatchUser"" onclick=""TdcLogin.LogOutBatchUserAndClearSession(this)"" title=""Log ud"" value=""Log ud"" />
                <ul class=""nav navbar-nav"" id=""portalmenubar"">
                    <li>
                        ");
                EndContext();
                BeginContext(2179, 160, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("img", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "27ff67081b34432395715b542ecbb54c", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_4);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_5);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(2339, 31, true);
                WriteLiteral("\r\n                    </li>\r\n\r\n");
                EndContext();
#line 73 "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\Shared\_CipLayout.cshtml"
                     foreach (var portalsection in Model.PortalSections)
                    {

#line default
#line hidden
                BeginContext(3878, 27, true);
                WriteLiteral("                        <li");
                EndContext();
                BeginWriteAttribute("class", " class=\"", 3905, "\"", 3939, 1);
#line 75 "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\Shared\_CipLayout.cshtml"
WriteAttributeValue("", 3913, portalsection.SectionName, 3913, 26, false);

#line default
#line hidden
                EndWriteAttribute();
                BeginContext(3940, 33, true);
                WriteLiteral(">\r\n                            <a");
                EndContext();
                BeginWriteAttribute("href", " href=\"", 3973, "\"", 3998, 1);
#line 76 "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\Shared\_CipLayout.cshtml"
WriteAttributeValue("", 3980, portalsection.Url, 3980, 18, false);

#line default
#line hidden
                EndWriteAttribute();
                BeginContext(3999, 41, true);
                WriteLiteral(" target=\'_blank\' data-portalsectionname=\"");
                EndContext();
                BeginContext(4041, 25, false);
#line 76 "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\Shared\_CipLayout.cshtml"
                                                                                            Write(portalsection.SectionName);

#line default
#line hidden
                EndContext();
                BeginContext(4066, 180, true);
                WriteLiteral("\" style=\"outline:none\" class=\"cursor-pointer\"\r\n                               onclick=\"TdcMain.portalSectionMenuItemClicked(this); return false;\">\r\n                                ");
                EndContext();
                BeginContext(4247, 19, false);
#line 78 "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\Shared\_CipLayout.cshtml"
                           Write(portalsection.Title);

#line default
#line hidden
                EndContext();
                BeginContext(4266, 67, true);
                WriteLiteral("\r\n                            </a>\r\n                        </li>\r\n");
                EndContext();
#line 81 "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\Shared\_CipLayout.cshtml"
                    }

#line default
#line hidden
                BeginContext(4356, 1208, true);
                WriteLiteral(@"                </ul>
                <a id=""CSAM_placeholder"" class=""btn goToCsamLink fl noBorder pd-t-16"" href=""javascript:void(0);"" onclick=""TdcMain.goToCsamClicked(this)"">CSAM</a>
                <div class=""col-lg-3 col-md-3 col-sm-3 input-group navbar-search"" id=""cip_menu"" style=""padding-left:10px"">
                    <div class=""searchBoxHolder"" style=""min-width:257px !important"" data-user=""<%= (new System.Security.Principal.WindowsPrincipal(System.Security.Principal.WindowsIdentity.GetCurrent())).Identity.Name %>"">
                        <span class=""loadingPlaceholder search-input-icon""></span>
                        <input id=""mainSearchBox"" placeholder=""Søgning guider og artikler"" type=""text"" class=""form-control"" autocomplete=""off"" />
                    </div>
                </div>
                <img id=""GoToDashboardIcon_placeholder"" class=""btn goToDashboardLink"" height=""50"" src=""images/icons/DashboardIcon.png"" style=""display:none"" onclick=""TdcMain.goToDasboardClicked(this); return ");
                WriteLiteral("false ;\" />\r\n                <a id=\"GoToDashboardLink_placeholder\" class=\"btn goToDashboardLink\" href=\"javascript:void(0);\" onclick=\"TdcMain.goToDasboardClicked(this); return false ;\">");
                EndContext();
                BeginContext(5565, 22, false);
#line 91 "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\Shared\_CipLayout.cshtml"
                                                                                                                                                                      Write(Translations.Dashboard);

#line default
#line hidden
                EndContext();
                BeginContext(5587, 155, true);
                WriteLiteral("</a>\r\n                <a id=\"FeedBack_placeholder\" class=\"btn Feedback\" href=\"javascript:void(0);\" onclick=\"TDCPopUpFeedbackTab.goToFeedbackClicked(this)\">");
                EndContext();
                BeginContext(5743, 39, false);
#line 92 "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\Shared\_CipLayout.cshtml"
                                                                                                                                                Write(Translations.FeedbackTab_Order_Feedback);

#line default
#line hidden
                EndContext();
                BeginContext(5782, 465, true);
                WriteLiteral(@" </a>

            </div>
        </nav>

        <div class=""container content-holder"" id=""cip_content"" data-userName='<%= UserName %>' data-userId='<%= UserId %>' data-autonotelist='<%=JsonHelper.Serialize(NoteDetailsDictionary.NoteDetailDictionary) %>'
             data-retailUserId='<%= RetailUserId %>' data-retailUserName='<%= RetailUserName %>' data-retailStoreName='<%= RetailStoreName %>' data-departmentname='<%= DepartmentName %>'>

            ");
                EndContext();
                BeginContext(6248, 12, false);
#line 100 "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\Shared\_CipLayout.cshtml"
       Write(RenderBody());

#line default
#line hidden
                EndContext();
                BeginContext(6260, 106, true);
                WriteLiteral("\r\n        </div>\r\n\r\n    </div>\r\n\r\n    <div id=\"messageAlertsBox\"></div>\r\n\r\n    <div id=\"cip_scriptZone\">\r\n");
                EndContext();
                BeginContext(7944, 285, true);
                WriteLiteral(@"
    </div>

    <div id=""templates"" style=""display: none"">
        <b id=""closeTabBtnTemplate"" class=""btn btn-default btn-xs sidePadding-10 btnClose"" data-original-title=""<%= TPCIP.CommonTranslations.Translations.Close_tab_tooltip %>"">
            <span class=""ion-close""></span>");
                EndContext();
                BeginContext(8230, 19, false);
#line 133 "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\Shared\_CipLayout.cshtml"
                                      Write(Translations.Cancel);

#line default
#line hidden
                EndContext();
                BeginContext(8249, 317, true);
                WriteLiteral(@"
        </b>

        <div id=""loadingTemplate"" class=""panel panel-default webpart loading"">
            <div class=""panel-heading"">
                <div class=""pull-right"">
                    <!--Ajinkya Korade:: Service Dashboard :: Changed default loading image from loading.gif to loading_green.gif  -->
");
                EndContext();
                BeginContext(8684, 2273, true);
                WriteLiteral(@"                    <div class=""web-part-loader"">
                        <div class=""line-scale"">
                            <div class=""loader-green-theme""></div>
                            <div class=""loader-green-theme""></div>
                            <div class=""loader-green-theme""></div>
                            <div class=""loader-green-theme""></div>
                            <div class=""loader-green-theme""></div>
                        </div>
                    </div>
                </div>
                <h4 class=""panel-title"" data-bind=""text: toolname""></h4>
            </div>
        </div>

        <div id=""searchLoadingTemplate"" class=""toolOverlay"" style=""height: 100%; width: 10%;"">
            <div class=""web-part-loader"">
                <div class=""line-scale"" style=""margin-left: 9px; padding-top: 9px;"">
                    <div class=""loader-green-theme""></div>
                    <div class=""loader-green-theme""></div>
                    <div class=""loader-gre");
                WriteLiteral(@"en-theme""></div>
                    <div class=""loader-green-theme""></div>
                    <div class=""loader-green-theme""></div>
                </div>
            </div>
        </div>

        <small id=""doActionOverlayTemplate"" class=""toolOverlay"" style=""height: 100%; width: 10%;"">
            <div class=""web-part-loader"">
                <div class=""line-scale"" style=""margin-left: 9px; padding-top: 9px;"">
                    <div class=""loader-green-theme""></div>
                    <div class=""loader-green-theme""></div>
                    <div class=""loader-green-theme""></div>
                    <div class=""loader-green-theme""></div>
                    <div class=""loader-green-theme""></div>
                </div>
            </div>
        </small>

        <div id=""loadingOverlayTemplate"" class=""toolOverlay"">
            <div style=""position: absolute; height: 100%; width: 100%; margin: 1px 1px 1px 1px; background-color: white; -ms-opacity: 0.8; opacity: 0.8; -ms-filter: 'pr");
                WriteLiteral("ogid:DXImageTransform.Microsoft.Alpha(Opacity=50)\'; filter: alpha(opacity=80); z-index: -1\"></div>\r\n\r\n            <div class=\"panel-default webpart loading\" style=\"height: 100%; text-align: center; background: transparent\">\r\n");
                EndContext();
                BeginContext(11151, 779, true);
                WriteLiteral(@"                <div class=""overlay-loader"">
                    <div class=""line-scale"">
                        <div class=""loader-green-theme""></div>
                        <div class=""loader-green-theme""></div>
                        <div class=""loader-green-theme""></div>
                        <div class=""loader-green-theme""></div>
                        <div class=""loader-green-theme""></div>
                    </div>
                </div>
            </div>
        </div>

        <div id=""errorTemplate"" class=""panel panel-default webpart"">
            <div class=""panel-heading"">
                <div class=""pull-right"">
                    <b class=""btn btn-default btn-xs sidePadding-10 btnRetry""><span class="""" style=""font-size: 7px;""></span>");
                EndContext();
                BeginContext(11931, 18, false);
#line 199 "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\Shared\_CipLayout.cshtml"
                                                                                                                       Write(Translations.Retry);

#line default
#line hidden
                EndContext();
                BeginContext(11949, 933, true);
                WriteLiteral(@"</b>
                </div>
                <h4 class=""panel-title"" data-bind=""text: toolname""></h4>
            </div>
            <div class=""panel-body panel-content text-error text-center"">
                <p data-bind=""text: errortitle""></p>
            </div>
        </div>


        <div id=""errorOverlayTemplate"" class=""toolOverlay"">
            <div style=""position: absolute; height: 100%; width: 100%; margin: 1px 1px 1px 1px; background-color: white; -ms-opacity: 0.8; opacity: 0.8; -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=50)'; filter: alpha(opacity=80); z-index: -1""></div>
            <div class=""panel-default webpart"" style=""height: 100%;"">
                <div style=""margin-right: 5px; margin-top: 5px"">
                    <div class=""pull-right"">
                        <b class=""btn btn-default btn-xs sidePadding-10 btnRetry""><span class="""" style=""font-size: 7px;""></span>");
                EndContext();
                BeginContext(12883, 18, false);
#line 214 "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\Shared\_CipLayout.cshtml"
                                                                                                                           Write(Translations.Retry);

#line default
#line hidden
                EndContext();
                BeginContext(12901, 216, true);
                WriteLiteral("</b>\r\n                        &nbsp;\r\n                        <b class=\"btn btn-default btn-xs sidePadding-10 btnClose\" onclick=\"$(this).closest(\'.toolOverlay\').remove();return false;\"><span class=\"ion-close\"></span>");
                EndContext();
                BeginContext(13118, 19, false);
#line 216 "C:\LiquidPlatform\CD\TPCIP-Latest\TPCIP\TPCIP\TPCIP.Web\Views\Shared\_CipLayout.cshtml"
                                                                                                                                                                             Write(Translations.Cancel);

#line default
#line hidden
                EndContext();
                BeginContext(13137, 461, true);
                WriteLiteral(@"</b>
                    </div>
                    <h4 class=""panel-title"" data-bind=""text: toolname""></h4>
                </div>
                <div class=""text-error"" style=""height: 100%; width: 100%; text-align: center; background: transparent"">
                    <span data-bind=""text: errortitle"" style=""position: absolute; top: 50%; height: 2em; margin-top: -1em""></span>
                </div>
            </div>
        </div>
    </div>
");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(13605, 13, true);
            WriteLiteral("\r\n\r\n</html>\r\n");
            EndContext();
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<CipViewModel> Html { get; private set; }
    }
}
#pragma warning restore 1591
