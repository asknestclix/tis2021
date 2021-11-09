using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ParentSchoolVisit : System.Web.UI.Page
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
                    string query = "select * from TIS_tbParentSchoolVisit where ParentVisitID= " + Request.QueryString["ID"];
                    SqlCommand cmd = new SqlCommand(query, conn);
                    conn.Open();
                    SqlDataAdapter da = new SqlDataAdapter(cmd);

                    da.Fill(dt0);

                    if (dt0.Rows.Count != 0)
                    {

                        // TextBoxParentID.Text = dt0.Rows[0]["ParentNationalNumber"].ToString();
                        TextBoxParentName.Text = dt0.Rows[0]["ParentName"].ToString();
                        TextBoxEmail.Text = dt0.Rows[0]["Email"].ToString();
                        TextBoxPhoneNumber.Text = dt0.Rows[0]["PhoneNumber"].ToString();
                        DropDownListDivision.SelectedValue = dt0.Rows[0]["Division"].ToString();
                        RadioButtonListVisitFor.SelectedValue = dt0.Rows[0]["VisitFor"].ToString();
                        txtDetails.InnerHtml = dt0.Rows[0]["Details"].ToString();
                        TextBoxVisitDate.Text = dt0.Rows[0]["VisitDate"].ToString();
                        if (dt0.Rows[0]["Division"].ToString() == "1" || dt0.Rows[0]["Division"].ToString() == "2")
                        {
                            DropDownListVisitTime1.SelectedValue = dt0.Rows[0]["VisitTime"].ToString();
                            DropDownListVisitTime1.Style.Add("display", "");
                        }
                        else
                        {
                            DropDownListVisitTime2.SelectedValue = dt0.Rows[0]["VisitTime"].ToString();
                            DropDownListVisitTime2.Style.Add("display", "");
                        }

                        ButtonSave.Style.Add("display", "none");

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

    protected void ButtonSave_Click(object sender, EventArgs e)
    {
        try
        {
            Random r = new Random();
            int num = r.Next(100000);

            string conn = @"Data Source=den1.mssql8.gear.host ; Initial Catalog = dbforms; User ID = dbforms; Password=Nd3eB7v!rxr!";
            using (SqlConnection cn = new SqlConnection(conn))
            {
                cn.Open();

                string sql = "IF not exists(select ParentVisitID from TIS_tbParentSchoolVisit where VisitFor =	@VisitFor and VisitDate=@VisitDate and VisitTime=@VisitTime ) begin " +
                    "insert into TIS_tbParentSchoolVisit( ParentName , Email ,PhoneNumber,Division, VisitFor, Details, VisitDate ,    VisitTime,VisitCardNumber ) " +
                                                       "Values ( @ParentName , @Email,@PhoneNumber, @Division,@VisitFor, @Details, @VisitDate ,    @VisitTime,@VisitCardNumber);" +
                   "  SELECT  @@IDENTITY AS 'Identity'  END ";



                using (SqlCommand cmd = new SqlCommand(sql, cn))
                {
                    string VisitTime = "";
                    if (DropDownListDivision.SelectedValue == "1" || DropDownListDivision.SelectedValue == "2")
                        VisitTime = DropDownListVisitTime1.SelectedValue;
                    else
                        VisitTime = DropDownListVisitTime2.SelectedValue;

                    cmd.Parameters.Add(new SqlParameter("@ParentName", TextBoxParentName.Text));
                    cmd.Parameters.Add(new SqlParameter("@Email", TextBoxEmail.Text));
                    cmd.Parameters.Add(new SqlParameter("@PhoneNumber", TextBoxPhoneNumber.Text));
                    cmd.Parameters.Add(new SqlParameter("@Division", DropDownListDivision.SelectedValue));
                    cmd.Parameters.Add(new SqlParameter("@VisitFor", RadioButtonListVisitFor.SelectedValue));
                    cmd.Parameters.Add(new SqlParameter("@VisitDate", TextBoxVisitDate.Text));
                    cmd.Parameters.Add(new SqlParameter("@Details", txtDetails.InnerHtml));

                    cmd.Parameters.Add(new SqlParameter("@VisitTime", VisitTime));

                    cmd.Parameters.Add(new SqlParameter("@VisitCardNumber", num));


                    DataTable dtE = new DataTable();
                    SqlDataAdapter daE = new SqlDataAdapter(cmd);
                    daE.Fill(dtE);

                    if (dtE.Rows.Count > 0)
                    {
                        string ID = dtE.Rows[0]["Identity"].ToString();

                        cn.Close();
                        daE.Dispose();
                        string toaddress = "";

                        if (DropDownListDivision.SelectedValue == "1")
                        { toaddress = "aaluwaili@tischools.edu.sa";
                          //  toaddress = "may89.abughazaleh@yahoo.com";
                        }
                        else
                             if (DropDownListDivision.SelectedValue == "2")
                        { toaddress = "soalamari@tischools.edu.sa"; }
                        else
                             if (DropDownListDivision.SelectedValue == "3")
                        { toaddress = "walrasheed@tischools.edu.sa"; }
                        else
                             if (DropDownListDivision.SelectedValue == "4")
                        { toaddress = "naalmeaziad@tischools.edu.sa"; }
                        else
                             if (DropDownListDivision.SelectedValue == "5")
                        { //toaddress = "walrasheed@tischools.edu.sa";
                        toaddress = "nalshahrani@tischools.edu.sa";
                        }
                        else
                             if (DropDownListDivision.SelectedValue == "6")
                        { toaddress = "afetowh@tischools.edu.sa"; }
                        else
                             if (DropDownListDivision.SelectedValue == "7")
                        { toaddress = "alabdulmajeed @tischools.edu.sa"; }

                        //send email

                        MailAddress o_FromAddress = new MailAddress("info@Tischools.edu.sa", "حجز زيارة اولياء الامور ");
                        MailAddress o_ToAddress = new MailAddress(toaddress);

                        using (MailMessage mailMessage = new MailMessage(o_FromAddress, o_ToAddress))
                        {

                            mailMessage.Subject = RadioButtonListVisitFor.SelectedItem.ToString();
                            mailMessage.Body = "<div>تم حجز موعد لولي الامر </div>" +
                                "<div> الاسم:" + TextBoxParentName.Text + "</div>" +
                                "<div> رقم الجوال:" + TextBoxPhoneNumber.Text + "</div>" +
                                  "<div>البريد الالكتروني:" + TextBoxEmail.Text + "</div>" +
                                "<div>التوقيت:" + TextBoxVisitDate.Text + " , " + VisitTime.ToString() + "</div>" +
                                "";
                            mailMessage.IsBodyHtml = true;
                            SmtpClient smtp = new SmtpClient();

                            smtp.Host = "mail.taleem.cc";
                            smtp.EnableSsl = false;
                            System.Net.NetworkCredential NetworkCred = new System.Net.NetworkCredential();

                            NetworkCred.UserName = "bobfrancis@taleem.cc";
                            NetworkCred.Password = "May987654321#";

                            smtp.UseDefaultCredentials = true;

                            smtp.Credentials = NetworkCred;


                            smtp.Port = 25;

                            smtp.Send(mailMessage);





                        }




                        ScriptManager.RegisterStartupScript(this, GetType(), "showalert", "alert('لقد تم إرسال, شكرا لك ');", true);
                        Response.Redirect("ParentVisitCard.aspx?ID=" + ID);


                    }
                    else ScriptManager.RegisterStartupScript(this, GetType(), "showalert", "alert('الرجاء اختيار وقت أخر ,هنالك حجز فيي نفس الوقت و التاريخ  ');", true);
                }


            }



        }
        catch (Exception)
        {

            throw;
        }
    }

    protected void DropDownListDivision_SelectedIndexChanged(object sender, EventArgs e)
    {
        try
        {
            if (DropDownListDivision.SelectedValue == "1" || DropDownListDivision.SelectedValue == "2" || DropDownListDivision.SelectedValue == "3")
            {
                DropDownListVisitTime1.Style.Add("display", "");
                DropDownListVisitTime2.Style.Add("display", "none");
            }
            else
            {
                DropDownListVisitTime1.Style.Add("display", "none");
                DropDownListVisitTime2.Style.Add("display", "");
            }

        }
        catch (Exception)
        {

            throw;
        }
    }
}