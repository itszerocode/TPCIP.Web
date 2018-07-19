var startCallBtn = $('#startCall'),
	timerContainer = $('#timerContainer'),
	timerValue = timerContainer.find('#timerValue'),

	callEnd = $('.callEnd'),

	parkedList = $('#parkedList'),
	historyList = $('#historyList'),
	resumeGuide = $('.resumeGuide'),

	themesList = $('#themesList'),
	guideList = $('#guideList'),
	articleList = $('#articleList'),

	leftPanelHandle = $('#leftPanelHandle'),
	leftPanel = $('#leftPanel'),
	contentPanel = $('#contentPanel'),
	leftPanel_visible = 'col-lg-2 col-md-3 col-sm-3',
	leftPanel_hidden = 'hidden',
	contentPanel_normal = 'col-lg-7 col-md-6 col-sm-6',
	contentPanel_large = 'col-lg-9 col-md-9 col-sm-9',

	updateTime,
	time = 0;

function timer () {
	time++;
	var m = Math.floor(time / 60),
		s = time % 60;

	if(m < 10){m = '0' + m.toString();}else{m.toString();}
	if(s < 10){s = '0' + s.toString();}else{s.toString();}

	timerValue.text(m + ':' + s);
}

function startTimer() {
	updateTime = setInterval( function () {
		timer();
	}, 1000);
}

function showLeftPanel( el ) {
	localStorage.leftPanelHidden = "visible";
	el.removeClass('no-left-panel');
	leftPanel.removeClass(leftPanel_hidden).addClass(leftPanel_visible);
	contentPanel.removeClass(contentPanel_large).addClass(contentPanel_normal);
}

function hideLeftPanel( el ) {
	localStorage.leftPanelHidden = "hidden";
	el.addClass('no-left-panel');
	leftPanel.removeClass(leftPanel_visible).addClass(leftPanel_hidden);
	contentPanel.removeClass(contentPanel_normal).addClass(contentPanel_large);
}

$(document).ready(function(){

	// IE10 viewport hack for Surface/desktop Windows 8 bug
    //
    // See Getting Started docs for more information
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
      var msViewportStyle = document.createElement("style");
      msViewportStyle.appendChild(
        document.createTextNode(
          "@-ms-viewport{width:auto!important}"
        )
      );
      document.getElementsByTagName("head")[0].
        appendChild(msViewportStyle);
    }

    
	$('*[data-toggle="tooltip"]').tooltip();
	/*$('*[data-toggle="popover"]').popover({
		html: true
	});*/

	$('.table-datatable').dataTable( {
		aoColumnDefs: [
		  {
		     bSortable: false,
		     aTargets: [ -1 ]
		  }
		]
	});

	Mousetrap.bind('ctrl+m', function (e) {
	    e.preventDefault();
	    startCallBtn.click();
	});

	startCallBtn.on('click', function (e) {
		e.preventDefault();
		timerContainer.removeClass('hidden');
		startTimer();
	});

	callEnd.on('click', function (e) {
		e.preventDefault();
		time = 0;
		clearInterval(updateTime);
	});

	$('.hidePanel').on('click', function (e) {
		e.preventDefault();
		var s = $(this).find('span');
	    var t = $(this);
		if(s.hasClass('ion-chevron-up')) {
			s.removeClass().addClass('ion-chevron-down');
		}else{
			s.removeClass().addClass('ion-chevron-up');
		}
		if (t.attr('data-original-title') == TranslationsJs.hide) {
		    t.removeAttr('data-original-title').attr("data-original-title", TranslationsJs.show);
		} else {
		    t.removeAttr('data-original-title').attr("data-original-title", TranslationsJs.hide);
		}
		$(this).parent().parent().find('.panel-content').toggleClass('hidden');
	});

	parkedList.find('tr').on('click', function (e) {
		e.preventDefault();
		var gId = $(this).attr('data-guideId');
		alert("Guide ID: " + gId);
	});

	$('.showNote').click( function (e) {
		e.preventDefault();
		var n = $(this).parent().find('.note');
		if(n.hasClass('hidden')){
			historyList.find('.note').addClass('hidden');
			$(this).parent().find('.note').removeClass('hidden');
		}else{
			$(this).parent().find('.note').addClass('hidden');
		}
	});

	$('.resumeGuide').on('click', function (e) {
		e.preventDefault();
		var gId = $(this).attr('data-guideId');
		alert("Guide ID: " + gId);
	});

	if(localStorage.leftPanelHidden == "visible" || localStorage.leftPanelHidden == null){
		showLeftPanel(leftPanelHandle);
	}else{
		hideLeftPanel(leftPanelHandle);
	}

	leftPanelHandle.on('click', function (e) {
		e.preventDefault();
		if(localStorage.leftPanelHidden == "visible"){
			hideLeftPanel( $(this) );
		}else{
			showLeftPanel( $(this) );
		}
	});

	themesList.find('a').on('click', function (e) {
		e.preventDefault();
		var t = $(this).attr('href');
		var type = $(this).attr('data-type');
		guideList.text('');
		articleList.text('');
		$.getJSON('json.php?t=bg', function (data) {
			var data_length = data.length;

			for(i = 0; i < data_length; i++) {
				var guidesInSection = data[i],
					optionTemplate = $('<div>').addClass('col-md-3 option'),
					optionTemplateTitle = $('<h5>'),
					optionTamplateUl = $('<ul>').addClass('list-unstyled');

				optionTemplateTitle.text(guidesInSection['title']).appendTo(optionTemplate);
				optionTamplateUl.appendTo(optionTemplate);

				var guidesInSection_length = guidesInSection['values'].length;
				for(j = 0; j < guidesInSection_length; j++) {
					var guide = guidesInSection['values'][j],
						optionTemplateLi = $('<li>'),
						optionTemplateA = $('<a>');

						optionTemplateA.attr('href', guide['url']).text(guide['title']).appendTo(optionTemplateLi);
						optionTemplateLi.appendTo(optionTamplateUl);
				}
				optionTemplate.appendTo(guideList);				
			}
			$('.guides-list').removeClass('hidden');
		});

		$.getJSON('json.php?t=ba', function (data) {
			var data_length = data.length;

			for(i = 0; i < data_length; i++) {
				var guidesInSection = data[i],
					optionTemplate = $('<div>').addClass('col-md-3 option'),
					optionTemplateTitle = $('<h5>'),
					optionTamplateUl = $('<ul>').addClass('list-unstyled');

				optionTemplateTitle.text(guidesInSection['title']).appendTo(optionTemplate);
				optionTamplateUl.appendTo(optionTemplate);

				var guidesInSection_length = guidesInSection['values'].length;
				for(j = 0; j < guidesInSection_length; j++) {
					var guide = guidesInSection['values'][j],
						optionTemplateLi = $('<li>'),
						optionTemplateA = $('<a>');

						optionTemplateA.attr('href', guide['url']).text(guide['title']).appendTo(optionTemplateLi);
						optionTemplateLi.appendTo(optionTamplateUl);
				}
				optionTemplate.appendTo(articleList);				
			}
			$('.articles-list').removeClass('hidden');
		});
	});

	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		var ct = $(e.target),
			data = ct.attr('data-tools');

		console.log(data);
		if(ct.attr('data-tools') == 'noTools') {
			$('.guide-tools').addClass('hidden');
		}else{
			$('.guide-tools').removeClass('hidden');
		}
	});

});
