
function FillCalendar(month, year, today, currentMonth, currentDate, currentYear)
{
    var firstDay = new Date(year, month - 1, 0).getDay();
    var daysInMonth = new Date(year, month, 0).getDate();

    var calendarBody = $("#calendarBody");
    calendarBody.empty();

    var date = 1;

    for (var i = 0; i < 6; i++)
    {
        var row = document.createElement('tr');
        for (var j = 0; j < 7; j++)
        {
            if (i === 0 && j < firstDay)
            {
                var cell = document.createElement('td');
                row.append(cell);
            }
            else
                if (date <= daysInMonth)
                {
                    var cell = document.createElement('td');
                    cell.textContent = date;
                    cell.id = date;

                    if (date === today && currentMonth === currentDate.getMonth() + 1 && currentYear === currentDate.getFullYear())
                        cell.classList.add("current_day");

                    row.append(cell);
                    date++;
                }
                else
                    if (i < 5 && j < 7)
                    {
                        var cell = document.createElement('td');
                        row.append(cell);
                    }
        }
        calendarBody.append(row);
        FillColor(month, year);
    }
}

function FillColor(month, year)
{
    $.ajax(
        {
            url: "/Calendar/GetCategoryColor",
            method: "GET",
            data: { month: month, year: year },

            success: function (data)
            {
                data.forEach(obj =>
                {
                    $("#" + obj.event_date).css("background-color", obj.category_color)
                });
            },

            error: function (){}
        }
    );
}