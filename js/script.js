/* ----------------- Start JS Document ----------------- */

$(document).ready(function ($) {
	"use strict";

    /*---------------------------------------------------*/
    /* Progress Bar
    /*---------------------------------------------------*/
    /*$('.skill-shortcode').appear(function() {
  		$('.progress').each(function(){ 
    		$('.progress-bar').css('width',  function(){ return ($(this).attr('data-percentage')+'%')});
  		});
	},{accY: -100});*/

	
    /*--------------------------------------------------*/
    /* Counter
    /*--------------------------------------------------*/

    /*$('.timer').countTo();
    $('.counter-item').appear(function() {
        $('.timer').countTo();
    },{accY: -100});*/

	
	/*----------------------------------------------------*/
	/*	Nav Menu & Search
	/*----------------------------------------------------*/

	//$(".nav > li:has(ul)").addClass("drop");

    var dropdownselector = $(".nav.dropdownmenu > li");

    dropdownselector.removeClass("drop");

    dropdownselector.click(function(){
        dropdownselector.addClass("drop");
    });

    $(".nav.dropdownmenu > li.drop").click(function(){
        this.removeClass("drop");
    });

    $(document).mouseup(function (e)
    {
        var container = $(".nav.dropdownmenu > li.drop");

        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.removeClass("drop");
        }
    });


	$('.show-search').click(function() {
		$('.search-form').fadeIn(300);
		$('.search-form input').focus();
	});
	$('.search-form input').blur(function() {
		$('.search-form').fadeOut(300);
	});
	
	
	/*----------------------------------------------------*/
	/*	Back Top Link
	/*----------------------------------------------------*/
	
    var offset = 200;
    $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
            $('.back-to-top').fadeIn(400);
        } else {
            $('.back-to-top').fadeOut(400);
        }
    });
    $('.back-to-top').click(function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, 600);
        return false;
    });

    $('.to-top').click(function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, 600);
        return false;
    });

	
	/*----------------------------------------------------*/
	/*	Sliders & Carousel
	/*----------------------------------------------------*/
	
	////------- Touch Slider
	var $progressBar,
		$bar,
		$elem,
		isPause,
		tick,
		percentTime;

    var touchslider=$('.touch-slider');
    touchslider.each(function(){
        var returnSliderNav;
        var returnSliderPag;
        var returnSliderProgressBar;
        var returnAutoPlay;
		var owl = jQuery(this),
			sliderNav = $(this).attr('data-slider-navigation'),
			sliderPag = $(this).attr('data-slider-pagination'),
			sliderProgressBar = $(this).attr('data-slider-progress-bar');
			
		if ( sliderNav == 'false' || sliderNav == '0' ) {
			returnSliderNav = false;
		}else {
			returnSliderNav = true;
		}
		
		if ( sliderPag == 'true' || sliderPag == '1' ) {
			returnSliderPag = true;
		}else {
			returnSliderPag = false;
		}
		
		if ( sliderProgressBar == 'true' || sliderProgressBar == '1' ) {
			returnSliderProgressBar = progressBar;
			returnAutoPlay = false;
		}else {
			returnSliderProgressBar = false;
			returnAutoPlay = true;
		}
		
		owl.owlCarousel({
			navigation : returnSliderNav,
			pagination: returnSliderPag,
			slideSpeed : 400,
			paginationSpeed : 400,
			lazyLoad : true,
			singleItem: true,
			autoHeight : true,
			autoPlay: returnAutoPlay,
			stopOnHover: returnAutoPlay,
			transitionStyle : "fade",
			afterInit : returnSliderProgressBar,
			afterMove : moved,
			startDragging : pauseOnDragging
		});
		
	});

    function progressBar(elem){
		$elem = elem;
		buildProgressBar();
		start();
    }
	
    function buildProgressBar(){
		$progressBar = $("<div>",{
			id:"progressBar"
		});
		$bar = $("<div>",{
			id:"bar"
		});
		$progressBar.append($bar).prependTo($elem);
    }
	
	function start() {
		percentTime = 0;
		isPause = false;
		tick = setInterval(interval, 10);
    };
 
    function interval() {
		/*if(isPause === false){
			percentTime += 1 / time;
			$bar.css({
				width: percentTime+"%"
			});
			if(percentTime >= 100){
				$elem.trigger('owl.next')
			}
		}*/
    }
	
    function pauseOnDragging(){
      isPause = true;
    }
	
    function moved(){
      clearTimeout(tick);
      start();
    }
	
	////------- Projects Carousel
	$(".projects-carousel").owlCarousel({
		navigation : true,
		pagination: false,
		slideSpeed : 400,
		stopOnHover: true,
    	autoPlay: false,
    	items : 4,
    	itemsDesktopSmall : [992,3],
		itemsTablet: [768,2],
		itemsMobile : [479, 1]
	});
	
	
	
	////------- Testimonials Carousel
	$(".testimonials-carousel").owlCarousel({
		navigation : true,
		pagination: false,
		slideSpeed : 2500,
		stopOnHover: true,
    	autoPlay: 3000,
    	singleItem:true,
		autoHeight : true,
		transitionStyle : "fade"
	});
	
	
	////------- Custom Carousel
	setTimeout(function(){
        $('.custom-carousel').each(function(){

            var owl = jQuery(this),
            itemsNum = $(this).attr('data-appeared-items'),
            sliderNavigation = $(this).attr('data-navigation');
            var returnSliderNavigation;
            var deskitemsNum;
            var desksmallitemsNum;
            var tabletitemsNum;

            if( sliderNavigation == 'false' || sliderNavigation == '0' ) {
                returnSliderNavigation = false
            }else{
                returnSliderNavigation = true
            }
            if( itemsNum == 1) {
                deskitemsNum = 1;
                desksmallitemsNum = 1;
                tabletitemsNum = 1;
            }
            else if (itemsNum >= 2 && itemsNum < 4) {
                deskitemsNum = itemsNum;
                desksmallitemsNum = itemsNum - 1;
                tabletitemsNum = itemsNum - 1;
            }
            else if (itemsNum >= 4 && itemsNum < 8) {
                deskitemsNum = itemsNum -1;
                desksmallitemsNum = itemsNum - 2;
                tabletitemsNum = itemsNum - 3;
            }
            else {
                deskitemsNum = itemsNum -3;
                desksmallitemsNum = itemsNum - 6;
                tabletitemsNum = itemsNum - 8;
            }
            owl.owlCarousel({
                slideSpeed : 300,
                stopOnHover: true,
                autoPlay: true,
                navigation : returnSliderNavigation,
                pagination: false,
                lazyLoad : true,
                items : itemsNum,
                itemsDesktop : [1000,deskitemsNum],
                itemsDesktopSmall : [900,desksmallitemsNum],
                itemsTablet: [600,tabletitemsNum],
                itemsMobile : false,
                transitionStyle : "goDown"
            });
        });
        var carousel=$('.touch-carousel');
        carousel.find('.owl-prev').html('<i class="fa fa-angle-left"></i>');
        carousel.find('.owl-next').html('<i class="fa fa-angle-right"></i>');
	},1000);

	////------- Custom Carousel
	$('.clients-carousel').each(function(){

		var owl = jQuery(this),

			itemsNum = $(this).attr('data-appeared-items'),
			sliderNavigation = $(this).attr('data-navigation'),
            returnSliderNavigation,
            deskitemsNum,
            desksmallitemsNum,
            tabletitemsNum;


		if ( sliderNavigation == 'false' || sliderNavigation == '0' ) {
			returnSliderNavigation = false
		}else {
			returnSliderNavigation = true
		}
		if( itemsNum == 1) {
			deskitemsNum = 1;
			desksmallitemsNum = 1;
			tabletitemsNum = 1;
		}
		else if (itemsNum >= 2 && itemsNum < 4) {
			deskitemsNum = itemsNum;
			desksmallitemsNum = itemsNum - 1;
			tabletitemsNum = itemsNum - 1;
		}
		else if (itemsNum >= 4 && itemsNum < 8) {
			deskitemsNum = itemsNum -1;
			desksmallitemsNum = itemsNum - 2;
			tabletitemsNum = itemsNum - 3;
		}
		else {
			deskitemsNum = itemsNum -3;
			desksmallitemsNum = itemsNum - 6;
			tabletitemsNum = itemsNum - 8;
		}
		owl.owlCarousel({

			slideSpeed : 300,
			stopOnHover: true,
			autoPlay: false,
			navigation : returnSliderNavigation,
			pagination: false,
			lazyLoad : true,
			items : itemsNum,
			itemsDesktop : [1000,deskitemsNum],
			itemsDesktopSmall : [900,desksmallitemsNum],
			itemsTablet: [600,tabletitemsNum],
			itemsMobile : false,
			transitionStyle : "goDown"
		});
	});

    
    
    ////------- Testimonials Carousel
	$(".fullwidth-projects-carousel").owlCarousel({
		navigation : false,
		pagination: false,
		slideSpeed : 400,
		stopOnHover: true,
    	autoPlay: 3000,
    	items : 5,
    	itemsDesktopSmall : [900,3],
		itemsTablet: [600,2],
		itemsMobile : [479, 1]
	});
	
	
	
	
	/*----------------------------------------------------*/
	/*	Tabs
	/*----------------------------------------------------*/
	
	$('#myTab a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});

	
	/*----------------------------------------------------*/
	/*	Css3 Transition
	/*----------------------------------------------------*/
	
	/*$('*').each(function(){
		if($(this).attr('data-animation')) {
			var $animationName = $(this).attr('data-animation'),
				$animationDelay = "delay-"+$(this).attr('data-animation-delay');
			$(this).appear(function() {
				$(this).addClass('animated').addClass($animationName);
				$(this).addClass('animated').addClass($animationDelay);
			});
		}
	});*/
	
	
	
	
	/*----------------------------------------------------*/
	/*	Pie Charts
	/*----------------------------------------------------*/
	
	/*var pieChartClass = 'pieChart',
        pieChartLoadedClass = 'pie-chart-loaded';
		
	function initPieCharts() {
		var chart = $('.' + pieChartClass);
		chart.each(function() {
			$(this).appear(function() {
				var $this = $(this),
					chartBarColor = ($this.data('bar-color')) ? $this.data('bar-color') : "#F54F36",
					chartBarWidth = ($this.data('bar-width')) ? ($this.data('bar-width')) : 150;
				if( !$this.hasClass(pieChartLoadedClass) ) {
					$this.easyPieChart({
						animate: 2000,
						size: chartBarWidth,
						lineWidth: 2,
						scaleColor: false,
						trackColor: "#eee",
						barColor: chartBarColor
					}).addClass(pieChartLoadedClass);
				}
			});
		});
	}
	initPieCharts();*/
	
	
	
	
	
	/*----------------------------------------------------*/
	/*	Animation Progress Bars
	/*----------------------------------------------------*/
	
	$("[data-progress-animation]").each(function() {

		var $this = $(this);

		$this.appear(function() {

			var delay = ($this.attr("data-appear-animation-delay") ? $this.attr("data-appear-animation-delay") : 1);

			if(delay > 1) $this.css("animation-delay", delay + "ms");

			setTimeout(function() { $this.animate({width: $this.attr("data-progress-animation")}, 800);}, delay);

		}, {accX: 0, accY: -50});

	});
	
	
	
	
	
	/*----------------------------------------------------*/
	/*	Milestone Counter
	/*----------------------------------------------------*/
	
	jQuery('.milestone-block').each(function() {
		jQuery(this).appear(function() {
			var $endNum = parseInt(jQuery(this).find('.milestone-number').text());
			jQuery(this).find('.milestone-number').countTo({
				from: 0,
				to: $endNum,
				speed: 4000,
				refreshInterval: 60
			});
		},{accX: 0, accY: 0});
	});
	
	
	
	
	
	/*----------------------------------------------------*/
	/*	Nivo Lightbox
	/*----------------------------------------------------*/
	
	/*$('.lightbox').nivoLightbox({
		effect: 'fadeScale',
		keyboardNav: true,
		errorMessage: 'The requested content cannot be loaded. Please try again later.'
	});*/
	
	
	/*----------------------------------------------------*/
	/*	Change Slider Nav Icons
	/*----------------------------------------------------*/

    touchslider.find('.owl-prev').html('<i class="fa fa-angle-left"></i>');
    touchslider.find('.owl-next').html('<i class="fa fa-angle-right"></i>');

    var carouselcontroll = $('.touch-carousel, .testimonials-carousel');

    carouselcontroll.find('.owl-prev').html('<i class="fa fa-angle-left"></i>');
    carouselcontroll.find('.owl-next').html('<i class="fa fa-angle-right"></i>');
	$('.read-more').append('<i class="fa fa-angle-right"></i>');
	
	
	
	
	/*----------------------------------------------------*/
	/*	Tooltips & Fit Vids & Parallax & Text Animations
	/*----------------------------------------------------*/
	
	/*$("body").fitVids();*/
	
	$('.itl-tooltip').tooltip();
	
	/*$('.bg-parallax').each(function() {
		$(this).parallax("30%", 0.2);
	});*/
	
	/*$('.tlt').textillate({
		loop: true,
		in: {
			effect: 'fadeInUp',
			delayScale: 2,
			delay: 50,
			sync: false,
			shuffle: false,
			reverse: true
		},
		out: {
			effect: 'fadeOutUp',
			delayScale: 2,
			delay: 50,
			sync: false,
			shuffle: false,
			reverse: true
		}
	});*/
	
	
	
	
	
	/*----------------------------------------------------*/
	/*	Sticky Header
	/*----------------------------------------------------*/
	
	(function() {
		
		var docElem = document.documentElement,
			didScroll = false,
			changeHeaderOn = 100;
			document.querySelector( 'header' );
			
		function init() {
			window.addEventListener( 'scroll', function() {
                $(function () {
                    $('input,textarea').blur();
                });
				if( !didScroll ) {
					didScroll = true;
					setTimeout( scrollPage, 250 );
				}
			}, false );
		}
		
		function scrollPage() {
			var sy = scrollY();
			if ( sy >= changeHeaderOn ) {
				$('.top-bar').slideUp(300);
				$("header").addClass("fixed-header");
				$('.navbar-brand').css({ 'padding-top' : 10 + "px", 'padding-bottom' : 10 + "px",'transform':"scale("+0.8+")",'transform-origin':0+" "+0 });

				if (/iPhone|iPod|BlackBerry/i.test(navigator.userAgent) || $(window).width() < 479 ){
					$('.navbar-default .navbar-nav > li > a').css({ 'padding-top' : 0 + "px", 'padding-bottom' : 0 + "px" })
				}else{
					$('.navbar-default .navbar-nav > li > a').css({ 'padding-top' : 20 + "px", 'padding-bottom' : 20 + "px" });
					$('.search-side').css({ 'margin-top' : -7 + "px" });
				}

			}
			else {
				$('.top-bar').slideDown(300);
				$("header").removeClass("fixed-header");
				$('.navbar-brand').css({ 'padding-top' : 9 + "px", 'padding-bottom' : 9 + "px",'transform':"scale("+1+")",'transform-origin':0+" "+0 });

				if (/iPhone|iPod|BlackBerry/i.test(navigator.userAgent) || $(window).width() < 479 ){
					$('.navbar-default .navbar-nav > li > a').css({ 'padding-top' : 0 + "px", 'padding-bottom' : 0 + "px" });
				}else{
					$('.navbar-default .navbar-nav > li > a').css({ 'padding-top' : 28 + "px", 'padding-bottom' : 28 + "px" });
					$('.search-side').css({ 'margin-top' : 0  + "px" });
				}

			}
			didScroll = false;
		}
		
		function scrollY() {
			return window.pageYOffset || docElem.scrollTop;
		}
		
		init();


		
	})();
});




/*----------------------------------------------------*/
/*	Portfolio Isotope
/*----------------------------------------------------*/

/*jQuery(window).load(function(){
	
	var $container = $('#portfolio');
	$container.isotope({
		layoutMode : 'masonry',
		filter: '*',
		animationOptions: {
			duration: 750,
			easing: 'linear',
			queue: false
		}
	});

	$('.portfolio-filter ul a').click(function(){
		var selector = $(this).attr('data-filter');
		$container.isotope({
			filter: selector,
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false
			}
		});
	  return false;
	});

	var $optionSets = $('.portfolio-filter ul'),
	    $optionLinks = $optionSets.find('a');
	$optionLinks.click(function(){
		var $this = $(this);
		if ( $this.hasClass('selected') ) { return false; }
		var $optionSet = $this.parents('.portfolio-filter ul');
		$optionSet.find('.selected').removeClass('selected');
		$this.addClass('selected');
        return "";
	});
	
});*/


/* ----------------- End JS Document ----------------- */


// Styles Switcher JS
function setActiveStyleSheet(title) {
  var i, a, main;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
      a.disabled = true;
      if(a.getAttribute("title") == title) a.disabled = false;
    }
  }
}

function getActiveStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
  }
  return null;
}

function getPreferredStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1
       && a.getAttribute("rel").indexOf("alt") == -1
       && a.getAttribute("title")
       )

        return a.getAttribute("title");
  }
  return null;
}

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

window.onload = function(e) {
  var cookie = readCookie("style");
  var title = cookie ? cookie : getPreferredStyleSheet();
  setActiveStyleSheet(title);
};

window.onunload = function(e) {
  var title = getActiveStyleSheet();
  createCookie("style", title, 365);
};

var cookie = readCookie("style");
var title = cookie ? cookie : getPreferredStyleSheet();
setActiveStyleSheet(title);



$(document).ready(function(){
	
	// Styles Switcher
	$(document).ready(function(){
		$('.open-switcher').click(function(){
            var openswitcher = $('.open-switcher');
			if($(this).hasClass('show-switcher')) {
				$('.switcher-box').css({'left': 0});
                openswitcher.removeClass('show-switcher');
                openswitcher.addClass('hide-switcher');
			}else if(jQuery(this).hasClass('hide-switcher')) {
				$('.switcher-box').css({'left': '-212px'});
                openswitcher.removeClass('hide-switcher');
                openswitcher.addClass('show-switcher');
			}
		});
	});
	
	//Top Bar Switcher
	$(".topbar-style").change(function(){
        var topbar=$(".top-bar");
		if( $(this).val() == 1){
            topbar.removeClass("dark-bar");
            topbar.removeClass("color-bar");
			$(window).resize();
		} else if( $(this).val() == 2){
            topbar.removeClass("color-bar");
            topbar.addClass("dark-bar");
			$(window).resize();
		} else if( $(this).val() == 3){
            topbar.removeClass("dark-bar");
            topbar.addClass("color-bar");
			$(window).resize();
		}
	});
	
	//Layout Switcher
	$(".layout-style").change(function(){
		if( $(this).val() == 1){
			$("#container").removeClass("boxed-page");
			$(window).resize();
		} else{
			$("#container").addClass("boxed-page");
			$(window).resize();
		}
	});
	
	//Background Switcher
	$('.switcher-box .bg-list li a').click(function() {
		var current = $('.switcher-box select[id=layout-style]').find('option:selected').val();
		if(current == '2') {
			var bg = $(this).css("backgroundImage");
			$("body").css("backgroundImage",bg);
		} else {
			alert('Please select boxed layout');
		}
	});

});