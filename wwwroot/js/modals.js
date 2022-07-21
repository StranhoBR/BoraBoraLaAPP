function confirm(title, message, data, preConfirmAction, callbackAction = null) {
    Swal.fire({
        title: title,
        text: message,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        preConfirm: function () {
            return preConfirmAction(data)
        }
    }).then((result) => {
        if (result.isConfirmed && callbackAction) {
            callbackAction(result);
        } else {
            sucessMessage('Sucesso', 'Ação concluida com sucesso')
        }
    })
}

function sucessMessage(title, message, callback) {
    Swal.fire({
        icon: 'success',
        title: title,
        text: message,
    }).then(function () {
        if (callback) {
            callback();
        }
    });
}

function errorMessage(title, message, callback) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: message
    }).then(function () {
        if (callback) {
            callback();
        }
    });
}
