

$(".modalClose").click(function ()
{
    CloseModalWindow_AddEventListener();
});

function DeleteButton_AddEventListener()
{
    $(".buttonDelete").on('click', function (event)
    {
        $.ajax(
            {
                url: "/Calendar/GetFunction_EventDelete",
                method: "GET",
                data: { id: this.id },

                success: function (data)
                {
                    alert("Событие успешно удалено!");

                    const dayDate = data.year + "-" + data.month + "-" + data.day;
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

function EditButton_AddEventListener()
{
    $(".buttonEdit").on('click', function (event)
    {
        var id = this.id;
        
        EditButtonCreate(id);


        $("#saveButton").click(function ()
        {
            if ($("#nameInput").val() && $("#dateInput").val() && $("#categoryInput").val())
                $.ajax(
                    {
                        url: "/Calendar/GetFunction_EventEdit",
                        method: "GET",
                        data: { id: id, name: $("#nameInput").val(), date: $("#dateInput").val(), category: $("#categoryInput").val() },

                        success: function (data)
                        {
                            alert("Событие успешно изменено!");

                            const dayDate = data.year + "-" + data.month + "-" + data.day;
                            FillColor(data.month, data.year);
                            OpenModalWindow(dayDate);
                        },

                        error: function ()
                        {
                            alert("Произошла ошибка с обновлением события");
                        }
                    }
                );
            else
                alert("Заполните все поля")
        });

        $("#cancelButton").click(function ()
        {
            CloseModalWindow_AddEventListener();
        });
    });
}

function EditButtonCreate(id)
{
    $(".modalData").empty();

    var eventElement = $("<div>").addClass("event");

    $.ajax(
        {
            url: "/Calendar/Get_EventById",
            method: "GET",
            data: { id: id },

            success: function (data)
            {
                var formattedDate = new Date(data.event_date);
                formattedDate.setDate(formattedDate.getDate() + 1);
                formattedDate = formattedDate.toISOString().split("T")[0];

                eventElement.append("<input type=\"date\" id=\"dateInput\" value=\"" + formattedDate + "\">");

                eventElement.append("<input type=\"text\" id=\"nameInput\" value=\"" + data.event_name + "\">");

                var tmp_id = data.category_id;

                $.ajax(
                    {
                        url: "/Calendar/Get_CategoryNames",
                        method: "GET",

                        success: function (data)
                        {
                            var selectStr = "<select id=\"categoryInput\">";
                            data.forEach(obj =>
                            {
                                selectStr += "<option value=\"" + obj.category_id + "\"" + (tmp_id == obj.category_id ? "selected" : "") + " > " + obj.category_name + "</option > "
                            });

                            selectStr += "</select>";

                            eventElement.append(selectStr);
                        },
                        error: function ()
                        {
                            alert("Произошла ошибка с заполнением полей событий");
                        }
                    }
                );
            },

            error: function ()
            {
                alert("Произошла ошибка с заполнением полей события");
            }
        }
    );

    eventElement.append("<button id=\"saveButton\">Сохранить</button>");

    eventElement.append("<button id=\"cancelButton\">Отменить</button>");

    $(".modalData").append(eventElement);
}