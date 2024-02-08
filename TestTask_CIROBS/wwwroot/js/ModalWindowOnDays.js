

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
                OpenModal(dayDate);
        });
    });
}



function OpenModal(dayDate)
{
    CloseModal();

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
                $(".modalData").text("События на " + formattedDate + " " + data.event_name + " " + data.category_name);
            },

            error: function ()
            {
                $(".modalData").text("В этот день у тебя нет никаких событий и планов ОТДЫХАЙ! Ты это заслужил)");
            } 

        });
}



function CloseModal()
{
    var modalClose = document.getElementsByClassName("modalClose")[0];

    modalClose.addEventListener("click", function ()
    {
        var modal = document.getElementsByClassName("modal")[0];
        modal.style.display = "none";
        var overlay = document.getElementsByClassName("overlay")[0];
        overlay.style.opacity = 0;
        overlay.style.visibility = "hidden";
    });
}
