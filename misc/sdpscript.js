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

  $(window).on('resize', function() {
    // var csval = $('#trwfx').attr('colspan');
    if(this.innerWidth < 480) {
      // console.log(csval);
      $('#trwfx').attr('colspan', '4');
    } else {
      $('#trwfx').attr('colspan', '6');
    }
  }).resize(); // fires on load as well

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
          scrollTop: target.offset().top-topoffset+3
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

  // Language switching
  $('.lang-menu a').on('click', function(e) {
    e.preventDefault();
    // console.log('Srpski / English');
    $('.notices').fadeIn();
    $.when(
      $('#sempow p').empty().html('<br>English version will<br>be available soon...').delay(5000)
    ).then(function() {
      $('.notices').fadeOut();
      $('#sempow p').empty();        
    });
  });

  // encoded & reversed strings
  const mta = '==gOvRHbpFWb'; // mailto:
  const atadr = '==AQlNWamZ2b'; // office@

  $('#emla').on('click', function(e) {
    e.preventDefault();
    // console.log(this);
    var ctm = eml(this, atadr);
    // append text with links to the send-email pop-out window
    $( $.parseHTML('<a href="' + mtla(mta, ctm) 
    +'" class="d-block"><i class="fa fa-envelope-o" aria-hidden="true"></i>'
    +'Kontaktirajte nas</a>koristeći vašu omiljenu<br>email aplikaciju<br>ili&nbsp;'
    +'<a href="#"><i class="fa fa-copy" aria-hidden="true">&nbsp;</i>prekopirajte</a><br>'
    +'našu kontakt adresu<br><input id="ctcb" type="text" value="'+ ctm 
    +'" size="10"/> u webmail') ).appendTo('#sempow p');
    $('.notices').fadeIn();
  });

  $('#sempow p').on('click', 'a', function(e) {
  // static parent 'p' ---> dynamic 'a' element 
    if( $(this).attr('href') == '#' ) {
      e.preventDefault();
      // copy email address to clipboard
      var ctcb = document.querySelector('#ctcb');
      ctcb.select();
      document.execCommand('copy');
      // alert('email kopiran');
      $.when(
        $('#sempow p').empty().html('<br>E-mail adresa<br>je prekopirana!').delay(2000)
      ).then(function() {
        $('.notices').fadeOut();
        $('#sempow p').empty();        
      });
    } else {
      $('.notices').fadeOut();
      $('#sempow p').empty();
    }
  });

  $('#sempow .close').on('click', function() {
    $('.notices').fadeOut();
    $('#sempow p').empty();
  });

  function rvr(enca) { // reverse (encoded) string function
    for (var b = "", c = enca.length - 1; c >= 0; c--) 
    b += enca[c];
    return atob(b);
  }
  
  function eml(a, atadr) {
    var cdn = a.getAttribute("data-cnm") + '.rs'; // company domain name + top level domain
    return rvr(atadr) + cdn;
  }

  function mtla(mta, ctm) {
    return rvr(mta) + ctm;
  }
  
  /*
  document.addEventListener("DOMContentLoaded", function () {
    var a = document.getElementById("emla"); // html anchor element
    a.textContent = rvr("=A0bm5Wa") + a.textContent;
  }, !1);
  */

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