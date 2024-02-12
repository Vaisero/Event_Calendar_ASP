
function buttonDeleteAddEventListener()
{
    $(".buttonDelete").on('click', function (event)
    {
        $.ajax(
            {
                url: "/Calendar/Get_EventDelete",
                method: "GET",
                data: { id: this.id },

                success: function (data)
                {
                    alert("Успешно удалено!");

                    const dayDate = data.year + "-" + data.month + "-" + this.id;
                    FillColor(data.month, data.year);
                    OpenModalWindow(dayDate);
                },

                error: function ()
                {
                    alert("Произошла ошибка");
                }
            }
        );
    });
}
