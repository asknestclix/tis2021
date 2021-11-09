function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
function InitializeCalendar() {
    // alert('in');
    //-- start date and end date criteria.. you can get it from user input.. 

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    var ds = new Date();
    ds.setMonth(ds.getMonth() + 3);

    
    var startDate = today;
    var endDate = ds.getFullYear() + "-" + String(ds.getMonth() + 1).padStart(2, '0') + "-" + String(ds.getDate()).padStart(2, '0');
    

    var PlaceID = getUrlVars()["ID"];
    let calData = undefined;

    $.ajax({

        type: "POST",
        contentType: "application/json",
        data: "{'StartDate': '" + startDate + "', 'EndDate': '" + endDate + "', 'PlaceID': '0' }",
        url: "../TISCalendar.aspx/GetCalendarData",
        dataType: "json",
        success: function (data) {

            
            let op = data.d;

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
                op.forEach(el => {
                    if (new Date(el.EventStartDate) > new Date(today) ) {
                        if (prevDate !== el.EventStartDate.toString() && prevDesc !== el.Title.toString()) {
                            calendarItems += createTemplate(el.EventStartDate, el.Title);
                            prevDate = el.EventStartDate;
                            prevDesc = el.Title;
                            countItems += 1;
                        }
                    }
                });

                if (countItems < 19) {
                    let diff = 18 - countItems;
                    for (var i = 0; i < diff; i++) {
                        calendarItems += createTemplate("", "");
                    }
                }
                var element = document.getElementById("calendarContainer").innerHTML = calendarItems;
            }
            
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //-- log error
            console.log(textStatus);
        }
    });

    const createTemplate = (startDate, desc) => {
        let template = "<div style='width: 100%;'>" +
            "<div class='calendarItem wow fadeInUp' data-wow-delay='.1s' style = 'padding:15px; text-align:right' >" +
            "<h5>" + startDate + "</h5>" +
            "<p style='margin-top:15px'>" + desc + "</p>" +
            "</div></div>";

        return template;
    }


}


InitializeCalendar();