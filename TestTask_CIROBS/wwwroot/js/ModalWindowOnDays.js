﻿

function ButtonOnDay(currentMonth, currentYear)
{
    CreateButton_AddEventListener();

    const cells = document.querySelectorAll('#calendarBody td');
    cells.forEach(cell =>
    {
        cell.addEventListener('click', () =>
        {
            const dayId = cell.getAttribute('id');
            const dayDate = currentYear + "-" + currentMonth + "-" + dayId;
            if (dayId != null)
                OpenModalWindow(dayDate);
        });
    });
}



function OpenModalWindow(dayDate)
{
    $(".modalData").text("");

    var modal = document.getElementsByClassName("modal")[0];
    modal.style.display = "block";
    var overlay = document.getElementsByClassName("overlay")[0];
    overlay.style.opacity = 1;
    overlay.style.visibility = "visible";

    $.ajax(
        {
            url: "/Calendar/GetFunction_EventRead",
            method: "GET",
            data: { date: dayDate },

            success: function (data)
            {
                try
                {
                    var formattedDate = new Date(data[0].event_date).toLocaleDateString();

                    CreateModalWindow(formattedDate, data);
                }
                catch
                {
                    $(".modalData").empty();

                    var eventText = $("<span>")
                        .addClass("ModalEventText")
                        .text("В этот день у тебя нет никаких событий и планов ОТДЫХАЙ! Ты это заслужил)");
                    $(".modalData").append(eventText);

                }    
            },

            error: function () { }
        }
    );
}



function CloseModalWindow()
{
    $(".modalData").text("");
    var modal = document.getElementsByClassName("modal")[0];
    modal.style.display = "none";
    var overlay = document.getElementsByClassName("overlay")[0];
    overlay.style.opacity = 0;
    overlay.style.visibility = "hidden";
}



function CreateModalWindow(formattedDate, data)
{ 
    $(".modalData").empty();

    var header = $("<h2>")
        .addClass("modalTitle")
        .text("События на " + formattedDate);
    $(".modalData").append(header);

    data.forEach(obj =>
    {
        var eventElement = $("<div>").addClass("event");

        var eventText = $("<span>")
            .text(obj.event_name)
            .addClass("ModalEventText");
        eventElement.append(eventText);

        var categoryText = $("<span>")
            .text(" Это событие " + obj.category_name)
            .addClass("ModalCategoryText");
        eventElement.append(categoryText);

        var buttonDelete = $("<button>")
            .text("Удалить")
            .addClass("buttonDelete")
            .attr("id",obj.event_id);
        eventElement.append(buttonDelete);
       
        var buttonEdit = $("<button>")
            .text("Изменить")
            .addClass("buttonEdit")
            .attr("id", obj.event_id);
        eventElement.append(buttonEdit);

        

        $(".modalData").append(eventElement);
    });


    DeleteButton_AddEventListener();
    EditButton_AddEventListener();
}