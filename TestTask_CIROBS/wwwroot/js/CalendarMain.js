$(document).ready(function ()
{

    var months = ["", "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

    var currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1;
    var currentYear = currentDate.getFullYear();
    var today = currentDate.getDate();


    ShowCalendar();

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

        ShowCalendar();
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

        ShowCalendar();
    });


    function ShowCalendar()
    {
        // Отображение текущего месяца и года
        $("#monthYear").text(months[currentMonth] + " " + currentYear);
        // Создание и заполнение таблицы с датами
        FillCalendar(currentMonth, currentYear, today, currentMonth, currentDate, currentYear);
        // Создание кнопки на каждом дне месяца
        ButtonOnDay(currentMonth, currentYear);
    }
})