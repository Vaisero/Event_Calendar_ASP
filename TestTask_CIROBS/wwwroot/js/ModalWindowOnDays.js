

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
            url: "/Calendar/Get_EventRead",
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
                    $(".modalData").text("В этот день у тебя нет никаких событий и планов ОТДЫХАЙ! Ты это заслужил)");
                    ButtonCreate();
                }    
            },

            error: function () { }
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

    ButtonCreate(); 


    buttonDeleteAddEventListener();
}

function ButtonCreate()
{
    var buttonCreate = $("<button>")
        .text("Создать новое событие")
        .addClass("buttonCreate");
    $(".modalData").append(buttonCreate);
}