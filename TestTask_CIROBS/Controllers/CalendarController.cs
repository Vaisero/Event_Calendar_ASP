using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System.Data;
using System.Diagnostics;
using TestTask_CIROBS.Models;

namespace TestTask_CIROBS.Controllers
{
    public class CalendarController : Controller
    {

        public IActionResult GetEvent(DateTime date)
        {
            using (var connection = new NpgsqlConnection("Server=localhost;Port=5432;User Id=devUser;Password=1234;Database=CIROBS;"))
            {
                connection.Open();

                using (var command = new NpgsqlCommand("Select * from event_read(:p_date)", connection))
                {
                    command.CommandType = CommandType.Text;
                    command.Parameters.AddWithValue("p_date", DateOnly.FromDateTime(date));

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
                        {
                            return NotFound();
                        }
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
    }
}
