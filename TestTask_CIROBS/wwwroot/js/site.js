
$(document).ready(function () {

    var months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();
    var currentYear = currentDate.getFullYear();
    var selectedDate = currentDate;

    // Отображение текущего месяца и года
    $("#monthYear").text(months[currentMonth] + " " + currentYear);

    // Создание и заполнение таблицы с датами
    fillCalendar(currentMonth, currentYear);

    // Переключение месяцев по стрелке НАЗАД
    $("#prevBtn").click(function () {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear -= 1;
        } else {
            currentMonth -= 1;
        }
        $("#monthYear").text(months[currentMonth] + " " + currentYear);
        fillCalendar(currentMonth, currentYear);
    });

    // Переключение месяцев по стрелке ВПЕРЕД
    $("#nextBtn").click(function () {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear += 1;
        } else {
            currentMonth += 1;
        }
        $("#monthYear").text(months[currentMonth] + " " + currentYear);
        fillCalendar(currentMonth, currentYear);
    });

    // Заполнение таблицы с датами
    function fillCalendar(month, year) {
        var firstDay = new Date(year, month, 0).getDay();
        var daysInMonth = new Date(year, month + 1, 0).getDate();

        var calendarBody = $("#calendarBody");
        calendarBody.empty();

        var date = 1;
        for (var i = 0; i < 6; i++) {
            var row = $("<tr></tr>");
            for (var j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    var cell = $("<td></td>");
                    row.append(cell);
                } else if (date <= daysInMonth) {
                    var cell = $("<td></td>").text(date);
                    row.append(cell);
                    date++;
                }
            }
            calendarBody.append(row);
        }
    }

})