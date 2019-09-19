$(function() {
  "use strict"; // "best practice"

  window.onbeforeunload = function () {
    window.scrollTo(0, 0); // scroll page to top when reloading
  }

  var topoffset = 50; // pixels to offset from top when calculating position of scroll
  
  // Activate Scrollspy
  $('body').scrollspy({
    target: '#sitenav',
    offset: topoffset
  });
  
  toggleNavbar(); // run when page (re)loads, as well

  $(window).on('activate.bs.scrollspy', function () {
    toggleNavbar();
  });

  // Set article min-height if it contains an image
  $('#proizvodi article').each(function(){
    if ( $(this).has('img') ) {
      var imgh = $('img', this).height();
      $(this).css('min-height', Math.round(imgh * 1.4) );
    }
  });


  // Use smooth scrolling when clicking on navigation
  $('.nav-link').on('click', function() {
    if (location.pathname.replace(/^\//,'') === 
      this.pathname.replace(/^\//,'') && 
      location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top-topoffset+2
        }, 500);
        $('#navbar-dropdown').removeClass('show'); // hide mobile menu when item is selected
        return false;
      } //target.length
    } //click function
  }); //smooth scrolling

  // Scroll smoothly to the selected section
  $('.scroll2section').on('click', function(e) {
    e.preventDefault();
    var section = this.getAttribute('href');
    var secpos = $(section).offset().top;
    $('html, body').animate({
      scrollTop: secpos-topoffset+2
    }, 500);
  });

  // Scroll smoothly to top of the page
  $('.scroll2top').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop: 0}, 500);
  });

  $('#emlform').on('submit', function(e) {
    e.preventDefault();
    console.log('form submitted');
  });

  function toggleNavbar() {
    var hash = $('#sitenav').find('li a.active').attr('href');
    // console.log(hash);
    if(hash !== '#naslovna') {
      $('#sitenav').addClass('minnav');
      $('#arrowup').fadeIn();
    } else {
      $('#sitenav').removeClass('minnav');
      $('#arrowup').fadeOut();
    }
  }

});