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
        const list = document.querySelector(".gridz");
        const listItems = list.querySelectorAll("li");
        const ajaxLoadMoreBtn = document.querySelector(".ajax-load-more");
        
        let k = 6;
        let j = 10;
        
        ajaxLoadMoreBtn.addEventListener("click", function () {
        let range = `li:nth-child(n+${k}):nth-child(-n+${j})`;
        list
            .querySelectorAll(range)
            .forEach((elem) => (elem.style.display = "block"));
        
        if (listItems.length <= j) {
            this.remove();
        } else {
            k += 5;
            j += 5;
        }
        });
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error(textStatus);
    });
    
}


const generateTemplate = (thumbnail, title, desc, sec, galleryMacro) => {
    if (thumbnail != undefined) {
        /*
        return "<div class='col-lg-3 col-md-4 col-xs-12 wow fadeInRight' data-wow-delay='" + sec + "'>" +
        "<div class='imageItem' style='background:url(https://tis-cms.com" + thumbnail + ")'>" +
        "<div style='position:absolute; height:70px; width:90%;top:30px;background:rgba(255,255,255,0.8) center center no-repeat; background-size:cover; padding:15px'>" +
        "<h6>" + title  + "</h6></div></div></div>";
        */
       
        return "<li style='background-image:url(https://tis-cms.com" + thumbnail + ")'><a href='#' onClick='showGallery(" + JSON.stringify(galleryMacro) + ");'><div><h4>" + title + "</h4></div></a></li>";
        //return '<li style="background-image: url(https://tis-cms.com"' + thumbnail + ')"></li>';
    } else {
        return "";
    }
    
    
}

const showGallery =(macro) => {
    
    document.getElementById('galleryFrame').src = "../gallery.html?id=";
    
    $('.modal5').addClass('open');
  
    if ($('.modal5').hasClass('open')) {
      $('#home').addClass('blur');
      $('#cont').addClass('blur');
      $('.cont2').addClass('blur');
      $('body').addClass('noScroll');
      
    }
}
const createImageList = () => {
    let itemList = "<ul class='gridz'>";
    imageList.forEach((el,index) => {
       let sec = index/10;
       itemList += generateTemplate(el.thumbnail.url, el.GalleryTitle ? el.GalleryTitle : "", el.Description ? el.description :"", el.sec,el.gallery_list);
    });
    itemList += "</ul>";
    document.getElementById("galleryContainer").innerHTML = itemList;
    console.error(imageList);
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