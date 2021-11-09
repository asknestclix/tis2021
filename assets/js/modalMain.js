const showModal = () => {
    
    $('.modal').addClass('open');

    if ($('.modal').hasClass('open')) {
      $('#home').addClass('blur');
    }


}

$('#q1').click(function () {
    
    showModal();
    
});

$('.close').click(function () {
    $('.modal').removeClass('open');
    $('#home').removeClass('blur');

    
  });