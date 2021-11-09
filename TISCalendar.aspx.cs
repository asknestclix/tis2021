using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class TISCalendar : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            if (!IsPostBack)
            {
                LabelG.Text = DateTime.Now.ToShortDateString();
                CultureInfo arSA = new CultureInfo("ar-SA");
                arSA.DateTimeFormat.Calendar = new UmAlQuraCalendar();
                DateTime date1 = new DateTime(Convert.ToInt32(DateTime.Now.Year.ToString()), Convert.ToInt32(DateTime.Now.Month.ToString()), Convert.ToInt32(DateTime.Now.Day.ToString()));
                LabelH.Text = date1.ToString("d", arSA);





                try
                {
                    // fill repeater 
                    if (HiddenFielddate.Value == "")
                    { HiddenFielddate.Value = DateTime.Now.ToShortDateString(); }


                    SqlConnection conn = new SqlConnection(@"Data Source=den1.mssql8.gear.host ; Initial Catalog = dbforms; User ID = dbforms; Password=Nd3eB7v!rxr!");
                    DataTable dt = new DataTable();
                    string query = "";
                    if (Request.QueryString["ID"].ToString().Trim() != "0")
                        query = "SELECT EventID, CategoryName + '-' + EventTitle as EventTitle, EventDetails, CONVERT(varchar, EventdateEN, 107) as EventdateEN  ,'Darkclass' as RowClass FROM     TIS_tblEventsCalendar inner join TIS_tblEventCategory on (TIS_tblEventsCalendar.CategoryID = TIS_tblEventCategory.CategoryID) where TIS_tblEventsCalendar.CategoryID =" + Request.QueryString["ID"].ToString().Trim() + " and EventdateEN = '" + DateTime.Today.ToString("yyyy-MM-dd") + "'";
                    else
                        query = "SELECT EventID, CategoryName + '-' + EventTitle as EventTitle, EventDetails, CONVERT(varchar, EventdateEN, 107) as EventdateEN  ," +
                                "case when TIS_tblEventsCalendar.CategoryID = 1 then 'KGClass' " +
                                "     when TIS_tblEventsCalendar.CategoryID = 2 then 'PrimaryClass' " +
                                "	 when TIS_tblEventsCalendar.CategoryID = 3 then 'UpperPrimaryGClass' " +
                                "	 	 when TIS_tblEventsCalendar.CategoryID = 4 then 'UpperPrimaryBClass' " +
                                "		  when TIS_tblEventsCalendar.CategoryID = 5 then 'MiddleGClass' " +
                                "		    when TIS_tblEventsCalendar.CategoryID = 6 then 'MiddleBClass' " +
                                "			 when TIS_tblEventsCalendar.CategoryID = 7 then 'SecondryGClass' " +
                                "			  when TIS_tblEventsCalendar.CategoryID = 8 then 'SecondryBClass' " +
                                "			   when TIS_tblEventsCalendar.CategoryID = 9 then 'DiplomaGClass' " +
                                "			    when TIS_tblEventsCalendar.CategoryID = 10 then 'DiplomaBClass' " +
                                "				end as RowClass   " +
                                "FROM     TIS_tblEventsCalendar inner join TIS_tblEventCategory on (TIS_tblEventsCalendar.CategoryID = TIS_tblEventCategory.CategoryID) where  EventdateEN = '" + DateTime.Today.ToString("yyyy-MM-dd") + "'";

                    SqlCommand cmd = new SqlCommand(query, conn);
                    conn.Open();
                    SqlDataAdapter da = new SqlDataAdapter(cmd);

                    da.Fill(dt);

                    if (dt.Rows.Count > 0)
                    {
                        RepeaterEventList.DataSource = dt;
                        RepeaterEventList.DataBind();
                    }
                    else
                    {
                        RepeaterEventList.DataSource = null;
                        RepeaterEventList.DataBind();
                    }
                    conn.Close();

                }
                catch (Exception)
                {

                    throw;
                }
            }
        }
        catch (Exception ex)
        {
            LabelG.Text = ex.Message;
            //throw;
        }
    }
    [WebMethod]
    public static List<CalendarEvents> GetCalendarData(DateTime StartDate, DateTime EndDate, int PlaceID)
    {
        //-- this is the webmethod that you will require to create to fetch data from database
        return
            GetCalendarDataFromDatabase(StartDate, EndDate, PlaceID);
    }

    /* this is an example method that creates sample data to show in FullCalendar.
        * instead of this, you will simply reuqire to replace this code to actually fetch data from database
        * */
    private static List<CalendarEvents> GetCalendarDataFromDatabase(DateTime StartDate, DateTime EndDate, int PlaceID)
    {

        SqlConnection conn = new SqlConnection(@"Data Source=den1.mssql8.gear.host ; Initial Catalog = dbforms; User ID = dbforms; Password=Nd3eB7v!rxr!");
        DataTable dt = new DataTable();
        string query = "";
        if (PlaceID != 0)
         query = "SELECT EventID, EventTitle, EventDetails, EventdateEN  as 'start' ,EventdateEN  as 'end' FROM     TIS_tblEventsCalendar  where TIS_tblEventsCalendar.CategoryID =" + PlaceID;
        else
        {
            query = "SELECT EventID, EventTitle, EventDetails, EventdateEN  as 'start' , EventdateEN  as 'end' FROM  TIS_tblEventsCalendar ";
        }
            

        SqlCommand cmd = new SqlCommand(query, conn);
        conn.Open();
        SqlDataAdapter da = new SqlDataAdapter(cmd);

        da.Fill(dt);
        List<CalendarEvents> Events = new List<CalendarEvents>();
        if (dt.Rows.Count > 0)
        {
            // RepeaterEventList.DataSource = dt;
           
            for (int x = 0; x < dt.Rows.Count; x++)
            {
                try
                {
                    Events.Add(
                       new CalendarEvents()
                       {
                           EventId = Convert.ToInt32(dt.Rows[x]["EventID"]),
                           EventStartDate = dt.Rows[x]["start"].ToString(),
                           EventEndDate = dt.Rows[x]["end"].ToString(),
                           Title = dt.Rows[x]["EventTitle"].ToString(),
                           EventDescription = dt.Rows[x]["EventDetails"].ToString(),
                           AllDayEvent = false,

                       }
                   );
                }
                catch (Exception ex) { }
                
            }
        }

        conn.Close();


        return Events;
    }

    public class CalendarEvents
    {
        public Int64 EventId { get; set; }

        public string EventStartDate { get; set; }

        public string EventEndDate { get; set; }

        public string EventDescription { get; set; }

        public string Title { get; set; }

        public string time { get; set; }

        public bool AllDayEvent { get; set; }
    }


    protected void Buttongetdata_Click(object sender, EventArgs e)
    {
        try
        {
            // fill repeater 
            DropDownListper.SelectedIndex = 0;
            SqlConnection conn = new SqlConnection(@"Data Source=den1.mssql8.gear.host ; Initial Catalog = dbforms; User ID = dbforms; Password=Nd3eB7v!rxr!");
            DataTable dt = new DataTable();
            string query = "";
            if (Request.QueryString["ID"].ToString().Trim() != "0")
                query = "SELECT EventID, CategoryName + '-' + EventTitle as EventTitle, EventDetails, CONVERT(varchar, EventdateEN, 107) as EventdateEN  ,'Darkclass' as RowClass FROM     TIS_tblEventsCalendar inner join TIS_tblEventCategory on (TIS_tblEventsCalendar.CategoryID = TIS_tblEventCategory.CategoryID) where TIS_tblEventsCalendar.CategoryID =" + Request.QueryString["ID"].ToString().Trim() + " and EventdateEN = '" + HiddenFielddate.Value +"'";
            else
                query = "SELECT EventID, CategoryName + '-' + EventTitle as EventTitle, EventDetails, CONVERT(varchar, EventdateEN, 107) as EventdateEN  ," +
                        "case when TIS_tblEventsCalendar.CategoryID = 1 then 'KGClass' " +
                        "     when TIS_tblEventsCalendar.CategoryID = 2 then 'PrimaryClass' " +
                        "	 when TIS_tblEventsCalendar.CategoryID = 3 then 'UpperPrimaryGClass' " +
                        "	 	 when TIS_tblEventsCalendar.CategoryID = 4 then 'UpperPrimaryBClass' " +
                        "		  when TIS_tblEventsCalendar.CategoryID = 5 then 'MiddleGClass' " +
                        "		    when TIS_tblEventsCalendar.CategoryID = 6 then 'MiddleBClass' " +
                        "			 when TIS_tblEventsCalendar.CategoryID = 7 then 'SecondryGClass' " +
                        "			  when TIS_tblEventsCalendar.CategoryID = 8 then 'SecondryBClass' " +
                        "			   when TIS_tblEventsCalendar.CategoryID = 9 then 'DiplomaGClass' " +
                        "			    when TIS_tblEventsCalendar.CategoryID = 10 then 'DiplomaBClass' " +
                        "				end as RowClass   " +
                        "FROM     TIS_tblEventsCalendar inner join TIS_tblEventCategory on (TIS_tblEventsCalendar.CategoryID = TIS_tblEventCategory.CategoryID) where EventdateEN = '" + HiddenFielddate.Value +"'";

            SqlCommand cmd = new SqlCommand(query, conn);
            conn.Open();
            SqlDataAdapter da = new SqlDataAdapter(cmd);

            da.Fill(dt);

            if (dt.Rows.Count > 0)
            {
                RepeaterEventList.DataSource = dt;
                RepeaterEventList.DataBind();
            }
            else
            {
                RepeaterEventList.DataSource = null;
                RepeaterEventList.DataBind();
            }
            conn.Close();

        }
        catch (Exception)
        {

            throw;
        }
    }

    protected void DropDownListper_SelectedIndexChanged(object sender, EventArgs e)
    {
        try
        {
            try
            {
                // fill repeater 
                if (DropDownListper.SelectedValue == "2")
                {
                    if (HiddenFielddate.Value == "")
                    { HiddenFielddate.Value = DateTime.Now.ToShortDateString(); }
                    SqlConnection conn = new SqlConnection(@"Data Source=den1.mssql8.gear.host ; Initial Catalog = dbforms; User ID = dbforms; Password=Nd3eB7v!rxr!");
                    DataTable dt = new DataTable();
                    string query = "";
                    if (Request.QueryString["ID"].ToString().Trim() != "0")
                        query = "SELECT EventID, CategoryName + '-' + EventTitle as EventTitle, EventDetails, CONVERT(varchar, EventdateEN, 107) as EventdateEN  ,'Darkclass' as RowClass FROM     TIS_tblEventsCalendar inner join TIS_tblEventCategory on (TIS_tblEventsCalendar.CategoryID = TIS_tblEventCategory.CategoryID) where TIS_tblEventsCalendar.CategoryID =" + Request.QueryString["ID"].ToString().Trim() + " and EventdateEN between(  DATEADD(DAY, 1 - DATEPART(WEEKDAY,  '" + HiddenFielddate.Value + "'), CAST( '" + HiddenFielddate.Value + "' AS DATE))) and (DATEADD(DAY, 7 - DATEPART(WEEKDAY,  '" + HiddenFielddate.Value + "'), CAST( '" + HiddenFielddate.Value + "' AS DATE)))            ";
                    else
                        query = "SELECT EventID, CategoryName + '-' + EventTitle as EventTitle, EventDetails, CONVERT(varchar, EventdateEN, 107) as EventdateEN  ," +
                                "case when TIS_tblEventsCalendar.CategoryID = 1 then 'KGClass' " +
                                "     when TIS_tblEventsCalendar.CategoryID = 2 then 'PrimaryClass' " +
                                "	 when TIS_tblEventsCalendar.CategoryID = 3 then 'UpperPrimaryGClass' " +
                                "	 	 when TIS_tblEventsCalendar.CategoryID = 4 then 'UpperPrimaryBClass' " +
                                "		  when TIS_tblEventsCalendar.CategoryID = 5 then 'MiddleGClass' " +
                                "		    when TIS_tblEventsCalendar.CategoryID = 6 then 'MiddleBClass' " +
                                "			 when TIS_tblEventsCalendar.CategoryID = 7 then 'SecondryGClass' " +
                                "			  when TIS_tblEventsCalendar.CategoryID = 8 then 'SecondryBClass' " +
                                "			   when TIS_tblEventsCalendar.CategoryID = 9 then 'DiplomaGClass' " +
                                "			    when TIS_tblEventsCalendar.CategoryID = 10 then 'DiplomaBClass' " +
                                "				end as RowClass   " +
                                "FROM     TIS_tblEventsCalendar inner join TIS_tblEventCategory on (TIS_tblEventsCalendar.CategoryID = TIS_tblEventCategory.CategoryID) where EventdateEN between(  DATEADD(DAY, 1 - DATEPART(WEEKDAY,  '" + HiddenFielddate.Value + "'), CAST( '" + HiddenFielddate.Value + "' AS DATE))) and (DATEADD(DAY, 7 - DATEPART(WEEKDAY,  '" + HiddenFielddate.Value + "'), CAST( '" + HiddenFielddate.Value + "' AS DATE))) ";

                    SqlCommand cmd = new SqlCommand(query, conn);
                    conn.Open();
                    SqlDataAdapter da = new SqlDataAdapter(cmd);

                    da.Fill(dt);

                    if (dt.Rows.Count > 0)
                    {
                        RepeaterEventList.DataSource = dt;
                        RepeaterEventList.DataBind();
                    }
                    else
                    {
                        RepeaterEventList.DataSource = null;
                        RepeaterEventList.DataBind();
                    }
                    conn.Close();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
        catch (Exception)
        {

            throw;
        }
    }

    protected void ButtonSearch_Click(object sender, EventArgs e)
    {
        SqlConnection conn = new SqlConnection(@"Data Source=den1.mssql8.gear.host ; Initial Catalog = dbforms; User ID = dbforms; Password=Nd3eB7v!rxr!");
        DataTable dt = new DataTable();
        string query = "";
        if (Request.QueryString["ID"].ToString().Trim() != "0")
            query = "SELECT EventID, CategoryName + '-' + EventTitle as EventTitle, EventDetails, CONVERT(varchar, EventdateEN, 107) as EventdateEN  ,'Darkclass' as RowClass FROM     TIS_tblEventsCalendar inner join TIS_tblEventCategory on (TIS_tblEventsCalendar.CategoryID = TIS_tblEventCategory.CategoryID) where TIS_tblEventsCalendar.CategoryID =" + Request.QueryString["ID"].ToString().Trim() + " and EventdateEN between '"+TextBoxFrom.Text + "'  and  '" + TextBoxTo.Text + "'         ";
        else
            query = "SELECT EventID, CategoryName + '-' + EventTitle as EventTitle, EventDetails, CONVERT(varchar, EventdateEN, 107) as EventdateEN  ," +
                    "case when TIS_tblEventsCalendar.CategoryID = 1 then 'KGClass' " +
                    "     when TIS_tblEventsCalendar.CategoryID = 2 then 'PrimaryClass' " +
                    "	 when TIS_tblEventsCalendar.CategoryID = 3 then 'UpperPrimaryGClass' " +
                    "	 	 when TIS_tblEventsCalendar.CategoryID = 4 then 'UpperPrimaryBClass' " +
                    "		  when TIS_tblEventsCalendar.CategoryID = 5 then 'MiddleGClass' " +
                    "		    when TIS_tblEventsCalendar.CategoryID = 6 then 'MiddleBClass' " +
                    "			 when TIS_tblEventsCalendar.CategoryID = 7 then 'SecondryGClass' " +
                    "			  when TIS_tblEventsCalendar.CategoryID = 8 then 'SecondryBClass' " +
                    "			   when TIS_tblEventsCalendar.CategoryID = 9 then 'DiplomaGClass' " +
                    "			    when TIS_tblEventsCalendar.CategoryID = 10 then 'DiplomaBClass' " +
                    "				end as RowClass   " +
                    "FROM     TIS_tblEventsCalendar inner join TIS_tblEventCategory on (TIS_tblEventsCalendar.CategoryID = TIS_tblEventCategory.CategoryID) where EventdateEN between '" + TextBoxFrom.Text + "' and  '" + TextBoxTo.Text + "'          ";

        SqlCommand cmd = new SqlCommand(query, conn);
        conn.Open();
        SqlDataAdapter da = new SqlDataAdapter(cmd);

        da.Fill(dt);

        if (dt.Rows.Count > 0)
        {
            RepeaterEventList.DataSource = dt;
            RepeaterEventList.DataBind();
        }
        else
        {
            RepeaterEventList.DataSource = null;
            RepeaterEventList.DataBind();
        }
        conn.Close();
    }
}