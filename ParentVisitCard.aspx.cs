using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ParentVisitCard : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try 
        {
            if (!IsPostBack)
            {

                if (Request.QueryString["ID"] != null)
                {
                    DataTable dt0 = new DataTable();
                    string connString = @"Data Source=den1.mssql8.gear.host ; Initial Catalog = dbforms; User ID = dbforms; Password=Nd3eB7v!rxr!";

                    SqlConnection conn = new SqlConnection(connString);
                    string query = " select  ParentName,Email,PhoneNumber, " +
                                   " case" +
                                   " when VisitFor = 1 then N'استكمال التسجيل'" +
                                   " when VisitFor = 2 then N'سحب ملف'" +
                                   " when VisitFor = 3 then N'مقابلة قائدة المرحلة' end as 'VisitFor'" +
                                   " ,convert(varchar ,  VisitDate ,103) as VisitDate," +
                                   " case" +
                                   " when VisitTime = 1 then '10:00'" +
                                   " when VisitTime = 2 then '10:15'" +
                                   " when VisitTime = 3 then '10:30'" +
                                   " when VisitTime = 4 then '10:45'" +
                                   " when VisitTime = 5 then '11:00'" +
                                   " when VisitTime = 6 then '11:15'" +
                                   " when VisitTime = 7 then '11:30'" +
                                   " when VisitTime = 8 then '11:45'" +
                                   " when VisitTime = 9 then '12:00'" +
                                   " when VisitTime = 10 then '12:15'" +
                                   " when VisitTime = 11 then '12:30'" +
                                   " when VisitTime = 12 then '12:45'" +
                                   " when VisitTime = 13 then '01:00'" +
                                   " when VisitTime = 14 then '01:15'" +
                                   " when VisitTime = 15 then '01:30'" +
                                   " when VisitTime = 16 then '01:45'" +
                                   " when VisitTime = 17 then '02:00'" +
                                   " when VisitTime = 18 then '02:15'" +
                                   " when VisitTime = 19 then '02:30'" +
                                   " when VisitTime = 20 then '02:45'" +
                                   " when VisitTime = 21 then '03:00'" +
                                   " when VisitTime = 22 then '03:15'" +
                                   " when VisitTime = 23 then '03:30'" +
                                   " when VisitTime = 24 then '03:45'" +
                                   " when VisitTime = 25 then '04:00'" +
                                   " when VisitTime = 26 then '04:15'" +
                                   " when VisitTime = 27 then '04:30'" +
                                   " when VisitTime = 28 then '04:45'" +
                                   " when VisitTime = 29 then '05:00'" +
                                   " when VisitTime = 30 then '05:15'" +
                                   " when VisitTime = 31 then '05:30'" +
                                   " when VisitTime = 32 then '05:45'" +
                                   " end as 'VisitTime'," +
                                   "  case when Division = 1 then N'مرحلة رياض الأطفال'" +
                                   "    when Division = 2 then N'مرحلة الابتدائية الأولية'" +
                                   "    when Division = 3 then N'مرحلة الابتدائية العليا'" +
                                   "    when Division = 4 then N'المرحلة المتوسطة و الثانوية'" +
                                   "    when Division = 5 then N'مرحلة الدبلوما'" +
                                   "    when Division = 6 then N'قسم البنين'  end as 'Division'" +
                                   "  , VisitCardNumber" +
                                   " from TIS_tbParentSchoolVisit   where ParentVisitID= " + Request.QueryString["ID"];
                    SqlCommand cmd = new SqlCommand(query, conn);
                    conn.Open();
                    SqlDataAdapter da = new SqlDataAdapter(cmd);

                    da.Fill(dt0);

                    if (dt0.Rows.Count != 0)
                    {
                        LabelCardNumber.Text = dt0.Rows[0]["VisitCardNumber"].ToString();
                        LabelEmail.Text = dt0.Rows[0]["Email"].ToString();
                        LabelPhoneNumber.Text = dt0.Rows[0]["PhoneNumber"].ToString();
                        LabelDivision.Text = dt0.Rows[0]["Division"].ToString();
                        LabelName.Text = dt0.Rows[0]["ParentName"].ToString();
                        LabelVisitFor.Text = dt0.Rows[0]["VisitFor"].ToString();
                        Labeldate.Text = dt0.Rows[0]["VisitDate"].ToString() + " - " + dt0.Rows[0]["VisitTime"].ToString();
                    

                    }


                }
                else
                {

                }

            }
        }
        catch (Exception)
        {

            throw;
        }
    }
}