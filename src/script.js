// header change on scroll
$(window).on('scroll', function(){
  var scroll = $(window).scrollTop();
  var bannerHeight = $('.banner').height();
  if (scroll >= bannerHeight/2) {
    $('.scrolled').addClass("show");
    $('.header').removeClass("show");
  } else {
    $('.scrolled').removeClass("show");
    $('.header').addClass("show");
  }
});

//header text click to scroll to top
$('.homeTitle').on('click', function() {
  $('html, body').animate({
        scrollTop: $('.banner').offset().top
    }, 300);
});

//date count
var firstday = new Date(2016, 3, 26); // April 26, 2016 javascript month : 0-11
var today = new Date();
var difference_ms = today - firstday;
var difference = parseInt(difference_ms/(1000*60*60*24)) + 1; // count from day 0
$('.dateCount').html(difference);

//banner autoslide
setInterval(function(){
  $('.banner').toggleClass('slideshow');
}, 5000);

//adding photos to GALLERY
var used_portrait =[];
for (var i=1; i<=25; i++) {
  //random orders
  var ran=Math.floor(Math.random()*25)+1;
  while (used_portrait.indexOf(ran) !== -1) {
    ran = Math.floor(Math.random()*25)+1;
  };
  used_portrait.push(ran);
  $('.slides.portrait').append("<img src='assets/photos/portrait/portrait ("+ran+").jpg' alt='' class='slide portrait' draggable='false'>");
  $('.thumbnailWrapper.portrait').append("<img src='assets/photos/portrait/portrait ("+ran+").jpg' alt='' class='thumbnail portrait' id='"+ran+"' draggable='false'>");
  $('.album.portrait').append("<img src='assets/photos/portrait/portrait ("+ran+").jpg' alt='' draggable='false'>");
};

var used_landscape =[];
for (var i=1; i<=4; i++) {
  //random orders
  var ran=Math.floor(Math.random()*4)+1;
  while (used_landscape.indexOf(ran) !== -1) {
    ran = Math.floor(Math.random()*4)+1;
  };
  used_landscape.push(ran);
  $('.slides.landscape').append("<img src='assets/photos/landscape/landscape ("+ran+").jpg' alt='' class='slide landscape' draggable='false'>");
  $('.thumbnailWrapper.landscape').append("<img src='assets/photos/landscape/landscape ("+ran+").jpg' alt='' class='thumbnail landscape' id='"+ran+"' draggable='false'>");
  $('.album.landscape').append("<img src='assets/photos/landscape/landscape ("+ran+").jpg' alt='' draggable='false'>");
};


//albums
var portraitInterval, landscapeInterval;
var portraitImage = 1;
var landscapeImage =1;
var width, slide, total, currentSlide, currentThumbnail;
var current = {
  portrait : false,
  landscape : false,
};

$('.albumContainer.portrait').on('mouseenter', function(){
  if (portraitImage === 1) {
    $('.album.portrait>img:first-child').addClass("show");
  }
  portraitInterval = setInterval(function(){
    portraitImage++;
    if (portraitImage > used_portrait.length) {
      portraitImage = 1;
    };
    $('.album.portrait>img').removeClass('show');
    $('.album.portrait>img:nth-child('+portraitImage+')').addClass('show');
  }, 2000);
});

$('.albumContainer.portrait').on('mouseleave', function() {
  portraitImage = 1;
  $('.album.portrait>img').removeClass('show');
  clearInterval(portraitInterval);
});

$('.albumContainer.portrait').on('click', function() {
  if(!current.portrait) {
    $('.slide').removeClass('active');
    $('.thumbnail').removeClass('active');
    $('.album.portrait>img:first-child').addClass("current");
    $('.album.landscape>img:first-child').removeClass("current");
    $('.landscapeAlbum').fadeOut("fast", function() {
      $('.slides').css({"transform":"translateX(0px)"});
      $('.portraitAlbum').fadeIn("slow");
      width = $('.slide.portrait').width();
      slide = 1;
      total = $('.slide.portrait').length;
      currentSlide = $('.slide.portrait:nth-child('+slide+')');
      currentSlide.addClass('active')
      currentThumbnail = $('.thumbnail.portrait:first-child');
      currentThumbnail.addClass('active');
      $('html, body').animate({
            scrollTop: $('.portraitAlbum').offset().top
        }, 500);
    });
    current.portrait = true;
    current.landscape = false;
  } else {
    $('html, body').animate({
          scrollTop: $('.portraitAlbum').offset().top
      }, 500);
  }
});

$('.albumContainer.landscape').on('mouseenter', function(){
  if (landscapeImage === 1) {
    $('.album.landscape>img:first-child').addClass("show");
  }
  landscapeInterval = setInterval(function(){
    landscapeImage++;
    if (landscapeImage > used_landscape.length) {
      landscapeImage = 1;
    };
    $('.album.landscape>img').removeClass('show');
    $('.album.landscape>img:nth-child('+landscapeImage+')').addClass('show');
  }, 2000);
});

$('.albumContainer.landscape').on('mouseleave', function() {
  landscapeImage = 1;
  $('.album.landscape>img').removeClass('show');
  clearInterval(landscapeInterval);
});

$('.albumContainer.landscape').on('click', function() {
  if (!current.landscape) {
    $('.slide').removeClass('active');
    $('.thumbnail').removeClass('active');
    $('.album.landscape>img:first-child').addClass("current");
    $('.album.portrait>img:first-child').removeClass("current");
    $('.portraitAlbum').fadeOut("fast", function() {
      $('.slides').css({"transform":"translateX(0px)"});
      $('.landscapeAlbum').fadeIn("slow");
      width = $('.slide.landscape').width();
      slide = 1;
      total = $('.slide.landscape').length;
      currentSlide = $('.slide.landscape:nth-child('+slide+')');
      currentSlide.addClass('active')
      currentThumbnail = $('.thumbnail.landscape:first-child');
      currentThumbnail.addClass('active');
      $('html, body').animate({
            scrollTop: $('.landscapeAlbum').offset().top
        }, 500);
    });
    current.landscape = true;
    current.portrait = false;
  } else {
    $('html, body').animate({
          scrollTop: $('.landscapeAlbum').offset().top
      }, 500);
  }
});


//right click
$('.right').on('click', function(){
  slide++;
  if (slide <= total) {
    // $('.slide.active').css({"transform": "rotateY(-60deg)"});
    currentSlide.removeClass('active');
    currentThumbnail.removeClass('active');
    currentSlide = $('.slide:nth-child('+slide+')');
    currentThumbnail = $('.thumbnail:nth-child('+slide+')');
    currentSlide.addClass('active');
    currentThumbnail.addClass('active');
    $('.slides').css({"transform":"translateX(-"+(width*(slide-1))+"px)"});
  } else {
    currentSlide.removeClass('active');
    currentThumbnail.removeClass('active');
    slide = 1;
    currentSlide = $('.slide:nth-child('+slide+')');
    currentThumbnail = $('.thumbnail:nth-child('+slide+')');
    currentSlide.addClass('active');
    currentThumbnail.addClass('active');
    $('.slides').css({"transform": "translateX("+(width/total)+"px)"});
  }
});
$('.slideWrapper').on('swipeleft', function() {
  slide++;
  if (slide <= total) {
    // $('.slide.active').css({"transform": "rotateY(-60deg)"});
    currentSlide.removeClass('active');
    currentThumbnail.removeClass('active');
    currentSlide = $('.slide:nth-child('+slide+')');
    currentThumbnail = $('.thumbnail:nth-child('+slide+')');
    currentSlide.addClass('active');
    currentThumbnail.addClass('active');
    $('.slides').css({"transform":"translateX(-"+(width*(slide-1))+"px)"});
  } else {
    currentSlide.removeClass('active');
    currentThumbnail.removeClass('active');
    slide = 1;
    currentSlide = $('.slide:nth-child('+slide+')');
    currentThumbnail = $('.thumbnail:nth-child('+slide+')');
    currentSlide.addClass('active');
    currentThumbnail.addClass('active');
    $('.slides').css({"transform": "translateX("+(width/total)+"px)"});
  }
});

//left click
$('.left').on('click', function(){
  slide--;
  if (slide > 0) {
    currentSlide.removeClass('active');
    currentThumbnail.removeClass('active');
    currentSlide = $('.slide:nth-child('+slide+')');
    currentThumbnail = $('.thumbnail:nth-child('+slide+')');
    currentSlide.addClass('active');
    currentThumbnail.addClass('active');
    $('.slides').css({"transform":"translateX(-"+ (width*(slide-1))+"px)"});
  } else {
    currentSlide.removeClass('active');
    currentThumbnail.removeClass('active');
    slide = total;
    currentSlide = $('.slide:nth-child('+slide+')');
    currentThumbnail = $('.thumbnail:nth-child('+slide+')');
    currentSlide.addClass('active');
    currentThumbnail.addClass('active');
    $('.slides').css({"transform": "translateX(-"+(width*(total-1))+"px)"});
  }
});
$('.slideWrapper').on('swiperight', function() {
  slide--;
  if (slide > 0) {
    currentSlide.removeClass('active');
    currentThumbnail.removeClass('active');
    currentSlide = $('.slide:nth-child('+slide+')');
    currentThumbnail = $('.thumbnail:nth-child('+slide+')');
    currentSlide.addClass('active');
    currentThumbnail.addClass('active');
    $('.slides').css({"transform":"translateX(-"+ (width*(slide-1))+"px)"});
  } else {
    currentSlide.removeClass('active');
    currentThumbnail.removeClass('active');
    slide = total;
    currentSlide = $('.slide:nth-child('+slide+')');
    currentThumbnail = $('.thumbnail:nth-child('+slide+')');
    currentSlide.addClass('active');
    currentThumbnail.addClass('active');
    $('.slides').css({"transform": "translateX(-"+(width*(total-1))+"px)"});
  }
});

//thumbnail click
$('.thumbnail.portrait').on('click', function() {
  var photoID = parseInt(this.id);
  slide = used_portrait.indexOf(photoID)+1;
  currentSlide.removeClass('active');
  currentThumbnail.removeClass('active');
  currentSlide = $('.slide:nth-child('+slide+')');
  currentThumbnail = $('.thumbnail:nth-child('+slide+')');
  currentSlide.addClass('active');
  currentThumbnail.addClass('active');
  $('.slides').css({"transform": "translateX(-"+(width*(slide-1))+"px)"});
  $('html, body').animate({
        scrollTop: $('.slideWrapper.portrait').offset().top - 100
    }, 500);
});

$('.thumbnail.landscape').on('click', function() {
  var photoID = parseInt(this.id);
  slide = used_landscape.indexOf(photoID)+1;
  currentSlide.removeClass('active');
  currentThumbnail.removeClass('active');
  currentSlide = $('.slide:nth-child('+slide+')');
  currentThumbnail = $('.thumbnail:nth-child('+slide+')');
  currentSlide.addClass('active');
  currentThumbnail.addClass('active');
  $('.slides').css({"transform": "translateX(-"+(width*(slide-1))+"px)"});
  $('html, body').animate({
        scrollTop: $('.slideWrapper.landscape').offset().top - 100
    }, 500);
});


$('.slide').on('click', function(e) {
  var URL = e.target.src;
  // console.log(URL);
  $('.loadingLogo').css({"background": "rgba(0,0,0,1) url('"+URL+"')   no-repeat center center", "background-size": "contain"});
  $('.loadingLogo').fadeIn("fast");
  $('body').css({"overflow-y":"hidden"});
  $('.loadingLogo').on('click', function() {
    $('.loadingLogo').fadeOut("fast");
    $('body').css({"overflow-y":"auto"});
  })
});
