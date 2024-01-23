using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace TestTask_CIROBS.Models
{
    public class CalendarViewModel
    {
        public List<CalendarEnent> Events { get; set; }
        public List<SelectListItem> AvailableMonths { get; set; }
        public DateTime SelectedMonth { get; set; }
        //public var GetEventsForMonth { get; set; }
    }

    public class CalendarEnent
    {
        public DateTime Date { get; set; }
        public string Name { get; set; }
    }

    //public class GetEventsForMonth(DateTime selectedMonth)
    //{

    //}
}
