

$(".modalClose").click(function ()
{
    CloseModalWindow_AddEventListener();
});

function DeleteButton_AddEventListener()
{
    $(".buttonDelete").on('click', function (event)
    {
        if (confirm("Вы точно хотите удалить это событие?") == true)
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

                error: function (data)
                {
                    console.log(data);
                    alert("Ошибка: Произошла ошибка при удалении!");
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
            if (confirm("Вы точно хотите изменить это событие?") == true)
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

                        error: function (data)
                        {
                            console.log(data);
                            alert("Ошибка: Произошла ошибка с изменением события");
                        }
                    }
                );
            else
                alert("Ошибка: Заполните все поля!")
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
                        error: function (data)
                        {
                            console.log(data);
                            alert("Ошибка: Произошла ошибка с заполнением категорий событий");
                        }
                    }
                );
            },

            error: function (data)
            {
                console.log(data);
                alert("Ошибка: Произошла ошибка с заполнением полей событий");
            }
        }
    );

    eventElement.append("<button id=\"saveButton\">Сохранить</button>");

    eventElement.append("<button id=\"cancelButton\">Отменить</button>");

    $(".modalData").append(eventElement);
}