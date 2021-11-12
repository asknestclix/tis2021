let videoList = null;

const loadAPI = () => {
    $.getJSON( "http://167.172.52.246:1337/help-video-lists", function( data ) {
        videoList = data;
    }).done(()=>{
        loadVideoItems();
    });
    
}


const generateTemplate = (itemString, sec, idx) => {
    return "<div class='videoItem wow fadeInRight' onClick='showModal(" + idx + ");' data-wow-delay='" + sec + "s'>" + itemString + "</div>";
}

const loadVideoItems = () => {
    let itemList = "";
    videoList.forEach((el,index) => {
       let sec = index/10;
       itemList += generateTemplate(el.Title, sec,index);
    });

    document.getElementById("videoContainer").innerHTML = itemList;
}

const showModal = (idx) => {
    $('.modal').addClass('open');
    $('body').addClass('noScroll');
    if ($('.modal').hasClass('open')) {
      $('.cont2').addClass('blur');
    }
    document.getElementById("videoFrame").src = videoList[idx].YoutubeLink;
}
$('.close').click(function () {
    $('.modal').removeClass('open');
    $('.cont2').removeClass('blur');
    $('body').removeClass('noScroll');
    document.getElementById("videoFrame").src = "about:blank";
    
});




window.onload = loadAPI();