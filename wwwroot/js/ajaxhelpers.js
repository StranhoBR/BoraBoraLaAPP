function SendPostAsync(url, formData) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            async: true,
            contentType: "application/x-www-form-urlencoded;charset=ISO-8859-1",
            dataType: 'json',
            success: function (data) {
                resolve(data)
            },
            error: function (error) {
                reject(error)
            }
        });
    })
}

function SendGet(url, callback) {

    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: 'GET',
            async: true,
            dataType: 'json',
            success: function (data) {
                resolve(data)
            },
            error: function (error) {
                reject(error)
            }
        });
    })
}

function HandleError(message, url) {

    if (message == '') {
        message = 'Ocorreu um erro ao processar a solicitação'
    }

    errorMessage(url, "<b>Mensagem:</b> " + message);
}