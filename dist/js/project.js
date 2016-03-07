$(function () {
  function fixMenu() {
    var startPos = 0;
    $(window).scroll(function () {
      var curPos = $(this).scrollTop(),
        wrapper = $('.wrapper'),
          header = $('.js-header');
          if (curPos == 0) {
            header.removeClass('scrolled').css({
              'position': 'relative',
              'top': '0'
            });         
            wrapper.css({
              'margin-top' : '0'
            });
          } else if (curPos < startPos) {
            var topOffset = header.offset().top,
              headerHeight = header.innerHeight();
              if (curPos - topOffset > headerHeight) {
                var headerPos = curPos - headerHeight;
                header.addClass('scrolled').css({
                  'position': 'absolute',
                  'top': headerPos + 'px'
                });
                wrapper.css({
                  'margin-top' : header.outerHeight(true)
                });
              } else if (curPos < topOffset) {
                header.addClass('scrolled').css({
                  'top': curPos
                });
              }
          }
          startPos = curPos;
    });
  }

  function goToTop() {
    var topOfs = $(".toTop").offset().top;
    var myScreen = $(window).height();
    if( myScreen < topOfs ) {
      $(".toTop").fadeTo(0,0.8);
    }
    
    $(window).scroll(function () { 
      var topScreen = $(window).scrollTop();
      if(topScreen > (myScreen / 2)) {
        $(".toTop").fadeTo(0, 0.8);
      }
      else {
        $(".toTop").fadeTo(0, 0);
      }
      $(".toTop").blur();
    });
  }

  $(document).ready(function () {
    fixMenu();
    goToTop();
    $(".toTop").click(function() {
			$("html, body").animate({"scrollTop": "0"}, "800");
		});
    $(".category").fancybox({type: 'ajax'});
  });
}); 
