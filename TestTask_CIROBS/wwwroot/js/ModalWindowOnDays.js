

function ButtonOnDay(currentMonth, currentYear)
{
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
    CloseModalWindow();

    var modal = document.getElementsByClassName("modal")[0];
    modal.style.display = "block";
    var overlay = document.getElementsByClassName("overlay")[0];
    overlay.style.opacity = 1;
    overlay.style.visibility = "visible";

    $.ajax(
        {
            url: "/Calendar/GetEvent",
            method: "GET",
            data: { date: dayDate },

            success: function (data)
            {
                var formattedDate = new Date(data.event_date).toLocaleDateString();
                CreateModalWindow(formattedDate, data);
                //$(".modalData").text("События на " + formattedDate + " " + data.event_name + " " + data.category_name);
            },

            error: function ()
            {
                $(".modalData").text("В этот день у тебя нет никаких событий и планов ОТДЫХАЙ! Ты это заслужил)");
            } 

        }
    );
}



function CloseModalWindow()
{
    var modalClose = document.getElementsByClassName("modalClose")[0];
    $(".modalData").text("");

    modalClose.addEventListener("click", function ()
    {
        var modal = document.getElementsByClassName("modal")[0];
        modal.style.display = "none";
        var overlay = document.getElementsByClassName("overlay")[0];
        overlay.style.opacity = 0;
        overlay.style.visibility = "hidden";
    });
}



function CreateModalWindow(formattedDate, data)
{ 
    $(".modalData").empty();

    var header = $("<h2>").
        addClass("modalTitle").
        text("События на " + formattedDate);
    $(".modalData").append(header);

    var eventElement = $("<div>").addClass("event");

    var eventText = $("<span>")
        .text(data.event_name)
        .addClass("ModalEventText"); 
    eventElement.append(eventText);

    var categoryText = $("<span>")
        .text(" Это событие " + data.category_name)
        .addClass("ModalCategoryText");
    eventElement.append(categoryText);

    var buttonDelete = $("<button>")
        .text("Удалить")
        .addClass("buttonDelete");
    eventElement.append(buttonDelete);

    var buttonEdit = $("<button>")
        .text("Изменить")
        .addClass("buttonEdit");
    eventElement.append(buttonEdit);

    var buttonCreate = $("<button>")
        .text("Создать новое событие")
        .addClass("buttonCreate");
    eventElement.append(buttonCreate);

    $(".modalData").append(eventElement);
}