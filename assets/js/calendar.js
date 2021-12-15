function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
function InitializeCalendar(calID) {
    // alert('in');
    //-- start date and end date criteria.. you can get it from user input.. 
    
    switch (calID) {
        case 0 : document.getElementById("calTitle").innerText = "Upcoming Events : " + "جميع الأقسام"; break;
        case 1 : document.getElementById("calTitle").innerText = "Upcoming Events : " + "رياض الأطفال"; break;
        case 2 : document.getElementById("calTitle").innerText = "Upcoming Events : " + "الابتدائي"; break;
        case 3 : document.getElementById("calTitle").innerText = "Upcoming Events : " + "الابتدائي عليا بنات"; break;
        case 4 : document.getElementById("calTitle").innerText = "Upcoming Events : " + "الابتدائي عليا بنين"; break;
        case 5 : document.getElementById("calTitle").innerText = "Upcoming Events : " + "المتوسط بنات"; break;
        case 6 : document.getElementById("calTitle").innerText = "Upcoming Events : " + "المتوسط بنين"; break;
        case 7 : document.getElementById("calTitle").innerText = "Upcoming Events : " + "الثانوي بنات"; break;
        case 8 : document.getElementById("calTitle").innerText = "Upcoming Events : " + "الثانوي بنين"; break;
        case 9 : document.getElementById("calTitle").innerText = "Upcoming Events : " + "الدبلوما الأمريكية بنات "; break;
        case 10 : document.getElementById("calTitle").innerText = "Upcoming Events : " + "الدبلوما الأمريكية بنين "; break;
    }
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    var ds = new Date();
    ds.setMonth(ds.getMonth() + 3);

    
    var startDate = today;
    var endDate = ds.getFullYear() + "-" + String(ds.getMonth() + 1).padStart(2, '0') + "-" + String(ds.getDate()).padStart(2, '0');
    

    var PlaceID = calID ? calID : "0";
    let calData = undefined;
    $('body').toggleClass('loading');

    $.ajax({

        type: "POST",
        contentType: "application/json",
        data: "{'StartDate': '" + startDate + "', 'EndDate': '" + endDate + "', 'PlaceID': '" + PlaceID + "' }",
        url: "../TISCalendar.aspx/GetCalendarData",
        dataType: "json",
        success: function (data) {
            console.error(data);
            $('body').toggleClass('loading');
            let op = data.d;
            document.getElementById("calendarContainer").innerHTML = "";
            if (op && op.length > 0) {
                calData = op;

                op.sort(function (a, b) {
                    return new Date(b.EventStartDate) - new Date(a.EventStartDate);
                });

                op.reverse();

                let calendarItems = "";
                let prevDate = "";
                let prevDesc = "";
                let countItems = 0;
                let secTime = .1;
                op.forEach(el => {
                    if (new Date(el.EventStartDate) > new Date(today) ) {
                        if (prevDate !== el.EventStartDate.toString() && prevDesc !== el.Title.toString()) {
                            calendarItems += createTemplate(el.EventStartDate, el.Title, undefined, secTime);
                            prevDate = el.EventStartDate;
                            prevDesc = el.Title;
                            countItems += 1;
                            secTime += .1;
                        }
                    }
                });

                if (countItems < 19) {
                    let diff = 18 - countItems;
                    for (var i = 0; i < diff; i++) {
                        calendarItems += createTemplate("", "","blank", secTime);
                        secTime += .1;
                    }
                }
                document.getElementById("calendarContainer").innerHTML = calendarItems;
            }
            
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //-- log error
            console.log(textStatus);
        }
    });

    const createTemplate = (startDate, desc, typeItem, sec) => {
        let template = "<div style='width: 100%;'>" +
            "<div class='" + (typeItem ? "calendarBlank " : "calendarItem ") + "wow fadeInUp' data-wow-delay='" + sec + "s' style = 'padding:15px; text-align:right' >" +
            "<h5>" + startDate + "</h5>" +
            "<p style='margin-top:15px'>" + desc + "</p>" +
            "</div></div>";

        return template;
    }


}


InitializeCalendar(0);