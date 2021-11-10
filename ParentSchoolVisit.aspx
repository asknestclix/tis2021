<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ParentSchoolVisit.aspx.cs" Inherits="ParentSchoolVisit" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>مدارس التربية الاسلامية - </title>
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
</head>
<body>
    <form id="form1" runat="server">
        <div style="position: fixed; width: 100%; height: 100vh; overflow-y: scroll;">
            <div class="container-fluid" style="text-align: right; padding:0; margin:0">
                <div class="row">
                    <div class="col-md-12">
                    </div>
                    
                    <div class="col-md-12 col-xs-12 col-sm-12" style="padding-bottom: 100px">
                        <div class="shadowBoxWhite" style="padding: 15px;">
                            <h3>حجز زيارة الى المدرسة  </h3>
                            <h4>الرجاء تعبئة البيانات التالية  </h4>


                            <div class="row" style="margin: 15px; margin-top: 20px">

                                <%--                                <div class="col-md-12 col-xs-12 pull-right" style="padding: 10px 5px;">


                                    <div class="col-md-2 col-xs-12 pull-right" style="padding: 10px 5px;">
                                        رقم الهوية
                                      
                                    </div>
                                    <div class="col-md-3 col-xs-12 pull-right" style="padding: 10px 5px;">
                                        <asp:TextBox ID="TextBoxParentID" CssClass="form-control" runat="server"></asp:TextBox>
                                    </div>
                                    <div class="col-md-6 col-xs-12 pull-right" style="padding: 10px 5px;">
                                    </div>
                                    <div class="col-md-1 col-xs-12 pull-right" style="padding: 10px 5px;">
                                        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" ControlToValidate="TextBoxParentID" runat="server" ErrorMessage="*" ForeColor="Red"></asp:RequiredFieldValidator>
                                    </div>
                                </div>--%>

                                <div class="col-md-12 col-xs-12 pull-right" style="padding: 10px 5px;">

                                    <div class="col-md-2 col-xs-6 pull-right" style="padding: 10px 5px;">
                                        اسم الطالب/الطالبة
                                      
                                    </div>
                                    <div class="col-md-3 col-xs-6 pull-right" style="padding: 10px 5px;">
                                        <asp:TextBox ID="TextBoxParentName" CssClass="form-control" runat="server"></asp:TextBox>
                                    </div>
                                    <div class="col-md-1 col-xs-12 pull-right" style="padding: 10px 5px;">
                                        <asp:RequiredFieldValidator ID="RequiredFieldValidator2" ControlToValidate="TextBoxParentName" runat="server" ErrorMessage="*" ForeColor="Red"></asp:RequiredFieldValidator>
                                    </div>
                                    <div class="col-md-2 col-xs-12 pull-right" style="padding: 10px 5px;">
                                        رقم الجوال
                                      
                                    </div>
                                    <div class="col-md-3 col-xs-12 pull-right" style="padding: 10px 5px;">
                                        <asp:TextBox ID="TextBoxPhoneNumber" type="number" CssClass="form-control" runat="server"></asp:TextBox>
                                    </div>
                                    <div class="col-md-1 col-xs-12 pull-right" style="padding: 10px 5px;">
                                        <asp:RequiredFieldValidator ID="RequiredFieldValidator4" ControlToValidate="TextBoxPhoneNumber" runat="server" ErrorMessage="*" ForeColor="Red"></asp:RequiredFieldValidator>
                                    </div>
                                </div>


                                <div class="col-md-12 col-xs-12 pull-right" style="padding: 10px 5px;">
                                    <div class="col-md-2 col-xs-12 pull-right" style="padding: 10px 5px;">
                                        البريد الالكتروني
                                      
                                    </div>
                                    <div class="col-md-3 col-xs-12 pull-right" style="padding: 10px 5px;">
                                        <asp:TextBox ID="TextBoxEmail" type="email" CssClass="form-control" runat="server"></asp:TextBox>
                                    </div>
                                    <div class="col-md-1 col-xs-12 pull-right" style="padding: 10px 5px;">
                                        <asp:RequiredFieldValidator ID="RequiredFieldValidator3" ControlToValidate="TextBoxEmail" runat="server" ErrorMessage="*" ForeColor="Red"></asp:RequiredFieldValidator>
                                    </div>

                                    <div class="col-md-2 col-xs-12 pull-right" style="padding: 10px 5px;">
                                        المرحلة
                                      
                                    </div>
                                    <div class="col-md-3 col-xs-12 pull-right" style="padding: 10px 5px;">
                                        <asp:DropDownList ID="DropDownListDivision" AutoPostBack="true" CssClass="form-control" runat="server" OnSelectedIndexChanged="DropDownListDivision_SelectedIndexChanged">
                                             <asp:ListItem Text=" اختر " Value="0"></asp:ListItem>
                                            <asp:ListItem Text="مرحلة رياض الأطفال" Value="1"></asp:ListItem>
                                            <asp:ListItem Text="مرحلة الابتدائية الأولية" Value="2"></asp:ListItem>
                                            <asp:ListItem Text="مرحلة الابتدائية العليا" Value="3"></asp:ListItem>
                                            <asp:ListItem Text="المرحلة المتوسطة و الثانوية" Value="4"></asp:ListItem>
                                            <asp:ListItem Text="مرحلة الدبلوما" Value="5"></asp:ListItem>
                                            <asp:ListItem Text="قسم البنين" Value="6"></asp:ListItem>
                                            <asp:ListItem Text="القبول والتسجيل" Value="7"></asp:ListItem>
                                        </asp:DropDownList>
                                    </div>
                                    <div class="col-md-6 col-xs-12 pull-right" style="padding: 10px 5px;">
                                    </div>
                                    <div class="col-md-1 col-xs-12 pull-right" style="padding: 10px 5px;">
                                        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" InitialValue="0" ControlToValidate="DropDownListDivision" runat="server" ErrorMessage="*" ForeColor="Red"></asp:RequiredFieldValidator>
                                    </div>
                                </div>

                                <div class="col-md-12 col-xs-12 pull-right" style="padding: 0 0px; margin: 0">
                                    <div class="col-md-2 col-xs-12 pull-right" style="padding: 10px 5px;">
                                        حجز موعد لما يلي 
                                    </div>
                                    <div class="col-md-9 col-xs-12 pull-right" style="padding: 10px 5px;">
                                        <asp:RadioButtonList ID="RadioButtonListVisitFor" RepeatColumns="5" RepeatDirection="Vertical" runat="server">
                                            <asp:ListItem Text="استكمال التسجيل  &nbsp;  &nbsp;  &nbsp;" Value="1"></asp:ListItem>
                                            <asp:ListItem Text="سحب ملف &nbsp;  &nbsp;  &nbsp;" Value="2"></asp:ListItem>
                                            <asp:ListItem Text="مقابلة قائدة/قائد المرحلة" Value="3"></asp:ListItem>
                                        </asp:RadioButtonList>

                                    </div>
                                    <div class="col-md-1 col-xs-12 pull-right" style="padding: 10px 5px;"></div>
                                    <div class="col-md-2 col-xs-12 pull-right" style="padding: 10px 5px;">
                                        الموضوع 
                                    </div>
                                    <div class="col-md-9 col-xs-12 pull-right" style="padding: 10px 5px;">
                                        <textarea id="txtDetails" runat="server" class="form-control"></textarea>
                                    </div>
                                    <div class="col-md-1 col-xs-12 pull-right" style="padding: 10px 5px;">
                                    </div>

                                    <div class="col-md-1 col-xs-12 pull-right" style="padding: 10px 5px;"></div>
                                </div>
                                <div class="col-md-12 col-xs-12 pull-right" style="padding: 0 0px; margin: 0">
                                    <div class="col-md-2 col-xs-12 pull-right" style="padding: 10px 5px;">
                                        التاريخ
                                    </div>
                                    <div class="col-md-3 col-xs-12 pull-right" style="padding: 10px 5px;">
                                        <asp:TextBox ID="TextBoxVisitDate" type="date" runat="server" CssClass="form-control"></asp:TextBox>
                                    </div>
                                    <div class="col-md-1 col-xs-12 pull-right" style="padding: 10px 5px;"></div>
                                    <div class="col-md-2 col-xs-12 pull-right" style="padding: 10px 5px;">
                                        الوقت
                                    </div>
                                    <div class="col-md-3 col-xs-12 pull-right" style="padding: 10px 5px;">
                                        <asp:DropDownList ID="DropDownListVisitTime1" CssClass="form-control" style="display:none" runat="server">
                                            <asp:ListItem Text="3:00" Value="21"></asp:ListItem>
                                            <asp:ListItem Text="3:15" Value="22"></asp:ListItem>
                                            <asp:ListItem Text="3:30" Value="23"></asp:ListItem>
                                            <asp:ListItem Text="3:45" Value="24"></asp:ListItem>
                                            <asp:ListItem Text="4:00" Value="25"></asp:ListItem>
                                            <asp:ListItem Text="4:15" Value="26"></asp:ListItem>
                                            <asp:ListItem Text="4:30" Value="27"></asp:ListItem>
                                            <asp:ListItem Text="4:45" Value="28"></asp:ListItem>
                                            <asp:ListItem Text="5:00" Value="29"></asp:ListItem>
                                            <asp:ListItem Text="5:15" Value="30"></asp:ListItem>
                                            <asp:ListItem Text="5:30" Value="31"></asp:ListItem>
                                            <asp:ListItem Text="5:45" Value="32"></asp:ListItem>
                                            <asp:ListItem Text="6:00" Value="33"></asp:ListItem>
                                            <asp:ListItem Text="6:15" Value="34"></asp:ListItem>
                                            <asp:ListItem Text="6:30" Value="35"></asp:ListItem>
                                            <asp:ListItem Text="6:45" Value="36"></asp:ListItem>
                                        </asp:DropDownList>
                                        <asp:DropDownList ID="DropDownListVisitTime2" CssClass="form-control" style="display:none" runat="server">
                                            <asp:ListItem Text="10:00" Value="1"></asp:ListItem>
                                            <asp:ListItem Text="10:15" Value="2"></asp:ListItem>
                                            <asp:ListItem Text="10:30" Value="3"></asp:ListItem>
                                            <asp:ListItem Text="10:45" Value="4"></asp:ListItem>
                                            <asp:ListItem Text="11:00" Value="5"></asp:ListItem>
                                            <asp:ListItem Text="11:15" Value="6"></asp:ListItem>
                                            <asp:ListItem Text="11:30" Value="7"></asp:ListItem>
                                            <asp:ListItem Text="11:45" Value="8"></asp:ListItem>
                                            <asp:ListItem Text="12:00" Value="9"></asp:ListItem>
                                            <asp:ListItem Text="12:15" Value="10"></asp:ListItem>
                                            <asp:ListItem Text="12:30" Value="11"></asp:ListItem>
                                            <asp:ListItem Text="12:45" Value="12"></asp:ListItem>
                                            <asp:ListItem Text="1:00" Value="13"></asp:ListItem>
                                            <asp:ListItem Text="1:15" Value="14"></asp:ListItem>
                                            <asp:ListItem Text="1:30" Value="15"></asp:ListItem>
                                            <asp:ListItem Text="1:45" Value="16"></asp:ListItem>
                                            <asp:ListItem Text="2:00" Value="17"></asp:ListItem>
                                            <asp:ListItem Text="2:15" Value="18"></asp:ListItem>
                                            <asp:ListItem Text="2:30" Value="19"></asp:ListItem>
                                            <asp:ListItem Text="2:45" Value="20"></asp:ListItem>
                                        </asp:DropDownList>

                                    </div>
                                    <div class="col-md-1 col-xs-12 pull-right" style="padding: 10px 5px;">
                                    </div>
                                </div>
                                <div class="row">
                                     <div class="col-md-2 col-xs-12 pull-right" style="padding: 10px 5px;">
                                     </div>
                                     <div class="col-md-10 col-xs-10 pull-left" style="padding: 10px 5px;">
                                        <asp:Button ID="ButtonSave"  runat="server" CssClass="btn btn-success btn-lg" Text="حفظ " Style="float: right; margin-right:10px; min-width: 150px;" OnClick="ButtonSave_Click" />
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
