using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Diagnostics;
using Npgsql;
using System.Data;
using System.Diagnostics;
using TestTask_CIROBS.Models;

namespace TestTask_CIROBS.Controllers
{
    public class CalendarController : Controller
    {
        public IActionResult GetFunction_EventRead(DateOnly date)
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
                                category_name = reader.GetString(2),
                                event_id = reader.GetInt32(3)
                            };
                            events.Add(EventInfo);
                        }
                        return Json(events);
                    }
                }
            }
        }

        public IActionResult GetFunction_CategoryColor(int month, int year)
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
                        foreach (var color in colors)
                        {
                            if (colors.Where(x => x.event_date == color.event_date).Count() > 1)
                            {
                                var tmp = colors.Where(x => x.event_date == color.event_date).ToList();

                                foreach (var item in tmp)
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

        public IActionResult GetFunction_EventDelete(int id)
        {
            using (var connection = new NpgsqlConnection(ConnectionString()))
            {
                string sql = "SELECT * from event_delete(:p_id)";
                connection.Open();

                using (var command = new NpgsqlCommand(sql, connection))
                {
                    command.CommandType = CommandType.Text;
                    command.Parameters.AddWithValue("p_id", id);

                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            var EventInfo = new
                            {
                                month = reader.GetInt32(0),
                                year = reader.GetInt32(1),
                                day = reader.GetInt32(2)
                            };
                            return Json(EventInfo);
                        }
                        else
                            return NotFound();
                    }
                }
            }
        }

        public IActionResult GetFunction_EventEdit(int id, string name, DateOnly date, int category)
        {
            using (var connection = new NpgsqlConnection(ConnectionString()))
            {
                string sql = "SELECT * from event_update(:p_id, :p_name, :p_date, :p_category)";
                connection.Open();

                using (var command = new NpgsqlCommand(sql, connection))
                {
                    command.CommandType = CommandType.Text;
                    command.Parameters.AddWithValue("p_id", id);
                    command.Parameters.AddWithValue("p_name", name);
                    command.Parameters.AddWithValue("p_date", date);
                    command.Parameters.AddWithValue("p_category", category);

                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            var EventInfo = new
                            {
                                month = reader.GetInt32(0),
                                year = reader.GetInt32(1),
                                day = reader.GetInt32(2)
                            };
                            return Json(EventInfo);
                        }
                        else
                            return NotFound();
                    }
                }
            }
        }




        public IActionResult Get_EventById(int id)
        {
            using (var connection = new NpgsqlConnection(ConnectionString()))
            {
                string sql = "Select * from event_by_id(:p_id)";
                connection.Open();

                using (var command = new NpgsqlCommand(sql, connection))
                {
                    command.CommandType = CommandType.Text;
                    command.Parameters.AddWithValue("p_id", id);

                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            var EventInfo = new
                            {
                                event_name = reader.GetString(1),
                                event_date = reader.GetDateTime(2),
                                category_id = reader.GetInt32(3)
                            };
                            return Json(EventInfo);
                        }
                        else
                            return NotFound();
                    }
                }
            }
        }

        public IActionResult Get_CategoryNames()
        {
            using (var connection = new NpgsqlConnection(ConnectionString()))
            {
                string sql = "select * from categoty_names";
                connection.Open();

                using (var command = new NpgsqlCommand(sql, connection))
                {
                    command.CommandType = CommandType.Text;

                    using (var reader = command.ExecuteReader())
                    {
                        List<CategoryModel> events = new List<CategoryModel>();

                        while (reader.Read())
                        {
                            var EventInfo = new CategoryModel
                            {
                                category_id = reader.GetInt32(0),
                                category_name = reader.GetString(1)
                            };
                            events.Add(EventInfo);
                        }
                        return Json(events);
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
