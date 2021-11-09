using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;


public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {


    }

    protected void Buttonupload_Click(object sender, EventArgs e)
    {
        try
        {
            if (FileUploadexcel1.HasFile)
            {
                Random rnd = new Random();
                int xx = rnd.Next(1, 1000);
                string filename = Path.GetFileName(FileUploadexcel1.FileName);
                string SaveLocation = "/excel\\file_" + xx + "_" + filename;
                FileUploadexcel1.SaveAs(Server.MapPath(SaveLocation));
                HiddenFieldLink1.Value = SaveLocation;
                LabelFileName.Text = " <img src='images/tick.png' style='margin: 2em 0;width:10%' />";
                //convert to datatable

                var connectionString = String.Format(@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=""Excel 12.0 Xml;HDR=YES""", Server.MapPath(SaveLocation));
                var adapter = new OleDbDataAdapter("SELECT * FROM [دفتري$]", connectionString);
                var ds = new DataSet();
                adapter.Fill(ds, "excel1");
                DataTable data = ds.Tables["excel1"];
                ViewState["dtExcel1"] = data;

            }
        }
        catch (Exception)
        {

            throw;
        }
    }


    protected void Buttonupload2_Click(object sender, EventArgs e)
    {
        try
        {
            if (FileUploadexcel2.HasFile)
            {
                Random rnd = new Random();
                int xx = rnd.Next(1, 1000);
                string filename = Path.GetFileName(FileUploadexcel2.FileName);
                string SaveLocation = "/excel\\file_" + xx + "_" + filename;
                FileUploadexcel2.SaveAs(Server.MapPath(SaveLocation));
                HiddenFieldLink2.Value = SaveLocation;
                LabelFileName2.Text = " <img src='images/tick.png' style='margin: 2em 0;width:10%' />"; ;
                //convert to datatable

                var connectionString = String.Format(@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=""Excel 12.0 Xml;HDR=YES""", Server.MapPath(SaveLocation));
                var adapter = new OleDbDataAdapter("SELECT * FROM [Sheet1$]", connectionString);
                var ds = new DataSet();
                adapter.Fill(ds, "excel2");
                DataTable data = ds.Tables["excel2"];
                ViewState["dtExcel2"] = data;

            }
        }
        catch (Exception)
        {

            throw;
        }
    }

    protected void Buttonsearch_Click(object sender, EventArgs e)
    {
        if (ViewState["dtExcel2"] != null && ViewState["dtExcel1"] != null)
        {
            try
            {
                DataTable dt1 = new DataTable();
                DataTable dt1_ref = new DataTable();
                dt1 = (DataTable)ViewState["dtExcel1"];
                dt1_ref = dt1;

                DataTable dt2 = new DataTable();
                DataTable dt2_ref = new DataTable();
                dt2 = (DataTable)ViewState["dtExcel2"];
                dt2_ref = dt2;

                foreach (DataRow r1 in dt1.Rows.Cast<DataRow>().ToArray()) // save rows to array
                {
                    foreach (DataRow r2 in dt2.Rows)
                    {

                        if (r1.Field<string>("المرجع") == r2.Field<string>("المرجع"))
                        {
                            r1.Delete();
                            //  r2.Delete();
                            break; // break inner loop
                        }
                    }

                }


                dt1.Merge(gg(dt2_ref, dt1_ref));
                RepeaterdataFinal.DataSource = dt1;
                RepeaterdataFinal.DataBind();


            }
            catch (Exception)
            {

                throw;
            }

        }
    }


    public DataTable gg(DataTable dt1_ref, DataTable dt2_ref)
    {
        foreach (DataRow m1 in dt1_ref.Rows.Cast<DataRow>().ToArray()) // save rows to array
        {
            foreach (DataRow m2 in dt2_ref.Rows)
            {
                if (m2.RowState != DataRowState.Deleted)
                {
                    if (m1.Field<string>("المرجع") == m2.Field<string>("المرجع"))
                    {
                        m1.Delete();
                        //  r2.Delete();
                        break; // break inner loop
                    }
                }
            }

        }
        return dt1_ref;
    }

    protected void ExportToExcel(object sender, EventArgs e)
    {
        Response.Clear();
        Response.Buffer = true;
        Response.AddHeader("content-disposition", "attachment;filename=RepeaterExport.xls");
        Response.Charset = "";
        Response.ContentType = "application/vnd.ms-excel";
        StringWriter sw = new StringWriter();
        HtmlTextWriter hw = new HtmlTextWriter(sw);
        RepeaterdataFinal.RenderControl(hw);
        Response.Output.Write(sw.ToString());
        Response.Flush();
        Response.End();
    }
}