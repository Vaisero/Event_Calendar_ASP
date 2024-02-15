
var monthsArray = {
    text: ["", "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
};

function ShowCalendar(currentMonth, currentYear)
{
    // Отображение текущего месяца и года
    $("#monthYear").text(monthsArray.text[currentMonth] + " " + currentYear);
    // Создание и заполнение таблицы с датами
    FillCalendar(currentMonth, currentYear);
    // Создание кнопки на каждом дне месяца
    ButtonOnDay(currentMonth, currentYear);
}

