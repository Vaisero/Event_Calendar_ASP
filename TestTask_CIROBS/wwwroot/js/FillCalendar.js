
function FillCalendar(currentMonth, currentYear)
{
    var firstDay = new Date(currentYear, currentMonth - 1, 0).getDay();
    var daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

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

                    var today = new Date();
                    if (date === today.getDate() && currentMonth === today.getMonth() + 1 && currentYear === today.getFullYear())
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
        FillColor(currentMonth, currentYear);
    }
}

function FillColor(month, year)
{
    $.ajax(
        {
            url: "/Calendar/GetFunction_CategoryColor",
            method: "GET",
            data: { month: month, year: year },

            success: function (data)
            {
                $("td").css("background-color", "lightgoldenrodyellow");
                data.forEach(obj =>
                {
                    $("#" + obj.event_date).css("background-color", obj.category_color)
                });
            },

            error: function (data)
            {
                console.log(data);
                alert("Ошибка: Произошла ошибка с цветами календаря");
            }
        }
    );
}