

$(".modalClose").click(function ()
{
    CloseModalWindow();
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

        EditButton_Create(id);


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

                            ShowCalendar(data.month, data.year)
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
            CloseModalWindow();
        });
    });
}

function CreateButton_AddEventListener()
{
    $("#createEvent").on('click', function (event)
    {

        CreateButton_Create();


        $("#saveButton").click(function ()
        {
            if (confirm("Вы точно хотите сохранить это событие?") == true)
                if ($("#nameInput").val() && $("#dateInput").val() && $("#categoryInput").val())
                    $.ajax(
                        {
                            url: "/Calendar/GetFunction_EventCreate",
                            method: "GET",
                            data: { name: $("#nameInput").val(), date: $("#dateInput").val(), category: $("#categoryInput").val() },

                            success: function (data)
                            {
                                alert("Событие успешно создано!");

                                ShowCalendar(data.month, data.year)
                                
                            },

                            error: function (data)
                            {
                                console.log(data);
                                alert("Ошибка: Произошла ошибка с созданием события");
                            }
                        }
                    );
                else
                    alert("Ошибка: Заполните все поля!")
        });

        $("#cancelButton").click(function ()
        {
            CloseModalWindow();
        });

    });
}

function EditButton_Create(id)
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

                var real_id = data.category_id;

                $.ajax(
                    {
                        url: "/Calendar/Get_CategoryNames",
                        method: "GET",

                        success: function (data)
                        {
                            var selectStr = "<select id=\"categoryInput\">";
                            data.forEach(obj =>
                            {
                                selectStr += "<option value=\"" + obj.category_id + "\"" + (real_id == obj.category_id ? "selected" : "") + " > " + obj.category_name + "</option > "
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

function CreateButton_Create()
{
    var modal = document.getElementsByClassName("modal")[0];
    modal.style.display = "block";
    var overlay = document.getElementsByClassName("overlay")[0];
    overlay.style.opacity = 1;
    overlay.style.visibility = "visible";
    
    $(".modalData").empty();

    var eventElement = $("<div>").addClass("event");

    eventElement.append("<input type=\"date\" id=\"dateInput\" value=\"\">");

    eventElement.append("<input type=\"text\" placeholder=\"Название события\" id=\"nameInput\" value=\"\">");

    $.ajax(
        {
            url: "/Calendar/Get_CategoryNames",
            method: "GET",

            success: function (data)
            {
                var selectStr = "<select id=\"categoryInput\">";
                data.forEach(obj =>
                {
                    selectStr += "<option value=\"" + obj.category_id + "\"> " + obj.category_name + "</option > "
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

    eventElement.append("<button id=\"saveButton\">Сохранить</button>");

    eventElement.append("<button id=\"cancelButton\">Отменить</button>");

    $(".modalData").append(eventElement);
}