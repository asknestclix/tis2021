let navList = null;

const loadNavAPI = () => {
    $('body').toggleClass('loading');
    $.getJSON( "https://tis-cms.com/navigations", function( data ) {
        navList = data;
        data.sort(compare);

        $('body').toggleClass('loading');
    });
    
}

function compare( a, b ) {
    if ( a.Sort < b.Sort ){
      return -1;
    }
    if ( a.Sort > b.Sort ){
      return 1;
    }
    return 0;
}

$('#sideDrawerTogger').click(function () {
    $('#sideDrawerContainer').addClass('open');
    $('#sideDrawer').addClass('open');
    showNavContents();
});

$('#sideDrawerContainer').click(function () {
    $('#sideDrawerContainer').removeClass('open');
    $('#sideDrawer').removeClass('open');
    $('#navContents')[0].innerHTML = null;
});


function showNavContents() {
    if (navList && navList.length > 0) {
        let navString = '';
        for (var ctr=0; ctr<navList.length; ctr++) {
            if (navList[ctr].isModal) {
                if (navList[ctr].id===5) sc="showModal4()"; else sc="showModal2()";
                navString += "<a id='onlineRegSC' onClick='" + sc + "' class='wow fadeInLeft' data-wow-delay='." + (ctr+1) + "s' href='#'>" + navList[ctr].NavigationName + "</a>";
            }else {
                navString += "<a class='wow fadeInLeft' data-wow-delay='." + (ctr+1) + "s' href='" + navList[ctr].NavigationURL + "'>" + navList[ctr].NavigationName + "</a>";
            }
        }

        $('#navContents')[0].innerHTML = navString;
    }
}

function showNavContentMobile() {
    let baseTemplate = "<ul id='nav' class='navbar-nav mx-auto'>";
    for (var ctr=0; ctr<navList.length; ctr++) {
        baseTemplate += "<li class='nav-item'><a class='ud-menu-scroll;' href='" + navList[ctr].NavigationURL + "'>" + navList[ctr].NavigationName  + "</a></li>";
    }
    baseTemplate += "</ul>";

    $('#navMobile')[0].innerHTML = baseTemplate;
}
loadNavAPI();
