$(document).ready(function ()
{

    var currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1;
    var currentYear = currentDate.getFullYear();


    // нарисовать календарь и дни на экране, добавить на дни кнопки и цвета событий, изменить надпись месяца и года
    ShowCalendar(currentMonth, currentYear);

    // Переключение месяцев по стрелке НАЗАД
    $("#prevBtn").click(function ()
    {
        if (currentMonth === 1)
        {
            currentMonth = 12;
            currentYear -= 1;
        }
        else
            currentMonth -= 1;

        ShowCalendar(currentMonth, currentYear)
    });

    // Переключение месяцев по стрелке ВПЕРЕД
    $("#nextBtn").click(function ()
    {
        if (currentMonth === 12)
        {
            currentMonth = 1;
            currentYear += 1;
        }
        else
            currentMonth += 1;

        ShowCalendar(currentMonth, currentYear)
    });

})