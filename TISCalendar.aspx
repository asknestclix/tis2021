<%@ Page Language="C#" AutoEventWireup="true" CodeFile="TISCalendar.aspx.cs" Inherits="TISCalendar" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta charset='utf-8' />
    <title>TIS Calendar</title>
    <link href="../css/bootstrap.css" rel="stylesheet" />
    <link href="js/fullcalendar-5.1.0/lib/main.css" rel="stylesheet" />
    <script src='js/fullcalendar-5.1.0//lib/main.js'></script>
    <script src='js/fullcalendar-5.1.0//lib/locales-all.js'></script>
    <script src="js/fullcalendar-5.1.0/lib/moment.min.js"></script>
    <script src="js/fullcalendar-5.1.0/lib/jquery.min.js"></script>



    <script type="text/javascript">
        function getUrlVars() {
            var vars = {};
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                vars[key] = value;
            });
            return vars;
        }

        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDay(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }
        $(document).ready(function () {

            InitializeCalendar();


        });



        function InitializeCalendar() {
            // alert('in');
            //-- start date and end date criteria.. you can get it from user input.. 
            var startDate = "2018-04-01";
            var endDate = "2018-04-15";



            var PlaceID = getUrlVars()["ID"];


            $.ajax({

                type: "POST",
                contentType: "application/json",
                data: "{'StartDate': '" + startDate + "', 'EndDate': '" + endDate + "', 'PlaceID': '" + PlaceID + "' }",
                url: "TISCalendar.aspx/GetCalendarData",
                dataType: "json",
                success: function (data) {

                    console.log(data.d);

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


    </script>


    <style>
        .KGClass {
            background-color: #fea621;
            color: #E6E6E6;
            font-size: 11px;
        }

        .PrimaryClass {
            background-color: #237d26;
            color: #E6E6E6;
            font-size: 11px;
        }

        .UpperPrimaryGClass {
            background-color: #beac83;
            color: #E6E6E6;
            font-size: 11px;
        }

        .UpperPrimaryBClass {
            background-color: #4fa0ca;
            color: #E6E6E6;
            font-size: 11px;
        }

        .MiddleGClass {
            background-color: #528919;
            color: #E6E6E6;
            font-size: 11px;
        }

        .MiddleBClass {
            background-color: #2e58a6;
            color: #E6E6E6;
            font-size: 11px;
        }

        .SecondryGClass {
            background-color: #12491d;
            color: #E6E6E6;
            font-size: 11px;
        }

        .SecondryBClass {
            background-color: #133875;
            color: #E6E6E6;
            font-size: 11px;
        }

        .DiplomaGClass {
            background-color: #349980;
            color: #E6E6E6;
            font-size: 11px;
        }

        .DiplomaBClass {
            background-color: #110b79;
            color: #E6E6E6;
            font-size: 11px;
        }

        .Darkclass {
            background-color: #343a40 !important;
            color: #E6E6E6;
            font-size: 11px;
        }

        #calendar {
            max-width: 1100px;
            margin: 40px auto;
            padding: 0 10px;
        }
    </style>
</head>
<body style="min-height: 100vh; background-color: #9ea2a6; background-image: url('http://tischools.cc/images/pattern_new.png');">
    <form id="form1" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>



        <div class="container-fluid">
            <div class="row">
                <div style="display: none;">
                    <asp:HiddenField ID="HiddenFielddate" runat="server" />
                    <asp:HiddenField ID="HiddenFieldLocate" runat="server" />
                    <asp:Button ID="Buttongetdata" runat="server" Text="" OnClick="Buttongetdata_Click" />
                </div>
                <div class=" col-md-1 col-sm-1 bg-dark" style="padding-right: 0!important;">

                    <nav class="navbar navbar-dark bg-dark">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    </nav>
                    <div style="color: rgba(255, 255, 255, 0.5); position: absolute; bottom: 0">
                        2020-2021
                    </div>


                </div>
                <div class=" col-md-2  col-sm-2" style="padding-left: 0!important;">
                    <div class="collapse " id="navbarToggleExternalContent">
                        <div class=" p-4" style="background-color: rgba(0,0,0,0.3); height: 100vh">

                            <%--    <center>  <h4 class="text-white">الأقسام</h4></center>--%>

                            <ul style="direction: rtl; text-align: right; list-style: none; line-height: 2">
                                <li><span><a style="color: white; text-decoration: none;" href="TISCalendar.aspx?ID=0">- جميع الأقسام</a>  </span></li>
                                <li><span><a style="color: white; text-decoration: none;" href="TISCalendar.aspx?ID=1">- رياض الأطفال</a>  </span></li>
                                <li><span><a style="color: white; text-decoration: none;" href="TISCalendar.aspx?ID=2">- الابتدائي</a>  </span></li>
                                <li><span><a style="color: white; text-decoration: none;" href="TISCalendar.aspx?ID=3">- الابتدائي عليا بنات</a>  </span></li>
                                <li><span><a style="color: white; text-decoration: none;" href="TISCalendar.aspx?ID=4">- الابتدائي عليا بنين</a>  </span></li>
                                <li><span><a style="color: white; text-decoration: none;" href="TISCalendar.aspx?ID=5">- المتوسط بنات</a>  </span></li>
                                <li><span><a style="color: white; text-decoration: none;" href="TISCalendar.aspx?ID=6">- المتوسط بنين</a>  </span></li>
                                <li><span><a style="color: white; text-decoration: none;" href="TISCalendar.aspx?ID=7">- الثانوي بنات</a>  </span></li>
                                <li><span><a style="color: white; text-decoration: none;" href="TISCalendar.aspx?ID=8">- الثانوي بنين</a>  </span></li>
                                <li><span><a style="color: white; text-decoration: none;" href="TISCalendar.aspx?ID=9">- الدبلوما الأمريكية بنات </a></span></li>
                                <li><span><a style="color: white; text-decoration: none;" href="TISCalendar.aspx?ID=10">- الدبلوما الأمريكية بنين </a></span></li>
                            </ul>

                        </div>
                    </div>
                </div>
                <div class="col-sm-8  col-md-8" style="padding-bottom: 1.4%">
                    <div class="row" style="direction: rtl; text-align: right">
                        <div class="col-md-12" style="padding-top: 2%">
                            <center>
                                <h3>
                                <img src="images/tisLogreg.png" style="width:10%"/> 
                        التقويم الدراسي لعام 
                                
                 </h3>  
                              
                                    1443-1442هـ 
                       <br />
2020-2021 م
                            </center>
                        </div>


                        <div class="col-md-7" style="padding-top: 2%;">


                            <select id='locale-selector' class="form-control"></select>


                        </div>
                        <div class="col-md-5" style="padding-top: 2%;">
                        </div>




                        <div class="col-md-7" style="padding-top: 2%;">


                            <asp:DropDownList ID="DropDownListper" runat="server" AutoPostBack="true" class="form-control" OnSelectedIndexChanged="DropDownListper_SelectedIndexChanged">
                                <asp:ListItem Text="عرض باليوم" Value="1"></asp:ListItem>
                                <asp:ListItem Text="عرض الاسبوع الحالي" Value="2"></asp:ListItem>
                            </asp:DropDownList>


                        </div>
                                                <div class="col-md-5" style="padding-top: 2%;">
                        </div>




                        <div class="col-md-7" style="padding-top: 2%;">
                            <div class="row">
                               <div class="col-md-1">
                                    من  
                               </div>
                                <div class="col-md-4">
                                    <asp:TextBox ID="TextBoxFrom" CssClass="form-control" runat="server" Type="date"></asp:TextBox>
                                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ErrorMessage="*" ValidationGroup="se" ControlToValidate="TextBoxFrom"></asp:RequiredFieldValidator>
                                </div>

                                   <div class="col-md-1">
                                    الى  
                               </div>
                                <div class="col-md-4">
                                    <asp:TextBox ID="TextBoxTo" CssClass="form-control" runat="server" Type="date"></asp:TextBox>
                                     <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ErrorMessage="*" ValidationGroup="se" ControlToValidate="TextBoxTo"></asp:RequiredFieldValidator>
                                </div>
                                 <div class="col-md-2">
                                     <asp:Button ID="ButtonSearch" runat="server" Text="بحث" ValidationGroup="se" CssClass="btn btn-success" OnClick="ButtonSearch_Click" /> 
                               </div>

                            </div>

                          


                        </div>

                        <div class="col-md-5" style="padding-top: 2%;">
                        </div>


                        <div class="col-md-7" style="padding-top: 2%;">
                            <div class="row" style="background-color: white; padding: 2%; border-radius: 6px; margin-right: 0; margin-left: 0">
                                <div class="col-md-1"></div>
                                <div class="col-md-5" style="background-color: darkgreen; color: white; padding: 1%">
                                    <center>
                              
                                    <asp:Label ID="LabelG" runat="server" Text=""></asp:Label>
                          
                            </center>
                                </div>
                                <div class="col-md-5" style="background-color: burlywood; color: white; padding: 1%">
                                    <center>
                                
                                     <asp:Label ID="LabelH" runat="server" Text=""></asp:Label>
                                     
                            </center>
                                </div>
                                <div class="col-md-1"></div>

                                <div class="col-md-12" style="padding-top: 2%">
                                    <center>
  <div id='top'>
   

  </div>

  <div id='calendar'></div>
 </center>

                                </div>
                            </div>
                        </div>
                        <div class="col-md-5" style="padding-top: 2%;">
                            <asp:UpdatePanel ID="UpdatePanel1" runat="server">
                                <ContentTemplate>
                                    <asp:Repeater ID="RepeaterEventList" runat="server">
                                        <ItemTemplate>
                                            <div class='row <%#Eval("RowClass") %>' style="border: 1px solid #E6E6E6;">


                                                <div class="col-md-3" style="padding-top: 2%; padding-bottom: 2%"><%#Eval("EventdateEN") %></div>
                                                <div class="col-md-9" style="padding-top: 2%; padding-bottom: 2%"><%#Eval("EventTitle") %></div>
                                            </div>
                                        </ItemTemplate>
                                    </asp:Repeater>

                                </ContentTemplate>
                            </asp:UpdatePanel>
                        </div>

                        <div class="col-md-12">
                            <center>
                                <br />
                                <br />
                                <button class="btn btn-success" onclick="window.print()">طباعة الصفحة</button>
                                <br />
                                <br />

                            </center>
                            
                        </div>

                    </div>


                </div>

            </div>
        </div>


        <script src="js/bootstrap.js"></script>

    </form>
</body>
</html>
