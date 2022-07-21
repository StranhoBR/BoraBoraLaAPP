$(document).ready(function () {
    // 13C60A8EB7B7BF8CC47F0FBA8CF9A211
    $('#BotaoPagamento').click(function () {
        event.preventDefault();

        var data = $('form').serialize();

        SendPostAsync('/pedido/checkout', data).then(dados => {

            if (dados.isError) {
                errorMessage("Erro", dados.message);
            } else {
                PagSeguroLightbox({
                    code: dados.data.code
                }, {
                    success: function (transactionCode) {
                        SendPostAsync('/pedido/finishcheckout', { code: transactionCode }).then(dadosFinish => {
                            if (dadosFinish.isError) {
                                errorMessage("Ocorreu um erro ao finalizar a sua compra", dadosFinish.message);
                            } else {
                                sucessMessage("Sucesso", dadosFinish.message, function () {
                                    window.location.href = '/pedido/finish'
                                });
                            }
                        });
                    },
                    abort: function () {
                        errorMessage("Erro", "Usuário não finalizou a compra");
                    }
                });
            }
        })


    });
})