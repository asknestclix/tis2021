const videoList =[
    {title:"دليل تفعيل التعلم عنبعد للمرحلتين المتوسطة و الثانوية", url:"https://www.youtube.com/embed/veHSTgUxD7Y"},
    {title:"دليل الطلاب في التعلم عنبعد للمرحلة الإبتدائية", url:"https://www.youtube.com/embed/yfLIGgap1Ro"},
    {title:"خاصية التحقق بالوجه في كلاسيرا", url:"https:///www.youtube.com/embed/P60FnTHi1Tw"},
    {title:"How to use Pearson", url:"https://www.youtube.com/embed/xTE4XgE-ik0"},
    {title:"طريقة الدخول علىالبريد الالكتروني الخاص بالمدارس", url:"https://www.youtube.com/embed/1ikbDB1myLs"},
    {title:"كيفية استخدام حساب بيرسونبكفاءة", url:"https://www.youtube.com/embed/OdeJD2uSLUI"},
    {title:"طريقة تفعيل البريد الإلكترونيللدخول إلى كلاسيرا", url:"https://www.youtube.com/embed/g0SthH1BDqc"},
    {title:"طريقة تعريف الوجه علىكلاسيرا", url:"https://www.youtube.com/embed/78caCBl-HXs"},
    {title:"فيديو تعليمي عن كيفيةعدم تغيير الإجابة", url:"https://www.youtube.com/embed/uqYsfsb2sWk"}
];

const generateTemplate = (itemString, sec, idx) => {
    return "<div class='videoItem wow fadeInRight' onClick='showModal(" + idx + ");' data-wow-delay='" + sec + "s'>" + itemString + "</div>";
}

const loadVideoItems = () => {
    let itemList = "";
    videoList.forEach((el,index) => {
       let sec = index/10;
       itemList += generateTemplate(el.title, sec,index);
    });

    document.getElementById("videoContainer").innerHTML = itemList;
}

const showModal = (idx) => {
    $('.modal').addClass('open');

    if ($('.modal').hasClass('open')) {
      $('.cont2').addClass('blur');
    }
    document.getElementById("videoFrame").src = videoList[idx].url;
}
$('.close').click(function () {
    $('.modal').removeClass('open');
    $('.cont2').removeClass('blur');

    document.getElementById("videoFrame").src = "about:blank";
    
});


loadVideoItems();