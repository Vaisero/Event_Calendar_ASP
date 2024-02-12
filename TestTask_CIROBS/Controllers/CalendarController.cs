using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Npgsql;
using System.Data;
using System.Diagnostics;
using TestTask_CIROBS.Models;

namespace TestTask_CIROBS.Controllers
{
    public class CalendarController : Controller
    {
        public IActionResult GetEvent(DateOnly date)
        {
            using (var connection = new NpgsqlConnection(ConnectionString()))
            {
                string sql = "Select * from event_read(:p_date)";
                connection.Open();

                using (var command = new NpgsqlCommand(sql, connection))
                {
                    command.CommandType = CommandType.Text;
                    command.Parameters.AddWithValue("p_date", date);

                    using (var reader = command.ExecuteReader())
                    {
                        List<EventGetModel> events = new List<EventGetModel>();

                        while (reader.Read())
                        {
                            var EventInfo = new EventGetModel
                            {
                                event_name = reader.GetString(0),
                                event_date = reader.GetDateTime(1),
                                category_name = reader.GetString(2)
                            };
                            events.Add(EventInfo);
                        }
                        return Json(events);
                    }
                }
            }
        }

        public IActionResult GetCategoryColor(int month, int year)
        {
            using (var connection = new NpgsqlConnection(ConnectionString()))
            {
                string sql = "select * from get_color(:p_month, :p_year)";
                connection.Open();

                using (var command = new NpgsqlCommand(sql, connection))
                {
                    command.CommandType = CommandType.Text;
                    command.Parameters.AddWithValue("p_month", month);
                    command.Parameters.AddWithValue("p_year", year);

                    using (var reader = command.ExecuteReader())
                    {
                        List<CategoryColorModel> colors = new List<CategoryColorModel>();

                        while (reader.Read())
                        {
                            var EventInfo = new CategoryColorModel
                            {
                                event_date = reader.GetInt32(0),
                                category_color = reader.GetString(1)
                            };       
                            colors.Add(EventInfo);
                        }
                        foreach(var color in colors)
                        {
                            if (colors.Where(x => x.event_date == color.event_date).Count() > 1)
                            {
                                var tmp = colors.Where(x => x.event_date == color.event_date).ToList();

                                foreach(var item in tmp)
                                {
                                    item.category_color = "#6666FF";
                                }
                            }
                        }
                        return Json(colors);
                    }
                }
            }
        }





        public IActionResult Index()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public string ConnectionString()
        {
            var builder = new ConfigurationBuilder();
            builder.SetBasePath(Directory.GetCurrentDirectory());
            builder.AddJsonFile("appsettings.json");
            var config = builder.Build();
            string connectionString = config.GetConnectionString("ConnectionString");
            return connectionString;
        }
    }
}
