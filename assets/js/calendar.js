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
    var startDate = "2018-04-01";
    var endDate = "2018-04-15";



    var PlaceID = getUrlVars()["ID"];


    $.ajax({

        type: "POST",
        contentType: "application/json",
        data: "{'StartDate': '" + startDate + "', 'EndDate': '" + endDate + "', 'PlaceID': '1' }",
        url: "../TISCalendar.aspx/GetCalendarData",
        dataType: "json",
        success: function (data) {

            console.log(data.d);
            debugger;
            $('#calendar').empty();
            var initialLocaleCode = '';
            if (document.getElementById("HiddenFieldLocate").value == '')
                initialLocaleCode = 'en';
            else
                initialLocaleCode = document.getElementById("HiddenFieldLocate").value;
            var localeSelectorEl = document.getElementById('locale-selector');
            var calendarEl = document.getElementById('calendar');

            var calendar = new FullCalendar.Calendar(calendarEl,
                {
                    selectable: true,
                    headerToolbar: {
                        left: 'prev,next',
                        center: 'title',
                        right: ''
                    },
                    //initialDate: '2020-06-12',
                    locale: initialLocaleCode,
                    buttonIcons: false, // show the prev/next text
                    weekNumbers: false,
                    dayMaxEvents: true, // allow "more" link when too many events
                    events: $.map(data.d, function (item, i) {
                        //-- here is the event details to show in calendar view.. the data is retrieved via ajax call will be accessed here

                        var eventStartDate = new Date(parseInt(item.EventStartDate.substr(6)));

                        var eventEndDate = new Date(parseInt(item.EventEndDate.substr(6)));

                        var event = new Object();
                        event.id = item.EventId;
                        event.start = new Date(eventStartDate.getFullYear(), eventStartDate.getMonth(), eventStartDate.getDate(), eventStartDate.getHours(), 0, 0, 0);
                        event.end = new Date(eventEndDate.getFullYear(), eventEndDate.getMonth(), eventEndDate.getDate(), eventEndDate.getHours() + 1, 0, 0, 0);
                        event.title = item.Title;
                        event.allDay = item.AllDayEvent;

                        return event;
                    })
                    ,

                    dateClick: function (info) {
                        document.getElementById("HiddenFielddate").value = info.dateStr;
                        document.getElementById("Buttongetdata").click();
                        alert('Date: ' + document.getElementById("HiddenFielddate").value);
                    },


                }
            );

            calendar.render();

            // build the locale selector's options
            calendar.getAvailableLocaleCodes().forEach(function (localeCode) {
                var optionEl = document.createElement('option');
                optionEl.value = localeCode;
                optionEl.selected = localeCode == initialLocaleCode;
                optionEl.innerText = localeCode;
                localeSelectorEl.appendChild(optionEl);
            });

            // when the selected option changes, dynamically change the calendar option
            localeSelectorEl.addEventListener('change', function () {
                if (this.value) {
                    calendar.setOption('locale', this.value);
                    document.getElementById("HiddenFieldLocate").value = this.value;
                }
            });

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //-- log error
            console.log(textStatus)
        }
    });




}


InitializeCalendar();