let imageList = null;

const loadImageAPI = () => {
    /*
    $.ajax(
        {
            url: "http://tischools.cc/Node2JSON?id=1153&select=children&properties=description,pageTitle,activityThumbnail,galleryMacro",
            dataType: "text",
            success : function (response) {
                var rp = response.replaceAll("<?UMBRACO_MACRO imagefolder=\"", "").replaceAll("\" macroAlias=\"DisplayImages\" />","");
                var toS = JSON.stringify(rp);
                imageList = JSON.parse(rp);
                debugger;
                createImageList();
            }
        }
    )
    */
    
    $.getJSON( "https://tis-cms.com/galleries", function( data ) {
        imageList = data;
    }).done(()=>{
        createImageList();
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error(textStatus);
    });
    
}


const generateTemplate = (thumbnail, title, desc, sec, galleryMacro) => {
    if (thumbnail != undefined) {
        return "<div class='col-lg-3 col-md-3 col-md-4 col-xs-12 wow fadeInRight' data-wow-delay='" + sec + "'>" +
        "<div class='imageItem' style='background:url(https://tis-cms.com" + thumbnail + ")'>" +
        "<div style='position:absolute; height:70px; width:90%;top:30px;background:rgba(255,255,255,0.8) center center no-repeat; background-size:cover; padding:15px'>" +
        "<h6>" + title  + "</h6></div></div></div>";
    } else {
        return "";
    }
    
    
}

const createImageList = () => {
    debugger;
    let itemList = "";
    imageList.forEach((el,index) => {
       let sec = index/10;
       itemList += generateTemplate(el.thumbnail.url, el.GalleryTitle ? el.GalleryTitle : "", el.Description ? el.description :"", el.sec,el.gallery_list);
    });
    debugger;
    document.getElementById("galleryContainer").innerHTML = itemList;
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




window.onload = loadImageAPI();