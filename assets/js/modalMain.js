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
$('#q1').click(function () {
    
  showModalMain();
    
});
$('#grades').click(function () {

  showModal2();
  
});

$('.close').click(function () {
    $('.modal').removeClass('open');
    $('.modal2').removeClass('open');
    $('#home').removeClass('blur');
    $('#cont').removeClass('blur');
    $('.cont2').removeClass('blur');
    $('body').removeClass('noScroll');
    
  });