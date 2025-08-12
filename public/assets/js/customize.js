document.addEventListener("DOMContentLoaded", function(){
  window.addEventListener('scroll', function() {
      if (window.scrollY > 150) {
        document.getElementById('navbar_top').classList.add('fixed-top');
        // add padding top to show content behind navbar
        navbar_height = document.querySelector('.navbar').offsetHeight;
        document.body.style.paddingTop = navbar_height + 'px';
      } else {
        document.getElementById('navbar_top').classList.remove('fixed-top');
         // remove padding top from body
        document.body.style.paddingTop = '0';
      } 
  });
}); 
// Navbar Sticky End

// Parallax //
(function($) {
  var parallax = -0.2;

  var $bg_images = $(".wp-block-cover-image");
  var offset_tops = [];
  $bg_images.each(function(i, el) {
    offset_tops.push($(el).offset().top);
  });

  $(window).scroll(function() {
    var dy = $(this).scrollTop();
    $bg_images.each(function(i, el) {
      var ot = offset_tops[i];
      $(el).css("background-position", "50% " + (dy - ot) * parallax + "px");
    });
  });
})(jQuery);

//-------------//

// function openCity(evt, cityName) {
//   var i, stepcontent, step;
//   tabcontent = document.getElementsByClassName("stepcontent");
//   for (i = 0; i < tabcontent.length; i++) {
//     tabcontent[i].style.display = "none";
//   }
//   tablinks = document.getElementsByClassName("step");
//   for (i = 0; i < tablinks.length; i++) {
//     tablinks[i].className = tablinks[i].className.replace(" active", "");
//   }
//   document.getElementById(cityName).style.display = "block";
//   evt.currentTarget.className += " active";
// }

//===========//

	$(document).ready(function() {
	// jQuery code

	//////////////////////// Prevent closing from click inside dropdown
    $(document).on('click', '.dropdown-menu', function (e) {
      e.stopPropagation();
    });

    // make it as accordion for smaller screens
    if ($(window).width() < 992) {
	  	$('.dropdown-menu a').click(function(e){
	  		e.preventDefault();
	        if($(this).next('.submenu').length){
	        	$(this).next('.submenu').toggle();
	        }
	        $('.dropdown').on('hide.bs.dropdown', function () {
			   $(this).find('.submenu').hide();
			})
	  	});
	}
	
});

$('.dropdown').on('show.bs.dropdown', function(e){
  $(this).find('.dropdown-menu').first().stop(true, true).slideDown(100);
});

$('.dropdown').on('hide.bs.dropdown', function(e){
  $(this).find('.dropdown-menu').first().stop(true, true).slideUp(100);
});

// Account Toggle //

$(document).ready(function () {
    $("#account-toggle").on("click", function () {
        $(".menu-items").slideToggle();
		$(".menu-items").toggleClass('active');
    });
});



