const showModalMain = () => {
    
    $('.modal').addClass('open');

    if ($('.modal').hasClass('open')) {
      $('#home').addClass('blur');
      $('body').addClass('noScroll');
    }


}
const showModal2 = () => {
    
  $('.modal2').addClass('open');

  if ($('.modal2').hasClass('open')) {
    $('#home').addClass('blur');
    $('#cont').addClass('blur');
    $('.cont2').addClass('blur');
    $('body').addClass('noScroll');
    
  }


}
const showModal3 = () => {
  
  $('.modal3').addClass('open');

  if ($('.modal3').hasClass('open')) {
    $('#home').addClass('blur');
    $('#cont').addClass('blur');
    $('.cont2').addClass('blur');
    $('body').addClass('noScroll');
    
  }


}
const showModal4 = () => {
  
  $('.modal4').addClass('open');

  if ($('.modal4').hasClass('open')) {
    $('#home').addClass('blur');
    $('#cont').addClass('blur');
    $('.cont2').addClass('blur');
    $('body').addClass('noScroll');
    
  }
}

const showModalGeneral = () => {
  
  $('.modalGeneral').addClass('open');

  if ($('.modalGeneral').hasClass('open')) {
    $('#home').addClass('blur');
    $('#cont').addClass('blur');
    $('.cont2').addClass('blur');
    $('body').addClass('noScroll');
  }
}

$('#q1').click(function () {
    
  showModalMain();
    
});
$('#grades').click(function () {

  showModal2();
  
});
$('#addy').click(function () {

  showModal3();
  
});
$('#addy2').click(function () {

  showModal3();
  
});
$('#onlineReg').click(function () {
  showModal4();
  
});
$('#onlineReg2').click(function () {
  showModal4();
  
});

$('#onlineRegSC').click(function () {
  debugger;
  showModal4();
  
});
$('#messageGeneral').click(function () {
  showModalGeneral();
});


$('.close').click(function () {
    $('.modal').removeClass('open');
    $('.modal2').removeClass('open');
    $('.modal3').removeClass('open');
    $('.modal4').removeClass('open');
    $('.modal5').removeClass('open');
    $('.modalGeneral').removeClass('open');
    $('#home').removeClass('blur');
    $('#cont').removeClass('blur');
    $('.cont2').removeClass('blur');
    $('body').removeClass('noScroll');
    
  });

  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('func');

  if (myParam === "opengrades"){
    showModal2();
  }
