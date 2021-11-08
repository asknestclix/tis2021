$(function () {

  const hideAll = () => {
    //hide all content first
    $('#content1').removeClass('showContent');
    $('#content2').removeClass('showContent');
    $('#content3').removeClass('showContent');
    $('#content4').removeClass('showContent');
    $('#content5').removeClass('showContent');
    $('#content6').removeClass('showContent');

    $('#content1').addClass('hideContent');
    $('#content2').addClass('hideContent');
    $('#content3').addClass('hideContent');
    $('#content4').addClass('hideContent');
    $('#content5').addClass('hideContent');
    $('#content6').addClass('hideContent');
  }

  const showModal = () => {
    hideAll();

    $('.modal').addClass('open');

    if ($('.modal').hasClass('open')) {
      $('.cont').addClass('blur');
    }
  }
  $('#op1').click(function () {
    hideAll();
    showModal();
    $('#content1').addClass('showContent');
  });

  $('#op2').click(function () {
    hideAll();
    showModal();
    $('#content2').addClass('showContent');
  });
  $('#op3').click(function () {
    showModal();
    hideAll();
    $('#content3').addClass('showContent');
  });
  $('#op4').click(function () {
    showModal();
    hideAll();
    $('#content4').addClass('showContent');
  });
  $('#op5').click(function () {
    showModal();
    hideAll();
    $('#content5').addClass('showContent');
  });
  $('#op6').click(function () {
    showModal();
    hideAll();
    $('#content6').addClass('showContent');
  });
  $('.close').click(function () {
    $('.modal').removeClass('open');
    $('.cont').removeClass('blur');

    
  });
});