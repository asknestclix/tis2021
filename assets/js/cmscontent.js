var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};

let contentList = null;
let contentSubCats = null;
let contentPrograms = null;

let apiURI = "http://167.172.52.246:1337";

const loadAPI = (pageName) => {
    $('body').toggleClass('loading');
    $.getJSON( apiURI+ "/home-page-contents", function( data ) {
        contentList = data;
    }).done(()=>{
        $.getJSON( apiURI + "/home-page-sub-categories", function( data ) {
            contentSubCats = data;
        }).done(()=>{

            $.getJSON( apiURI + "/enrichment-programs", function( data ) {
                contentPrograms = data;
                }).done(()=>{
                    switch (pageName) {
                        case "Home" : loadHomeContent(); break;
                        case "About" : loadAboutContent(); break;
                        case "EduStages" : loadEduStages(); break;
                        case "Programs": loadPrograms(); break;
                    }
                    $('body').toggleClass('loading');
                });
        });
    });
    
}

function getContent(tag) {
    return contentList.find(o => o.Tag === tag);
}
function getSubCats(tag) {
    let obj =  contentSubCats.filter(o => {
        if (o.home_page_content) {
            return o.home_page_content.Tag === tag;
        }
    });
    return obj;
}
$('.close').click(function () {
    $('.modal').removeClass('open');
    $('#home').removeClass('blur');
    $('body').removeClass('noScroll');
    
});
function updateProgramModel(el) {
    $('.modal').addClass('open');
    if ($('.modal').hasClass('open')) {
        $('#home').addClass('blur');
        $('body').addClass('noScroll');
      }
    $('#modalContent').removeClass('hideContent');
    let cont = JSON.parse(Base64.decode(el))

    if (cont.Image) {
        $("#modalImage")[0].src = apiURI + cont.Image.url;
        $("#modalImage")[0].style.display = "block";
    } else {
        $("#modalImage")[0].style.display = "none";
    }
    $("#modalTitle")[0].innerText=cont.Title;
    
    $('#modalContent').addClass('showContent');
    
    
    if (cont.Tag === "Programs_Enrichment_Programs") {
        const progTemplate = "<article class='beefup example-opensingle'>" +
                             "<h5 id='subTitle___" + el.Tag + "' class='beefup__head' style='font-weight:100;'>{itemTitle}</h5>" +
                             "<div class='beefup__body'>" +
                             "<img src='{itemImage}' style='width:100px; float:right; margin-left:50px'/>" +
                             "<p id='subDesc'>{progDesc}</p>" +
                             "</div></article>";
        let programItems = "";
        contentPrograms.forEach(item => {
            let itm = progTemplate.replace("{itemTitle}", item.Title).replace("{progDesc}", item.Description).replace("{itemImage}", apiURI + item.Image.url);
            programItems += itm;
        });

        $("#modalDesc")[0].innerHTML=cont.LongDescription + "<br/><br/>" + programItems;
        $('.example-opensingle').beefup({
            openSingle: true
        });
    } else {
        $("#modalDesc")[0].innerText=cont.LongDescription;
    }
    
}
function loadPrograms() {
    const programs = getContent("Explore_Programs");
    const programCats = getSubCats("Explore_Programs"); 

    $("#programsTitle")[0].innerText=programs.title;
    $("#programsSubHeading")[0].innerText=programs.SubHeading;
    $("#programsDesc")[0].innerText=programs.Description;

    let programLen = (100 / programCats.length) + "%";
    if (window.screen.width < 450) {
        programLen = "100%; font-size:15pt; margin-bottom:1px; height:50px;padding:5px";
    } else if (window.screen.width > 450 && window.screen.width < 1080) {
        programLen = "33%; font-size:15pt; margin-bottom:1px; height:50px;padding:5px";

    }
    const template = "<div {script} class='tabNav Aligner' style='width:" + programLen + "'>" +
                     "<h4 class='Aligner-item'>{$}</h4>" +
                     "</div>";
    
    let programTab = "";       
              
    programCats.forEach(el => {
        programTab += template.replace("{$}", el.Title).replace("{script}", "onClick=updateProgramModel('" +  Base64.encode(JSON.stringify(el)) + "')");
    });

    $("#programList")[0].innerHTML = programTab;
}
function loadEduStages() {
    const eduStageBanner = getContent("Educational_Stages");
    const kinder = getContent("Educational_Stages_Kindergarten");
    const elem = getContent("Educational_Stages_Elementary");
    const others = getContent("Educational_Stages_Others");

    $("#eduStageTitle")[0].innerText=eduStageBanner.title;
    $("#eduStageSubHeading")[0].innerText=eduStageBanner.SubHeading;
    $("#eduStageDesc")[0].innerText=eduStageBanner.Description;

    $("#kinderTitle")[0].innerText=kinder.title;
    $("#kinderDesc")[0].innerText=kinder.Description;

    $("#elemTitle")[0].innerText=elem.title;
    $("#elemDesc")[0].innerHTML=elem.SubHeading + "<h4 style='font-weight:100; margin-top:25px'>قسم الابتدائي </h4>" ;

    let objContent = "<ul>";
    let aboutObjectiveList = elem.Description.split('\n-');
    aboutObjectiveList.forEach((el) => {
        if (el) {
            objContent+="<li>" + el + "</li>";
        }
    });
    objContent+="</ul>";

    $("#elemList")[0].innerHTML = objContent;

    $("#eduOthersTitle")[0].innerText=others.title;
    $("#eduOthersDesc")[0].innerText=others.Description;
}
function loadAboutContent() {
    const aboutContent = getContent("About_Vision");
    const aboutMessage = getContent("About_Message");
    const aboutHistory = getContent("About_School_History");
    const aboutObjectives = getContent("About_General_Objectives");
    const aboutChoosing = getContent("About_Choosing_Body");
    
    $("#aboutMainTitle")[0].innerText=aboutContent.title;
    $("#aboutMainSubHeading")[0].innerText=aboutContent.SubHeading;
    $("#aboutMainDesc")[0].innerText=aboutContent.Description;

    $("#aboutMainMessageTitle")[0].innerText=aboutMessage.title;
    $("#aboutMainMessageSubHeading")[0].innerText=aboutMessage.SubHeading;

    $("#aboutHistoryTitle")[0].innerText=aboutHistory.title;
    $("#aboutHistoryDesc")[0].innerText=aboutHistory.Description;

    $("#aboutGeneralObjectivesTitle")[0].innerText=aboutObjectives.title;
    $("#aboutGeneralObjectiveSubHeading")[0].innerText=aboutObjectives.SubHeading;
    

    let objContent = "<ul>";
    let aboutObjectiveList = aboutObjectives.Description.split('\n-');
    aboutObjectiveList.forEach((el) => {
        if (el) {
            objContent+="<li>" + el + "</li>";
        }
    });
    objContent+="</ul>";
    $("#aboutGeneralObjectiveList")[0].innerHTML=objContent;

    $("#choosingTitle")[0].innerText=aboutChoosing.title;
    $("#choosingSubHeader")[0].innerText=aboutChoosing.SubHeading;

    objContent = "<ul>";
    aboutObjectiveList = aboutChoosing.Description.split('\n-');
    aboutObjectiveList.forEach((el) => {
        if (el) {
            objContent+="<li>" + el + "</li>";
        }
    });
    objContent+="</ul>";
    $("#choosingList")[0].innerHTML=objContent;

}
function loadHomeContent () {
   const aboutContent = getContent("home_about_us");
   const regNowContent = getContent("home_registration");
   const regFeatures = getSubCats("home_about_us");
   const enrichmentProgram = getContent("home_enrichment_program");
   const educationalJourney = getContent("home_educational_journey");
   const regEdJourney = getSubCats("home_educational_journey"); 
   const homeAdmin = getContent("Home_admin"); 
   const homeAdminCats = getSubCats("Home_admin"); 

   $("#aboutTitle")[0].innerText=aboutContent.title;
   $("#aboutSubHeading")[0].innerText=aboutContent.SubHeading;
   $("#aboutDesc")[0].innerText=aboutContent.Description;

   $("#regYear")[0].innerText=regNowContent.SubHeading;
   $("#regDesc")[0].innerText=regNowContent.Description;
   
   $("#featureImage1")[0].src = apiURI + regFeatures[0].Image.url;
   $("#featureDesc1")[0].innerText=regFeatures[0].Description;
   $("#featureImage2")[0].src = apiURI + regFeatures[1].Image.url;
   $("#featureDesc2")[0].innerText=regFeatures[1].Description;
   $("#featureImage3")[0].src = apiURI + regFeatures[2].Image.url;
   $("#featureDesc3")[0].innerText=regFeatures[2].Description;

   $("#enrichProgTitle")[0].innerText=enrichmentProgram.title;
   $("#enrichProgSubTitle")[0].innerText=enrichmentProgram.SubHeading;
   $("#enrichDesc")[0].innerText=enrichmentProgram.Description;

   $("#edStageTitle")[0].innerText=educationalJourney.title;
   $("#edStageSubHeading")[0].innerText=educationalJourney.SubHeading;
   $("#edStageDesc")[0].innerText=educationalJourney.Description;

   //$("#featureImage1")[0].src = apiURI + regFeatures[0].Image.url;
   $("#journeyTitle1")[0].innerText = regEdJourney[0].Title;
   $("#journeyDesc1")[0].innerText=regEdJourney[0].Description;
   //$("#featureImage2")[0].src = apiURI + regFeatures[1].Image.url;
   $("#journeyTitle2")[0].innerText = regEdJourney[1].Title;
   $("#journeyDesc2")[0].innerText=regEdJourney[1].Description;
   //$("#featureImage3")[0].src = apiURI + regFeatures[2].Image.url;
   $("#journeyTitle3")[0].innerText = regEdJourney[2].Title;
   $("#journeyDesc3")[0].innerText=regEdJourney[2].Description;
   
   $("#homeAdminTitle")[0].innerText=homeAdmin.title;
   $("#homeAdminSubHeading")[0].innerText=homeAdmin.SubHeading;
   $("#homeAdminDesc")[0].innerText=homeAdmin.Description;
   
   $("#homeAdminSubImage1")[0].src = apiURI + homeAdminCats[0].Image.url;
   $("#homeAdminName1")[0].innerText = homeAdminCats[0].Title;
   $("#homeAdminTitle1")[0].innerText=homeAdminCats[0].Description;
   $("#homeAdminSubImage2")[0].src = apiURI + homeAdminCats[1].Image.url;
   $("#homeAdminName2")[0].innerText = homeAdminCats[1].Title;
   $("#homeAdminTitle2")[0].innerText=homeAdminCats[1].Description;
   $("#homeAdminSubImage3")[0].src = apiURI + homeAdminCats[2].Image.url;
   $("#homeAdminName3")[0].innerText = homeAdminCats[2].Title;
   $("#homeAdminTitle3")[0].innerText=homeAdminCats[2].Description;
   $("#homeAdminSubImage4")[0].src = apiURI + homeAdminCats[2].Image.url;
   $("#homeAdminName4")[0].innerText = homeAdminCats[2].Title;
   $("#homeAdminTitle4")[0].innerText=homeAdminCats[2].Description;
}

