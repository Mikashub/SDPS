$(function() {
  "use strict"; // "best practice"
/*
  window.onbeforeunload = function () {
    window.scrollTo(0, 0); // scroll page to top when reloading
  }
*/
  var topoffset = 50; // pixels to offset from top when calculating position of scroll
  
  //Activate Scrollspy
  $('body').scrollspy({
    target: '#sitenav',
    offset: topoffset
  });
  
  toggleNavbar(); // run when page (re)loads, as well

  $(window).on('activate.bs.scrollspy', function () {
    toggleNavbar();
  });

  function toggleNavbar() {
    var hash = $('#sitenav').find('li a.active').attr('href');
    if(hash !== '#naslovna') {
      $('#sitenav').addClass('minnav');
    } else {
      $('#sitenav').removeClass('minnav');
    }
  }

});