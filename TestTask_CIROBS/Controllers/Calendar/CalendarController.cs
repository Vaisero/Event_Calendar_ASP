using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using TestTask_CIROBS.Models;

namespace TestTask_CIROBS.Controllers.Calendar
{
    public class CalendarController : Controller
    {
        public IActionResult Index(DateTime? selectedMonth)
        {
            var model = new CalendarViewModel();

            //данные из PostgreSQL

            model.AvailableMonths = new List<SelectListItem>
            {
                new SelectListItem { Value = "1", Text = "Январь"},
                new SelectListItem { Value = "1", Text = "Февраль"}
            };

            if (selectedMonth.HasValue)
            {
                model.SelectedMonth = selectedMonth.Value;
                //model.Events = GetEventsForMonth(selectedMonth.Value);
            }

            return View(model);
        }
    }
}
