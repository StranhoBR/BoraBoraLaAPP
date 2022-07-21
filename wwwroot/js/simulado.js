$(document).ready(function () {
    var timeLeft = getDateHourValue($('#DataFimProva').val());// new Date().getTime() + DateDiff.inMilliSeconds(dataInicio, dataFinal); // PRAZO RESTANTE EM MILISEGUNDOS
    console.log('Data Fim', timeLeft);
    startStopWatch('.time-left', timeLeft, function () {
        
        errorMessage("Prova Encerrada", "O prazo para execução da prova se encerrou.", function () { finish(); });
    });
})

function finish() {

    var data = {
        aplicacaoId: $('#AplicacaoId').val()
    }

    SendPostAsync('/simulado/finalizarsimulado', data).then(dados => {
        console.log('Chamei', data, 'Retorno', dados)
        if (dados.isError) {
            errorMessage('Erro', 'Ocorreu um erro ao finalizar o simulado, entre em contato com o adminstrador')
        } else {
            sucessMessage("Simulado finalizado", dados.messages[0], function () {
                window.location.href = '/Simulado/MinhasCompras'
            });
        }
    })
}

function replyQuestion(questionId, altId) {
    var data = {
        aplicacaoId: $('#AplicacaoId').val(),
        questaoId: questionId,
        alternativaId: altId
    }

    SendPostAsync('/simulado/responderquestao', data).then(dados => {
        console.log('Chamei', data, 'Retorno', dados)
        if (dados.isError) {
            errorMessage('Erro', 'Ocorreu um erro ao responder a questão, entre em contato com o adminstrador')
        }
    })
}

 function getDateHourValue (date) {
     var val = date.split(" ");
    var dt = val[0].split("/");
    var h = val[1].split(":");
    if (dt.length == 3 && !isNaN(dt[0]) && !isNaN(dt[1]) && !isNaN(dt[2])
        && h.length == 3 && !isNaN(h[0]) && !isNaN(h[1]) && !isNaN(h[2])) {
        return new Date(dt[2], dt[1] - 1, dt[0], h[0], h[1], h[2]);
    } return null;

}
function startStopWatch(selector, timeLeft, finishCallback) {
    $(selector).countdown(timeLeft)
        .on('update.countdown', function (e) {
            $(this).html(e.strftime('<span>%H:%M:%S</span>'));
            //$(this).html(e.strftime('%W S %-d D %-H h %M min %S sec'));
        })
        .on('finish.countdown', function () {
            if (finishCallback) finishCallback();
        });
}