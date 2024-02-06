using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Diagnostics;
using TestTask_CIROBS.Models;

namespace TestTask_CIROBS.Controllers
{
    public class CalendarController : Controller
    {
        public IActionResult GetEvent(DateTime date)
        {
            using (var connection = new NpgsqlConnection("ConnectionString"))
            {
                connection.Open();

                using (var command = new NpgsqlCommand("event_read", connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("p_date", date);

                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            var EventInfo = new
                            {
                                event_name = reader.GetString(0),
                                event_date = reader.GetString(1),
                                category_id = reader.GetString(2)
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
