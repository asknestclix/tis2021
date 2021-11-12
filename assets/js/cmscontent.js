let contentList = null;
let contentSubCats = null;
let apiURI = "http://167.172.52.246:1337";

const loadAPI = (pageName) => {
    $.getJSON( apiURI+ "/home-page-contents", function( data ) {
        contentList = data;
    }).done(()=>{
        $.getJSON( apiURI + "/home-page-sub-categories", function( data ) {
            contentSubCats = data;
        }).done(()=>{
            switch (pageName) {
                case "Home" : loadHomeContent(); break;
                case "About" : loadAboutContent(); break;
                case "EduStages" : loadEduStages(); break;
            }
            
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

