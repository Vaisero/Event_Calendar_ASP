
$(document).ready(function ()
{

    var months = ["","Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

    var currentDate = new Date();
    var currentMonth = currentDate.getMonth()+1;
    var currentYear = currentDate.getFullYear();
    var today = currentDate.getDate();

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

        ShowCalendar(currentMonth, currentYear);
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

        ShowCalendar(currentMonth, currentYear);
    });   

    function ButtonOnDay()
    {
        const cells = document.querySelectorAll('#calendarBody td');
        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                const dayId = cell.getAttribute('id');
                const dayDate = currentYear + currentMonth + dayId;
                if (dayId != null)
                    OpenModal(dayDate);
            });
        });
    }

    function OpenModal(dayDate)
    {
        // Открыть модальное окно
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
        var event = jQuery.parseJSON(dayDate);

        $.ajax(
            {
            url: "/Controllers/CalendarController/GetEvent",
            method: "GET",
            success: function ()
            {

                $("#modalData").text(JSON.stringify(event));
            },
            error: function ()
            {
                $("#modalData").text('Произошла ошибка при загрузке данных');
                console.log(event);
            }
        });


        var closeModal = document.getElementsByClassName("close")[0];
        closeModal.addEventListener("click", function ()
        {
            var modal = document.getElementById("myModal");
            modal.style.display = "none";
        });
    }

    function FillCalendar(month, year)
    {
        var firstDay = new Date(year, month, 0).getDay();
        var daysInMonth = new Date(year, month + 1, 0).getDate();

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

                        if (date === today && currentMonth === currentDate.getMonth()+1 && currentYear === currentDate.getFullYear())
                            cell.classList.add("current_day"); // Выделение текущего дня

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
        }
    }

    function ShowCalendar(currentMonth, currentYear)
    {
         // Отображение текущего месяца и года
        $("#monthYear").text(months[currentMonth] + " " + currentYear);
         // Создание и заполнение таблицы с датами
        FillCalendar(currentMonth, currentYear);     
         // Создание кнопки на каждом дне месяца
        ButtonOnDay();                                           
    }

})