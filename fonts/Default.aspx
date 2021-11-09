<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title></title>

    <link href="content/bootstrap.min.css" rel="stylesheet" />
    <link href="content/style.css" rel="stylesheet" />
    <style>
        .page-item.active .page-link {
            background-color: #76b852 !important;
            border-color: #76b852 !important;
            color: #fff !important;
        }

        .page-link {
            color: #76b852 !important;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class="container">
            <div style="padding: 5%">

                <div class="row">
                    <div class="col-md-12">
                        <center><h1  style="color:white">Compare Excel Files</h1><br /><br /></center>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <div style="margin: 2em 0; color: white">File no.1 </div>
                    </div>
                    <div class="col-md-4">
                        <asp:FileUpload ID="FileUploadexcel1" Style="margin: 2em 0" runat="server" />
                        <asp:HiddenField ID="HiddenFieldLink1" runat="server" />
                    </div>
                    <div class="col-md-3">
                        <asp:Button ID="Buttonupload" runat="server" Text="upload" OnClick="Buttonupload_Click" />
                    </div>
                    <div class="col-md-3">
                        <asp:Label ID="LabelFileName" Style="margin: 2em 0" runat="server" Text=""></asp:Label>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <div style="margin: 2em 0; color: white;">File no.2</div>
                    </div>
                    <div class="col-md-4">
                        <asp:FileUpload ID="FileUploadexcel2" Style="margin: 2em 0" runat="server" />
                        <asp:HiddenField ID="HiddenFieldLink2" runat="server" />

                    </div>
                    <div class="col-md-3">
                        <asp:Button ID="Buttonupload2" runat="server" Text="upload" OnClick="Buttonupload2_Click" />
                    </div>
                    <div class="col-md-3">
                        <asp:Label ID="LabelFileName2" Style="margin: 2em 0" runat="server" Text=""></asp:Label>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4">
                    </div>
                    <div class="col-md-4">
                        <asp:Button ID="Buttonexport" runat="server" Text="export to excel" OnClick="ExportToExcel" />
                    </div>
                    <div class="col-md-4">
                        <asp:Button ID="Buttonsearch" runat="server" Text="not maching records" OnClick="Buttonsearch_Click" />
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12" style="border: 1px solid #fff; border-radius: 10px; background-color: #ffffff; padding: 2%">
                        <asp:Repeater ID="RepeaterdataFinal" runat="server">
                            <HeaderTemplate>
                                <table id="example" class="table table-striped table-bordered" style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th style="text-align: center">التاريخ</th>
                                            <th style="text-align: center">رقـم السنـد</th>
                                            <th style="text-align: center">نـوع الحركـة</th>
                                            <th style="text-align: center">الوصــف</th>
                                            <th style="text-align: center">مديـن</th>
                                            <th style="text-align: center">دائـن</th>
                                            <th style="text-align: center">المرجع</th>
                                            <th style="text-align: center">التفاصيل</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                            </HeaderTemplate>
                            <ItemTemplate>
                                <tr>
                                    <td><%#Eval("التاريخ").ToString() %></td>
                                    <td><%#Eval("رقـم السنـد").ToString() %></td>
                                    <td><%#Eval("نـوع الحركـة").ToString() %></td>
                                    <td><%#Eval("الوصــف").ToString() %></td>
                                    <td><%#Eval("مديـن").ToString() %></td>
                                    <td><%#Eval("دائـن").ToString() %></td>
                                    <td><%#Eval("المرجع").ToString() %></td>
                                    <td><%#Eval("التفاصيل").ToString() %></td>
                                </tr>

                            </ItemTemplate>
                            <FooterTemplate>
                                </tbody>
        <tfoot>
        </tfoot>
                                </table>
                            </FooterTemplate>
                        </asp:Repeater>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="content/js/bootstrap.min.js"></script>
    <script src=" https://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.22/js/dataTables.bootstrap4.min.js"></script>
    <script>
        $(document).ready(function () {
            $('#example').DataTable();
        });
    </script>
</body>
</html>
