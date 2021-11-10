const showModal = () => {
    
    $('.modal').addClass('open');

    if ($('.modal').hasClass('open')) {
      $('#home').addClass('blur');
    }


}
const showModal2 = () => {
    
  $('.modal2').addClass('open');

  if ($('.modal2').hasClass('open')) {
    $('#home').addClass('blur');
  }


}
$('#q1').click(function () {
    
    showModal();
    
});
$('#grades').click(function () {
    debugger;
  showModal2();
  
});

$('.close').click(function () {
    $('.modal').removeClass('open');
    $('#home').removeClass('blur');

    
  });