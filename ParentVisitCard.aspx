<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ParentVisitCard.aspx.cs" Inherits="ParentVisitCard" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/south-street/jquery-ui.css" rel="stylesheet">
    <link href="../Content/bootstrap-theme.min.css" rel="stylesheet" />
    <link href="../Content/bootstrap.min.css" rel="stylesheet" />
    <link href="../Content/main.css" rel="stylesheet" />
    <link href="../Content/ann.css" rel="stylesheet" />
    <link href="../Content/print.css" rel="stylesheet" />
    <link href="../Content/font-awesome.css" rel="stylesheet" />
    <style>
        @font-face {
            font-family: 'Droid Arabic Kufi';
            src: url('../fonts/DroidKufi-Regular.eot');
            src: url('../fonts/DroidKufi-Regular.eot?#iefix') format('embedded-opentype'), url('../fonts/DroidKufi-Regular.woff') format('woff'), url('../fonts/DroidKufi-Regular.ttf') format('truetype'), url('../fonts/DroidKufi-Regular.svg#ge_ss_twolight') format('svg');
            font-weight: normal;
            font-style: normal;
        }

        body {
            font-family: 'Droid Arabic Kufi';
            /*background-color: #fff;*/
            direction: rtl;
            margin: 0px;
            font-size: 12pt;
        }
    </style>
    <script>
        function myFunction() {
            window.print();
        }
    </script>

</head>
<body>
    <form id="form1" runat="server">
        <div style="position: fixed; width: 100%; height: 100vh; overflow-y: scroll;">
            <div class="container" style="text-align: right;">
                <div class="row">
                    <div class="col-md-12" style="margin-top: 125px">
                    </div>
                    <div class="col-md-1 hidden-xs hidden-sm"></div>
                    <div class="col-md-10 col-xs-12 col-sm-12" style="padding-bottom: 100px">
                        <div class="shadowBoxWhite" style="padding: 15px;">
                            <div class="card" style="max-width: 500px; background-color: #ffffff">
                                <div class="row no-gutters">

                                    <div class="col-md-12">
                                        <div class="card-body">
                                            <h5 class="card-title">رقم البطاقة  
                                                <asp:Label ID="LabelCardNumber" runat="server" Text=""></asp:Label></h5>

                                            <div class="card-text">
                                                أسم الطالب 
                                                <asp:Label ID="LabelName" runat="server" Text=""></asp:Label>
                                            </div>
                                            <div class="card-text">
                                                البريد الالكتروني 
                                                <asp:Label ID="LabelEmail" runat="server" Text=""></asp:Label>
                                            </div>
                                            <div class="card-text">
                                                رقم الجوال 
                                                <asp:Label ID="LabelPhoneNumber" runat="server" Text=""></asp:Label>
                                            </div>
                                            <div class="card-text">
                                                المرحلة 
                                                <asp:Label ID="LabelDivision" runat="server" Text=""></asp:Label>
                                            </div>
                                            <div class="card-text">
                                                حجز لـ 
                                                <asp:Label ID="LabelVisitFor" runat="server" Text=""></asp:Label>
                                            </div>
                                            <div class="card-text">
                                                الموعد 
                                                <asp:Label ID="Labeldate" runat="server" Text=""></asp:Label>
                                            </div>
                                              <div class="card-text">
                                                <small style="text-align: center; margin-top: 25px;">تم حجز الموعد و سيتم التواصل معكم في حال طرأ أي تغيير على الموعد </small>
                                            </div>
                                            <br />
                                            <a style="display:none !important" href="#" onclick="myFunction()" class="btn btn-primary stretched-link pull-left">طباعة</a>
                                          
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
