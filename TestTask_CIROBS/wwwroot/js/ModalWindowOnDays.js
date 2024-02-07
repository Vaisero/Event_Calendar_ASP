

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

    var modal = document.getElementById("ModalWindow");
    modal.style.display = "block";

    $.ajax(
        {
            url: "/Calendar/GetEvent",
            method: "GET",
            data: { date: dayDate },

            success: function (data)
            {
                $("#modalData").text(data.event_name);
            },

            error: function ()
            {
                $("#modalData").text('В данный день нет событий и планов');
            }

        });
}



function CloseModal()
{
    var closeModal = document.getElementsByClassName("closeModal")[0];

    closeModal.addEventListener("click", function ()
    {
        var modal = document.getElementById("ModalWindow");
        modal.style.display = "none";
    });
}
